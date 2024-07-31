import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  allTasks: [],
  currentTask: undefined,
  loading: false,
  error: "",
};

const handleUpdateTask = (state, task) => {
  return state.allTasks.map((t) => (t._id === task._id ? task : t));
};

const handleDeleteTask = (state, id) => {
  return state.allTasks.filter((task) => task._id !== id);
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    taskRequest: (state) => {
      state.loading = true;
      state.error = "";
    },
    allTaskSuccess: (state, action) => {
      state.loading = false;
      state.allTasks = action.payload.tasks;
      state.error = "";
    },
    addTaskSuccess: (state, action) => {
      state.allTasks.push(action.payload.task);
    },
    updateTaskSuccess: (state, action) => {
      state.allTasks = handleUpdateTask(current(state), action.payload.task);
    },
    deleteTaskSuccess: (state, action) => {
      state.allTasks = handleDeleteTask(current(state), action.payload);
    },
    clearTasks: (state) => {
      state.allTasks = [];
      state.currentTask = undefined;
    },
    taskFail: (state, action) => {
      state.loading = false;
      state.currentTask = undefined;
      state.error = action.payload;
    },
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload;
    },
    updateTaskStatus: (state, action) => {
      const { taskId, newStatus } = action.payload;
      state.allTasks = state.allTasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      );
    },
  },
});

export const {
  taskRequest,
  allTaskSuccess,
  addTaskSuccess,
  updateTaskSuccess,
  deleteTaskSuccess,
  clearTasks,
  taskFail,
  setCurrentTask,
  updateTaskStatus,
} = taskSlice.actions;

export default taskSlice.reducer;
