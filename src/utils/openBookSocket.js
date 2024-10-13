import * as AC from "../actions/actionCreators";

export default class OpenBookSocket
{
    store;
    ws;
    wsUrl;
    subscription;
    constructor(store)
    {
        this.store = store;
        this.wsUrl = 'wss://dropcopy.io/feed';
        // connect to hosted server
        this.ws = new WebSocket(this.wsUrl)
        // if connecting to serum-vial server running locally
        // const ws = new WebSocket('ws://localhost:8000/v1/ws')
        this.submitMessage = this.submitMessage.bind(this);
        this.sendPing      = this.sendPing.bind(this);
        this.connect       = this.connect.bind(this);
        this.reconnect     = this.reconnect.bind(this);
        this.setupHandlers();
        this.subscription = [];
    }
    
    setupHandlers()
    {
        this.ws.onmessage = (message) => {
          this.processMessage(JSON.parse(message.data))
          //console.log(JSON.parse(message.data))
        }

        this.ws.onopen = () => {
          console.log('dropcopy websocket opened')
          //setInterval(this.sendPing, 30 *1000);
		  //this.sendPing();
          this.subscription.forEach((product)=>
          {
              this.subscribe(product);
          });
        }

        this.ws.onclose=()=> {
          console.log('serum websocket disconnected')
          setTimeout( this.reconnect, 3000); 
        }
         
        this.ws.onerror=()=> {
            let errormessage = "WebSocket error observed:";
            console.error(errormessage);
        }
    }
    
    processMessage(message) {
        if (message.type === "error")
        {
            if (message.message === "invalid cookie" 
                || message.message === "User not verified"
            )
            {
                //storeMessage(message.message);
           //     this.addMessage(message.message + " received, logging in, setting cookie, and retrying...", "received");
			//	this.store.dispatch(setTab(TAB.LOGIN));				
            }
            else if (message.message === "User not logged in")
            {
				console.log('logging user out!!')
				this.cm.expireCookie("userinfo");
				window.location.reload(true);			
            }
			else
			{
				window.alert(message.message);
			}
        }
        if (message.hasOwnProperty("isTrusted"))
        {
            //return;
        }
        switch (message.type)
        {
            case "trade":
            {
                console.log("trade "+ JSON.stringify(message));
                this.store.dispatch(AC.updateOpenBookTradeData(message));
                break;
            }
            case "l2update":
            {
                console.log("l2update "+ JSON.stringify(message));
                this.store.dispatch(AC.processOpenBookUpadate(message));
            break;
            }
            case "recent_trades":
            {   
                console.log("recent_trades "+ JSON.stringify(message));
                this.store.dispatch(AC.updateOpenBookRecentTradeData(message));
                break;
            }
            case "l2snapshot":
            {
                console.log("l2snapshot "+ JSON.stringify(message));
                this.store.dispatch(AC.updateOpenBookSnapshot(message));
                break;
            }
            default:
            console.log("UNKNOW message of type "+ JSON.stringify(message));
        }
    }
    
    sendPing(){
        let ping = {"action":"heartbeat","param":"ping"};
        this.submitMessage(ping);
    }
    
    connect(newUrl){
		if (newUrl === undefined)
		{			
			console.log('logging user out!!')
			return;
		}
		this.wsUrl = newUrl;
        this.ws = new WebSocket(this.wsUrl);
        this.setupHandlers();
    }
    
    reconnect(){
        try
        {
			if (this.ws !== undefined)
			{
				this.ws.close();
			}
		}
        catch(err)
        {
            //this.addMessage(err);
        }
        this.connect(this.wsUrl);
    }
	
    submitMessage(message){
        if (this.ws.readyState !== WebSocket.OPEN)
        {
            console.log("websocket not open so cannot send message");
            return;
        }
        this.ws.send(JSON.stringify(message))
    }
    
    subscribe(product)
    {          
        const subscribeTrades = {
            op: 'subscribe',
            channel: 'trades',
            markets: [product]
        }
        const subscribeL2 = {
            op: 'subscribe',
            channel: 'level2',
            markets: [product]
        }

        this.submitMessage(subscribeTrades);
        this.submitMessage(subscribeL2);  
        
        this.subscription.push(product);
    }
    unSubscribe(product)
    {          
        const subscribeTrades = {
            op: 'unsubscribe',
            channel: 'trades',
            markets: [product]
        }
        const subscribeL2 = {
            op: 'unsubscribe',
            channel: 'level2',
            markets: [product]
        }

        this.submitMessage(subscribeTrades);
        this.submitMessage(subscribeL2);  
        
        this.subscription.push(product);
    }
}