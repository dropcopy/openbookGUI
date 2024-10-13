import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
//import monitorReducersEnhancer from './enhancers/monitorReducers'
import loggerMiddleware from './middleware/logger'
import rootReducer from './reducers'

//LTF middleware for websocket
import levelThunker from './levelThunker';
import subscribeManager from './middleware/subscribeManager';

export type RootState = ReturnType<typeof rootReducer>;
export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, thunkMiddleware, levelThunker];
  //const middlewares = [thunkMiddleware, levelThunker];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  //const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  return store
}
