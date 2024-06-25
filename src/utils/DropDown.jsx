import React, { useEffect, useRef } from "react";

function DropDown({ showDrop, setShowDrop,children }) {
  const dropRef = useRef(null);
  useEffect(() => {
    const clickOutSide = (e) => {
      if (showDrop && dropRef.current && !dropRef.current.contains(e.target)) {
        setShowDrop(false);
      }
    };

    window.addEventListener("mousedown", clickOutSide);

    // Cleanup function to remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("mousedown", clickOutSide);
    };
  }, [showDrop, setShowDrop]);

  return (
    <>
      {showDrop && (
        <div
          ref={dropRef}
          className="shadows flex flex-col absolute w-[7rem]  right-0 top-[2rem] bg-white"
        >
          {children}
        </div>
      )}
    </>
  );
}

export default DropDown;
