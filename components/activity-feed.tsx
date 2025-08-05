'use client'

import { motion } from 'framer-motion'
import { Clock, User, TrendingUp, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

function AvatarWithFallback({ src, alt, fallbackText, className }: {
  src: string
  alt: string
  fallbackText: string
  className: string
}) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  if (imageError) {
    return (
      <div className={`${className} bg-gradient-to-br from-brand-green to-brand-gold flex items-center justify-center text-white font-semibold text-xs sm:text-sm`}>
        {fallbackText}
      </div>
    )
  }

  return (
    <div className="relative">
      <Image
        src={src}
        alt={alt}
        width={40}
        height={40}
        className={className}
        onError={handleImageError}
        onLoad={handleImageLoad}
        style={{ opacity: imageLoaded ? 1 : 0 }}
      />
      {!imageLoaded && (
        <div className={`${className} bg-gradient-to-br from-brand-green to-brand-gold flex items-center justify-center text-white font-semibold text-xs sm:text-sm absolute inset-0`}>
          {fallbackText}
        </div>
      )}
    </div>
  )
}

const activities = [
  {
    id: 1,
    user: 'Sarah Chen',
    action: 'Updated campaign "Summer Sale 2024"',
    time: '2 minutes ago',
    icon: TrendingUp,
    color: 'text-brand-green',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 2,
    user: 'Mike Johnson',
    action: 'Created new audience segment',
    time: '15 minutes ago',
    icon: User,
    color: 'text-brand-gold',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 3,
    user: 'Emma Wilson',
    action: 'Budget alert triggered for Campaign X',
    time: '1 hour ago',
    icon: AlertCircle,
    color: 'text-red-500',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 4,
    user: 'David Lee',
    action: 'Generated monthly report',
    time: '2 hours ago',
    icon: Clock,
    color: 'text-brand-gray',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
]

export function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-card rounded-lg border shadow-sm"
    >
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon
            
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start space-x-3 p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <AvatarWithFallback
                    src={activity.avatar}
                    alt={activity.user}
                    fallbackText={activity.user.split(' ').map(n => n[0]).join('')}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground truncate">
                      {activity.user}
                    </p>
                    <div className={`p-1 sm:p-1.5 rounded-full bg-muted ${activity.color} flex-shrink-0 ml-2`}>
                      <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
        
        <button className="w-full mt-4 px-3 py-2 text-xs sm:text-sm text-brand-green hover:text-brand-green/80 hover:bg-brand-green/5 rounded-lg transition-all duration-200 font-medium">
          View all activity
        </button>
      </div>
    </motion.div>
  )
}