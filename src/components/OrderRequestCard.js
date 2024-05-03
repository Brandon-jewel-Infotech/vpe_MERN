const OrderRequestCard = ({
  image,
  order_id,
  createdAt,
  customer_name,
  variants,
  qty,
  prices,
}) => {
  var date = new Date(createdAt);

  // Extract day, month, and year
  var day = date.getUTCDate();
  var month = date.getUTCMonth() + 1; // Months are zero-based, so add 1
  var year = date.getUTCFullYear();

  // Format the date in dd/mm/yyyy
  var formattedDate = `${day}/${month}/${year}`;
  return (
    <div
      className={`card text-primary-content lg:w-[47%] shadow-xl bg-gray-50`}
    >
      <div className="card-body flex flex-col items-center w-full p-4">
        {/* {Icon ? <Icon size={30} /> : <></>} */}
        <div className="flex justify-between items-center px-4 w-full text-sm border-b">
          <div>
            <h4 className="font-semibold">Request Id</h4>
            <p>{order_id}</p>
          </div>
          <div>
            <h4 className="font-semibold">Order Request Date</h4>
            <p>{formattedDate}</p>
          </div>
        </div>
        <div className="flex justify-between items-center w-full py-4 px-7 text-start gap-5 flex-col lg:flex-row">
          <img src={image} className="w-24 h-24 flex-none" />
          <div className="flex-1 h-full text-sm">
            <h3 className="text-lg font-semibold">{customer_name}</h3>
            <p>
              <span className="font-semibold">{customer_name}</span> has
              requested for an order
            </p>
            {/* {variants.map((variant, i) => (
              <p key={i}>
                <span className="font-semibold">{variant.name}:</span>{" "}
                {variant.value}
              </p>
            ))} */}
            <p>
              <span className="font-semibold">Quantity:</span> {qty}
            </p>
          </div>
          <p className="flex-none lg:h-full">${prices}</p>
        </div>
        <div className="flex justify-between items-center w-full px-4 border-t pt-2">
          <button className="btn btn-error text-white">Cancel</button>
          <button className="btn bg-success text-white">Accept</button>
        </div>
      </div>
    </div>
  );
};

export default OrderRequestCard;
