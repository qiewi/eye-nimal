'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const creators = [
  {
    name: 'Khayla Belva',
    nim: '18222138',
    avatar: '/memojis/belva.png'
  },
  {
    name: 'Rizqi Andhika',
    nim: '18222118',
    avatar: '/memojis/qie.png'
  },
  {
    name: 'M. Maulana',
    nim: '18222140',
    avatar: '/memojis/maul.png'
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function Creators() {
  return (
    <div className="w-full flex flex-col items-center px-6">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl lg:text-7xl font-bold my-16"
      >
        Creators
      </motion.h1>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:mt-16 mb-16"
      >
        {creators.map((creator) => (
          <motion.div
            key={creator.nim}
            variants={item}
            className="flex flex-col items-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-54 h-54 mb-6">
              <Image
                src={creator.avatar}
                alt={creator.name}
                width={240}
                height={240}
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">{creator.name}</h2>
            <p className="text-gray-500 text-xl">{creator.nim}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
