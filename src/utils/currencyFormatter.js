const currencyFormatter = (amount) => {
  if (isNaN(amount)) {
    amount = 0;
  }

  let amountStr = amount.toString();

  let [integerPart, decimalPart] = amountStr.split(".");

  let lastThree = integerPart.slice(-3);
  let otherNumbers = integerPart.slice(0, -3);
  if (otherNumbers !== "") {
    lastThree = "," + lastThree;
  }
  integerPart = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

  return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
};

export default currencyFormatter;
