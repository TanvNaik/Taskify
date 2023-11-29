import React from "react";

import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import AddTask from "./Components/AddTask";
import TaskList from "./Components/TaskList";
import DefaultPage from "./Components/DefaultPage";
import ViewTask from "./Components/ViewTask";

export default function Routers() {
  return (
    <BrowserRouter basename="/Taskify">
      <Switch>
        <Route path="/" exact element={<TaskList />} />
        <Route path="/add-task" exact element={<AddTask />} />
        <Route path="/task-details" exact element={<ViewTask />} />
        <Route path="*" element={<DefaultPage />} />
      </Switch>
    </BrowserRouter>
  );
}
