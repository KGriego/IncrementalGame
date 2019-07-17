/* Library Imports */
import { all, fork, takeLatest, put, take, select } from "redux-saga/effects";
/* Redux Imports */
import * as researchConstants from "../Constants/researchConstants";
import * as notifications from "../Module/Notifications";

/* Component Imports */
import { delay } from "../../Utils/helpers";
import { Action } from "../../TypeScriptTypes/types";

function* researchItemSaga(action: Action) {
  try {
    // const state = yield select(state => state);
    yield put({
      type: researchConstants.first_research_success,
      payload: action.payload,
      reducer: "research"
    });
  } catch (e) {
    yield put(notifications.notifyError(`There was an error: Reason: ${e}`));
    console.log(e);
  }
}

function* startWatchingResearch() {
  while (true) {
    take(researchConstants.check_research);
    while (true) {
      try {
        yield delay(1000);
        yield put({
          type: researchConstants.check_research_success,
          reducer: "research"
        });
      } catch (e) {
        yield put(
          notifications.notifyError(`There was an error: Reason: ${e}`)
        );
        console.log(e);
      }
    }
  }
}

function* watchStartWatchingResearch() {
  yield takeLatest(researchConstants.check_research, startWatchingResearch);
}
function* watchResearchItemSaga() {
  yield takeLatest(researchConstants.first_research, researchItemSaga);
}

export function* researchSagas() {
  yield all([fork(watchResearchItemSaga), fork(watchStartWatchingResearch)]);
}
