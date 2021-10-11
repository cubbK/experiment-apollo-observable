import { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import * as ModalSlice from "./modalSlice";

export const EXCHANGE_RATES = gql`
  query FetchExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

export default function App() {
  const { data, loading, error } = useQuery(EXCHANGE_RATES, {
    fetchPolicy: "cache-only", // the actual fetching is done in the saga, this is more like a `useSelector`
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ModalSlice.startFlow());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <div>App</div>
      <Modal />
      {data &&
        data.rates.map(({ currency, rate }: any) => (
          <div key={currency}>
            {currency}: {rate}
          </div>
        ))}
    </>
  );
}
