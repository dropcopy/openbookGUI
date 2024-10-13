import {ACTIONS, HANDLER} from './actiontypes'

/*
 * action creators
 */
 
//websocket
export const setwebSocketState = text => ({
  type: ACTIONS.SET_WEBSOCKET_STATE,
  text
})

//pyth connection
export const startPythConnection = text => ({
  type: ACTIONS.START_PYTHCONNECTION,
  text
})

export const stopPythConnection = text => ({
  type: ACTIONS.STOP_PYTHCONNECTION,
  text
})

//openBook data
export const updateOpenBookTradeData = text => ({
  type: ACTIONS.UPDATE_OPENBOOK_TRADE_DATA,
  text
})

export const processOpenBookUpadate = text => ({
  type: ACTIONS.PROCESS_OPENBOOK_PRICE_UPDATES,
  text
})

export const updateOpenBookRecentTradeData = text => ({
  type: ACTIONS.UPDATE_OPENBOOK_RECENT_TRADE_DATA,
  text
})

export const updateOpenBookSnapshot = text => ({
  type: ACTIONS.UPDATE_OPENBOOK_SNAPSHOT,
  text
})

export const openBookProductSubscribe = text => ({
  type: ACTIONS.OPENBOOK_SUBSCRIBE,
  text
})


export const openBookProductUnSubscribe = text => ({
  type: ACTIONS.OPENBOOK_UNSUBSCRIBE,
  text: {symbol: text}
})


//trading
export const sendOrder = text => ({
  type: ACTIONS.SET_TAB,
  handler: HANDLER.WS,
  text
})

export const getSecurityDefinition = text => ({
  type: ACTIONS.GET_SECURITY_DEFINITION,
  handler: HANDLER.WS,
  text
})

export const saveSecurityDefinition = text => ({
  type: ACTIONS.SAVE_SECURITY_DEFINITION,
  text
})

//admin
export const setTab = text => ({
  type: ACTIONS.SET_TAB,
  text
})

//color
export const setColor = text => ({
  type: ACTIONS.SET_COLOR,
  text
})

//orders
export const clearOrders = text => ({
  type: ACTIONS.CLEAR_ORDERS,
  text
})

//portfolio universe
export const insertOrder = text => ({
  type: ACTIONS.INSERT_ORDER,
  handler: HANDLER.WS,
  text
})

export const addReturns = text => ({
  type: ACTIONS.ADD_PORTFOLIO_RETURNS,
  text
})

export const updatePosition = text => ({
  type: ACTIONS.UPDATE_PORTFOLIO_HOLDING,
  text
})

export const updatePositions = text => ({
  type: ACTIONS.UPDATE_PORTFOLIO_HOLDINGS,
  text
})

 export const setPortfolioHolding = text => ({
  type: ACTIONS.SET_PORTFOLIO_HOLDING,
  text
})


 export const saveTransaction = text => (
 {
  type: ACTIONS.SAVE_TRANSACTION,
  text
})

 export const updateBook = text => (
 {
  type: ACTIONS.UPDATE_BOOK,
  text
})
 export const updateOrder = text => (
 {
  type: ACTIONS.UPDATE_ORDER,
  text
})
 export const updateFill = text => (
 {
  type: ACTIONS.UPDATE_FILL,
  text
})
 export const login = text => (
 {
  type: ACTIONS.LOGIN,
  handler: HANDLER.WS,
  text
})

export const addInstrument = text => ({
  type: ACTIONS.ADD_INSTRUMENT_WINDOW,
  text
})

export const closeInstrumentWindow = text => ({
  type: ACTIONS.REMOVE_INSTRUMENT_WINDOW,
  text
})

export const popupWindow = text => ({
  type: ACTIONS.GET_OTHER_WINDOW,
  text
})

export const closeCurrentWindow = text => ({
  type: ACTIONS.CLOSE_OTHER_WINDOW,
  text
})

export const addWindowIndicator = text => ({
  type: ACTIONS.ADD_WINDOW,
  text
})

export const removeWindowIndicator = text => ({
  type: ACTIONS.REMOVE_WINDOW,
  text
})

export const clearWindows = text => ({
  type: ACTIONS.CLEAR_WINDOW,
  text
})

//messages
export const sendMessage = text => ({
  type: ACTIONS.CHANGE_PASSWORD,
  handler: HANDLER.WS,
  text
})


export const bounceAlgo = text => ({
  type: ACTIONS.BOUNCE_ALGO,
  handler: HANDLER.WS,
  text
})

export const updatePythPrice = text => ({
  type: ACTIONS.UPDATE_PYTH_PRICE,
  text
})


//zeta markets
export const updateZetaOptionsMarket = text => ({
  type: ACTIONS.UPDATE_ZETA_OPTIONS_MARKET,
  text
})

