import React, { useEffect, useState } from "react";
import Base from "../Base";
import Swal from "sweetalert2";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [completeTask, setCompletedTasks] = useState([]);

  const completionAlertText = [
    "Excellent work! Task successfully finished!",
    "Kudos! Task completed!",
    "Bravo! Task accomplished!",
    "Outstanding! Task done!",
  ];

  const preload = () => {
    let taskList = JSON.parse(localStorage.getItem("taskify-tasks"));
    if (taskList !== null) {
      let pending = taskList.filter((task) => !task.status);

      let completed = taskList.filter((task) => task.status);
      console.log(taskList)
      setCompletedTasks(completed);
      setTasks(pending);
    }
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Function to edit a task
  const editTask = (taskId, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  const CompletionAlert = (key) => {
    Swal.fire({
      title: "Are you certain you want to label this task as done?",
      showDenyButton: true,
      confirmButtonText: "Yes, I want to label it as done",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        let finalTasks = [...tasks, ...completeTask]
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

  return (
    <Base>
      <div className="container ">
        {/* User already have tasks in localstorage */}
        {(tasks.length !== 0 || completeTask.length !== 0 )&& (
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
              </tr>
            </thead>
            <tbody>
              {/* Pending Tasks */}
              {tasks.length !== 0 && tasks.map((task, key) => {
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
