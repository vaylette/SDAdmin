'use client'
import { useState } from "react"
import OverviewCard from "@/app/_components/overviewCard"
import { TabComponent, TabItem } from "@/app/_components/tab"
import DataTable from "@/app/_components/datatable"
import { createColumnHelper } from "@tanstack/react-table"

interface ContentTab {
  topics: boolean
  models: boolean
  experiments: boolean
  videos: boolean
  [key: string]: boolean
}

type Topic = {
  ref_no: string | number | null | undefined
  topic_name: string,
  subject: string,
  level: string,
  curriculum: string,
  sections: string | number,
  questions: string | number,
  uploaded: string | number,
  action: null
}

export default function ContentManagement() {
  const [tab, setTab] = useState<ContentTab>({
    topics:true,
    models:false,
    experiments:false,
    videos:false,
  })

  const overviewData = [
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
  ]

  const handleActiveTab = (activeTab: keyof ContentTab): void => {
    setTab((prev) => ({
      topics: false,
      models: false,
      experiments: false,
      videos: false,
      [activeTab]: true,
    }))
  }

  const topics: Topic[] = [
    {
      ref_no: '',
      topic_name: 'Carlos Mtibwa',
      subject: 'carlos@gmail.com',
      level: '255765381198',
      curriculum: 'Admin',
      sections: 'Level 1',
      questions: 184,
      uploaded: 'SmartDarasa',
      action: null
    },
    {
      ref_no: '',
      topic_name: 'Samwel Yanga',
      subject: 'samwel@gmail.com',
      level: '255765381198',
      curriculum: 'Teacher',
      sections: 'Level 1',
      questions: 184,
      uploaded: 'SmartDarasa',
      action: null
    },
    {
      ref_no: '',
      topic_name: 'Zulfa Ihefu',
      subject: 'zulfa@gmail.com',
      level: '255765381198',
      curriculum: 'Admin',
      sections: 'Level 1',
      questions: 184,
      uploaded: 'SmartDarasa',
      action: null
    },
    {
      ref_no: '',
      topic_name: 'Fetty Simba',
      subject: 'fetty@gmail.com',
      level: '255765381198',
      curriculum: 'Teacher',
      sections: 'Level 1',
      questions: 184,
      uploaded: 'SmartDarasa',
      action: null
    },
    {
      ref_no: '',
      topic_name: 'Sajidu Mlandege',
      subject: 'sajidu@gmail.com',
      level: '255765381198',
      curriculum: 'Admin, Teacher',
      sections: 'Level 1',
      questions: 184,
      uploaded: 'SmartDarasa',
      action: null
    },
    {
      ref_no: '',
      topic_name: 'Dany Mashujaa',
      subject: 'dany@gmail.com',
      level: '255765381198',
      curriculum: 'Admin, Teacher',
      sections: 'Level 1',
      questions: 184,
      uploaded: 'SmartDarasa',
      action: null
    },
    {
      ref_no: '',
      topic_name: 'Jean Yanga',
      subject: 'jean@gmail.com',
      level: '255765381198',
      curriculum: 'Teacher',
      sections: 'Level 1',
      questions: 184,
      uploaded: 'SmartDarasa',
      action: null
    },
    {
      ref_no: '',
      topic_name: 'Abdul Arsenal',
      subject: 'abdul@gmail.com',
      level: '255765381198',
      curriculum: 'Admin',
      sections: 'Level 1',
      questions: 184,
      uploaded: 'SmartDarasa',
      action: null
    },
    {
      ref_no: '',
      topic_name: 'Waissa Mwaisa',
      subject: 'waissa@gmail.com',
      level: '255765381198',
      curriculum: 'Admin, Teacher',
      sections: 'Level 1',
      questions: 184,
      uploaded: 'SmartDarasa',
      action: null
    },
  ]

  const columnHelper = createColumnHelper<Topic>()

  const columns = [
    columnHelper.accessor('ref_no', {
      header: () => 'REF NO',
      cell: (info) => (info.row.index + 1 + "").padStart(2, "0"),
      size: 20,
    }),
    columnHelper.accessor('topic_name', {
      header: () => 'Topic Name',
      cell: info => info.getValue(),
      size: 30,
    }),
    columnHelper.accessor('subject', {
      header: () => 'Subject',
      cell: info => info.getValue(),
      size: 30,
    }),
    columnHelper.accessor('level', {
      header: () => 'Level',
      cell: info => info.getValue(),
      size: 30,
    }),
    columnHelper.accessor('curriculum', {
      header: () => 'Curriculum',
      cell: info => info.getValue(),
      size: 30,
    }),
    columnHelper.accessor('sections', {
      header: () => 'Sections',
      cell: info => info.getValue(),
      size: 30,
    }),
    columnHelper.accessor('questions', {
      header: () => 'Questions',
      cell: info => info.getValue(),
      size: 30,
    }),
    columnHelper.accessor('uploaded', {
      header: () => 'Uploader',
      cell: info => info.getValue()
    }),
    columnHelper.accessor('action', {
      header: () => '',
      cell: (info) => (
        <>
          <div className='flex flex-row gap-6 font-medium'>
            <button className='text-orange-default'>Edit</button>
            <button className='text-red-default'>Restrict</button>
          </div>
        </>
      )
    }),
  ]

  const [data, setData] = useState(() => [...topics])

  return (
    <>
      <div className='flex flex-col'>
        <div className='grid grid-cols-4 2xl:flex 2xl:flex-row 2xl:flex-wrap gap-5'>
          {overviewData.map((item, index) => (
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
        <div className='mt-5'>
            <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  )
}
