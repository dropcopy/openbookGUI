import {STATUS, HANDLER} from './actions/actiontypes'

function createLTFThunkMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    if (action.handler === HANDLER.WS) {
        const wsocket = getState().wsocket;
        if (wsocket.wsstate === STATUS.OPEN)
        {
            return wsocket.con.submitMessage(action.text);
        }
        else
        {
            console.log("error sending request to websocket. webscocket status is: "+wsocket.wsstate);
        }
        return;
    }
    else if (action.handler === HANDLER.ALL) {
        const wsocket = getState().wsocket;
        if (wsocket.wsstate === STATUS.OPEN)
        {
            wsocket.con.submitMessage(action.text);
        }
        else
        {
            console.log("error sending request to websocket. webscocket status is: "+wsocket.wsstate);
        }
    }
    return next(action);
  };
}

const levelThunker = createLTFThunkMiddleware();

export default levelThunker;