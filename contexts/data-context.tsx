'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface Campaign {
  id: string
  name: string
  status: 'Active' | 'Paused' | 'Completed'
  channel: string
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  cpc: number
  roas: number
}

interface MetricData {
  totalRevenue: number
  totalConversions: number
  averageROAS: number
  totalImpressions: number
  totalClicks: number
  averageCTR: number
}

interface ChartDataPoint {
  date: string
  online: number
  retail: number
}

interface BarChartDataPoint {
  month: string
  email: number
  social: number
  search: number
  display: number
}

interface DataContextType {
  // Filter states
  dateRange: string
  setDateRange: (value: string) => void
  selectedCampaign: string
  setSelectedCampaign: (value: string) => void
  selectedChannel: string
  setSelectedChannel: (value: string) => void
  
  // Data
  campaigns: Campaign[]
  metrics: MetricData
  chartData: ChartDataPoint[]
  barChartData: BarChartDataPoint[]
  
  // Actions
  resetFilters: () => void
  refreshData: () => void
  
  // Loading state
  isLoading: boolean
}

const DataContext = createContext<DataContextType | undefined>(undefined)

// Base campaign data
const baseCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Sale 2024',
    status: 'Active',
    channel: 'Google Ads',
    budget: 5000,
    spent: 3200,
    impressions: 125000,
    clicks: 2400,
    conversions: 180,
    ctr: 1.92,
    cpc: 1.33,
    roas: 4.2
  },
  {
    id: '2',
    name: 'Brand Awareness Q4',
    status: 'Active',
    channel: 'Facebook',
    budget: 3000,
    spent: 2800,
    impressions: 89000,
    clicks: 1560,
    conversions: 95,
    ctr: 1.75,
    cpc: 1.79,
    roas: 3.1
  },
  {
    id: '3',
    name: 'Product Launch',
    status: 'Completed',
    channel: 'Instagram',
    budget: 2500,
    spent: 2500,
    impressions: 67000,
    clicks: 1890,
    conversions: 142,
    ctr: 2.82,
    cpc: 1.32,
    roas: 5.8
  },
  {
    id: '4',
    name: 'Holiday Special',
    status: 'Paused',
    channel: 'LinkedIn',
    budget: 1500,
    spent: 890,
    impressions: 23000,
    clicks: 456,
    conversions: 28,
    ctr: 1.98,
    cpc: 1.95,
    roas: 2.9
  },
  {
    id: '5',
    name: 'Retargeting Campaign',
    status: 'Active',
    channel: 'Google Ads',
    budget: 4000,
    spent: 1200,
    impressions: 45000,
    clicks: 890,
    conversions: 67,
    ctr: 1.98,
    cpc: 1.35,
    roas: 6.2
  }
]

function generateVariation(base: number, variance: number = 0.2): number {
  const variation = (Math.random() - 0.5) * 2 * variance
  return Math.max(0, base * (1 + variation))
}

function generateChartData(days: number): ChartDataPoint[] {
  const data: ChartDataPoint[] = []
  const now = new Date()
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    // Generate realistic revenue data with trends
    const baseOnline = 15000 + Math.sin(i * 0.1) * 3000
    const baseRetail = 12000 + Math.cos(i * 0.15) * 2500
    
    data.push({
      date: date.toISOString().split('T')[0],
      online: Math.round(generateVariation(baseOnline, 0.3)),
      retail: Math.round(generateVariation(baseRetail, 0.25))
    })
  }
  
  return data
}

function generateBarChartData(campaigns: Campaign[]): BarChartDataPoint[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  const channelMap: { [key: string]: keyof Omit<BarChartDataPoint, 'month'> } = {
    'Google Ads': 'search',
    'Facebook': 'social',
    'Instagram': 'social',
    'LinkedIn': 'social',
    'Email': 'email'
  }
  
  return months.map(month => {
    const baseData = {
      month,
      email: generateVariation(2800, 0.3),
      social: generateVariation(2100, 0.3),
      search: generateVariation(3600, 0.3),
      display: generateVariation(1400, 0.3)
    }
    
    // Apply filter effects based on selected campaigns
    if (campaigns.length > 0) {
      const channelMultipliers = { email: 1, social: 1, search: 1, display: 1 }
      
      campaigns.forEach(campaign => {
        const channelKey = channelMap[campaign.channel] || 'display'
        channelMultipliers[channelKey] *= (campaign.roas / 4) // Normalize around 4.0 ROAS
      })
      
      baseData.email = Math.round(baseData.email * channelMultipliers.email)
      baseData.social = Math.round(baseData.social * channelMultipliers.social)
      baseData.search = Math.round(baseData.search * channelMultipliers.search)
      baseData.display = Math.round(baseData.display * channelMultipliers.display)
    }
    
    return baseData
  })
}

function generateCampaignData(dateRange: string, campaign: string, channel: string): Campaign[] {
  let filteredCampaigns = [...baseCampaigns]
  
  // Apply campaign filter
  if (campaign !== 'all') {
    const campaignMap: { [key: string]: string } = {
      'summer-sale': 'Summer Sale 2024',
      'brand-awareness': 'Brand Awareness Q4',
      'product-launch': 'Product Launch'
    }
    filteredCampaigns = filteredCampaigns.filter(c => c.name === campaignMap[campaign])
  }
  
  // Apply channel filter
  if (channel !== 'all') {
    const channelMap: { [key: string]: string } = {
      'google-ads': 'Google Ads',
      'facebook': 'Facebook',
      'instagram': 'Instagram',
      'linkedin': 'LinkedIn'
    }
    filteredCampaigns = filteredCampaigns.filter(c => c.channel === channelMap[channel])
  }
  
  // Apply date range variations
  const dateMultiplier = dateRange === '7d' ? 0.7 : dateRange === '90d' ? 1.3 : 1
  
  return filteredCampaigns.map(campaign => ({
    ...campaign,
    spent: Math.round(generateVariation(campaign.spent * dateMultiplier, 0.15)),
    impressions: Math.round(generateVariation(campaign.impressions * dateMultiplier, 0.2)),
    clicks: Math.round(generateVariation(campaign.clicks * dateMultiplier, 0.18)),
    conversions: Math.round(generateVariation(campaign.conversions * dateMultiplier, 0.25)),
    ctr: Number((generateVariation(campaign.ctr, 0.1)).toFixed(2)),
    cpc: Number((generateVariation(campaign.cpc, 0.12)).toFixed(2)),
    roas: Number((generateVariation(campaign.roas, 0.15)).toFixed(1))
  }))
}

function calculateMetrics(campaigns: Campaign[]): MetricData {
  const totalRevenue = campaigns.reduce((sum, c) => sum + (c.conversions * c.roas * c.cpc), 0)
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0)
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0)
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0)
  const averageROAS = campaigns.length > 0 ? campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length : 0
  const averageCTR = campaigns.length > 0 ? campaigns.reduce((sum, c) => sum + c.ctr, 0) / campaigns.length : 0
  
  return {
    totalRevenue: Math.round(totalRevenue),
    totalConversions,
    averageROAS: Number(averageROAS.toFixed(1)),
    totalImpressions,
    totalClicks,
    averageCTR: Number(averageCTR.toFixed(2))
  }
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [dateRange, setDateRange] = useState('30d')
  const [selectedCampaign, setSelectedCampaign] = useState('all')
  const [selectedChannel, setSelectedChannel] = useState('all')
  const [isLoading, setIsLoading] = useState(false)
  
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [metrics, setMetrics] = useState<MetricData>({
    totalRevenue: 0,
    totalConversions: 0,
    averageROAS: 0,
    totalImpressions: 0,
    totalClicks: 0,
    averageCTR: 0
  })
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [barChartData, setBarChartData] = useState<BarChartDataPoint[]>([])
  
  const refreshData = useCallback(() => {
    setIsLoading(true)
    
    // Simulate API call delay
    setTimeout(() => {
      const newCampaigns = generateCampaignData(dateRange, selectedCampaign, selectedChannel)
      const newMetrics = calculateMetrics(newCampaigns)
      const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90
      const newChartData = generateChartData(days)
      const newBarChartData = generateBarChartData(newCampaigns)
      
      setCampaigns(newCampaigns)
      setMetrics(newMetrics)
      setChartData(newChartData)
      setBarChartData(newBarChartData)
      setIsLoading(false)
    }, 500)
  }, [dateRange, selectedCampaign, selectedChannel])
  
  const resetFilters = useCallback(() => {
    setDateRange('30d')
    setSelectedCampaign('all')
    setSelectedChannel('all')
  }, [])
  
  // Initial data load and filter changes
  useEffect(() => {
    refreshData()
  }, [refreshData])
  
  // Auto-refresh every 2-3 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData()
    }, 150000) // 2.5 minutes
    
    return () => clearInterval(interval)
  }, [refreshData])
  
  const value: DataContextType = {
    dateRange,
    setDateRange,
    selectedCampaign,
    setSelectedCampaign,
    selectedChannel,
    setSelectedChannel,
    campaigns,
    metrics,
    chartData,
    barChartData,
    resetFilters,
    refreshData,
    isLoading
  }
  
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}