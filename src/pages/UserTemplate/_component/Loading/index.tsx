import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const Loading = (props) => {
  const { open } = props;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {open &&
        createPortal(
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 z-[200] flex justify-center items-center">
            <div className="loader" />
          </div>,
          document.body
        )}
    </>
  );
};

export default Loading;
