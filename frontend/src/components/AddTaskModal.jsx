import React, { useState } from "react";
import Modal from "./Modal";
import { addTask } from "../redux/actions/task";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AddTaskModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask({ title, description }));
    toast.success("Task Added");
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="font-semibold text-xl pb-2.5">Add New Task</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-semibold">
            Title of Task
          </label>
          <input
            type="test"
            id="title"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="py-1 px-2 focus:outline-none border border-slate-800 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-semibold">
            Description of Task
          </label>
          <input
            type="text"
            id="description"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="py-1 px-2 focus:outline-none border border-slate-800 rounded"
          />
        </div>
        <div className="flex justify-end gap-2 items-center pt-2">
          <button
            className="px-2 py-1 border border-slate-800 rounded cursor-pointer"
            onClick={handleClose}
          >
            Cancel
          </button>
          <input
            type="submit"
            value="Add"
            className="px-2.5 py-1 bg-slate-800 rounded cursor-pointer text-white"
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
