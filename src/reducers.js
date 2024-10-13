import { combineReducers } from 'redux';
import {ACTIONS, STATUS, TAB} from './actions/actiontypes';
import _ from "lodash";
const dataStore = {
    orders: []
	,position: {
		pl:[]
		,fills: []
		,secMultiplier:{}
		,processedExecID: new Set()
	}
    ,transactions: []
	,market:{}
	,lastmarketupdate:{}
	,instrument:{
		currentKey:1
		,currentKeyName:1
		,data:{}
		}
	,balance:[]
    ,openBookConnector: 
    {
        started: false
        ,openBookSocket: null
		,env: {
			devnet: 'wss://api.openBook-vial.dev/v1/ws'
			,mainnet: 'https://dropcopy.io/feed'
		}
    }    
	,openBookbook:{}
    ,openBookTS: {}
};

function instrument(state = dataStore.instrument, action) 
{    
  switch (action.type) 
  {
    case ACTIONS.ADD_INSTRUMENT_WINDOW:
			let newKey1 = state.currentKey+1;
			let currentKeyName = newKey1 + action.text
			let newInstruments = {...state
								,currentKey:newKey1
								,currentKeyName : currentKeyName}
            newInstruments.data[currentKeyName] = {
				windowName :action.text
				,windowKey :currentKeyName
				};
			return newInstruments;
    case ACTIONS.REMOVE_INSTRUMENT_WINDOW:
			let newInstrumentsr = {...state};
			delete newInstrumentsr.data[action.text]	
			return newInstrumentsr;
    default:
      return state;
  }
}

function openBookConnector(state = dataStore.openBookConnector, action) 
{     
  switch (action.type) 
  {
    case ACTIONS.SET_OPENBOOKCONNECTION:
    console.log("SET_OPENBOOKCONNECTION "+JSON.stringify(action));
      return Object.assign({}, state, 
                {started: true, openBookSocket: action.openBookSocket}
            );
    case ACTIONS.START_OPENBOOKCONNECTION:
    
        //don't start mutiple times
        if (state.started)
        {
            return state;
        }
        state.openBookSocket.start(state.env.mainnet);
        return Object.assign({}, state, {
            started: true
            })
    case ACTIONS.STOP_OPENBOOKCONNECTION:
    
        //already stopped?
        if (!state.started)
        {
            return state;
        }
      state.openBookSocket.stop();
      return Object.assign({}, state, {
            started: true
            })
    case ACTIONS.OPENBOOK_SUBSCRIBE:
    
        //if socket is open
        if (state.started)
        {
            console.log("subscribidddddddng to "+action.text);
            state.openBookSocket.subscribe(action.text);
        }
        console.log("openBookSocket socket state "+state.started);
        return state;
    case ACTIONS.OPENBOOK_UNSUBSCRIBE:
    
        //if socket is open
        if (state.started)
        {
            console.log("unsubscribing to "+action.text);
            state.openBookSocket.unSubscribe(action.text);
        }
        console.log("openBookSocket socket state "+state.started);
        return state;
    default:
      return state;
  }
}

function market(state = dataStore.market, action) 
{     
  switch (action.type) 
  {
    case ACTIONS.UPDATE_BOOK:
		let newData = {...state};
		newData[action.text.securityuid] = [...action.text.bids, ...action.text.asks]
      return newData;
    case ACTIONS.CLEAR_ORDERS:
	return {};
    default:
      return state;
  }
}

function lastmarketupdate(state = dataStore.lastmarketupdate, action) 
{     
  switch (action.type) 
  {
    case ACTIONS.UPDATE_BOOK:
		let newData = {};
		newData[action.text.securityuid] = [...action.text.bids, ...action.text.asks]
      return newData;
    default:
      return state;
  }
}

function orders(state = dataStore.orders, action) 
{     
  switch (action.type) 
  {
    case ACTIONS.UPDATE_ORDER:
		let newData = state.filter(record=>record.OrderID !== action.text.info.OrderID);
		newData.push(action.text.info);
		return newData;
    case ACTIONS.CLEAR_ORDERS:
		return [];
    default:
      return state;
  }
}

function position(state = dataStore.position, action) 
{     
  switch (action.type) 
  {
    case ACTIONS.UPDATE_FILL:
		let fill = action.text.info;
		if (state.processedExecID.has(fill.ExchID))
		{
			return state;
		}
		let newData = _.cloneDeep(state); //deep 
		newData.processedExecID.add(fill.ExchID);
		let fQty = parseFloat(fill.fQty);
		let priceFilled = parseFloat(fill.PriceFilled);
		let fposition = newData.pl.filter(postn => postn.Instrument === fill.Instrument);
		if (fposition.length > 0)
		{
			let otherposition = newData.pl.filter(opostn => opostn.Instrument !== fill.Instrument);
			let oldposition = fposition[0];
			if (fill.Side === "Buy")
			{
				 oldposition.bought = oldposition.bought + fQty;
				 oldposition.boughtcost = oldposition.boughtcost + (fQty * priceFilled);
				 oldposition.avgbuyprice = (oldposition.boughtcost/oldposition.bought);
			} 
			else
			{
				 oldposition.sold = oldposition.sold + fQty;
				 oldposition.soldcost = oldposition.soldcost + (fQty * priceFilled);
				 oldposition.avgsellprice = (oldposition.soldcost/oldposition.sold);
			}
			oldposition.position = oldposition.bought - oldposition.sold;
			let realizeqty = Math.min(oldposition.bought, oldposition.sold);
			oldposition.realizedpl = realizeqty*(oldposition.avgsellprice - oldposition.avgbuyprice) * newData.secMultiplier[oldposition.Instrument];
			let unrealizedpl = 0
			if (oldposition.position > 0.000000001)
			{
				console.log("Long position = "+oldposition.position);
				oldposition.side = "Long";
				unrealizedpl = Math.abs(oldposition.position)*(priceFilled  - oldposition.avgbuyprice) * newData.secMultiplier[oldposition.Instrument];
			}
			else if (oldposition.position < -0.000000001)
			{
				console.log("Short position = "+oldposition.position);
				oldposition.side = "Short";
				unrealizedpl = Math.abs(oldposition.position)*(oldposition.avgsellprice - priceFilled) * newData.secMultiplier[oldposition.Instrument];
			}
			if ((-0.000000001 < oldposition.position) &&  (oldposition.position< 0.000000001))
			{
				console.log("Flat position = "+oldposition.position);
				oldposition.side = "Flat";
			}
			oldposition.totalpl = oldposition.realizedpl + unrealizedpl;
			otherposition.push(oldposition);
			newData.pl = otherposition;
		}
		else
		{
			let position = {};
			position.Instrument = fill.Instrument;
			position.InstrumentID = fill.Instrument;
			position.side = fill.Side === "Buy" ? "Long" : "Short";
			position.unrealizedpl = 0;
			position.realizedpl = 0;
			position.totalpl = 0;
			position.multiplier = newData.secMultiplier[fill.Instrument];
			if (fill.Side === "Buy")
			{
				 position.bought = fQty;
				 position.boughtcost = fQty * priceFilled;
				 position.avgbuyprice = priceFilled;
				 position.sold = 0;
				 position.soldcost = 0;
				 position.avgsellprice = 0;
			}
			else
			{
				 position.sold = fQty;
				 position.soldcost = fQty * priceFilled;
				 position.avgsellprice = priceFilled;
				 position.bought = 0;
				 position.boughtcost = 0;
				 position.avgbuyprice = 0;
			}
			position.position = position.bought - position.sold;
			newData.pl.push(position);
		}
		let otherfills = newData.fills.filter(ofill => ofill.OrderID !== fill.OrderID);
		otherfills.push(fill);
		newData.fills = otherfills;
		return newData;
    case ACTIONS.UPDATE_BOOK:
		let newData1 = {...state};
		let oposition = newData1.pl.filter(postn => postn.Instrument === action.text.securityuid);
		if (oposition.length > 0)
		{
			let position = oposition[0];
			if (position.position !== 0)
			{
				let ibid = action.text.bids.length > 0 ? action.text.bids[0].price : NaN;
				let iask = action.text.asks.length > 0 ? action.text.asks[0].price : ibid;
				if (isNaN(ibid))
				{
					ibid = iask;
				}
				
				//check again in case iask was also NaN
				if (!isNaN(ibid))
				{
					let midPrice = (ibid+iask)/2;
					let referencePrice = position.position > 0 ? (midPrice - position.avgbuyprice) : (position.avgsellprice - midPrice);
					position.totalpl = position.realizedpl + (Math.abs(position.position)*referencePrice* newData1.secMultiplier[position.Instrument]);
					
					let otherPosition = newData1.pl.filter(opostn => opostn.Instrument !== action.text.securityuid);
					otherPosition.push(position);
					newData1.pl = otherPosition;
					return newData1;					
				}
			}
		}
      return state;
    case ACTIONS.CLEAR_ORDERS:
		return [];
    case ACTIONS.SAVE_SECURITY_DEFINITION:
		let newData2 = {...state};
		for (const sec of action.text)
		{
			let mult = sec.contractmultiplier === 0 ? 1 : sec.contractmultiplier;
			newData2.secMultiplier[sec.symbol] = mult;
		}
		return newData2;
    default:
      return state;
  }
}

function balance(state = dataStore.balance, action) 
{     
  switch (action.type) 
  {
    case ACTIONS.UPDATE_ORDER:
    case ACTIONS.UPDATE_FILL:
		if (action.text.info.hasOwnProperty("availablebalance"))
		{
			///let options= { style: 'currency', currency: 'USD' };
			let numberFormat = new Intl.NumberFormat('en-US');
			let newState = [...state];
			action.text.info.availablebalance.forEach(bal=>{
				let record = newState.find(remBem=>remBem.currency === bal.currency);
				if (record !== undefined)
				{
					newState = newState.filter(remBem=>remBem.currency !== bal.currency);
					record = {...record,...bal};
				}
				else
				{
					record = bal;
				}
				let tag = action.text.info.Instrument.indexOf("/") !== -1 ? "SPOTBalance" : "FUTBalance";
				record[tag] = numberFormat.format(parseFloat(bal.balance));
				newState.push(record);
			});
			return newState;
		}
		return state;
    case ACTIONS.CLEAR_ORDERS:
		return [];
    default:
      return state;
  }
}

function formatNumber(price)
{
    const precision = 1000000;
    let data = {
        price: parseInt(Math.round(parseFloat(price.price) * precision)) / precision
        ,twap: parseInt(Math.round(parseFloat(price.twap.value) * precision)) / precision
        ,confidence: parseInt(Math.round(parseFloat(price.confidence) * precision)) / precision
    };
    console.log("data = "+price.status);
    return data;
}

function openBookbook(state = dataStore.openBookbook, action) 
{     
  switch (action.type) 
  {
    case ACTIONS.PROCESS_OPENBOOK_PRICE_UPDATES:
		let newUData = {...state};
        let newPriceData = action.text;
        
		newPriceData.bids.forEach((data)=>{
            let price = data[0];
            let qty = data[1];
            let zeroQty = parseFloat(qty);
            if (!(zeroQty < 0.00000001 && zeroQty >-0.00000001))
            {
                newUData.bidsMap[price] = qty;
            }
            else
            {
                //console.log("remove price from bid = "+price);
                delete newUData.bidsMap[price];
            }
        });
		newPriceData.asks.forEach((data)=>{
            let price = data[0];
            let qty = data[1];
            let zeroQty = parseFloat(qty);
            if (!(zeroQty < 0.00000001 && zeroQty >-0.00000001))
            {
                newUData.asksMap[price] = qty;
            }
            else
            {
                //console.log("remove price from ask = "+price);
                delete newUData.asksMap[price];
            }
        });
        let asks = Object.keys(newUData.asksMap).sort((a,b)=>{return a - b});
        for (let i = 0; i < asks.length; ++i)
        {
            if (i === 20)
            {
                break;
            }
            const price = asks[i];
            newUData.asks.push([parseFloat(price), parseFloat(newUData.asksMap[price])]);
            //console.log(i+" new ask in book = "+JSON.stringify({price:parseFloat(asks[i]), aqty: newUData.asks[asks[i]]}));
        }
        let bids = Object.keys(newUData.bidsMap).sort((a,b)=>{return b - a});
        for (let i = 0; i < bids.length; ++i)
        {
            if (i === 20)
            {
                break;
            }
            const price = bids[i];
            newUData.bids.push([parseFloat(price), parseFloat(newUData.bidsMap[price])]);
            //console.log(i+" new bid in book = "+JSON.stringify({price:parseFloat(bids[i]), bqty: newUData.bids[bids[i]]}));
        }           
        return newUData;
    case ACTIONS.UPDATE_OPENBOOK_SNAPSHOT:
		let newSData = {...state};
        let newSPriceData = action.text; 
        newSData ={bidsMap:{}, asksMap:{}, bids:[], asks:[]};
        
		for (let i =0; i< newSPriceData.bids.length; ++i)
        {
            let bid = newSPriceData.bids[i];
            let price = bid[0];
            let qty = bid[1];
            newSData.bidsMap[price] = qty;
        }
        
		for (let i =0; i< newSPriceData.asks.length; ++i)
        {
            let ask = newSPriceData.asks[i];
            let price = ask[0];
            let qty = ask[1];
            newSData.asksMap[price] = qty;
        }
        
        let sasks = Object.keys(newSData.asksMap);
        for (let i = 0; i < sasks.length; ++i)
        {
            if (i === 20)
            {
                break;
            }
            const price = sasks[i];
            newSData.asks.push([parseFloat(price), parseFloat(newSData.asksMap[price])]);
           // console.log(i+" new snapshot in book = "+JSON.stringify({price:parseFloat(sasks[i]), aqty: newSData.asks[sasks[i]]}));
        }
        let sbids = Object.keys(newSData.bidsMap);
        for (let i = 0; i < sbids.length; ++i)
        {
            if (i === 20)
            {
                break;
            }
            const price = sbids[i];
            newSData.bids.push([parseFloat(price), parseFloat(newSData.bidsMap[price])]);
            //console.log(i+" snapshot bid in book = "+JSON.stringify({price:parseFloat(sbids[i]), bqty: newSData.bids[sbids[i]]}));
        }           
        
        
        console.log("UPDATE_OPENBOOK_SNAPSHOT ALL!!!! = "+JSON.stringify(newSData));
        return newSData;
    case ACTIONS.OPENBOOK_SUBSCRIBE:
        if (state.hasOwnProperty(action.text))
        {
            return state;
        }
		let newPData = {...state};
        newPData[action.text] ={bids:{}, asks:{}, book:[]};
        return newPData;
    
    default:
      return state;
  }
}

function openBookTS(state = dataStore.openBookTS, action) 
{     
  switch (action.type) 
  {
    case ACTIONS.UPDATE_OPENBOOK_TRADE_DATA:
		let newTData = {...state};
        let newTPriceData = action.text;    
        newTData[newTPriceData.market].push(newTPriceData);
        return newTData;
    case ACTIONS.UPDATE_OPENBOOK_RECENT_TRADE_DATA:
		let newRData = {...state};
        let newRPriceData = action.text;
        newRData[newRPriceData.market] = newRPriceData.trades;
        return newRData;
    default:
      return state;
  }
}



const rootReducer = combineReducers({
   orders
  ,market
  ,balance
  ,instrument
  ,position
  ,lastmarketupdate
  ,openBookConnector
  ,openBookbook
  ,openBookTS
})

export default rootReducer;
