import { Outlet } from "react-router-dom";

import RequestsList from "../components/RequestsList";
import apiUrl from "../config/apiConfig";

function Requests() {
  return (
    <>
      <Outlet />
      <main>
        <RequestsList />
      </main>
    </>
  );
}

export default Requests;

export async function loader() {
  const response = await fetch(`${apiUrl}/requests`);
  const resData = await response.json();

  return resData;
}
