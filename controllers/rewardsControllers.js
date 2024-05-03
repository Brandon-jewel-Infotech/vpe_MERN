const Reward = require("../models/rewardsModel");

// to create  the rewards for the product (admin's controller) (sequelized and tested)
exports.createReward = async (req, res) => {
  const { name, productId, coins, stage, status, conditions } = req?.body;

  try {
    const newReward = await Reward.create({
      name,
      productId, // Assuming you have a productId column in your rewards table
      coins,
      stage,
      status,
      conditions,
    });

    res.json({ message: "Successfully Added", result: newReward });
  } catch (err) {
    console.error("Error creating reward:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// to get  the rewards for the product  (seller's controller) (sequelized and teseted)
exports.getReward = async (req, res) => {
  const { id } = req?.body;

  try {
    const rewards = await Reward.findAll({
      attributes: ["name", "coins", "stage", "status", "conditions", "id"],
      where: {
        // Add any additional conditions if needed
      },
    });

    res.json({ results: rewards, message: "Successfully retrieved rewards" });
  } catch (err) {
    console.error("Error retrieving rewards:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// to update  the rewards for the product (seller's controller) (sequelized and tested)
exports.updateReward = async (req, res) => {
  const { id, name, coins, stage, status, condition } = req?.body;

  try {
    const [updatedRowsCount] = await Reward.update(
      {
        name,
        coins,
        stage,
        status,
        conditions: condition,
      },
      {
        where: {
          id,
        },
      }
    );

    if (updatedRowsCount > 0) {
      res.json({ message: "Successfully updated the rewards" });
    } else {
      res.status(404).json({ message: `Reward with ID ${id} not found` });
    }
  } catch (err) {
    console.error("Error updating reward:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// to delete  the rewards for the product (seller's controller) (sequelized and tested)
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
