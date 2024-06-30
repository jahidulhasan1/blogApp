import { useEffect, useRef } from "react";

function DropDown({ children, showDrop, setShowDrop }) {
  const dropRef = useRef(null);
  useEffect(() => {
    const clickOutSide = (e) => {
      console.log("clickOutSide called");
      if (showDrop && dropRef.current && !dropRef.current.contains(e.target)) {
        console.log("Setting showDrop to false");
        setShowDrop(false);
      }
    };
    window.addEventListener("mousedown", clickOutSide);

    // Cleanup function to remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("mousedown", clickOutSide);
    };
  }, [showDrop, setShowDrop]);

  console.log("DropDown rendered, showDrop:", showDrop);

  return (
    <>
      {showDrop && (
        <div
          ref={dropRef}
          className="shadows flex flex-col absolute w-[10rem]  right-0 top-[2rem] bg-white"
        >
          {children}
        </div>
      )}
    </>
  );
}

export default DropDown;
