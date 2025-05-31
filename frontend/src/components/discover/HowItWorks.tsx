'use client'

import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Camera from '@/../public/emojis/camera.png'
import Search from '@/../public/emojis/search.png'
import Animal from '@/../public/emojis/animal.png'

const steps = [
  {
    icon: Camera,
    title: 'Snap and upload photo',
    description: 'Take a photo or upload a picture of an animal you are curious with'
  },
  {
    icon: Search,
    title: 'Identify the photo',
    description: 'Send the photo to our machine learning model for identification'
  },
  {
    icon: Animal,
    title: 'Discover the animal details',
    description: 'Get the detailed result of the animal picture you provided us with'
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

const HowItWorks = () => {
  return (
    <section className="w-full flex flex-col items-center px-6 py-16">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl lg:text-4xl font-bold mb-8 text-center"
      >
        How Eyenimal Works
      </motion.h2>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl"
      >
        {steps.map((step, index) => (
          <motion.div key={index} variants={item} animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 0.5 }}>
            <Card className="bg-white border-gray-200 lg:max-w-[240px] rounded-3xl shadow-xl flex-1 hover:scale-105 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-start text-center gap-4">
                  <div className="p-4 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                    <Image 
                      src={step.icon}
                      alt={step.title}
                      width={64}
                      height={64}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-left">{step.title}</h3>
                  <p className="text-gray-500 text-md text-left">{step.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default HowItWorks 