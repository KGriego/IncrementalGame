import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleWare from "redux-saga";

import rootReducer from "./Reducer";
import rootSaga from "./Sagas";

export default function configureStore() {
  const sagaMiddleWare = createSagaMiddleWare();
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleWare),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
  );
  sagaMiddleWare.run(rootSaga);
  return store;
}
