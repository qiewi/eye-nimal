'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Camera, Import } from 'iconsax-reactjs'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

const Hero = () => {
  const [isCapturing, setIsCapturing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Convert file to base64
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        localStorage.setItem('uploadedImage', base64String)
        router.push('/identifying')
      }
      reader.readAsDataURL(file)
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCapturing(true)
      }
    } catch (err) {
      console.error('Error accessing camera:', err)
      alert('Unable to access camera. Please make sure you have granted camera permissions.')
    }
  }

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0)
        // Convert the canvas to base64 and store it
        const base64Image = canvas.toDataURL('image/jpeg')
        localStorage.setItem('uploadedImage', base64Image)
        stopCamera()
        router.push('/identifying')
      }
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      videoRef.current.srcObject = null
      setIsCapturing(false)
    }
  }

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
        className="text-5xl lg:text-7xl font-bold mb-12"
      >
        Discover the <span className="text-greenish">Animal</span>
      </motion.h1>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="w-full max-w-2xl p-6 rounded-3xl border border-gray-200 bg-white shadow-xl"
      >
        {isCapturing ? (
          <div className="space-y-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-xl"
            />
            <div className="flex gap-4">
              <Button 
                className="flex-1 bg-[image:var(--color-button-green)] text-xl rounded-xl transition-all duration-300"
                size="xl"
                onClick={capturePhoto}
              >
                <Camera size={24} />
                Capture
              </Button>
              <Button 
                className="flex-1 bg-red-500 text-xl rounded-xl transition-all duration-300"
                size="xl"
                onClick={stopCamera}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="group w-full mb-4">
              <Button 
                className="w-full bg-[image:var(--color-button-green)] text-xl rounded-xl transition-all duration-300"
                size="xl"
                onClick={startCamera}
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
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button 
                className="w-full bg-[image:var(--color-button-yellow)] text-xl rounded-xl transition-all duration-300"
                size="xl"
                onClick={() => fileInputRef.current?.click()}
              >
                <Import size={24} />
                Upload Image
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </section>
  )
}

export default Hero 