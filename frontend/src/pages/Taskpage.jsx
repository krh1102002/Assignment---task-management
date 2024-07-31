import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TaskTable from "../components/TaskTable";
import AddTaskModal from "../components/AddTaskModal";
import EditTaskModal from "../components/EditTaskModal";
import AlertModal from "../components/AlertModal";
import ViewTaskModal from "../components/ViewTaskModal";
import Loading from "../components/Loading";
import { getAllTasks } from "../redux/actions/task";
import Layout from "../Layout";
import Navbar from "../components/Navbar";

const Taskpage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);
  const { loading, allTasks } = useSelector((state) => state.task);

  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);
  const [deleteTaskModalOpen, setDeleteTaskModalOpen] = useState(false);
  const [viewTaskModalOpen, setViewTaskModalOpen] = useState(false);

  useEffect(() => {
    if (!user) navigate("/");
    if (user && allTasks?.length <= 0) dispatch(getAllTasks());
  }, [user, allTasks?.length, dispatch, navigate]);

  if (loading) return <Loading />;

  const filteredTasks = allTasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(addTaskModalOpen);
  return (
    <div>
      {/* <Sidebar /> */}
      <Navbar />
      <div className="">
        <AddTaskModal
          isOpen={addTaskModalOpen}
          onClose={() => setAddTaskModalOpen(false)}
        />
        <EditTaskModal
          isOpen={editTaskModalOpen}
          onClose={() => setEditTaskModalOpen(false)}
        />
        <AlertModal
          isOpen={deleteTaskModalOpen}
          onClose={() => setDeleteTaskModalOpen(false)}
        />
        <ViewTaskModal
          isOpen={viewTaskModalOpen}
          onClose={() => setViewTaskModalOpen(false)}
        />
        <div className="md:px-4 px-2.5 md:py-4 py-1.5">
          {/* <TaskHeader
            setAddModalOpen={setAddTaskModalOpen}
            onSearchChange={setSearchTerm}
          /> */}
          <TaskTable
            setEditModalOpen={setEditTaskModalOpen}
            setDeleteMoalOpen={setDeleteTaskModalOpen}
            setViewModalOpen={setViewTaskModalOpen}
            allTasks={filteredTasks}
            setAddModalOpen={setAddTaskModalOpen}
            onSearchChange={setSearchTerm}
          />
        </div>
      </div>
    </div>
  );
};

export default Layout(Taskpage);
