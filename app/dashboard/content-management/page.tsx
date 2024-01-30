'use client'
import { useState, useEffect } from "react"
import { TabComponent, TabItem } from "@/app/_components/tab"
import DataTable from "@/app/_components/datatable"
import { createColumnHelper } from "@tanstack/react-table"
import { useRetrieveData } from "@/app/constants/hooks"
import toast from "react-hot-toast"
import { apiUrls } from "@/app/constants/apiUrls"
import { Topic, Model, Experiment, Video } from "@/app/types/types"
import Modal from "@/app/_components/modal"
import CreateTopic from "./(crud)/create-topic"

interface ContentTab {
  topics: boolean
  models: boolean
  experiments: boolean
  videos: boolean
  [key: string]: boolean
}

interface Modal {
  create: boolean,
  edit: boolean
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
    videos: [],
    subjects: [],
    levels: []
  })

  const [modal, setModal] = useState<Modal>({
    create: false,
    edit: false
  })

  const handleModal = (modalType: string): void => {
    setModal((prev) => ({ ...prev, [modalType]: true }))
  }

  const handleModalClose = (): void => {
    setModal({ create: false, edit: false })
    getData()
  }

  const retrieveData = useRetrieveData()

  const [tableData, setTableData] = useState([])

  const columnHelper = createColumnHelper()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const [topicsResult, modelsResult, experimentsResult, videosResult, subjectsResult, levelsResult] = await Promise.all([
        retrieveData(`${apiUrls.getTopics}`),
        retrieveData(`${apiUrls.getModels}`),
        retrieveData(`${apiUrls.getExperiments}`),
        retrieveData(`${apiUrls.getVideos}`),
        retrieveData(`${apiUrls.getSubjects}`),
        retrieveData(`${apiUrls.getLevels}`),
      ])
      setData(prev => ({
        ...prev,
        topics: topicsResult,
        models: modelsResult,
        experiments: experimentsResult,
        videos: videosResult,
        subjects: subjectsResult,
        levels: levelsResult
      }))
    } catch (error: any) {
      toast.error(error)
    } finally{}
  }

  const topics: Topic[] = data?.topics?.map((item) => {
    const itemAsTopic = item as Topic;
    return {
      ref_no: '',
      name: itemAsTopic.name,
      subject: itemAsTopic.subject.name, 
      level: itemAsTopic.level.name, 
      syllabus: itemAsTopic.syllabus,
      sections: itemAsTopic.sections.length,
      action: null
    }
  })

  const models: Model[] = data?.models?.map((item) => {
    const itemAsModel = item as Model;
    return {
      ref_no: '',
      name: itemAsModel.name,
      level: itemAsModel.level, 
      subject: itemAsModel.subject,
      topic: itemAsModel.topic,
      action: null
    }
  })

  const experiments: Experiment[] = data?.experiments?.map((item) => {
    const itemAsExperiment = item as Experiment;
    return {
      ref_no: '',
      name: itemAsExperiment.name,
      level: itemAsExperiment.level, 
      subject: itemAsExperiment.subject,
      topic: itemAsExperiment.topic,
      action: null
    }
  })

  const videos: Video[] = data?.videos?.map((item) => {
    const itemAsVideo = item as Video;
    return {
      ref_no: '',
      name: itemAsVideo.name,
      level: itemAsVideo.level, 
      subject: itemAsVideo.subject,
      topic: itemAsVideo.topic,
      video_link: itemAsVideo.video_link,
      action: null
    }
  })

  const topicsColumns = [
    columnHelper.accessor('ref_no', {
      header: () => 'REF NO',
      cell: (info) => (info.row.index + 1 + "").padStart(2, "0"),
      size: 5,
    }),
    columnHelper.accessor('name', {
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
    columnHelper.accessor('syllabus', {
      header: () => 'Curriculum',
      cell: info => info.getValue(),
      size: 30,
    }),
    columnHelper.accessor('sections', {
      header: () => 'Sections',
      cell: info => info.getValue(),
      size: 30,
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
  
  const modelsColumns = [
    columnHelper.accessor('ref_no', {
      header: () => 'REF NO',
      cell: (info) => (info.row.index + 1 + "").padStart(2, "0"),
      size: 5,
    }),
    columnHelper.accessor('name', {
      header: () => 'Model Name',
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
    columnHelper.accessor('topic', {
      header: () => 'Topic',
      cell: info => info.getValue(),
      size: 30,
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

  const experimentsColumns = [
    columnHelper.accessor('ref_no', {
      header: () => 'REF NO',
      cell: (info) => (info.row.index + 1 + "").padStart(2, "0"),
      size: 5,
    }),
    columnHelper.accessor('name', {
      header: () => 'Experiment Name',
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
    columnHelper.accessor('topic', {
      header: () => 'Topic',
      cell: info => info.getValue(),
      size: 30,
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

  const videoColumns = [
    columnHelper.accessor('ref_no', {
      header: () => 'REF NO',
      cell: (info) => (info.row.index + 1 + "").padStart(2, "0"),
      size: 5,
    }),
    columnHelper.accessor('name', {
      header: () => 'Video Name',
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
    columnHelper.accessor('topic', {
      header: () => 'Topic',
      cell: info => info.getValue(),
      size: 30,
    }),
    columnHelper.accessor('video_link', {
      header: () => 'Video Link',
      cell: info => info.getValue(),
      size: 30,
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

  const tabList: TabItem<string>[] = [
    { name: 'Topics', tab: 'topics', columns: topicsColumns },
    { name: 'Models', tab: 'models', columns: modelsColumns },
    { name: 'Experiments', tab: 'experiments', columns: experimentsColumns },
    { name: 'Videos', tab: 'videos', columns: videoColumns },
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

return (
  <>
    <div className='flex flex-col'>
      <div className='grid grid-cols-4 2xl:flex 2xl:flex-row 2xl:flex-wrap gap-5'>
        <div className='w-[263px] h-[200px] bg-overview bg-white-default rounded-[10px] flex justify-center relative py-14'>
          <div className='flex flex-col px-[76px] gap-2'>
            <span className='text-black-100 text-[20px] font-medium leading-[25px] text-center'>Total Topics</span>
          </div>
          <div className='absolute bottom-2'>
            <span className='text-orange-default text-[50px] font-bold text-center'>{data ? data.topics.length : '0'}</span>
          </div>
        </div>
        <div className='w-[263px] h-[200px] bg-overview bg-white-default rounded-[10px] flex justify-center relative py-14'>
          <div className='flex flex-col px-[66px] gap-2'>
            <span className='text-black-100 text-[20px] font-medium leading-[25px] text-center'>Total Models</span>
          </div>
          <div className='absolute bottom-2'>
            <span className='text-orange-default text-[50px] font-bold text-center'>{data ? data.models.length : '0'}</span>
          </div>
        </div>
        <div className='w-[263px] h-[200px] bg-overview bg-white-default rounded-[10px] flex justify-center relative py-14'>
          <div className='flex flex-col px-[76px] gap-2'>
            <span className='text-black-100 text-[20px] font-medium leading-[25px] text-center'>Experiments</span>
          </div>
          <div className='absolute bottom-2'>
            <span className='text-orange-default text-[50px] font-bold text-center'>{data ? data.experiments.length : '0'}</span>
          </div>
        </div>
        <div className='w-[263px] h-[200px] bg-overview bg-white-default rounded-[10px] flex justify-center relative py-14'>
          <div className='flex flex-col px-[76px] gap-2'>
            <span className='text-black-100 text-[20px] font-medium leading-[25px] text-center'>Total Videos</span>
          </div>
          <div className='absolute bottom-2'>
            <span className='text-orange-default text-[50px] font-bold text-center'>{data ? data.videos.length : '0'}</span>
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
          <button onClick={() => handleModal('create')} className='w-[178px] h-[60px] rounded-[5px] bg-orange-default text-white-default flex items-center justify-center'>Add Topic +</button>
        )}
      </div>
      <div className='mt-5'>
        {tab.topics && <DataTable columns={topicsColumns} data={topics} />} 
        {tab.models && <DataTable columns={modelsColumns} data={models} />} 
        {tab.experiments && <DataTable columns={experimentsColumns} data={experiments} />} 
        {tab.videos && <DataTable columns={videoColumns} data={videos} />} 
      </div>
    </div>
    {modal.create && (
      <Modal onClose={handleModalClose} title={tab.topics ? 'Add Topic' : 'Add'}>
        {tab.topics && <CreateTopic subjects={data?.subjects} levels={data?.levels} onRefresh={handleModalClose} />}
      </Modal>
    )}

  </>
  )
}
