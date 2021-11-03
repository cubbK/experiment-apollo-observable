import React, { useEffect } from "react";
import * as Redux from "react-redux";
import { useQuery, gql } from "@apollo/client";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import * as ModalSlice from "./modalSlice";
import { Observable } from "rxjs";
import { useObservableState } from "observable-hooks";
import { listenerCount } from "process";
import { client } from "./index";
const EXCHANGE_RATES = gql`
  query FetchExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;
const observable$ = (store: any) =>
  new Observable((obs) => {
    console.log(store);
    // @ts-ignore wdawd
    store.subscribe(() => {
      const action = store.getState().currentAction;
      console.log(action);
      if (action === "modal/close") {
        client.query({
          query: EXCHANGE_RATES,
        });
      }
    });
  });
export default function App() {
  const store = Redux.useStore();
  const output = useObservableState(observable$(store), "hellp");
  const { data } = useQuery(EXCHANGE_RATES, { fetchPolicy: "cache-only" });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ModalSlice.open());
  }, [dispatch]);
  console.log({ data });
  return (
    <>
      <div>App</div>
      <Modal />
    </>
  );
}
