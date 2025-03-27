import { useLoaderData } from "react-router-dom";

import Request from "./Request";

import classes from "./RequestsList.module.css";

function RequestsList() {
  const requests = useLoaderData();

  return (
    <>
      {requests.length > 0 && (
          <ul className={classes.requests}>
            {requests.map((request) => (
              <Request
                key={request.id}
                id={request.id}
                fromCity={request.fromCity}
                toCity={request.toCity}
                parcelType={request.parcelType}
                dispatchDate={request.dispatchDate}
                parcelDescription={request.parcelDescription}
              />
            ))}
          </ul>
      )}
      {requests.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no requests yet...</h2>
          <p>Start adding some!</p>
        </div>
      )}
    </>
  );
}

export default RequestsList;
