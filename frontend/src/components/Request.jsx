import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";

import classes from "./Request.module.css";

function Request(props) {
  return (
    
      <li className={classes.request}>
        <div className={classes.buttons}>
        <Link to={`/update-request/${props.id}`} className={classes.editButton} title="Edit">
          <MdEdit size={22} />
        </Link>
          <Link to={`/confirm/delete/${props.id}`} className={classes.deleteButton} title="Delete">
          <MdDelete size={22} />
        </Link>
        </div>
        <Link to={props.id}>
          <p className={classes.main}><b>Date:</b> {props.dispatchDate}</p>
          <p className={classes.text}><b>From:</b> {props.fromCity}</p>
          <p className={classes.text}><b>To:</b> {props.toCity}</p>
        </Link>
      </li>

     
  );
}

export default Request;
