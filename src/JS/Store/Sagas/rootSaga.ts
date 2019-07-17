import { all, fork } from "redux-saga/effects";
import { initialSagas } from "./initialSaga";
import { researchSagas } from "./researchSaga";

export default function* rootSaga() {
  try {
    yield all([fork(initialSagas), fork(researchSagas)]);
  } catch (e) {
    console.log(e);
  }
}
