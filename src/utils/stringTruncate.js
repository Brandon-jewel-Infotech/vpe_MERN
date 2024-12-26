const truncateString = (name, maxLength = 20) => {
  if (typeof name !== "string") {
    throw new Error("Invalid name");
  }

  if (name.length > maxLength) {
    return name.slice(0, maxLength - 3) + "...";
  }

  return name;
};

export default truncateString;
