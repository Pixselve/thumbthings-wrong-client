"use client";

import ProgressBar from "@/components/ProgressBar";
import { useState } from "react";

export default function CardsBar() {
  const [progress, setProgress] = useState(5);

  return (
    <div className="relative">
      <div className="bg-blue-600 h-16"></div>
      <div className="absolute w-full bottom-0 flex justify-center">
        <div className="bg-blue-500 w-3/4 shadow-5xl p-2 space-y-4">

            <div className="flex justify-between items-end">
                <div className="grid grid-cols-3 gap-2">
                    <img className="overflow-hidden h-20 w-16 object-cover rounded-md border-black border-2 hover:-translate-y-5 hover:shadow cursor-pointer transition-all" src="https://cdn0.iconfinder.com/data/icons/space-color-outline/64/28-gravity-512.png" alt="Kitten"/>
                    <img className="overflow-hidden h-20 w-16 object-cover rounded-md border-black border-2 hover:-translate-y-5 hover:shadow cursor-pointer transition-all" src="https://th.bing.com/th/id/OIP.yX6IqKsAV4i-LMr0quZ28gHaHa?pid=ImgDet&rs=1" alt="Kitten"/>
                    <img className="overflow-hidden h-20 w-16 object-cover rounded-md border-black border-2 hover:-translate-y-5 hover:shadow cursor-pointer transition-all" src="https://th.bing.com/th/id/OIP.rPjOjfrUh2OTUBkNr8yOIwHaG_?pid=ImgDet&rs=1" alt="Kitten"/>
                </div>
                <div className="text-white font-bold bg-blue-800 p-2">🗡️ Romano</div>
            </div>

          <ProgressBar progress={progress}></ProgressBar>
        </div>
      </div>
    </div>
  );
}
