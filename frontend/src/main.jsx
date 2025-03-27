import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Requests, { loader as requestsLoader } from "./routes/Requests.jsx";

import RequestDetails, {
  loader as requestDetailsLoader,
} from "./routes/RequestDetails.jsx";

import "./index.css";

import RequestForm, {
  action as requestFormAction,
  loader as requestLoader,
} from "./routes/RequestForm.jsx";

import RootLayout from "./routes/RootLayout.jsx";

import Confirmation, {
  action as confirmationAction,
} from "./routes/Confirmation.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Requests />,
        loader: requestsLoader,
        children: [
          {
            path: "/create-request",
            element: <RequestForm method="POST" />,
            action: requestFormAction,
          },
          {
            path: "/update-request/:id",
            element: <RequestForm method="PATCH" />,
            action: requestFormAction,
            loader: requestLoader,
          },
          {
            path: ":id",
            element: <RequestDetails />,
            loader: requestDetailsLoader,
          },
          {
            path: "confirm/:action/:id",
            element: <Confirmation />,
            action: confirmationAction,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
