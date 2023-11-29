import React, { useState } from "react";
import Base from "../Base";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddTask() {

  // Structure of a task object
        // Priority:
        // High = 0
        // Medium = 1
        // Low = 2

        // Status
        // False = Pending
        // True = Completed
        
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    priority: 2,
    status: false,
  });
  const [error, setError] = useState(false);

  const { name, description, priority } = newTask;

  const handleChange = (name) => (event) => {
    if(name === "priority"){
      let val = parseInt(event.target.value)
      return setNewTask({ ...newTask, priority: val });
    }
    setNewTask({ ...newTask, [name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || description === "") {
      return setError(true);
    }
    setError(false);

    let taskList = JSON.parse(localStorage.getItem("taskify-tasks"));

    if (taskList === null) {
      localStorage.setItem("taskify-tasks", JSON.stringify([newTask]));
    } else {

      taskList.push(newTask);
      taskList.sort((a, b) => b.priority - a.priority);
      taskList.reverse()
      localStorage.setItem("taskify-tasks", JSON.stringify(taskList));
    }
    successMessage()
    setNewTask({
      name: "",
      description: "",
      priority: 2,
      status: false,
    })
  };

  const successMessage = () => {
    return (
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Task has been saved",
          showConfirmButton: false,
          timer: 1500
        })
    );
  };

  const errorMessage = () => {
    return (
      error && (
        <div className="">
          <div className="alert alert-danger">Please fill all the details!</div>
        </div>
      )
    );
  };
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

        {/* {successMessage()} */}
        {errorMessage()}
        <form>
          <div className="mb-3">
            <label htmlFor="taskName" className="form-label">
              Task Name
            </label>
            <input
              type="text"
              value={name}
              name="name"
              onChange={handleChange("name")}
              required
              className="form-control"
              id="taskName"
            />
          </div>
          <div className="mb-3">
            <div className="form-floating">
              <textarea
                className="form-control"
                value={description}
                name="description"
                onChange={handleChange("description")}
                id="floatingTextarea"
              ></textarea>
              <label htmlFor="floatingTextarea">Task Description</label>
            </div>
          </div>
          <div className="mb-3">
            <div className="form-floating">
              <select
                className="form-select"
                value={priority}
                name="priority"
                onChange={handleChange("priority")}
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
          <blockquote class="blockquote">
  <i><p class="mb-0 text-secondary" style={{fontSize: "1rem"}}>High priority tasks are represented by the color red, while low priority tasks are indicated by a blue hue, and medium priority tasks are distinguished by a green color scheme.
</p></i>
</blockquote>
          </div>

          <button type="submit" onClick={onSubmit} className="btn btn-primary">
            Add Task
          </button>
        </form>
      </div>
    </Base>
  );
}
