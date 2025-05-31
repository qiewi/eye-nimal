'use client'

import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards"
import { motion } from "framer-motion"

const row1 = [
  { name: 'Lion', emoji: '🦁' },
  { name: 'Wolf', emoji: '🐺' },
  { name: 'Raccoon', emoji: '🦝' },
  { name: 'Deer', emoji: '🦌' },
  { name: 'Monkey', emoji: '🐒' },
  { name: 'Cow', emoji: '🐮' },
]

const row2 = [
  { name: 'Fox', emoji: '🦊' },
  { name: 'Koala', emoji: '🐨' },
  { name: 'Tiger', emoji: '🐯' },
  { name: 'Horse', emoji: '🐎' },
  { name: 'Pig', emoji: '🐷' },
  { name: 'Bear', emoji: '🐻' },
]

const row3 = [
  { name: 'Panda', emoji: '🐼' },
  { name: 'Elephant', emoji: '🐘' },
  { name: 'Camel', emoji: '🐪' },
  { name: 'Penguin', emoji: '🐧' },
  { name: 'Giraffe', emoji: '🦒' },
  { name: 'Dog', emoji: '🐕' },
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

const AnimalsList = () => {
  return (
    <section className="w-full flex flex-col items-center px-6 pb-16">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl lg:text-4xl font-bold mb-12 text-center"
      >
        Our Animals List
      </motion.h2>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full flex flex-col items-center justify-center gap-2"
      >
        <motion.div variants={item} className="w-full overflow-hidden">
          <InfiniteMovingCards
            items={row1}
            direction="right"
            speed="normal"
          />
        </motion.div>
        <motion.div variants={item} className="w-full overflow-hidden">
          <InfiniteMovingCards
            items={row2}
            direction="left"
            speed="normal"
          />
        </motion.div>
        <motion.div variants={item} className="w-full overflow-hidden">
          <InfiniteMovingCards
            items={row3}
            direction="right"
            speed="normal"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default AnimalsList 