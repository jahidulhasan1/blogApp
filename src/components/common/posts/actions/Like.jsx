import React from "react";
import { PiHandsClappingDuotone } from "react-icons/pi";

function Like() {
  return (
    <button className="flex items-center gap-1 text-sm">
      <PiHandsClappingDuotone className="text-xl" />
      <span>1</span>
    </button>
  );
}

export default Like;