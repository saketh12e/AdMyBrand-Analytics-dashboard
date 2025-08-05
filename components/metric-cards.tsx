'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, Target, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils'
import { useData } from '@/contexts/data-context'

export function MetricCards() {
  const { metrics: dataMetrics, isLoading } = useData()
  
  const metrics = [
    {
      title: 'Revenue',
      value: isLoading ? 0 : dataMetrics?.totalRevenue || 284750,
      change: 12.5,
      icon: DollarSign,
      format: 'currency',
      color: 'text-brand-green',
    },
    {
      title: 'Impressions',
      value: isLoading ? 0 : dataMetrics?.totalImpressions || 45230,
      change: 8.2,
      icon: Users,
      format: 'number',
      color: 'text-brand-gold',
    },
    {
      title: 'Conversions',
      value: isLoading ? 0 : dataMetrics?.totalConversions || 3420,
      change: -2.1,
      icon: Target,
      format: 'number',
      color: 'text-brand-gray',
    },
    {
      title: 'ROAS',
      value: isLoading ? 0 : dataMetrics?.averageROAS || 4.2,
      change: 4.3,
      icon: TrendingUp,
      format: 'decimal',
      color: 'text-brand-green-light',
    },
  ]
  const formatValue = (value: number, format: string) => {
    if (isLoading) return '...'
    
    switch (format) {
      case 'currency':
        return formatCurrency(value)
      case 'percentage':
        return formatPercentage(value)
      case 'decimal':
        return `${value.toFixed(1)}x`
      case 'number':
        return formatPercentage(value)
      default:
        return formatNumber(value)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        const isPositive = metric.change > 0
        
        return (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Card className="card-hover border-0 shadow-lg bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                </motion.div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {formatValue(metric.value, metric.format)}
                </div>
                <div className="flex items-center text-xs">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      isPositive
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {isPositive ? '+' : ''}{metric.change}%
                  </span>
                  <span className="ml-2 text-muted-foreground">vs last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}