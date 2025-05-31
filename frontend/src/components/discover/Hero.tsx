'use client'

import { Button } from '@/components/ui/button'
import { Camera, Import } from 'iconsax-reactjs'

const Hero = () => {
  return (
    <section className="w-full flex flex-col items-center text-center px-6 pt-8 lg:pt-16">
      <h2 className="text-4xl mb-2">Snap a photo</h2>
      <h1 className="text-xl lg:text-7xl font-bold mb-8">
        Discover the <span className="text-greenish">Animal</span>
      </h1>
      
      <div className="w-full max-w-2xl p-6 rounded-3xl border border-gray-200 bg-white shadow-sm">
        <Button 
          className="w-full mb-4 bg-[image:var(--color-button-green)] text-xl rounded-xl hover:bg-[image:var(--color-button-green-hover)]"
          size="xl"
        >
          <Camera size={24} />
          Take a Picture
        </Button>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="h-[1px] flex-1 bg-gray-200" />
          <span className="text-gray-500">or</span>
          <div className="h-[1px] flex-1 bg-gray-200" />
        </div>

        <Button 
          className="w-full bg-[image:var(--color-button-yellow)] text-xl rounded-xl hover:bg-[image:var(--color-button-yellow-hover)]"
          size="xl"
        >
          <Import size={24} />
          Upload Image
        </Button>
      </div>
    </section>
  )
}

export default Hero 