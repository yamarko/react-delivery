import {
  Link,
  Form,
  useParams,
  useLoaderData,
  redirect,
} from "react-router-dom";
import { useEffect, useState } from "react";

import classes from "./RequestForm.module.css";
import Modal from "../components/Modal";
import apiUrl from "../config/apiConfig";

function RequestForm({ method }) {
  const { id } = useParams();
  const requestData = useLoaderData();

  const [formData, setFormData] = useState({
    fromCity: "",
    toCity: "",
    parcelType: "",
    dispatchDate: "",
    parcelDescription: "",
  });

  useEffect(() => {
    if (method === "PATCH" && requestData) {
      setFormData({
        fromCity: requestData.fromCity,
        toCity: requestData.toCity,
        parcelType: requestData.parcelType,
        dispatchDate: requestData.dispatchDate.split(".").reverse().join("-"),
        parcelDescription: requestData.parcelDescription,
      });
    }
  }, [method, requestData]);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Modal>
      <Form method={method} className={classes.form}>
        <p>
          <label htmlFor="fromCity">City of departure</label>
          <input
            type="text"
            id="fromCity"
            name="fromCity"
            required
            defaultValue={formData.fromCity}
          />
        </p>

        <p>
          <label htmlFor="toCity">City of destination</label>
          <input
            type="text"
            id="toCity"
            name="toCity"
            required
            defaultValue={formData.toCity}
          />
        </p>

        <p>
          <label htmlFor="parcelType">Parcel type</label>
          <select
            id="parcelType"
            name="parcelType"
            required
            value={formData.parcelType}
            onChange={handleChange}
          >
            <option value="">Select type</option>
            <option value="Gadgets">Gadgets</option>
            <option value="Drinks">Drinks</option>
            <option value="Clothes">Clothes</option>
            <option value="Medicines">Medicines</option>
            <option value="Other">Other</option>
          </select>
        </p>

        <p>
          <label htmlFor="dispatchDate">Dispatch date</label>
          <input
            type="date"
            id="dispatchDate"
            name="dispatchDate"
            required
            defaultValue={formData.dispatchDate}
            min={getCurrentDate()}
          />
        </p>

        <p>
          <label htmlFor="parcelDescription">Parcel description</label>
          <textarea
            id="parcelDescription"
            name="parcelDescription"
            required
            rows={3}
            defaultValue={formData.parcelDescription}
          />
        </p>

        <p className={classes.actions}>
          <Link to=".." type="button">
            Cancel
          </Link>
          <button>{method === "PATCH" ? "Update" : "Submit"}</button>
        </p>
      </Form>
    </Modal>
  );
}

export default RequestForm;

export async function action({ request, params }) {
  const formData = await request.formData();
  const requestData = Object.fromEntries(formData);

  if (requestData.dispatchDate) {
    const [year, month, day] = requestData.dispatchDate.split("-");
    requestData.dispatchDate = `${day}.${month}.${year}`;
  }

  const url = params.id
    ? `${apiUrl}/requests/${params.id}`
    : `${apiUrl}/requests/`;

  const method = params.id ? "PATCH" : "POST";

  await fetch(url, {
    method,
    body: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return redirect("/");
}

export async function loader({ params }) {
  if (!params.id) return null;

  const response = await fetch(`${apiUrl}/requests/${params.id}`);
  if (!response.ok) {
    throw new Response("Request not found", { status: 404 });
  }

  return response.json();
}
