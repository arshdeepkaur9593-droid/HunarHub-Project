
import React from "react";
import { FiStar } from "react-icons/fi";

function RatingCard() {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white p-2.5 shadow-xl -translate-y-14">

      {/* Avatars */}
      <div className="flex -space-x-3">
        <img
          src="https://i.pravatar.cc/40?img=1"
          alt="Customer avatar 1"
          className="h-7 w-7 rounded-full border-2 border-white"
        />

        <img
          src="https://i.pravatar.cc/40?img=2"
          alt="Customer avatar 2"
          className="h-7 w-7 rounded-full border-2 border-white"
        />

        <img
          src="https://i.pravatar.cc/40?img=3"
          alt="Customer avatar 3"
          className="h-7 w-7 rounded-full border-2 border-white"
        />
      </div>

      {/* Rating Content */}
      <div className="whitespace-nowrap">
        <div className="flex items-center gap-1 text-xs font-semibold">
          <FiStar className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          4.8
        </div>

        <p className="text-[10px] text-gray-600">
          Trusted by 1000+ customers
        </p>
      </div>

    </div>
  );
}

export default RatingCard;
