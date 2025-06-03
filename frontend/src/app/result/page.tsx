"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const animalData = {
  name: "Kubung Sunda",
  scientificName: "Galeopterus variegatus",
  image: "/image.png",
  category: "Squirrel",
  about: [
    "Kubung Sunda, yang dikenal juga dengan nama ilmiah Galeopterus variegatus, adalah mamalia unik yang berasal dari Asia Tenggara, termasuk Indonesia, Malaysia, dan Thailand. Hewan ini sering disebut sebagai \"colugo\" atau \"flying lemur\", meskipun sebenarnya bukan lemur dan tidak benar-benar bisa terbang.",
    "Kubung Sunda memiliki selaput kulit yang membentang dari leher hingga ujung ekor dan di antara jari-jarinya, memungkinkan mereka untuk meluncur dari satu pohon ke pohon lain sejauh hingga 100 meter. Adaptasi ini sangat membantu mereka dalam mencari makanan dan menghindari predator di hutan tropis yang lebat.",
    "Selain kemampuan meluncurnya yang luar biasa, kubung Sunda juga dikenal sebagai hewan nokturnal yang aktif di malam hari. Mereka memakan daun, bunga, buah, dan kadang-kadang getah pohon. Tubuhnya yang ramping dan bulu berwarna cokelat keabu-abuan membuatnya sulit terlihat di antara pepohonan, memberikan perlindungan alami dari pemangsa. Sayangnya, habitat kubung Sunda semakin terancam akibat deforestasi dan perusakan hutan, sehingga keberadaannya kini menjadi perhatian dalam upaya konservasi satwa liar di Asia Tenggara."
  ]
};

export default function ResultPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full flex justify-center pt-10 pb-10"
    >
      <div className="w-full max-w-xl mx-auto px-4 space-y-6">
        {/* Image Container with Overlay Text */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300"
        >
          <Image
            src={animalData.image}
            alt={animalData.name}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay Text */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent"
          >
            <h1 className="text-3xl font-bold text-white mb-1">{animalData.name}</h1>
            <p className="text-gray-200 italic">{animalData.scientificName}</p>
          </motion.div>
        </motion.div>

        {/* Category Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="px-1"
        >
          <p className="text-sm font-bold">Category:</p>
          <p className="text-gray-900">{animalData.category}</p>
        </motion.div>

        {/* About Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gray-100 rounded-2xl p-6 hover:scale-105 transition-all duration-300"
        >
          <h2 className="text-xl font-bold mb-4">About</h2>
          <div className="space-y-4 text-gray-600 text-justify">
            {animalData.about.map((paragraph, index) => (
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
      </div>
    </motion.div>
  );
} 