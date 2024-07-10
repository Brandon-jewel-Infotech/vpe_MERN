import React, { useEffect, useState } from "react";
import PrimaryLayout from "../../Layout/PrimaryLayout";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../../redux/slice";
import OrderRequestCard from "../../components/OrderRequestCard";
const MyOrders = () => {
  const { tok, id } = useSelector((state) => state.user);
  const [usData, setusData] = useState([]);
  const [created, setCreated] = useState([]);
  const [loading, setloading] = useState(false);
  const [reciever, setReciever] = useState();
  const navigate = useNavigate();

  const [state, setState] = useState({
    open: false,
    // Transition: Fade,
    message: "",
  });

  const handleClick = (message) => {
    setState({
      open: true,
      // Transition: Fade,
      message: message,
    });
  };

  const handleDelete = (props) => {
    // console.log("Called Handle Delete");
    // console.log(props);
    setloading(true);
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/orders/${props}`, {
        headers: {
          Authorization: `${tok}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "Product Deleted") {
          getData();
          console.log("Data updated");
        }
      })
      .catch((err) => {
        console.error(err);
        navigate("/logout");
      });
  };

  const getData = () => {
    setloading(true);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/seller/orders`,
        {},
        {
          headers: {
            Authorization: `${tok}`,
          },
        }
      )
      .then((res) => {
        setusData(res.data[0]);
        setCreated(res.data[1]);
        console.log(res.data[1]);
        console.log(res.data);
        console.log(res.data[0]);
        // console.log(res.data[0][0].createdBy);
        setReciever(res.data[0][0]?.createdBy ? res.data[0][0].createdBy : "");
        // console.log(res.data[0]);
        setloading(false);
      })
      .catch((err) => {
        console.warn(err);
        // alert("session expired");
        // navigate("/logout");
      });
  };
  useEffect(() => {
    getData();
  }, []);

  // ====================================================================================================================================

  //    isOpen,setIsOpen,productImage,setProductImage
  const [isOpen, setIsOpen] = useState(false);
  const [productImage, setProductImage] = useState("");

  // ====================================================================================================================================
  const handleProductQty = (qty, pid) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/seller/products/edit`,
        {
          qty: qty,
          prod_id: pid,
        },
        {
          headers: {
            Authorization: tok,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        handleClick(res.data.message);
        getData();
      })
      .catch((err) => console.error(err));
  };
  const handleOrder = (pid, stage) => {
    let img = null;
    let content;
    let cont = true;
    if (stage === 3) {
      if (productImage) {
        img = productImage;
      } else {
        cont = false;
        handleClick("Upload screenshot");
      }
    }

    if (stage === 2) content = `Your order is accepted`;
    if (stage === 5) content = `Your order is rejected`;
    if (stage === 4) content = `Your order is completed`;
    if (stage === 6) content = `Your order is cancelled`;
    // socket.emit('notification', { content, socketID: socket.id });
    // socket.on("connect", () => {
    //   console.log("Hello world!");
    //   console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
    // });

    if (cont) {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/seller/orders/accept`,
          {
            stage: stage,
            order_id: pid,
            image: img,
            content,
            sender: id,
            reciever: reciever,
          },
          {
            headers: {
              Authorization: tok,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          handleClick(res.data.message);
          getData();
          // socket.emit('notification', { content });
          // socket.on('newLogin',(data)=>{
          //   console.log(data);
          //   handleClick(data);
          // });
        })
        .catch((err) => console.error(err));
    } else console.log("else");
  };
  const handleConnections = (row) => {
    let img = "";
    console.log(row);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/seller/connections/update`,
        {
          createdBy: row.createdBy,
          receiver: row.receiver,
        },
        {
          headers: {
            Authorization: tok,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        handleClick(res.data.message);
        getData();
      })
      .catch((err) => console.error(err));
  };

  const ordersData = [
    {
      requestId: 13526,
      requestDate: "12/02/2022",
      image:
        "https://images.hindustantimes.com/img/2022/08/17/1600x900/pexels-ihsan-adityawarman-1445696_1660730475031_1660730484077_1660730484077.jpg",
      title: "Heels for women",
      variants: [
        { name: "Color", value: "Black" },
        { name: "Size", value: "M" },
      ],
      quantity: 123,
      price: 1243,
    },
    {
      requestId: 13526,
      requestDate: "12/02/2022",
      image:
        "https://images.hindustantimes.com/img/2022/08/17/1600x900/pexels-ihsan-adityawarman-1445696_1660730475031_1660730484077_1660730484077.jpg",
      title: "Heels for women",
      variants: [
        { name: "Color", value: "Black" },
        { name: "Size", value: "M" },
      ],
      quantity: 123,
      price: 1243,
    },
    {
      requestId: 13526,
      requestDate: "12/02/2022",
      image:
        "https://images.hindustantimes.com/img/2022/08/17/1600x900/pexels-ihsan-adityawarman-1445696_1660730475031_1660730484077_1660730484077.jpg",
      title: "Heels for women",
      variants: [
        { name: "Color", value: "Black" },
        { name: "Size", value: "M" },
      ],
      quantity: 123,
      price: 1243,
    },
    {
      requestId: 13526,
      requestDate: "12/02/2022",
      image:
        "https://images.hindustantimes.com/img/2022/08/17/1600x900/pexels-ihsan-adityawarman-1445696_1660730475031_1660730484077_1660730484077.jpg",
      title: "Heels for women",
      variants: [
        { name: "Color", value: "Black" },
        { name: "Size", value: "M" },
      ],
      quantity: 123,
      price: 1243,
    },
  ];
  return (
    <PrimaryLayout>
      <div className="card bg-white">
        <div className="card-body gap-5">
          <div className="flex justify-between items-center">
            <div className="text-start">
              <h2 className="text-lg font-bold ">Order Requests</h2>
              <p className="text-sm">Order {">"} Requests</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-evenly gap-10">
            {usData.map((order, ind) => (
              <OrderRequestCard key={ind} {...order} />
            ))}
          </div>
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default MyOrders;
