import React from 'react'

import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom'
import AddTask from './Components/AddTask'
import EditTask from './Components/EditTask'
import TaskList from './Components/TaskList'

export default function Routers() {
  return (
    <BrowserRouter basename="https://tanvnaik.github.io/Taskify/">
        <Switch>
            <Route path = "/" exact element = {<TaskList/>} />
            <Route path = "/add-task" exact element = {<AddTask/>} />
            <Route path = "/edit-task" exact element = {<EditTask/>} />
        </Switch>
    </BrowserRouter>
  )
}
