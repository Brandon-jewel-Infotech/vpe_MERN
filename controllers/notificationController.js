const Notification = require("../models/notificationsModel");

exports.createNotification = async (req, res) => {
  // tested
  try {
    const { content, receiver } = req?.body;

    const newNotification = await Notification.create({
      content,
      sender: req.user.id,
      receiver,
    });

    res.json({ message: "Successfully Added", result: newNotification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getNotification = async (req, res) => {
  //tested
  try {
    const notifications = await Notification.findAll({
      where: { receiver: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteNotification = async (req, res) => {
  //tested
  const { id } = req.params;
  const { id: userId } = req.user;

  let whereClause = { receiver: userId };

  if (id) {
    whereClause.id = id;
  }

  try {
    await Notification.destroy({
      where: whereClause,
    });

    return res
      .status(200)
      .json({ message: "Notifications deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
