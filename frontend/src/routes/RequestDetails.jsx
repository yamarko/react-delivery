import { useLoaderData, Link } from "react-router-dom";

import Modal from "../components/Modal";
import classes from "./RequestDetails.module.css";
import apiUrl from "../config/apiConfig";

function RequestDetails() {
  const request = useLoaderData();

  if (!request) {
    return (
      <Modal>
        <main className={classes.details}>
          <h1>Could not find request</h1>
          <p>Unfortunately, the request could not be found.</p>
          <p>
            <Link to=".." className={classes.detailsButton}>Okay</Link>
          </p>
        </main>
      </Modal>
    );
  }
  return (
    <Modal>
      <main className={classes.details}>
        <div className={classes.buttons}>
          <Link to={`/update-request/${request.id}`} className={classes.editButton}>
                    Edit
          </Link>
          <Link to={`/confirm/delete/${request.id}`} className={classes.deleteButton}>
                    Delete
            </Link>
        </div>
        <div lassName={classes.text}>
          <p className={classes.text}><b>Dispatch date: </b>{request.dispatchDate}</p>
          <p className={classes.text}><b>Origin city: </b>{request.fromCity}</p>
          <p className={classes.text}><b>Destination city: </b>{request.toCity}</p>
          <p className={classes.text}><b>Type of parcel: </b>{request.parcelType}</p>
          <p className={classes.text}><b>Parcel description: </b>{request.parcelDescription}</p>
        </div>
      </main>
    </Modal>
  );
}

export default RequestDetails;

export async function loader({ params }) {
  const responce = await fetch(`${apiUrl}/requests/` + params.id);
  const resData = await responce.json();
  return resData;
}
