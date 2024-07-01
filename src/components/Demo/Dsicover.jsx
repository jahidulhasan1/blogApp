import React from "react";
import { discover, discoverActions } from "../../data";

function Dsicover() {
  return (
    <div className="sticky top-[5rem]">
      <div className="border-b border-gray-300 pb-7">
        <h2 className="font-semibold">
          Discover More what Matter&apos;s to you
        </h2>
        <div className="flex items-center gap-3 flex-wrap ">
          {discover.map((x, i) => {
            return (
              <button
                key={i}
                className="bg-grey-200 py-2 px-3 text-sm rounded-full"
              >
                {x}
              </button>
            );
          })}
        </div>
        <button className="text-green600 text-s py-3 hover:text-black1">
          See more Topics
        </button>
      </div>
      <div className="flex items-center flex-wrap gap-3 leading-3 py-8">
        {
          discoverActions.map((action,i)=> (
            <button 
            key={i}
            className=""
            >
{action}
            </button>
          ))
        }
      </div>
    </div>
  );
}

export default Dsicover;
