import { useEffect } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import * as ModalSlice from "./modalSlice";
import { usePrevious } from "react-use";
const EXCHANGE_RATES = gql`
  query FetchExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

const useFetchExchangeRates = () => {
  const [fetchExchangeRates, { loading, error, data }] =
    useLazyQuery(EXCHANGE_RATES);
  const dispatch = useDispatch();
  // @ts-ignore
  const modalState = useSelector((state) => state.modal.value);
  const prevModalState = usePrevious(modalState);

  useEffect(() => {
    dispatch(ModalSlice.open());
  }, [dispatch]);

  useEffect(() => {
    if (modalState === "CLOSED" && prevModalState === "OPEN") {
      fetchExchangeRates();
    }
  }, [modalState]);

  return { loading, error, data };
};

export default function App() {
  const { loading, error, data } = useFetchExchangeRates();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log({ data });
  return (
    <>
      <div>App</div>
      <Modal />
    </>
  );
}
