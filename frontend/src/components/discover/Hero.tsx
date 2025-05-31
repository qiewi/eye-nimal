'use client'

import { Button } from '@/components/ui/button'
import { Camera, Import } from 'iconsax-reactjs'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="w-full flex flex-col items-center text-center px-6 pt-8 lg:pt-16">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl lg:text-4xl mb-2 font-medium"
      >
        Snap a photo
      </motion.h2>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-5xl lg:text-7xl font-bold mb-8"
      >
        Discover the <span className="text-greenish">Animal</span>
      </motion.h1>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="w-full max-w-2xl p-6 rounded-3xl border border-gray-200 bg-white shadow-xl"
      >
        <div className="group w-full mb-4">
          <Button 
            className="w-full bg-[image:var(--color-button-green)] text-xl rounded-xl transition-all duration-300"
            size="xl"
          >
            <Camera size={24} />
            Take a Picture
          </Button>
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="h-[1px] flex-1 bg-gray-200" />
          <span className="text-gray-500">or</span>
          <div className="h-[1px] flex-1 bg-gray-200" />
        </div>

        <div className="group w-full">
          <Button 
            className="w-full bg-[image:var(--color-button-yellow)] text-xl rounded-xl transition-all duration-300"
            size="xl"
          >
            <Import size={24} />
            Upload Image
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero 