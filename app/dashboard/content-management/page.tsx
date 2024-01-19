'use client'
import { useState } from "react"
import OverviewCard from "@/app/_components/overviewCard"

interface Tab {
  topics: boolean,
  models: boolean,
  experiments: boolean,
  videos: boolean
}

export default function ContentManagement() {
  const [tab, setTab] = useState<Tab>({
    topics:true,
    models:false,
    experiments:false,
    videos:false,
  })

  const data = [
    {
      title: 'Total Topics',
      quantity: 173,
      growth: null
    },
    {
      title: 'Total Models',
      quantity: 89,
      growth: null
    },
    {
      title: 'Experiments',
      quantity: 46,
      growth: null
    },
    {
      title: 'Total Videos',
      quantity: 102,
      growth: null
    },
  ]

  return (
    <>
      <div className='grid grid-cols-4 2xl:flex 2xl:flex-row 2xl:flex-wrap gap-5'>
        {data.map((item, index) => (
          <OverviewCard key={index} title={item.title} quantity={item.quantity} growth={item.growth} />
        ))}
      </div>
    </>
  )
}
