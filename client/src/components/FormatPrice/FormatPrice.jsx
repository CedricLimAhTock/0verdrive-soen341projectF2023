const FormatPrice = (p) => {
  return p ? "$" + p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
};

export default FormatPrice;
