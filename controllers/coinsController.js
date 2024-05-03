const Coins = require("../models/coinsModel");
const Products = require("../models/productsModel");
//sequelized
exports.createCoinslist = async (req, res) => {
  try {
    const { numOfCoins, perUnit } = req?.body;

    await Coins.create({ numOfCoins, perUnit });

    res
      .status(200)
      .json({ message: "Successfully added coins to wallet order" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//sequelized
exports.getCoinslists = async (req, res) => {
  try {
    const { id } = req.body;

    const result = await Coins.findAll({
      include: [
        {
          model: Products,
          attributes: [
            "id",
            "name",
            "image",
            [
              sequelize.literal("SUBSTRING_INDEX(image, ',' , 1)"),
              "prod_image",
            ],
          ],
          where: { id: { [Sequelize.Op.in]: id } },
          required: true,
        },
      ],
    });

    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllCoinslists = (req, res) => {
  // // const {order_id} = req.body
  // // console.log(req.user);
  // const query = `SELECT ol.*, u.name 'customer_name' , u.email 'customer_email' from order_list ol JOIN users u on ol.createdBy = u.id `;
  // // const sql = `${query} where  reciever = ? `
  // const sql = `${query} where   ol.reciever like '%?%' `
  // console.log(req.user.userId)
  // connection.query(sql,[req.user.userId], (err, results) => {
  //   if (err) throw err;
  //   res.json(results);
  //   // console.log(results);
  //   // console.log(sql)
  //   // console.log({sql})
  // });
};

const updateCoinslists = async (req, res) => {
  // const { receiver,  prod_id, qty ,prices} = req?.body;
  // console.log(req.body)
  // let image = "";
  // if(req?.body?.image) {
  //   created = createFileFromBase64(req?.body?.image, `./public/uploads/txns/${order_id}.jpg`);
  //   if(created)
  //     image = `./public/uploads/txns/${order_id}.jpg`;
  // }
  // let sql2 = "";
  // let sql3 = "";
  // if (stage === 3) {
  //   sql2 = `insert into transactions (order_id,txn_image) values (?,?) `;
  // }
  // if (stage === 4) {
  //   sql2 = `update products`;
  // }
  // let stage = 1;
  // if (req?.body?.stage) stage = req.body.stage;
  // let variant_id = 0;
  // if (req?.body?.variant_id) variant_id = req.body.variant_id;
  // const sql = "update orders set stage = ?  where id = ? ";+
  // // Add sql2 to post data into transactions table for admin to approve
  // // Removing for now
  // // sql + sql3,
  // connection.query(
  //   sql,
  //   [req.user.userId, receiver, stage, prod_id, qty, variant_id,prices],
  //   (err, result) => {
  //      console.log(`update orders set stage = ?  where id = %`.replace('?',stage).replace('%',order_id));
  //     if (err) throw err;
  //     console.log(result);
  //     return res.status(200).json({ message: "Successfully updated" });
  //   }
  // );
  // connection.end();
};

module.exports = {
  getAllCoinslists,
  updateCoinslists,
};
