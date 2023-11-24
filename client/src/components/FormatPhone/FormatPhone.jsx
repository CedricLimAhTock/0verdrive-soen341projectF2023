import React from "react";
const FormatPhone = (i) => {
  let input = i.replace(/\D/g, "");
  let formatted = "";
  if (input.length > 0) {
    formatted += "(" + input.substring(0, 3);
    if (input.length > 3) formatted += ")";
  }
  if (input.length > 3) {
    formatted += " " + input.substring(3, 6);
  }
  if (input.length > 6) {
    formatted += "-" + input.substring(6, 10);
  }
  return formatted;
};

export default FormatPhone;
