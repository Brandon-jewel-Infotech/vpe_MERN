const Notification = require("../models/notificationsModel");

exports.createNotification = async (req, res) => {
  // tested
  try {
    const { content, sender, reciever } = req?.body;

    const newNotification = await Notification.create({
      content,
      sender,
      reciever,
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
    const { reciever } = req?.body;

    const notifications = await Notification.findAll({
      where: { reciever },
      order: [["createdAt", "DESC"]],
    });

    if (notifications.length === 0) {
      return res.status(400).json({ message: "No notification found" });
    }
    return res.status(200).json(notifications);
  } catch (error) {
    // console.error(error); 
    res.status(500).json({ error: "Internal Server Error" });
  }
};
