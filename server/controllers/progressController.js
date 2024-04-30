const Progress = require("../models/Progress");

//creating a new progress
exports.createProgress = async (req, res) => {
  try {
    const { name } = req.body;
    const history = [];
    const progress = new Progress({
      name,
      history
    });
    await progress.save()
    res.status(201).json({ success: true, data: progress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error, cannot create progress" });
  }
};

//getting all progresss
exports.getProgresss = async (req, res) => {
  try {
    const progresss = await Progress.find();
    res.status(200).json({ success: true, data: progresss });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error, cannot get progress" });
  }
};

//updating an progress by ID
exports.updateProgress = async (req, res) => {
  try {
    const { name, date, weight, reps } = req.body;
    const history = { date: date, weight: weight, reps: reps };
    const progress = await Progress.findOne({name});
    if (!progress) {
      return res
      .status(404)
      .json({ success: false, error: "Progress not found" });
    }
    progress.history.push(history)
    await progress.save();
    res.status(200).json({ success: true, data: progress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error, cannot update progress" });
  }
};
