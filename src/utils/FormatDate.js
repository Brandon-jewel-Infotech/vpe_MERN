const formatDate = (isoString) => {
  const date = new Date(isoString);

  const istDateTime = new Date(date.getTime());

  // Format the date and time
  const day = ("0" + istDateTime.getDate()).slice(-2);
  const month = ("0" + (istDateTime.getMonth() + 1)).slice(-2);
  const year = istDateTime.getFullYear();
  let hours = istDateTime.getHours();
  const minutes = ("0" + istDateTime.getMinutes()).slice(-2);
  const meridiem = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  return `${day}/${month}/${year} ${hours}:${minutes} ${meridiem}`;
};

module.exports = formatDate;
