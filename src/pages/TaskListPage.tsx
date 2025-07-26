import React from "react";
import TaskList from "../components/TaskList";

const TaskListPage: React.FC = () => {
  return (
    <div>
      <h2>Tasks</h2>
      <TaskList />
    </div>
  );
};

export default TaskListPage;
