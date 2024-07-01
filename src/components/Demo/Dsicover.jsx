import React, { useState } from "react";
import { discover, discoverActions } from "../../data";
import useFetch from "../Hooks/useFetch";
import { useNavigate } from "react-router-dom";

function Dsicover() {
  const { data } = useFetch("post");
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const slicedDiscover = discover.slice(0, count);
  const seeMoreHandler = () => {
    if (discover.length !== slicedDiscover.length) {
      setCount(() => discover.length > slicedDiscover.length && count + 2);
      console.log(count);
    } else {
      setCount(() => discover.length === slicedDiscover.length && count - 5);
    }
  };

  return (
    <div className="sticky top-[5rem]">
      <div className="border-b border-gray-300 pb-7">
        <h2 className="font-semibold">
          Discover More what Matter&apos;s to you
        </h2>
        <div className="flex items-center gap-3 flex-wrap ">
          {discover &&
            slicedDiscover.map((x, i) => {
              return (
                <button
                  onClick={() => navigate(`/filter/${x}`)}
                  key={i}
                  className="bg-grey-200 py-2 px-3 text-sm rounded-full"
                >
                  {x}
                </button>
              );
            })}
        </div>
        <button
          onClick={seeMoreHandler}
          className="text-green600 text-s py-3 hover:text-black1"
        >
          {count === discover.length ? "show less" : "See more Topic"}
        </button>
      </div>
      <div className="flex items-center flex-wrap gap-3 leading-3 py-8">
        {discoverActions.map((action, i) => (
          <button key={i} className="">
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dsicover;
