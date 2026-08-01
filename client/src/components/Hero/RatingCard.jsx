import React from "react";
import { FiStar } from "react-icons/fi";

function RatingCard() {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white  p-3.5 shadow-xl -translate-y-14">
      <div className="flex -space-x-2">
        <img
          src="https://i.pravatar.cc/40?img=1"
          className="h-8 w-8 rounded-full border-2 border-white"
        />
        <img
          src="https://i.pravatar.cc/40?img=2"
          className="h-8 w-8 rounded-full border-2 border-white"
        />
        <img
          src="https://i.pravatar.cc/40?img=3"
          className="h-8 w-8  rounded-full border-2 border-white"
        />
      </div>

      <div>
        <div className="flex items-center gap-1 text-sm font-semibold">
          <FiStar className="fill-yellow-400 text-yellow-400" />
          4.8
        </div>

        <p className="text-xs text-gray-600">
          Trusted by 1000+ customers
        </p>
      </div>
    </div>
  );
}

export default RatingCard;