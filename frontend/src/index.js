import { createRoot } from "react-dom/client";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const root = createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-lr5q32s3qpq4c4ah.us.auth0.com"
    clientId="vN72Fx4HQ1b5P0v0TzZsiOcc0UWikGFH"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);
