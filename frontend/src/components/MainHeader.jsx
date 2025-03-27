import { Link } from "react-router-dom";
import { MdLocalShipping, MdAddBox } from "react-icons/md";

import classes from "./MainHeader.module.css";

function MainHeader() {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <MdLocalShipping />
        React Delivery
      </h1>
      <p>
        <Link to="/create-request" className={classes.button}>
          <MdAddBox size={20} />
          New Request
        </Link>
      </p>
    </header>
  );
}

export default MainHeader;
