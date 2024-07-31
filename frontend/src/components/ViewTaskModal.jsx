import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";

const ViewTaskModal = ({ isOpen, onClose }) => {
  const task = useSelector((state) => state.task.currentTask);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (task && task?.title) {
      setStatus(task.status[0].toUpperCase() + task.status.substring(1));
    }
  }, [task]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="font-semibold text-xl pb-2 border-b">Task Details</h3>
      {task && (
        <div className="flex flex-col gap-2 py-1.5">
          <p>
            <b>Title : </b> {task.title}
          </p>
          <p>
            <b>Description : </b> {task.description}
          </p>

          <p>
            <b>Create On: </b> {task.createdAt?.substring(0, 10)}
          </p>
        </div>
      )}
      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={onClose}
          className="px-2 py-1 border border-slate-800 rounded"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ViewTaskModal;
