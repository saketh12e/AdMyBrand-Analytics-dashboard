'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Bell, User, Menu, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import { Input } from './ui/input'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

export function Header() {
  const { theme, setTheme } = useTheme()
  const [notifications] = useState(3)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Image 
                  src="/logo/admybrand_logo.jpeg" 
                  alt="ADmyBRAND Logo" 
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground">Insights</h1>
                <p className="text-xs text-muted-foreground">Modern Analytics for Ambitious Brands</p>
              </div>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex flex-1 max-w-md mx-8"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search campaigns, metrics, or insights..."
                className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-brand-green"
              />
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center space-x-4"
          >
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hover:bg-muted"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative hover:bg-muted">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full group">
                    <Avatar className="h-8 w-8 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-brand-green/25">
                      <AvatarImage 
                        src="/avatars/memoji-avatar.svg" 
                        alt="User Memoji" 
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-brand-green to-brand-gold text-white font-semibold transition-all duration-300 group-hover:from-brand-gold group-hover:to-brand-green">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-green/20 to-brand-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john@admybrand.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  )
}