"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { predictAnimal } from "@/lib/api";

export default function IdentifyingPage() {
  const [progress, setProgress] = useState(0);
  const [imageData, setImageData] = useState<string>("/image.png");
  const router = useRouter();

  useEffect(() => {
    // Get the uploaded image from localStorage
    const storedImage = localStorage.getItem('uploadedImage');
    if (storedImage) {
      setImageData(storedImage);
      // Clear the localStorage after getting the image
    }

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

  useEffect(() => {
    if (progress === 100 && imageData.startsWith('data:image')) {
      predictAnimal(imageData).then((result) => {
        localStorage.setItem('animalResult', JSON.stringify(result));
        router.push('/result');
      });
    }
  }, [progress, imageData, router]);

  return (
    <div className="w-full flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-4xl mx-auto"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full mx-auto overflow-hidden rounded-[32px] bg-black/5 border-4 border-black shadow-xl"
        >
          {/* Camera Frame */}
          <div className="relative aspect-[16/9] w-full">
            {/* Image being scanned */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute inset-0"
            >
              {imageData.startsWith('data:image') ? (
                // For base64 images
                <div 
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${imageData})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              ) : (
                // For regular image URLs
                <Image
                  src={imageData}
                  alt="Animal being scanned"
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </motion.div>

            {/* Overlay with semi-transparent white */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" 
            />

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute inset-0"
            >
              {/* Corner Markers */}
              <div className="absolute left-4 top-4 h-12 w-12">
                <div className="absolute left-0 top-0 w-full h-[3px] bg-white" />
                <div className="absolute left-0 top-0 w-[3px] h-full bg-white" />
              </div>
              <div className="absolute right-4 top-4 h-12 w-12">
                <div className="absolute right-0 top-0 w-full h-[3px] bg-white" />
                <div className="absolute right-0 top-0 w-[3px] h-full bg-white" />
              </div>
              <div className="absolute bottom-4 left-4 h-12 w-12">
                <div className="absolute left-0 bottom-0 w-full h-[3px] bg-white" />
                <div className="absolute left-0 bottom-0 w-[3px] h-full bg-white" />
              </div>
              <div className="absolute bottom-4 right-4 h-12 w-12">
                <div className="absolute right-0 bottom-0 w-full h-[3px] bg-white" />
                <div className="absolute right-0 bottom-0 w-[3px] h-full bg-white" />
              </div>
            </motion.div>

            {/* Progress Bar Container */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute bottom-8 left-1/2 w-[280px] -translate-x-1/2 rounded-lg bg-white/90 backdrop-blur-sm p-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm text-black">
                  <span>Identifying...</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full bg-greenish transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 