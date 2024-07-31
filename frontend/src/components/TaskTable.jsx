/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentTask,
} from "../redux/reducers/taskReducer";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, TextField, Grid, Box } from "@mui/material";
import { updateTask } from "../redux/actions/task";

const TaskTable = ({
  setEditModalOpen,
  setDeleteModalOpen,
  setViewModalOpen,
  setAddModalOpen,
}) => {
  const [tasks, setTasks] = useState({ TODO: [], "IN PROGRESS": [], DONE: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const dispatch = useDispatch();
  const { allTasks } = useSelector((state) => state.task);

  useEffect(() => {
    if (allTasks) {
      console.log(allTasks, "AllTAsks")
      const groupedTasks = allTasks.reduce(
        (acc, task) => {
          if (task.status === "created" || task.status === 'todo') {
            acc.TODO.push(task);
          } else if (task.status === "completed" || task.status === 'done') {
            acc.DONE.push(task);
          } else {
            acc["IN PROGRESS"].push(task);
          }
          return acc;
        },
        { TODO: [], "IN PROGRESS": [], DONE: [] }
      );
      console.log("Called");
      setTasks(groupedTasks);
    }
  }, [allTasks]);

  const handleView = (task) => {
    dispatch(setCurrentTask(task));
    setViewModalOpen(true);
  };

  const handleEdit = (task) => {
    dispatch(setCurrentTask(task));
    setEditModalOpen(true);
  };

  const handleDelete = (task) => {
    dispatch(setCurrentTask(task));
    setDeleteModalOpen(true);
  };

  const onDragEnd = (result) => {
    console.log(result);
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;
    const taskId = result.draggableId;

    if (sourceColumn !== destColumn) {
      console.log(tasks)
      let sourceItems = Array.from(tasks[sourceColumn]);
      let destItems = Array.from(tasks[destColumn]);
      console.log(sourceItems, destItems)
      let removed = sourceItems.find((task) => task._id === taskId);
      sourceItems = sourceItems.filter((task) => task._id !== taskId);
      console.log(removed)

      destItems.push({ ...removed, status: destColumn.toLowerCase() });

      console.log(sourceItems, "UpdatedSource", destItems, "UpdatedDest")

      setTasks((prev) => ({
        ...prev,
        [sourceColumn]: sourceItems,
        [destColumn]: destItems,
      }));

      console.log("Dispatching")
      dispatch(
        updateTask({ status: destColumn.toLowerCase(), id: taskId })
      );
    } else {
      const items = Array.from(tasks[sourceColumn]);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      setTasks({
        ...tasks,
        [sourceColumn]: items,
      });
    }
  };

  const sortTasks = (tasksToSort) => {
    switch (sortBy) {
      case "recent":
        return tasksToSort.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "oldest":
        return tasksToSort.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "title":
        return tasksToSort.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return tasksToSort;
    }
  };

  const filteredAndSortedTasks = Object.keys(tasks).reduce((acc, status) => {
    acc[status] = sortTasks(
      tasks[status].filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    return acc;
  }, {});

  const TaskCard = ({ task, index }) => (
    <Draggable draggableId={task._id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-blue-100 p-4 mb-4 rounded-lg shadow"
        >
          <h3 className="font-bold">{task.title}</h3>
          <p className="text-sm">{task.description}</p>
          <p className="text-xs mt-2">
            Created at: {new Date(task.createdAt).toLocaleString()}
          </p>
          <p className="text-xs mt-2">
            Due date: {new Date(task.dueDate).toLocaleString()}
          </p>
          <div className="mt-2 flex justify-end space-x-2">
            <button
              onClick={() => handleView(task)}
              className="text-blue-600 px-2 py-1 bg-blue-200 rounded"
            >
              View Details
            </button>
            <button
              onClick={() => handleEdit(task)}
              className="text-green-600 px-2 py-1 bg-green-200 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(task)}
              className="text-red-600 px-2 py-1 bg-red-200 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );

  return (
    <Box p={2}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
          />
        </Grid>
        <Grid item xs={12} sm={6} textAlign="right">
          <Button variant="contained" color="primary" onClick={() => setAddModalOpen(true)}>
            + Add Task
          </Button>
        </Grid>
      </Grid>
      <Box mt={2}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container spacing={2}>
            {["TODO", "IN PROGRESS", "DONE"].map((status) => (
              <Grid item xs={12} md={4} key={status}>
                <Box
                  p={2}
                  bgcolor="grey.200"
                  borderRadius="borderRadius"
                  boxShadow={1}
                >
                  <h2 className="font-bold text-lg mb-4 bg-blue-500 text-white p-2 rounded">
                    {status.replace("_", " ")}
                  </h2>
                  <Droppable droppableId={status}>
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {filteredAndSortedTasks[status].map((task, index) => (
                          <TaskCard key={task._id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Box>
              </Grid>
            ))}
          </Grid>
        </DragDropContext>
      </Box>
    </Box>
  );
};

export default TaskTable;
