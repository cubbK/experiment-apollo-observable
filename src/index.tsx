import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  from,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
});

const roundTripLink = new ApolloLink((operation, forward) => {
  // Called before operation is sent to server
  if (operation.operationName === "FetchExchangeRates") {
    console.log("true");
    // forward(operation).subscribe((x) => console.log("asdasd"));
    return forward(operation);
  }

  return forward(operation);
});

const client = new ApolloClient({
  link: from([roundTripLink, httpLink]),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
