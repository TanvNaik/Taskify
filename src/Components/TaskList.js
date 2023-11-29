import React, { useEffect, useState } from "react";
import Base from "../Base";
import Swal from "sweetalert2";
import Modal from "react-modal";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [completeTask, setCompletedTasks] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [oldTask, setOldTask] = useState({});
  const [editedTask, setEditedTask] = useState({
    name: "",
    description: "",
    priority: 2,
    status: false,
  });

  const { name, description, priority } = editedTask;

  const completionAlertText = [
    "Excellent work! Task successfully finished!",
    "Kudos! Task completed!",
    "Bravo! Task accomplished!",
    "Outstanding! Task done!",
  ];

  // Load all the tasks and categorize into completed and pending tasks
  const preload = () => {
    let taskList = JSON.parse(localStorage.getItem("taskify-tasks"));
    if (taskList !== null) {
      let pending = taskList.filter((task) => !task.status);

      let completed = taskList.filter((task) => task.status);
      console.log(taskList);
      setCompletedTasks(completed);
      setTasks(pending);
    }
  };

  useEffect(() => {
    preload();
  }, []);


  // Mark  a task as complete
  const CompletionAlert = (key) => {
    Swal.fire({
      title: "Are you certain you want to label this task as done?",
      showDenyButton: true,
      confirmButtonText: "Yes, I want to label it as done",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        let finalTasks = [...tasks, ...completeTask];
        finalTasks[key].status = true;

        localStorage.setItem("taskify-tasks", JSON.stringify(finalTasks));
        Swal.fire({
          title: "Good job!",
          text: completionAlertText[Math.floor(Math.random() * 4)],
          icon: "success",
        });
        preload();
      } else {
        document.getElementById(key).checked = false;
      }
    });
  };

  // Editing a task
  // Function to open the modal for editing a task
  const openModal = (task) => {
    setModalIsOpen(true);
    setEditedTask(task);
    setOldTask(task);

    // setEditedTaskId(taskId);
    // setEditedTaskText(taskText);
  };

  // Function to edit a task
  const editTask = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you certain you want to save this changes?",
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        let newTasks = tasks;
        for (let i = 0; i < newTasks.length; i++) {
          if (oldTask === newTasks[i]) {
            newTasks[i] = editedTask;
          }
        }
        setTasks(newTasks);
        let finalTasks = [...tasks, ...completeTask];
        localStorage.setItem("taskify-tasks", JSON.stringify(finalTasks));

        preload();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Task Updated Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        preload();
        setOldTask({});
        setEditedTask({
          name: "",
          description: "",
          priority: 2,
          status: false,
        });
        closeModal();
      } else {
        setEditedTask({
          name: "",
          description: "",
          priority: 2,
          status: false,
        });
        closeModal();
      }
    });
  };

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  
  return (
    <Base>
      <div className="container ">
        {/* User already have tasks in localstorage */}
        {(tasks.length !== 0 || completeTask.length !== 0) && (
          <table className="table  ">
            <thead>
              <tr>
                <th className="w-25" scope="col">
                  Task
                </th>
                <th className="w-50 text-center" scope="col ">
                  Description
                </th>
                {/* High Priority - Red
                      Medium Priority - Green
                      Low Priority - Blue */}
                <th className="w-10 text-center" scope="col">
                  Mark as complete
                </th>
                <th>Edit Task</th>
              </tr>
            </thead>
            <tbody>
              {/* Pending Tasks */}
              {tasks.length !== 0 &&
                tasks.map((task, key) => {
                  if (task.priority === 2) {
                    return (
                      <tr key={key}>
                        <th className="text-primary">{task.name}</th>
                        <td className="text-primary">{task.description}</td>
                        <td className="text-center">
                          {task.status ? (
                            <input
                              className="input-check"
                              type="checkbox"
                              checked
                              disabled
                            />
                          ) : (
                            <input
                              className="input-check"
                              id={key}
                              onClick={() => CompletionAlert(key)}
                              type="checkbox"
                            />
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => openModal(task, "pending")}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  }
                  if (task.priority === 1) {
                    return (
                      <tr key={key}>
                        <th className="text-success">{task.name}</th>
                        <td className="text-success">{task.description}</td>
                        <td className="text-center">
                          {task.status ? (
                            <input
                              className="input-check"
                              type="checkbox"
                              checked
                              disabled
                            />
                          ) : (
                            <input
                              className="input-check"
                              id={key}
                              onClick={() => CompletionAlert(key)}
                              type="checkbox"
                            />
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => openModal(task, "pending")}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={key}>
                      <th className="text-danger">{task.name}</th>
                      <td className="text-danger">{task.description}</td>
                      <td className="text-center">
                        {task.status ? (
                          <input
                            className="input-check"
                            type="checkbox"
                            checked
                            disabled
                          />
                        ) : (
                          <input
                            className="input-check"
                            id={key}
                            onClick={() => CompletionAlert(key)}
                            type="checkbox"
                          />
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => openModal(task)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              {/* Completed Tasks */}
              {completeTask.length !== 0 &&
                completeTask.map((task, key) => {
                  if (task.priority === 2) {
                    return (
                      <tr key={key}>
                        <th className="text-primary bg-secondary-subtle">
                          {task.name}
                        </th>
                        <td className="text-primary bg-secondary-subtle">
                          {task.description}
                        </td>
                        <td className="text-center bg-secondary-subtle">
                          {task.status ? (
                            <input
                              className="input-check"
                              type="checkbox"
                              checked
                              disabled
                            />
                          ) : (
                            <input
                              className="input-check"
                              id={key}
                              onClick={() => CompletionAlert(key)}
                              type="checkbox"
                            />
                          )}
                        </td>
                        <td className="text-center bg-secondary-subtle"></td>
                      </tr>
                    );
                  }
                  if (task.priority === 1) {
                    return (
                      <tr key={key}>
                        <th className="text-success bg-secondary-subtle">
                          {task.name}
                        </th>
                        <td className="text-success bg-secondary-subtle">
                          {task.description}
                        </td>
                        <td className="text-center bg-secondary-subtle">
                          {task.status ? (
                            <input
                              className="input-check"
                              type="checkbox"
                              checked
                              disabled
                            />
                          ) : (
                            <input
                              className="input-check"
                              id={key}
                              onClick={() => CompletionAlert(key)}
                              type="checkbox"
                            />
                          )}
                        </td>
                        <td className="text-center bg-secondary-subtle"></td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={key}>
                      <th className="text-danger bg-secondary-subtle">
                        {task.name}
                      </th>
                      <td className="text-danger bg-secondary-subtle">
                        {task.description}
                      </td>
                      <td className="text-center bg-secondary-subtle">
                        {task.status ? (
                          <input
                            className="input-check"
                            type="checkbox"
                            checked
                            disabled
                          />
                        ) : (
                          <input
                            className="input-check"
                            id={key}
                            onClick={() => CompletionAlert(key)}
                            type="checkbox"
                          />
                        )}
                      </td>
                      <td className="text-center bg-secondary-subtle"></td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}

        {/* User has not added any Tasks */}
        {tasks.length === 0 && completeTask.length === 0 && (
          <div className="container  text-center text-secondary no-tasks mt-5 pt-5 ">
            <i>
              <h5>No tasks at the moment! Get started by adding some.</h5>
            </i>
          </div>
        )}

        {/* Edit Task */}
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <div className="container">
            <h2>Edit Task</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="taskName" className="form-label">
                  Task Name
                </label>
                <input
                  type="text"
                  value={name}
                  name="name"
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, name: e.target.value })
                  }
                  required
                  className="form-control"
                  id="taskName"
                />
              </div>
              <div className="mb-3">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder=""
                    value={description}
                    name="description"
                    onChange={(e) =>
                      setEditedTask({
                        ...editedTask,
                        description: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      setEditedTask({ ...editedTask, priority: e.target.value })
                    }
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
              <button
                type="submit"
                onClick={editTask}
                className="btn btn-primary"
              >
                Save Changes{" "}
              </button>{" "}
              &nbsp; &nbsp;
              <button className="btn btn-danger" onClick={closeModal}>
                Cancel
              </button>
            </form>
          </div>

          {/* <input
          type="text"
          value={editedTaskText}
          onChange={(e) => setEditedTaskText(e.target.value)}
        />
        <button onClick={saveEditedTask}>Save</button>*/}
        </Modal>

        {/* <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter a new task"
            />
            <button onClick={addTask}>Add Task</button>
      
            <ul>
              {tasks.map(task => (
                <li key={task.id}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompletion(task.id)}
                  />
                  <input
                    type="text"
                    value={task.text}
                    onChange={(e) => editTask(task.id, e.target.value)}
                    disabled={task.completed}
                  />
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
              ))}
            </ul> */}
      </div>
    </Base>
  );
}
