import { useParams, Link, Form, redirect } from "react-router-dom";
import classes from "./Confirmation.module.css";
import Modal from "../components/Modal";
import apiUrl from "../config/apiConfig";

function Confirmation() {
  const { action } = useParams();

  return (
    <Modal>
      <div className={classes.confirmation}>
        <h2>Are you sure you want to {action} this item?</h2>
        <div className={classes.actions}>
          <Link to=".." type="button" className={classes.cancelButton}>
            Cancel
          </Link>
          {action === "delete" && (
            <Form method="POST">
              <button className={classes.confirmButton} type="submit">
                Confirm
              </button>
            </Form>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default Confirmation;

export async function action({ params }) {
  const { id } = params;

  try {
    const response = await fetch(`${apiUrl}/requests/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete item");
    }

    console.log(`Item with ID: ${id} deleted`);
    return redirect("/");
  } catch (error) {
    console.error("Error deleting item:", error);
    return redirect("/");
  }
}