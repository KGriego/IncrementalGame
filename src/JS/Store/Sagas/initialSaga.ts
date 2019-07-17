/* Library Imports */
import { all, fork, takeLatest, put, take } from "redux-saga/effects";

import * as initialConstants from "../Constants/initialConstants";
import * as notifications from "../Module/Notifications";
import { delay } from "../../Utils/helpers";
import { Action } from "../../TypeScriptTypes/types";

function* addItemOneSaga() {
  try {
    yield put({ type: initialConstants.add_item_success, reducer: "initial" });
  } catch (e) {
    yield put(notifications.notifyError(`There was an error: Reason: ${e}`));
    console.log(e);
  }
}

function* refineItemOneSaga(action: Action) {
  try {
    yield put({
      type: initialConstants.refine_item_success,
      payload: action.payload,
      reducer: "initial"
    });
  } catch (e) {
    yield put(notifications.notifyError(`There was an error: Reason: ${e}`));
    console.log(e);
  }
}

function* addBuildingOneSaga(action: Action) {
  try {
    yield put({
      type: initialConstants.add_building_success,
      payload: action.payload,
      reducer: "initial"
    });
  } catch (e) {
    yield put(notifications.notifyError(`There was an error: Reason: ${e}`));
    console.log(e);
  }
}

function* startTickingSaga() {
  while (true) {
    take(initialConstants.start_ticking);
    while (true) {
      try {
        yield delay(1100);
        yield put({ type: initialConstants.ticking, reducer: "initial" });
      } catch (e) {
        yield put(
          notifications.notifyError(`There was an error: Reason: ${e}`)
        );
        console.log(e);
      }
    }
  }
}

function* watchStartTickingSaga() {
  yield takeLatest(initialConstants.start_ticking, startTickingSaga);
}
function* watchItemOneSaga() {
  yield takeLatest(initialConstants.add_item, addItemOneSaga);
}
function* watchRefineItemOneSaga() {
  yield takeLatest(initialConstants.refine_item, refineItemOneSaga);
}
function* watchBuildingOneSaga() {
  yield takeLatest(initialConstants.add_building, addBuildingOneSaga);
}

export function* initialSagas() {
  yield all([
    fork(watchItemOneSaga),
    fork(watchBuildingOneSaga),
    fork(watchStartTickingSaga),
    fork(watchRefineItemOneSaga)
  ]);
}
