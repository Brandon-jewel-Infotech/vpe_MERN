const AnnouncementModel = require("../models/announcementModel");
const Announcement = require("../models/announcementModel");
const EmployeeModel = require("../models/employeesModel");
const User = require("../models/userModel");

exports.createAnnouncement = async (req, res) => {
  const { title, content } = req.body;
  const { userId: employerId } = req.user;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const announcement = await Announcement.create({
      title,
      content,
      employerId,
    });

    return res.status(201).json(announcement);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create announcement" });
  }
};

exports.getAnnouncements = async (req, res) => {
  const { role, userId } = req.user;

  try {
    let employerId;

    if (role === 4) {
      const employee = await EmployeeModel.findOne({
        where: { employeeId: userId },
        attributes: ["employerId"],
      });

      if (!employee) {
        return res
          .status(404)
          .json({ error: "No employer found for this employee" });
      }

      employerId = employee.employerId;
    } else if (role === 2) {
      employerId = userId;
    }

    const announcements = await AnnouncementModel.findAll({
      where: { employerId },
      include: {
        model: User,
        as: "employer",
        attributes: ["id", "name", "email"],
      },
      order: [["updatedAt", "DESC"]],
    });

    return res.status(200).json(announcements);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch announcements" });
  }
};

exports.updateAnnouncement = async (req, res) => {
  const { title, content } = req.body;
  const { userId: employerId } = req.user;
  const { id } = req.params;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and Content are required" });
  }

  try {
    const announcement = await Announcement.update(
      {
        title,
        content,
      },
      { where: { id, employerId } }
    );

    return res.status(200).json(announcement);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create announcement" });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  const { id } = req.params;
  const { userId: employerId } = req.user;

  try {
    const result = await Announcement.destroy({
      where: {
        id,
        employerId,
      },
    });

    if (!result) {
      return res
        .status(404)
        .json({ error: "Announcement not found or not authorized to delete" });
    }

    return res
      .status(200)
      .json({ message: "Announcement deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete announcement" });
  }
};
