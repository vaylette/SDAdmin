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
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                  <path d="M15 15L22 22M9.16667 17.3333C4.65634 17.3333 1 13.677 1 9.16667C1 4.65634 4.65634 1 9.16667 1C13.677 1 17.3333 4.65634 17.3333 9.16667C17.3333 13.677 13.677 17.3333 9.16667 17.3333Z" stroke="#FF9D0D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            {tab.topics && (
              <button className='w-[178px] h-[60px] rounded-[5px] bg-orange-default text-white-default flex items-center justify-center'>Add Topic +</button>
            )}
        </div>
      </div>
    </>
  )
}
