'use client'
import { useState, useEffect } from "react"
import { TabComponent, TabItem } from "@/app/_components/tab"
import DataTable from "@/app/_components/datatable"
import { createColumnHelper } from "@tanstack/react-table"
import { useRetrieveData } from "@/app/constants/hooks"
import toast from "react-hot-toast"
import { apiUrls } from "@/app/constants/apiUrls"

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
  level: string | number,
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

  const [data, setData] = useState({
    topics: [],
    models: [],
    experiments: [],
    videos: []
  })

  const retrieveData = useRetrieveData()

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
    
  ]

  const columnHelper = createColumnHelper<Topic>()

  const columns = [
    columnHelper.accessor('ref_no', {
      header: () => 'REF NO',
      cell: (info) => (info.row.index + 1 + "").padStart(2, "0"),
      size: 5,
    }),
    columnHelper.accessor('topic_name', {
      header: () => 'Topic Name',
      cell: info => info.getValue(),
      size: 10,
    }),
    columnHelper.accessor('subject', {
      header: () => 'Subject',
      cell: info => info.getValue(),
      size: 10,
    }),
    columnHelper.accessor('level', {
      header: () => 'Level',
      cell: info => info.getValue(),
      size: 10,
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
      size: 10,
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

  const [tableData, setTableData] = useState(() => [...topics])

  useEffect(() => {
    getData()
  })

  const getData = async () => {
    try {
      const [topicsResult] = await Promise.all([
        retrieveData(`${apiUrls.topics}`)
      ])
      setData(prev => ({
        ...prev,
        topics: topicsResult
      }))
    } catch (error: any) {
      toast.error(error)
    } finally{

    }
  }

  console.log(data)

  return (
    <>
      <div className='flex flex-col'>
        <div className='grid grid-cols-4 2xl:flex 2xl:flex-row 2xl:flex-wrap gap-5'>
          <div className='w-[263px] h-[200px] bg-overview bg-white-default rounded-[10px] flex justify-center relative py-14'>
            <div className='flex flex-col px-[76px] gap-2'>
              <span className='text-black-100 text-[20px] font-medium leading-[25px] text-center'>Total Topics</span>
            </div>
            <div className='absolute bottom-2'>
              <span className='text-orange-default text-[50px] font-bold text-center'></span>
            </div>
          </div>
          <div className='w-[263px] h-[200px] bg-overview bg-white-default rounded-[10px] flex justify-center relative py-14'>
            <div className='flex flex-col px-[66px] gap-2'>
              <span className='text-black-100 text-[20px] font-medium leading-[25px] text-center'>Total Models</span>
            </div>
            <div className='absolute bottom-2'>
              <span className='text-orange-default text-[50px] font-bold text-center'></span>
            </div>
          </div>
          <div className='w-[263px] h-[200px] bg-overview bg-white-default rounded-[10px] flex justify-center relative py-14'>
            <div className='flex flex-col px-[76px] gap-2'>
              <span className='text-black-100 text-[20px] font-medium leading-[25px] text-center'>Experiments</span>
            </div>
            <div className='absolute bottom-2'>
              <span className='text-orange-default text-[50px] font-bold text-center'></span>
            </div>
          </div>
          <div className='w-[263px] h-[200px] bg-overview bg-white-default rounded-[10px] flex justify-center relative py-14'>
            <div className='flex flex-col px-[76px] gap-2'>
              <span className='text-black-100 text-[20px] font-medium leading-[25px] text-center'>Total Videos</span>
            </div>
            <div className='absolute bottom-2'>
              <span className='text-orange-default text-[50px] font-bold text-center'></span>
            </div>
          </div>
        </div>
        <div className='mt-9 w-full flex flex-row justify-between items-center'>
          <div className="flex flex-row items-center gap-9">
            <TabComponent tab={tab} tabList={tabList} handleActiveTab={handleActiveTab} />
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                <path d="M15 15L22 22M9.16667 17.3333C4.65634 17.3333 1 13.677 1 9.16667C1 4.65634 4.65634 1 9.16667 1C13.677 1 17.3333 4.65634 17.3333 9.16667C17.3333 13.677 13.677 17.3333 9.16667 17.3333Z" stroke="#FF9D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          {tab.topics && (
            <button className='w-[178px] h-[60px] rounded-[5px] bg-orange-default text-white-default flex items-center justify-center'>Add Topic +</button>
          )}
        </div>
        <div className='mt-5'>
            <DataTable columns={columns} data={tableData} />
        </div>
      </div>
    </>
  )
}
