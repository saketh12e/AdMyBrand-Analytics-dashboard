'use client'

import React, { useState, useEffect } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LineChart, Line, Sector } from 'recharts'
import { TrendingUp, Sparkles, Zap } from 'lucide-react'
import { PieSectorDataItem } from 'recharts/types/polar/Pie'
import { useData } from '../contexts/data-context'

// Sample data for charts
const performanceData = [
  { month: 'Jan', revenue: 45000, conversions: 320, users: 2400 },
  { month: 'Feb', revenue: 52000, conversions: 380, users: 2800 },
  { month: 'Mar', revenue: 48000, conversions: 350, users: 2600 },
  { month: 'Apr', revenue: 61000, conversions: 420, users: 3200 },
  { month: 'May', revenue: 58000, conversions: 390, users: 3000 },
  { month: 'Jun', revenue: 67000, conversions: 450, users: 3400 },
  { month: 'Jul', revenue: 72000, conversions: 480, users: 3600 },
  { month: 'Aug', revenue: 69000, conversions: 460, users: 3500 },
  { month: 'Sep', revenue: 75000, conversions: 520, users: 3800 },
  { month: 'Oct', revenue: 82000, conversions: 580, users: 4200 },
  { month: 'Nov', revenue: 78000, conversions: 540, users: 4000 },
  { month: 'Dec', revenue: 85000, conversions: 620, users: 4500 },
]

// Interactive Line Chart Data - Brand Conversions
const lineChartData = [
  { date: "2024-04-01", online: 62500, retail: 44500 },
  { date: "2024-04-02", online: 59000, retail: 46000 },
  { date: "2024-04-03", online: 67000, retail: 42500 },
  { date: "2024-04-04", online: 72500, retail: 51000 },
  { date: "2024-04-05", online: 76000, retail: 57500 },
  { date: "2024-04-06", online: 80500, retail: 61500 },
  { date: "2024-04-07", online: 71000, retail: 49000 },
  { date: "2024-04-08", online: 86000, retail: 66000 },
  { date: "2024-04-09", online: 52500, retail: 38000 },
  { date: "2024-04-10", online: 65500, retail: 46000 },
  { date: "2024-04-11", online: 82000, retail: 63000 },
  { date: "2024-04-12", online: 73500, retail: 53500 },
  { date: "2024-04-13", online: 84500, retail: 67000 },
  { date: "2024-04-14", online: 61000, retail: 45000 },
  { date: "2024-04-15", online: 57000, retail: 41000 },
  { date: "2024-04-16", online: 59500, retail: 43500 },
  { date: "2024-04-17", online: 93000, retail: 71000 },
  { date: "2024-04-18", online: 89000, retail: 68500 },
  { date: "2024-04-19", online: 68000, retail: 50500 },
  { date: "2024-04-20", online: 54000, retail: 39500 },
  { date: "2024-04-21", online: 62500, retail: 47500 },
  { date: "2024-04-22", online: 64000, retail: 46500 },
  { date: "2024-04-23", online: 66500, retail: 52000 },
  { date: "2024-04-24", online: 90500, retail: 64500 },
  { date: "2024-04-25", online: 72000, retail: 56000 },
  { date: "2024-04-26", online: 50000, retail: 37000 },
  { date: "2024-04-27", online: 94500, retail: 74000 },
  { date: "2024-04-28", online: 58500, retail: 45000 },
  { date: "2024-04-29", online: 79000, retail: 59000 },
  { date: "2024-04-30", online: 98500, retail: 75500 },
  { date: "2024-05-01", online: 64000, retail: 49000 },
  { date: "2024-05-02", online: 80500, retail: 60000 },
  { date: "2024-05-03", online: 69500, retail: 52000 },
  { date: "2024-05-04", online: 91500, retail: 69500 },
  { date: "2024-05-05", online: 101500, retail: 76500 },
  { date: "2024-05-06", online: 104000, retail: 79000 },
  { date: "2024-05-07", online: 87500, retail: 64000 },
  { date: "2024-05-08", online: 61000, retail: 47500 },
  { date: "2024-05-09", online: 66500, retail: 50500 },
  { date: "2024-05-10", online: 82000, retail: 62500 },
  { date: "2024-05-11", online: 84500, retail: 61500 },
  { date: "2024-05-12", online: 68000, retail: 53000 },
  { date: "2024-05-13", online: 65000, retail: 46500 },
  { date: "2024-05-14", online: 100000, retail: 80500 },
  { date: "2024-05-15", online: 97000, retail: 73500 },
  { date: "2024-05-16", online: 86000, retail: 67000 },
  { date: "2024-05-17", online: 102500, retail: 78000 },
  { date: "2024-05-18", online: 80500, retail: 61500 },
  { date: "2024-05-19", online: 71000, retail: 52000 },
  { date: "2024-05-20", online: 64000, retail: 49000 },
  { date: "2024-05-21", online: 52500, retail: 39500 },
  { date: "2024-05-22", online: 51500, retail: 38000 },
  { date: "2024-05-23", online: 73500, retail: 57500 },
  { date: "2024-05-24", online: 77500, retail: 56000 },
  { date: "2024-05-25", online: 69500, retail: 54500 },
  { date: "2024-05-26", online: 66500, retail: 47500 },
  { date: "2024-05-27", online: 96000, retail: 76500 },
  { date: "2024-05-28", online: 72000, retail: 53000 },
  { date: "2024-05-29", online: 50000, retail: 38000 },
  { date: "2024-05-30", online: 83500, retail: 62500 },
  { date: "2024-05-31", online: 65000, retail: 50500 },
  { date: "2024-06-01", online: 65000, retail: 49000 },
  { date: "2024-06-02", online: 98500, retail: 75000 },
  { date: "2024-06-03", online: 55500, retail: 43500 },
  { date: "2024-06-04", online: 94500, retail: 71000 },
  { date: "2024-06-05", online: 52500, retail: 41000 },
  { date: "2024-06-06", online: 77500, retail: 57500 },
  { date: "2024-06-07", online: 82000, retail: 64000 },
  { date: "2024-06-08", online: 89000, retail: 67000 },
  { date: "2024-06-09", online: 96000, retail: 73500 },
  { date: "2024-06-10", online: 62500, retail: 49000 },
  { date: "2024-06-11", online: 54000, retail: 42500 },
  { date: "2024-06-12", online: 101500, retail: 76500 },
  { date: "2024-06-13", online: 51500, retail: 39500 },
  { date: "2024-06-14", online: 93000, retail: 69500 },
  { date: "2024-06-15", online: 80500, retail: 62500 },
  { date: "2024-06-16", online: 87500, retail: 65500 },
  { date: "2024-06-17", online: 100000, retail: 79000 },
  { date: "2024-06-18", online: 57000, retail: 45000 },
  { date: "2024-06-19", online: 83500, retail: 61500 },
  { date: "2024-06-20", online: 91500, retail: 71000 },
  { date: "2024-06-21", online: 64000, retail: 50500 },
  { date: "2024-06-22", online: 79000, retail: 58500 },
  { date: "2024-06-23", online: 102500, retail: 80500 },
  { date: "2024-06-24", online: 59500, retail: 46500 },
  { date: "2024-06-25", online: 61000, retail: 47500 },
  { date: "2024-06-26", online: 94500, retail: 69500 },
  { date: "2024-06-27", online: 97000, retail: 76500 },
  { date: "2024-06-28", online: 62500, retail: 49000 },
  { date: "2024-06-29", online: 55500, retail: 43500 },
  { date: "2024-06-30", online: 96000, retail: 72500 },
]

const lineChartConfig = {
  views: {
    label: "Revenue Performance",
  },
  online: {
    label: "Digital Revenue",
    color: "#3B82F6",
  },
  retail: {
    label: "Physical Revenue",
    color: "#06B6D4",
  },
}

const channelData = [
  { name: 'Google Ads', value: 35, color: '#3B82F6' },
  { name: 'Facebook', value: 28, color: '#1D4ED8' },
  { name: 'Instagram', value: 20, color: '#06B6D4' },
  { name: 'LinkedIn', value: 12, color: '#0891B2' },
  { name: 'Others', value: 5, color: '#1E40AF' },
]

// Brand conversion data for admybrand strategy
const channelConversionsData = [
  { name: "Product Purchases", value: 2847, color: "#3B82F6" },
  { name: "Newsletter Signups", value: 1923, color: "#1D4ED8" },
  { name: "Brand Partnerships", value: 1156, color: "#06B6D4" },
  { name: "Premium Subscriptions", value: 834, color: "#0891B2" },
  { name: "Referral Conversions", value: 567, color: "#1E40AF" },
]

// Advanced Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95,
    rotateX: -15
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    rotateX: 5,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
}

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { 
    opacity: [0, 0.5, 0],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

function ChartPieDonutActive() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([])
  const controls = useAnimation()
  
  useEffect(() => {
    if (isHovered) {
      // Generate floating particles on hover
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 300,
        y: Math.random() * 250
      }))
      setParticles(newParticles)
      
      controls.start({
        scale: [1, 1.05, 1],
        rotate: [0, 2, 0],
        transition: { duration: 0.6, ease: "easeInOut" }
      })
    } else {
      setParticles([])
    }
  }, [isHovered, controls])
  
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }
  
  const renderActiveShape = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props
    const RADIAN = Math.PI / 180
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 15) * cos
    const sy = cy + (outerRadius + 15) * sin
    const mx = cx + (outerRadius + 35) * cos
    const my = cy + (outerRadius + 35) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? 'start' : 'end'

    return (
      <g>
        {/* Much smaller center text with theme-aware colors */}
        <text 
          x={cx} 
          y={cy - 6} 
          textAnchor="middle" 
          fill="hsl(var(--foreground))" 
          className="font-semibold"
          style={{
            fontSize: 'clamp(8px, 1.5vw, 11px)',
            fontWeight: '600',
            textShadow: 'var(--theme) === "dark" ? "1px 1px 2px rgba(255,255,255,0.1)" : "1px 1px 2px rgba(0,0,0,0.3)"',
            wordBreak: 'break-word',
            maxWidth: '100px'
          }}
        >
          {payload.name}
        </text>
        <text 
          x={cx} 
          y={cy + 6} 
          textAnchor="middle" 
          fill="hsl(var(--muted-foreground))" 
          className="font-normal"
          style={{
            fontSize: 'clamp(6px, 1.2vw, 9px)',
            textShadow: 'var(--theme) === "dark" ? "1px 1px 1px rgba(255,255,255,0.1)" : "1px 1px 1px rgba(0,0,0,0.2)"'
          }}
        >
          {value}
        </text>
        
        {/* Main sector with enhanced glow */}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 15}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          style={{
            filter: 'drop-shadow(0 0 8px rgba(45, 80, 22, 0.4))',
            transition: 'all 0.3s ease'
          }}
        />
        
        {/* Outer ring with pulse effect */}
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 17}
          outerRadius={outerRadius + 22}
          fill={fill}
          opacity={0.6}
          style={{
            filter: 'blur(1px)',
            animation: 'pulse 2s infinite'
          }}
        />
        
        {/* Enhanced connection line */}
        <path 
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} 
          stroke={fill} 
          strokeWidth={2}
          fill="none"
          style={{
            filter: 'drop-shadow(0 0 4px rgba(45, 80, 22, 0.3))'
          }}
        />
        
        {/* Glowing connection point */}
        <circle 
          cx={ex} 
          cy={ey} 
          r={3} 
          fill={fill} 
          stroke="white" 
          strokeWidth={2}
          style={{
            filter: 'drop-shadow(0 0 6px rgba(45, 80, 22, 0.5))'
          }}
        />
        
        {/* Much smaller text labels with enhanced theme visibility */}
        <text 
          x={ex + (cos >= 0 ? 1 : -1) * 12} 
          y={ey} 
          textAnchor={textAnchor} 
          fill="hsl(var(--foreground))" 
          className="font-medium"
          style={{
            fontSize: 'clamp(9px, 1.8vw, 12px)',
            fontWeight: '500',
            textShadow: 'var(--theme) === "dark" ? "1px 1px 2px rgba(255,255,255,0.2)" : "1px 1px 2px rgba(0,0,0,0.4)"',
            filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.2))'
          }}
        >
          {`${value} conversions`}
        </text>
        <text 
          x={ex + (cos >= 0 ? 1 : -1) * 12} 
          y={ey + 12} 
          textAnchor={textAnchor} 
          fill="hsl(var(--muted-foreground))" 
          className="font-normal"
          style={{
            fontSize: 'clamp(7px, 1.4vw, 10px)',
            textShadow: 'var(--theme) === "dark" ? "1px 1px 1px rgba(255,255,255,0.1)" : "1px 1px 1px rgba(0,0,0,0.3)"'
          }}
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </g>
    )
  }
  
  return (
    <motion.div 
      className="bg-gradient-to-br from-slate-900 via-blue-900/20 to-black rounded-xl border border-blue-500/20 p-6 shadow-2xl backdrop-blur-sm relative overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        background: 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--card))/95% 100%)',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-600/10 rounded-xl"
        variants={glowVariants}
        initial="initial"
        animate="animate"
      />
      
      {/* Floating particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-green-400 rounded-full"
            style={{ left: particle.x, top: particle.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -20, -40]
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
      
      <motion.div 
        className="text-center mb-6 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.h3 
          className="text-xl font-bold text-foreground mb-2 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Sparkles className="h-5 w-5 text-yellow-500" />
          AdMyBrand Conversion Analytics
        </motion.h3>
        <p className="text-muted-foreground text-sm">January - July 2025</p>
      </motion.div>
      
      <motion.div
        animate={controls}
        className="relative z-10"
      >
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={channelConversionsData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
              animationBegin={0}
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {channelConversionsData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  style={{
                    filter: activeIndex === index ? 'brightness(1.2) drop-shadow(0 0 10px rgba(45, 80, 22, 0.4))' : 'brightness(1)',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
      
      <motion.div 
        className="mt-6 space-y-2 text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <motion.div 
          className="flex items-center justify-center gap-2 leading-none font-medium text-foreground text-sm"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Trending up by 8.7% this month 
          <motion.div
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <TrendingUp className="h-4 w-4 text-green-500" />
          </motion.div>
        </motion.div>
        <div className="text-muted-foreground leading-none text-sm">
          Tracking brand engagement and conversion performance metrics
        </div>
      </motion.div>
    </motion.div>
  )
}

const monthlyMetrics = [
  { month: 'Jan', campaigns: 12, leads: 450, sales: 28 },
  { month: 'Feb', campaigns: 15, leads: 520, sales: 35 },
  { month: 'Mar', campaigns: 18, leads: 480, sales: 32 },
  { month: 'Apr', campaigns: 22, leads: 680, sales: 45 },
  { month: 'May', campaigns: 20, leads: 620, sales: 42 },
  { month: 'Jun', campaigns: 25, leads: 750, sales: 52 },
]

// Enhanced chart data for campaign metrics
const campaignMetricsData = [
  { month: 'Jan', email: 2400, social: 1800, search: 3200, display: 1200 },
  { month: 'Feb', email: 2800, social: 2200, search: 3600, display: 1400 },
  { month: 'Mar', email: 2200, social: 1900, search: 2800, display: 1100 },
  { month: 'Apr', email: 3100, social: 2400, search: 4200, display: 1600 },
  { month: 'May', email: 2900, social: 2100, search: 3800, display: 1300 },
  { month: 'Jun', email: 3400, social: 2600, search: 4500, display: 1800 },
]

// Interactive Line Chart Component
function InteractiveLineChart() {
  const { chartData, isLoading } = useData()
  const [activeChart, setActiveChart] = useState<'online' | 'retail'>('online')
  const [realtimeData, setRealtimeData] = useState(chartData || lineChartData)
  const [animatedTotals, setAnimatedTotals] = useState({ online: 0, retail: 0 })
  
  const total = React.useMemo(
    () => ({
      online: realtimeData.reduce((acc, curr) => acc + curr.online, 0),
      retail: realtimeData.reduce((acc, curr) => acc + curr.retail, 0),
    }),
    [realtimeData]
  )

  // Update data when context data changes
  useEffect(() => {
    if (chartData && chartData.length > 0) {
      setRealtimeData(chartData)
    }
  }, [chartData])

  // Real-time data updates every minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading && realtimeData && realtimeData.length > 0) {
        setRealtimeData(prevData => 
          prevData.map(item => ({
            ...item,
            online: Math.floor(item.online * (0.95 + Math.random() * 0.1)),
            retail: Math.floor(item.retail * (0.95 + Math.random() * 0.1))
          }))
        )
      }
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [isLoading, realtimeData])

  // Smooth number animation
  useEffect(() => {
    const animateToTarget = (key: 'online' | 'retail', target: number) => {
      const start = animatedTotals[key]
      const duration = 1500
      const startTime = Date.now()
      
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3)
        const current = Math.floor(start + (target - start) * easeOutCubic)
        
        setAnimatedTotals(prev => ({ ...prev, [key]: current }))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
    }
    
    animateToTarget('online', total.online)
    animateToTarget('retail', total.retail)
  }, [total, animatedTotals])
  
  return (
    <motion.div
      className="bg-gradient-to-br from-card via-card to-card/90 rounded-xl border border-border/50 shadow-2xl backdrop-blur-sm relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--card))/95% 100%)',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #2D5016 2px, transparent 2px), radial-gradient(circle at 80% 50%, #B8860B 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      {/* Header with toggle buttons */}
      <div className="flex flex-col items-stretch border-b border-border/50 sm:flex-row relative z-10">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-4 sm:py-6">
          <motion.h3 
            className="text-xl font-bold text-foreground mb-1 flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="h-5 w-5 text-blue-500" />
            </motion.div>
            AdMyBrand Revenue Performance
          </motion.h3>
          <p className="text-muted-foreground text-sm">Real-time digital and physical revenue tracking</p>
        </div>
        <div className="flex">
          {(['online', 'retail'] as const).map((key) => {
            const isActive = activeChart === key
            return (
              <motion.button
                key={key}
                layout
                initial={false}
                onClick={() => setActiveChart(key)}
                className={`flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6 transition-all duration-300 ${
                  isActive ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400' : 'hover:bg-blue-500/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  layout: { duration: 0.2, ease: "easeInOut" },
                  scale: { duration: 0.15 },
                  backgroundColor: { duration: 0.3 }
                }}
              >
                <span className="text-muted-foreground text-xs">
                  {lineChartConfig[key].label}
                </span>
                <motion.span 
                  className="text-lg leading-none font-bold sm:text-3xl"
                  animate={{
                    color: isActive ? lineChartConfig[key].color : 'hsl(var(--foreground))'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span
                    key={Math.floor(animatedTotals[key] / 100)}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {animatedTotals[key].toLocaleString()}
                  </motion.span>
                </motion.span>
              </motion.button>
            )
          })}
        </div>
      </div>
      
      {/* Chart Content */}
      <div className="px-2 sm:p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={isLoading ? [] : realtimeData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <defs>
                <linearGradient id="blueGradient-online" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
                  <stop offset="50%" stopColor="#1D4ED8" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#1E40AF" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="blueGradient-retail" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity={1} />
                  <stop offset="50%" stopColor="#0891B2" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#0E7490" stopOpacity={0.6} />
                </linearGradient>
                <filter id="blueGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid 
                vertical={false} 
                stroke="#e2e8f0" 
                strokeDasharray="3 3"
                opacity={0.6}
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
                  backdropFilter: 'blur(10px)'
                }}
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                }}
                formatter={(value, name) => [
                  `${value.toLocaleString()} conversions`,
                  lineChartConfig[name as keyof typeof lineChartConfig]?.label || name
                ]}
              />
              <Line
                dataKey={activeChart}
                type="monotone"
                stroke={`url(#blueGradient-${activeChart})`}
                strokeWidth={2}
                dot={false}
                filter="url(#blueGlow)"
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Custom Bar Component with Advanced Animations
const AnimatedBar = ({ fill, ...props }: any) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.rect
      {...props}
      fill={fill}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ scaleY: 0, originY: 1 }}
      animate={{ 
        scaleY: 1,
        filter: isHovered ? 'brightness(1.2) drop-shadow(0 0 8px rgba(45, 80, 22, 0.4))' : 'brightness(1)',
        y: isHovered ? -2 : 0
      }}
      transition={{ 
        scaleY: { duration: 0.8, ease: "easeOut", delay: Math.random() * 0.5 },
        filter: { duration: 0.3 },
        y: { duration: 0.2, type: "spring", stiffness: 300 }
      }}
      style={{
        transformOrigin: 'bottom',
        cursor: 'pointer'
      }}
    />
  )
}

export function Charts() {
  const { chartData, barChartData, isLoading } = useData()
  const [hoveredChart, setHoveredChart] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 relative"
      onMouseMove={handleMouseMove}
    >
      {/* Floating cursor glow effect */}
      <motion.div
        className="fixed w-32 h-32 bg-gradient-radial from-green-400/20 to-transparent rounded-full pointer-events-none z-0"
        style={{
          left: mousePosition.x - 64,
          top: mousePosition.y - 64,
        }}
        animate={{
          scale: hoveredChart ? 1.5 : 0,
          opacity: hoveredChart ? 0.6 : 0
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Interactive Line Chart */}
      <div className="lg:col-span-2 xl:col-span-2">
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          onHoverStart={() => setHoveredChart('line')}
          onHoverEnd={() => setHoveredChart(null)}
        >
          <InteractiveLineChart />
        </motion.div>
      </div>

      {/* Enhanced Donut Chart */}
      <div>
        <motion.div
          variants={cardVariants}
          onHoverStart={() => setHoveredChart('donut')}
          onHoverEnd={() => setHoveredChart(null)}
          className="h-full"
        >
          <ChartPieDonutActive />
        </motion.div>
      </div>

      {/* Ultra-Enhanced Interactive Bar Chart */}
      <div className="lg:col-span-2 xl:col-span-3">
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          onHoverStart={() => setHoveredChart('bar')}
          onHoverEnd={() => setHoveredChart(null)}
          className="bg-gradient-to-br from-slate-900 via-blue-900/20 to-black rounded-xl border border-blue-500/20 p-6 shadow-2xl backdrop-blur-sm relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--card))/95% 100%)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Dynamic background waves */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              background: 'linear-gradient(45deg, transparent 30%, #2D5016 50%, transparent 70%)'
            }}
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 relative z-10"
          >
            <motion.h3 
              className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="h-6 w-6 text-yellow-500" />
              </motion.div>
              Campaign Performance by Channel
            </motion.h3>
            <p className="text-muted-foreground text-sm">Advanced analytics with real-time insights - 2024</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-10"
          >
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="emailGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1E40AF" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  </linearGradient>
                  <linearGradient id="socialGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#FBBF24" stopOpacity={0.8}/>
                  </linearGradient>
                  <linearGradient id="searchGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0EA5E9" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity={0.8}/>
                  </linearGradient>
                  <linearGradient id="displayGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EA580C" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#FB923C" stopOpacity={0.8}/>
                  </linearGradient>
                  <filter id="barGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <CartesianGrid 
                  vertical={false} 
                  stroke="#e2e8f0" 
                  strokeDasharray="3 3"
                  opacity={0.6}
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={15}
                  axisLine={false}
                  stroke="#64748b"
                  fontSize={13}
                  fontWeight={500}
                />
                <YAxis 
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{
                    fill: 'rgba(45, 80, 22, 0.1)',
                    radius: 8,
                  }}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <Legend 
                  wrapperStyle={{
                    paddingTop: '20px'
                  }}
                />
                <Bar 
                  dataKey="email" 
                  fill="url(#emailGradient)" 
                  radius={[4, 4, 0, 0]}
                  name="Email Marketing"
                  filter="url(#barGlow)"
                  animationDuration={1000}
                  animationEasing="ease-out"
                />
                <Bar 
                  dataKey="social" 
                  fill="url(#socialGradient)" 
                  radius={[4, 4, 0, 0]}
                  name="Social Media"
                  filter="url(#barGlow)"
                  animationDuration={1200}
                  animationEasing="ease-out"
                />
                <Bar 
                  dataKey="search" 
                  fill="url(#searchGradient)" 
                  radius={[4, 4, 0, 0]}
                  name="Search Ads"
                  filter="url(#barGlow)"
                  animationDuration={1400}
                  animationEasing="ease-out"
                />
                <Bar 
                  dataKey="display" 
                  fill="url(#displayGradient)" 
                  radius={[4, 4, 0, 0]}
                  name="Display Ads"
                  filter="url(#barGlow)"
                  animationDuration={1600}
                  animationEasing="ease-out"
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
          
          <motion.div 
            className="mt-8 space-y-3 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.div 
              className="flex items-center justify-center gap-3 leading-none font-semibold text-foreground text-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  background: 'linear-gradient(90deg, #1E40AF, #F59E0B, #0EA5E9, #EA580C, #1E40AF)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Campaign ROI increased by 12.4% this month
              </motion.span>
              <motion.div
                animate={{ 
                  rotate: [0, 15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <TrendingUp className="h-5 w-5 text-green-500" />
              </motion.div>
            </motion.div>
            <div className="text-muted-foreground leading-none text-sm text-center">
              Real-time performance metrics across all marketing channels with advanced analytics
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}