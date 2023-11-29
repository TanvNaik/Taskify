import React from "react";
import Base from "../Base";
import { Link, useLocation } from "react-router-dom";

export default function ViewTask() {
  let { state } = useLocation();
  let task = state.task;

  return (
    <Base>
      <div className="container">
        <Link to={"/"}>
          <button type="button" class="btn btn-outline-secondary">
            Go Back
          </button>
        </Link>
        <br />
        <br />
        <form>
          <div className="mb-3">
            <label htmlFor="taskName" className="form-label">
              Task Name
            </label>
            <input
              type="text"
              value={task.name}
              name="name"
              disabled
              className="form-control"
              id="taskName"
            />
          </div>
          <div className="mb-3">
            <div className="form-floating">
              <textarea
                className="form-control"
                value={task.description}
                name="description"
                disabled
                id="floatingTextarea"
              ></textarea>
              <label htmlFor="floatingTextarea">Task Description</label>
            </div>
          </div>
          <div className="mb-3">
            <div className="form-floating">
              <select
                className="form-select"
                value={task.priority}
                name="priority"
                disabled
                id="floatingSelect"
                aria-label="Floating label select example"
              >
                <option value="2" selected>
                  Low
                </option>
                <option value="1">Medium</option>
                <option value="0">High</option>
              </select>
              <label htmlFor="floatingSelect">Set Priority</label>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="taskName" className="form-label">
              Task Status
            </label>
            <input
              type="text"
              value={task.status ? "Completed" : "Pending"}
              name="name"
              className="form-control"
              id="taskName"
            />
          </div>
        </form>
      </div>
    </Base>
  );
}
