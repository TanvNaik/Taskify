import "./App.css";
import TaskList from "./Components/TaskList";
import { Link } from "react-router-dom";

function Base({children}) {
  
//  TODO:give attribution to flatiocon<a href="https://www.flaticon.com/free-icons/foursquare-check-in" title="foursquare check in icons">Foursquare check in icons created by hqrloveq - Flaticon</a>
  return (
    <div className="App w-100 ">
      {/* Header Section */}
      <header>
        <div className="container heading d-flex  align-items-end justify-content-between mt-2 ">
          <div className="app-name">
            <h1 className="text-primary">Taskify</h1>
          </div>
          <div className="text-secondary-emphasis slogan">
            <i><h5>&nbsp;&nbsp;Your Gateway to Productivity...</h5></i>
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
          &nbsp; &nbsp;
          <Link to={"/edit-task"}>
            <button className="btn btn-sm btn-outline-secondary" type="button">
              Edit a Task
            </button>
          </Link>
        </form>
      </nav>

      <div className="children">
      {children}

      </div>
    </div>
  );
}

export default Base;
