'use client'

import { motion } from 'framer-motion'
import { Search, Filter, Download, TrendingUp, TrendingDown, Eye } from 'lucide-react'
import { useState } from 'react'
import { useData } from '@/contexts/data-context'

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

const campaignData: Campaign[] = [
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

export function DataTable() {
  const { campaigns, isLoading } = useData()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<keyof Campaign>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const filteredData = (campaigns || []).filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.channel.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
    }
    
    return 0
  })

  const handleSort = (field: keyof Campaign) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'Paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'Completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  const exportToCSV = () => {
    if (!campaigns || campaigns.length === 0) return
    
    const headers = [
      'Campaign Name',
      'Status',
      'Channel',
      'Budget',
      'Spent',
      'Impressions',
      'Clicks',
      'Conversions',
      'CTR (%)',
      'CPC ($)',
      'ROAS'
    ]

    const csvData = sortedData.map(campaign => [
      campaign.name,
      campaign.status,
      campaign.channel,
      campaign.budget,
      campaign.spent,
      campaign.impressions,
      campaign.clicks,
      campaign.conversions,
      campaign.ctr,
      campaign.cpc,
      campaign.roas
    ])

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `campaign-data-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-card rounded-lg border p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Campaign Data</h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-muted/50 transition-colors">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button 
            onClick={exportToCSV}
            disabled={isLoading || !campaigns || campaigns.length === 0}
            className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th 
                className="text-left py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('name')}
              >
                Campaign Name
                {sortField === 'name' && (
                  sortDirection === 'asc' ? <TrendingUp className="inline ml-1 h-3 w-3" /> : <TrendingDown className="inline ml-1 h-3 w-3" />
                )}
              </th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Channel</th>
              <th 
                className="text-right py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('budget')}
              >
                Budget
                {sortField === 'budget' && (
                  sortDirection === 'asc' ? <TrendingUp className="inline ml-1 h-3 w-3" /> : <TrendingDown className="inline ml-1 h-3 w-3" />
                )}
              </th>
              <th 
                className="text-right py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('spent')}
              >
                Spent
                {sortField === 'spent' && (
                  sortDirection === 'asc' ? <TrendingUp className="inline ml-1 h-3 w-3" /> : <TrendingDown className="inline ml-1 h-3 w-3" />
                )}
              </th>
              <th 
                className="text-right py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('impressions')}
              >
                Impressions
                {sortField === 'impressions' && (
                  sortDirection === 'asc' ? <TrendingUp className="inline ml-1 h-3 w-3" /> : <TrendingDown className="inline ml-1 h-3 w-3" />
                )}
              </th>
              <th 
                className="text-right py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('clicks')}
              >
                Clicks
                {sortField === 'clicks' && (
                  sortDirection === 'asc' ? <TrendingUp className="inline ml-1 h-3 w-3" /> : <TrendingDown className="inline ml-1 h-3 w-3" />
                )}
              </th>
              <th 
                className="text-right py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('conversions')}
              >
                Conversions
                {sortField === 'conversions' && (
                  sortDirection === 'asc' ? <TrendingUp className="inline ml-1 h-3 w-3" /> : <TrendingDown className="inline ml-1 h-3 w-3" />
                )}
              </th>
              <th 
                className="text-right py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('roas')}
              >
                ROAS
                {sortField === 'roas' && (
                  sortDirection === 'asc' ? <TrendingUp className="inline ml-1 h-3 w-3" /> : <TrendingDown className="inline ml-1 h-3 w-3" />
                )}
              </th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((campaign, index) => (
              <motion.tr
                key={campaign.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b hover:bg-muted/30 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="font-medium text-foreground">{campaign.name}</div>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{campaign.channel}</td>
                <td className="py-3 px-4 text-right font-medium">{formatCurrency(campaign.budget)}</td>
                <td className="py-3 px-4 text-right">{formatCurrency(campaign.spent)}</td>
                <td className="py-3 px-4 text-right">{formatNumber(campaign.impressions)}</td>
                <td className="py-3 px-4 text-right">{formatNumber(campaign.clicks)}</td>
                <td className="py-3 px-4 text-right font-medium">{campaign.conversions}</td>
                <td className="py-3 px-4 text-right">
                  <span className={`font-medium ${
                    campaign.roas >= 4 ? 'text-green-600 dark:text-green-400' : 
                    campaign.roas >= 2 ? 'text-yellow-600 dark:text-yellow-400' : 
                    'text-white dark:text-white'
                  }`}>
                    {campaign.roas.toFixed(1)}x
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button className="p-1 hover:bg-muted rounded transition-colors">
                    <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {sortedData.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No campaigns found matching your search.</p>
        </div>
      )}
    </motion.div>
  )
}