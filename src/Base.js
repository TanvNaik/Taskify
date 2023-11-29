import "./App.css";
import { Link } from "react-router-dom";

// This is the base template for all the Components
function Base({ children }) {
  return (
    <div className="App w-100 ">
      {/* Header */}
      <header>
        <div className="container heading d-flex  align-items-end justify-content-between mt-2 ">
          <div className="app-name">
            <Link to="/" style={{ textDecoration: "none" }}>
              <h1 className="text-primary">Taskify</h1>
            </Link>
          </div>
          <div className="text-secondary-emphasis slogan">
            <i>
              <h5>&nbsp;&nbsp;Your Gateway to Productivity...</h5>
            </i>
          </div>
        </div>
      </header>
      <hr />

      {/* Navbar */}

      <nav className="navbar ">
        <form className="container justify-content-end">
          <Link to={"/add-task"}>
            <button className="btn btn-sm btn-outline-primary" type="button">
              Add new Task
            </button>{" "}
          </Link>
        </form>
      </nav>

      {/* Child components */}
      <div className="children">{children}</div>
    </div>
  );
}

export default Base;
