import React from "react";

const LabelItem = (props) => {
  const { label, value, flexDicuration, classNameValue, classNameLabel } =
    props;
  return (
    <div className="flex gap-2 items-center">
      <div className={classNameLabel}>{label}</div>
      <div className={classNameValue}>{value}</div>
    </div>
  );
};

export default LabelItem;
