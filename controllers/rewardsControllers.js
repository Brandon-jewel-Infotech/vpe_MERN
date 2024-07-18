const Reward = require("../models/rewardsModel");

exports.createReward = async (req, res) => {
  const { name, coins, status, conditions = "" } = req?.body;

  try {
    const newReward = await Reward.create({
      name,
      coins,
      status,
      conditions,
    });

    res.status(201).json({ message: "Successfully Added", result: newReward });
  } catch (err) {
    console.error("Error creating reward:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getReward = async (req, res) => {
  const { id } = req?.body;

  try {
    const rewards = await Reward.findAll({
      attributes: ["name", "coins", "stage", "status", "conditions", "id"],
      where: {},
    });

    res.json({ results: rewards, message: "Successfully retrieved rewards" });
  } catch (err) {
    console.error("Error retrieving rewards:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateReward = async (req, res) => {
  const { id, name, coins, status, conditions } = req?.body;

  try {
    const [updatedRowsCount] = await Reward.update(
      {
        name,
        coins,
        status,
        conditions: status == 3 ? conditions : "",
      },
      {
        where: {
          id,
        },
      }
    );

    if (updatedRowsCount > 0) {
      res.status(200).json({ message: "Successfully updated the rewards" });
    } else {
      res.status(404).json({ message: `Reward with ID ${id} not found` });
    }
  } catch (err) {
    console.error("Error updating reward:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteReward = async (req, res) => {
  const { id } = req?.body;

  try {
    const deletedRowsCount = await Reward.destroy({
      where: {
        id,
      },
    });

    if (deletedRowsCount > 0) {
      res.json({ message: "Successfully Deleted" });
    } else {
      res.status(404).json({ message: `Reward with ID ${id} not found` });
    }
  } catch (err) {
    console.error("Error deleting reward:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
