import { call, put, takeLatest, take } from "typed-redux-saga";
import { startFlow, open, close } from "./modalSlice";
import { client } from "./index";
import { EXCHANGE_RATES } from "./App";
function* startFlowSaga() {
  console.log("startFlowSaga");

  yield put(open());
  console.log("waiting for modal to close...");
  yield take(["modal/close"]);

  // Every component that has an `useQuery(EXCHANGE_RATES)` will react and receive the response, no need for manually storing in redux or apollo local state
  // @ts-ignore
  yield client.query({
    query: EXCHANGE_RATES,
  });
}

function* mySaga() {
  yield takeLatest(startFlow, startFlowSaga);
}

export default mySaga;
