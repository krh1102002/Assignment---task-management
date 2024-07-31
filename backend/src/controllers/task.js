const taskModel = require("../schema/task");
const userModel = require("../schema/user");

// Getting all task of logged in user
exports.getAllTask = async (req, res) => {
  try {
    const user = req.user;

    const tasks = await taskModel.find({ user: user._id });

    return res.status(200).json({ tasks });
  } catch (error) {}
};

// For Adding a new task
exports.addTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    const task = await taskModel.create({
      title,
      description,
      user: req.user.id,
    });
    if (task) {
      await userModel.findByIdAndUpdate(user._id, {
        taskCreated: user.taskCreated + 1,
      });
    }
    return res.status(201).json({ task });
  } catch (error) {
    return res.status(500).json({ message: "Some thing gone wrong" });
  }
};

// For Updating a specific task
exports.updateTask = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user._id;
    const user = await userModel.findById(userId);

    if (data.status === "completed") {
      await userModel.findByIdAndUpdate(user._id, {
        taskCompleted: user.taskCompleted + 1,
      });
    }

    const task = await taskModel.findById(data.id);
    if (!task) return res.status(404).json({ message: "No Task Found" });

    const updatedTask = await taskModel.findByIdAndUpdate(data.id, data, {
      new: true,
    });

    return res.status(200).json({ task: updatedTask });
  } catch (error) {
    return res.status(500).json({ message: "Some thing gone wrong" });
  }
};

// For Deleting a specific task
exports.deleteTask = async (req, res) => {
  try {
    const { _id } = req.body;

    const task = await taskModel.findById(_id);

    if (!task) return res.status(404).json({ message: "No Task Found" });

    const user = await userModel.findById(req.user._id);

    if (task.status === "completed") {
      await userModel.findByIdAndUpdate(user._id, {
        taskCreated: user.taskCreated - 1,
        taskCompleted: user.taskCompleted - 1,
      });
    } else {
      await userModel.findByIdAndUpdate(user._id, {
        taskCreated: user.taskCreated - 1,
      });
    }

    await taskModel.findByIdAndDelete(_id);

    return res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Some thing gone wrong" });
  }
};
