/*
 * action types
 */

export const ACTIONS = {    
    GET_PORTFOLIO_HOLDING                 : 'GET_PORTFOLIO_HOLDING'
    ,GET_PORTFOLIO_RETURNS                 : 'GET_PORTFOLIO_RETURNS'
    ,ADD_PORTFOLIO_RETURNS                  :'ADD_PORTFOLIO_RETURNS'
    ,INSERT_ORDER                          : 'INSERT_ORDER'
    ,SAVE_TRANSACTION                       : 'SAVE_TRANSACTION'
    ,CATCHUP_DATA                           : 'CATCHUP_DATA'
	
	//websocket
    ,SET_WEBSOCKET      		            : 'SET_WEBSOCKET'
    ,SET_WEBSOCKET_STATE                    : 'SET_WEBSOCKET_STATE'
    
    //pyth connection
    ,SET_PYTHCONNECTION                     : 'SET_PYTHCONNECTION'
    ,STOP_PYTHCONNECTION                    : 'STOP_PYTHCONNECTION'
    ,START_PYTHCONNECTION                   : 'START_PYTHCONNECTION'
	
    //openbook connection
    ,SET_OPENBOOKCONNECTION                 : 'SET_OPENBOOKCONNECTION'
    ,STOP_OPENBOOKCONNECTION                : 'STOP_OPENBOOKCONNECTION'
    ,START_OPENBOOKCONNECTION               : 'START_OPENBOOKCONNECTION'
    //openbook actions
    ,UPDATE_OPENBOOK_TRADE_DATA             : 'UPDATE_OPENBOOK_TRADE_DATA'
    ,PROCESS_OPENBOOK_PRICE_UPDATES         : 'PROCESS_OPENBOOK_PRICE_UPDATES'
    ,UPDATE_OPENBOOK_RECENT_TRADE_DATA      : 'UPDATE_OPENBOOK_RECENT_TRADE_DATA'
    ,UPDATE_OPENBOOK_SNAPSHOT               : 'UPDATE_OPENBOOK_SNAPSHOT'
    ,OPENBOOK_SUBSCRIBE                     : 'OPENBOOK_SUBSCRIBE'
    ,OPENBOOK_UNSUBSCRIBE                   : 'OPENBOOK_UNSUBSCRIBE'
	
    //zeta                                  

    ,SET_ZETA_MARKET                        : 'SET_ZETA_MARKET'
    ,START_ZETA_MARKET                      : 'START_ZETA_MARKET'
    ,STOP_ZETA_MARKET                       : 'STOP_ZETA_MARKET'
    ,ZETA_OPTIONS                           : 'ZETA_OPTIONS'
    ,UPDATE_ZETA_OPTIONS_MARKET             : 'UPDATE_ZETA_OPTIONS_MARKET'
    
	//admin
	,SET_TAB								:'SET_TAB'
    ,SHOW_SNACK_MESSAGE                     : 'SHOW_SNACK_MESSAGE'
    ,CLOSE_SNACK_MESSAGE                    : 'CLOSE_SNACK_MESSAGE'
	,CLEAR_ORDERS							: 'CLEAR_ORDERS'
	,LOGIN									: 'LOGIN'
	,SET_LOGIN_STATE						: 'SET_LOGIN_STATE'
	,BOUNCE_ALGO							:'BOUNCE_ALGO'
	
	//data
	,UPDATE_BOOK							: 'UPDATE_BOOK'
	,UPDATE_ORDER							: 'UPDATE_ORDER'
	,UPDATE_FILL							: 'UPDATE_FILL'
	,UPDATE_PYTH_PRICE						: 'UPDATE_PYTH_PRICE'
	
	//windows
	,GET_INSTRUMENT_WINDOW					: 'GET_INSTRUMENT_WINDOW'
	,ADD_INSTRUMENT_WINDOW					: 'ADD_INSTRUMENT_WINDOW'
	,REMOVE_INSTRUMENT_WINDOW				: 'REMOVE_INSTRUMENT_WINDOW'
	,GET_OTHER_WINDOW						: 'GET_OTHER_WINDOW'
	,CLOSE_OTHER_WINDOW						: 'CLOSE_OTHER_WINDOW'
	,ADD_WINDOW								: 'ADD_WINDOW'
	,REMOVE_WINDOW							: 'REMOVE_WINDOW'
	,CLEAR_WINDOW							: 'CLEAR_WINDOW'
	,SET_ENV								: 'SET_ENV'
	,GET_SECURITY_DEFINITION				: 'GET_SECURITY_DEFINITION'
	,SAVE_SECURITY_DEFINITION				: 'SAVE_SECURITY_DEFINITION'
 }
 
export const STATUS = {OPEN :'OPEN', CLOSE : 'CLOSE', ERROR :'ERROR'
                       , PENDING: 'PENDING', INITIAL: 'INITIAL', ACTIVE: 'ACTIVE' 
                       , RESET: 'RESET', START:'START', PAUSE: 'PAUSE', STOP: 'STOP'
                       , RESTART: 'RESTART', SAVE: 'SAVE', PERSIST : 'PERSIST', END: 'END'
                       , BLUR: 'BLUR', RESULTS: 'RESULTS'
                       };
export const VARIANT = {INFO :'info', SUCCESS : 'success', ERROR :'error'
                       , WARNING: 'warning'
                       };


                       
export const HANDLER = {WS :'WS', ALL : 'ALL'};
export const SIDE = {BID :1, ASK : 2};

export const TAB = {
	NULLTAB				:'NULLTAB'
	, APPSTORE 			:'APPSTORE'
	, FILLS 			:'FILLS'
	, TRADE 			:'TRADE'
	, ORDERS			:'ORDERS'
	, CANCEL			:'CANCEL'
	, CANCELALL			:'CANCELALL'
	, REPLACE			:'REPLACE'
	, BALANCE			:'BALANCE'
	, ARB				:'ARB'
	, EXCHANGEARB		:'EXCHANGEARB'
	, TA				:'TA'
	, BOUNDEDPROFIT		:'BOUNDEDPROFIT'
	, BUYTOKEN			:'BUYTOKEN'
	, BITCOIN			:'BITCOIN'
	, GAME				:'GAME'
	, GRIDTRADER		:'GRIDTRADER' 
	, FAIRVALUE			:'FAIRVALUE'
	, POSITION			:'POSITION'
	, RESTART_ALGO		:'RESTART_ALGO'
    ,PYTH_PRICE_DATA    :'PYTH_PRICE_DATA'
    ,MARKET             :'MARKET'
	};
export const ORDERTYPE = {MARKET :"MARKET", LIMIT : "LIMIT", STOP_LIMIT: "STOP_LIMIT"};
export const ENV = {PROD :"PROD", DEV : "DEV"};