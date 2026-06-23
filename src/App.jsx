import { useState } from "react";
import "./App.css";

function App() {
  // Task List Array State
  const [taskList, setTaskList] = useState([]);

  // Input Tracking State
  const [input, setInput] = useState("");

  // Active Tab State
  const [activeTab, setActiveTab] = useState("all");

  // Add New Task Function
  const addNewTask = () => {
    const newTask = {
      id: Date.now(),
      name: input,
      completed: false,
    };

    setTaskList([...taskList, newTask]);

    setInput("");
  };

  // Delete Task Function
  const deleteTask = (id) => {
    setTaskList(taskList.filter((taskItem) => taskItem.id !== id));
  };

  // Toggle Task Function
  const toggleTask = (id) => {
    setTaskList(
      taskList.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const activeTask = taskList.filter((activeList) => {
    if (activeTab === "completed") return activeList.completed;
    if (activeTab === "notCompleted") return !activeList.completed;
    return true;
  });

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-primary">
      <div className="container bg-white rounded-5 p-5 m-3 m-sm-0">
        <h2 className="text-primary text-center mb-5">Todo App</h2>

        <div className="mb-5 d-flex gap-3 flex-column flex-sm-row">
          <input
            type="text"
            className="form-control"
            name="input"
            id="input"
            aria-describedby="inputField"
            placeholder="Enter a task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary text-nowrap"
            disabled={!input}
            onClick={addNewTask}
          >
            Add Task
          </button>
        </div>

        <div
          className={`d-flex flex-column flex-sm-row justify-content-center gap-3 ${taskList.length > 0 ? "mb-5" : "mb-0"} flex-wrap`}
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setActiveTab("all")}
            disabled={taskList.length === 0}
          >
            All Tasks
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => setActiveTab("completed")}
            disabled={taskList.length === 0}
          >
            Completed
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => setActiveTab("notCompleted")}
            disabled={taskList.length === 0}
          >
            Not Completed
          </button>
        </div>

        {activeTask.map((list) => (
          <div
            key={list.id}
            className={`d-flex flex-column flex-sm-row justify-content-between align-items-center flex-wrap bg-primary-subtle p-4 rounded ${taskList.length > 1 ? "mb-4" : "mb-0"}`}
          >
            <ul className="mb-0 ps-0">
              <li className="text-primary list-unstyled mb-3 mb-sm-0">
                {list.name}
              </li>
            </ul>

            <div className="d-flex gap-3 flex-wrap justify-content-center align-items-center">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteTask(list.id)}
              >
                Delete
              </button>

              <button
                type="button"
                className={`btn ${list.completed ? "btn-success" : "btn-warning"}`}
                onClick={() => toggleTask(list.id)}
              >
                {list.completed ? "Completed" : "Not Completed"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
