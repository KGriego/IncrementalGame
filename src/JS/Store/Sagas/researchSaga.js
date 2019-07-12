/* Library Imports */
import { all, fork, takeLatest, put, take, select } from "redux-saga/effects";
/* Redux Imports */
import * as researchConstants from "../Constants/researchConstants";
import * as notifications from "../Module/Notifications";

/* Component Imports */
import { delay } from "../../Utils/helpers";

function* researchItemSaga(action) {
  try {
    // const state = yield select(state => state);
    yield put({
      type: researchConstants.first_research_success,
      payload: action.payload
    });
  } catch (e) {
    yield put(notifications.notifyError(`There was an error: Reason: ${e}`));
    console.log(e);
  }
}

function* watchResearchItemSaga() {
  yield takeLatest(researchConstants.first_research, researchItemSaga);
}

export function* researchSagas() {
  yield all([fork(watchResearchItemSaga)]);
}
