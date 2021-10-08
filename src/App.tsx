import { useQuery, gql } from "@apollo/client";
import Modal from "./Modal";
import Observable from "zen-observable";

const EXCHANGE_RATES = gql`
  query FetchExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

export default function App() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

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
