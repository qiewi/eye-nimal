"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { animalEncyclopedia } from "@/lib/data-hewan"; // Pastikan file ini ada dan formatnya benar

export default function ResultPage() {
  const [animalResult, setAnimalResult] = useState<any>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [encyclopedia, setEncyclopedia] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Ambil hasil prediksi dan gambar dari localStorage
    const result = localStorage.getItem('animalResult');
    const img = localStorage.getItem('uploadedImage');
    if (result && img) {
      const parsed = JSON.parse(result);
      setAnimalResult(parsed);
      setUploadedImage(img);

      // Ambil data encyclopedia berdasarkan label prediksi
      const label = parsed.pred_label;
      if (animalEncyclopedia[label]) {
        setEncyclopedia(animalEncyclopedia[label]);
      } else {
        setEncyclopedia(null);
      }
      setLoading(false);

      // Hapus data setelah diambil agar reload tidak menampilkan data lama
      localStorage.removeItem('animalResult');
      localStorage.removeItem('uploadedImage');
    }
  }, [router]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <p className="text-lg">Loading result...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full flex justify-center pt-10 pb-10"
    >
      <div className="w-full max-w-xl mx-auto px-4 space-y-6">
        {/* Uploaded Image */}
        {uploadedImage && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300"
          >
            <Image
              src={uploadedImage}
              alt="Uploaded animal"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay: Predicted label */}
            {animalResult && (
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent"
              >
            <h1 className="text-3xl font-bold text-white mb-1">
                {animalResult.pred_label
                .split(' ')
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </h1>                <p className="text-gray-200 italic">
                  Confidence: {(animalResult.pred_conf * 100).toFixed(2)}%
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Encyclopedia Section */}
        {encyclopedia ? (
          <>
            {/* Nama ilmiah dan kategori */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="px-1 flex flex-row items-center justify-between"
            >
            <div className="flex flex-col">
              <p className="text-sm font-bold">Scientific Name:</p>
              <p className="text-gray-900">{encyclopedia.scientificName}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-bold">Category:</p>
              <p className="text-gray-900">{encyclopedia.category}</p>
            </div>
            </motion.div>
            {/* About */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-gray-100 rounded-2xl p-6 hover:scale-105 transition-all duration-300"
            >
              <h2 className="text-xl font-bold mb-4">About</h2>
              <div className="space-y-4 text-gray-600 text-justify">
                {encyclopedia.about.map((paragraph: string, index: number) => (
                  <motion.p 
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 + (index * 0.2) }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </>
        ) : (
          animalResult && (
            <div className="bg-gray-100 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">No encyclopedia data found for <span className="text-greenish">{animalResult.pred_label}</span></h2>
              <p className="text-gray-600">But you can still see the prediction and confidence above.</p>
            </div>
          )
        )}
      </div>
    </motion.div>
  );
}