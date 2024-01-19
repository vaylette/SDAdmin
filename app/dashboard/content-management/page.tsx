'use client'
import { useState } from "react"
import OverviewCard from "@/app/_components/overviewCard"
import { TabComponent, TabItem } from "@/app/_components/tab"

interface ContentTab {
  topics: boolean;
  models: boolean;
  experiments: boolean;
  videos: boolean;
  [key: string]: boolean;
}

export default function ContentManagement() {
  const [tab, setTab] = useState<ContentTab>({
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

  const tabList: TabItem<string>[] = [
    { name: 'Topics', tab: 'topics' },
    { name: 'Models', tab: 'models' },
    { name: 'Experiments', tab: 'experiments' },
    { name: 'Videos', tab: 'videos' },
  ];

  const handleActiveTab = (activeTab: keyof ContentTab): void => {
    setTab((prev) => ({
      topics: false,
      models: false,
      experiments: false,
      videos: false,
      [activeTab]: true,
    }));
  };

  return (
    <>
      <div className='flex flex-col'>
        <div className='grid grid-cols-4 2xl:flex 2xl:flex-row 2xl:flex-wrap gap-5'>
          {data.map((item, index) => (
            <OverviewCard key={index} title={item.title} quantity={item.quantity} growth={item.growth} />
          ))}
        </div>
        <div className='mt-9 w-full flex flex-row justify-between items-center'>
            <div className="flex flex-row items-center gap-9">
              <TabComponent tab={tab} tabList={tabList} handleActiveTab={handleActiveTab} />
            </div>
        </div>
      </div>
    </>
  )
}
