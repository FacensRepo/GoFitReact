import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { TokenProvider } from "./hooks/useToken";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const apiUrl = import.meta.env.VITE_API_URL;

const httpLink = createHttpLink({
  uri: `${apiUrl}/gql`,
});

const authLink = setContext(() => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TokenProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </TokenProvider>
  </StrictMode>
);
