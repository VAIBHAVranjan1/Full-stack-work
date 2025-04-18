import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { UserContextProvider } from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

React.startTransition(() => {
  root.render(
    <UserContextProvider>
      <App />
    </UserContextProvider>);
});
