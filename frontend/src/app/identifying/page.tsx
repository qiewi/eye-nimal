"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function IdentifyingPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 20;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-center pt-10">
      <div className="w-full max-w-xl mx-auto px-4">
        <div className="relative w-full mx-auto overflow-hidden rounded-2xl">
          {/* Camera Frame */}
          <div className="relative aspect-[16/9] w-full">
            {/* Image being scanned */}
            <div className="absolute inset-4">
              <Image
                src="/image.png"
                alt="Animal being scanned"
                fill
                className="object-cover border-black border-2 rounded-lg"
                priority
              />
            </div>

            <div className="absolute inset-0">
              {/* Corner Markers */}
              <div className="absolute left-8 top-8 h-8 w-8 border-l-2 border-t-2 border-white"></div>
              <div className="absolute right-8 top-8 h-8 w-8 border-r-2 border-t-2 border-white"></div>
              <div className="absolute bottom-8 left-8 h-8 w-8 border-b-2 border-l-2 border-white"></div>
              <div className="absolute bottom-8 right-8 h-8 w-8 border-b-2 border-r-2 border-white"></div>
            </div>

            {/* Progress Bar Container */}
            <div className="absolute bottom-8 left-1/2 w-3/5 -translate-x-1/2 rounded-lg bg-white p-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-black">
                  <span>Identifying...</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full bg-green-500 transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 