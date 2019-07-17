import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleWare from "redux-saga";

import { rootReducer } from "./Reducer/rootReducer";
import rootSaga from "./Sagas";

export default function configureStore() {
  const sagaMiddleWare = createSagaMiddleWare();
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleWare),
      (<any>Window).__REDUX_DEVTOOLS_EXTENSION__
        ? (<any>Window).__REDUX_DEVTOOLS_EXTENSION__()
        : (f: any) => f
    )
  );
  sagaMiddleWare.run(rootSaga);
  return store;
}
