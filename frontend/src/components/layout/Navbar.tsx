'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Pet, Brush } from 'iconsax-reactjs'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: 'Discover', href: '/', icon: <Pet size={24} className='text-gray-400'/> },
    { name: 'Creators', href: '/creators', icon: <Brush size={24} className='text-gray-400'/> },
  ]

  const isActive = (path: string) => {
    if (path === '/' && (pathname === '/' || pathname === '/identifying')) {
      return true;
    }
    return pathname === path;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-greyish shadow-sm lg:shadow-none border-b border-gray-100 py-2 lg:py-4">
      <div className="px-6 lg:px-12">
        <div className="flex h-16 gap-8 justify-between md:justify-start">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="lg:text-4xl text-2xl font-bold">
              <span>Eye</span>
              <span className="text-greenish">Nimal</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="inline-flex items-center px-1 pt-1 text-2xl hover:scale-105 transition-all duration-300 font-bold text-black group"
              >
                <span className="relative">
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 w-full h-0.5 bg-greenish transform origin-left transition-transform duration-300 ease-out
                    ${isActive(item.href) ? 'scale-x-100' : 'scale-x-0'} 
                    group-hover:scale-x-100`}
                  />
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="sm:hidden overflow-hidden bg-greyish"
          >
            <motion.div 
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="pt-2 pb-3 space-y-1 px-2"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 pl-3 pr-4 py-2 text-2xl text-black font-bold group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="relative">
                      {item.name}
                      <span
                        className={`absolute -bottom-1 left-0 w-full h-0.5 bg-greenish transform origin-left transition-transform duration-300 ease-out
                        ${isActive(item.href) ? 'scale-x-100' : 'scale-x-0'} 
                        group-hover:scale-x-100`}
                      />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar 