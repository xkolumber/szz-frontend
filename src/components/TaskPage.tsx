import axios from "axios";
import { useEffect, useState } from "react";
import { AddTaskForm } from "./AddTaskForm";
import { Task } from "./Task";

const TaskPage = () => {
  const [tasks, setTasks] = useState<any>([]);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/apitaks/task`
      );

      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <div className="own_edge">
      <div className="main_section">
        TaskPage
        <AddTaskForm fetchTasks={fetchTasks} />
        {tasks.map((task: any) => (
          <Task task={task} key={task.id} fetchTasks={fetchTasks} />
        ))}
      </div>
    </div>
  );
};

export default TaskPage;
