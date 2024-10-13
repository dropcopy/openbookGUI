import {ACTIONS} from '../actions/actiontypes'

function createSubscribeManagerMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    if (action.type === ACTIONS.OPENBOOK_SUBSCRIBE) {
        const subscribe = getState().subscribe;
        let udata = action.text;                
                console.debug(`ddsds`);
        if (udata.hasOwnProperty("symbol"))
        {
            let symbol = udata.symbol;
            if (!subscribe.hasOwnProperty(symbol))
            {
                console.debug(`first subscribe for ${symbol}`);
                const wsocket = getState().wsocket;
                wsocket.con.submitMessage(udata);
            }
            else
            {                
                console.debug(`already subscribed to ${symbol}`);
            }
        }
    }
    else if (action.type === ACTIONS.OPENBOOK_UNSUBSCRIBE) {
        const subscribe = getState().subscribe;
        let udata = action.text;
        if (udata.hasOwnProperty("symbol"))
        {
            let symbol = udata.symbol;
            if (subscribe.hasOwnProperty(symbol))
            {
                //send unsubscribe if its the last one
                if (subscribe[symbol] === 1)
                {
                console.debug(`last unsubscribe for ${symbol}`);
                    const wsocket = getState().wsocket;
                    wsocket.con.submitMessage(udata);
                }
            }
            else
            {                
                console.debug(`already unsubscribed to ${symbol}`);
            }
        }
    }
    return next(action);
  };
}

const subscribeManager = createSubscribeManagerMiddleware();

export default subscribeManager;