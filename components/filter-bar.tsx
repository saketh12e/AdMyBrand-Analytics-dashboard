'use client'

import { motion } from 'framer-motion'
import { Calendar, Filter, RotateCcw } from 'lucide-react'
import { useData } from '@/contexts/data-context'

export function FilterBar() {
  const {
    dateRange,
    setDateRange,
    selectedCampaign,
    setSelectedCampaign,
    selectedChannel,
    setSelectedChannel,
    resetFilters,
    isLoading
  } = useData()
  const dateRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom range' },
  ]

  const campaigns = [
    { value: 'all', label: 'All Campaigns' },
    { value: 'summer-sale', label: 'Summer Sale 2024' },
    { value: 'brand-awareness', label: 'Brand Awareness' },
    { value: 'product-launch', label: 'Product Launch' },
  ]

  const channels = [
    { value: 'all', label: 'All Channels' },
    { value: 'google-ads', label: 'Google Ads' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'linkedin', label: 'LinkedIn' },
  ]



  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card rounded-lg border p-4 shadow-sm"
    >
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Filters:</span>
        </div>

        {/* Date Range */}
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            disabled={isLoading}
            className="text-sm border border-input bg-background px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {dateRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Campaign */}
        <div>
          <select
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
            disabled={isLoading}
            className="text-sm border border-input bg-background px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {campaigns.map((campaign) => (
              <option key={campaign.value} value={campaign.value}>
                {campaign.label}
              </option>
            ))}
          </select>
        </div>

        {/* Channel */}
        <div>
          <select
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
            disabled={isLoading}
            className="text-sm border border-input bg-background px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {channels.map((channel) => (
              <option key={channel.value} value={channel.value}>
                {channel.label}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetFilters}
          disabled={isLoading}
          className="inline-flex items-center px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </button>
      </div>
    </motion.div>
  )
}