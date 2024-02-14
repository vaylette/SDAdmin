'use client'
import { useState, useEffect, useRef } from "react"
import { TabComponent, TabItem } from "@/app/_components/tab"
import DataTable from "@/app/_components/datatable"
import { createColumnHelper } from "@tanstack/react-table"
import { useRetrieveData } from "@/app/constants/hooks"
import toast from "react-hot-toast"
import { apiUrls } from "@/app/constants/apiUrls"
import { Topic, Model, Experiment, Video } from "@/app/types/types"
import Modal from "@/app/_components/modal"
import CreateTopic from "./(crud)/create-topic"
import CustomModal from "@/app/_components/aside-modal/aside-modal"

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
    topics: true,
    models: false,
    experiments: false,
    videos: false,
  })

  const [data, setData] = useState({
    topics: [],
    models: [],
    experiments: [],
    videos: [],
    subjects: [],
    levels: [],
    syllabus: [{ name: "Cambridge", _id: "0" }, { name: "NECTA", _id: "0" }, { name: "Montessori", _id: "2" }]
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
    } finally { }
  }

  const topics: Topic[] = data?.topics?.map((item) => {
    const itemAsTopic = item as Topic;
    return {
      ref_no: '',
      _id: itemAsTopic._id,
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

  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown menu

  // Toggle dropdown function
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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
    // columnHelper.accessor('sections', {
    //   header: () => 'Sections',
    //   cell: info => info.getValue(),
    //   size: 30,
    // }),
    // columnHelper.accessor('questions', {
    //   header: () => 'Questions',
    //   cell: info => info.getValue(),
    //   size: 30,
    // }),
    // columnHelper.accessor('uploader', {
    //   header: () => 'Uploader',
    //   cell: info => info.getValue(),
    //   size: 30,
    // }),
    columnHelper.accessor('action', {
      header: () => '',
      cell: (info) => (
        <>
          <div className='flex flex-row gap-6 font-medium'>
            <a href={`/dashboard/content-management/${topics[info.row.index]._id}`} className='text-orange-default flex items-center gap-2'>
              <span>Sections</span>
            </a>
            <div className="border-l h-6" style={{ borderColor: "#FFA500" }}></div>
            <a href="#" className='text-orange-default flex items-center gap-2'>
              <span>Questions</span>
            </a>
            <div className="relative inline-block text-left">
              <div onClick={toggleDropdown} className="flex items-center gap-2 cursor-pointer">
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 16" fill="none">
                  <path d="M1 14C1 14.5523 1.44772 15 2 15C2.55228 15 3 14.5523 3 14C3 13.4477 2.55228 13 2 13C1.44772 13 1 13.4477 1 14Z" fill="#7A7A7A" />
                  <path d="M1 8C1 8.55228 1.44772 9 2 9C2.55228 9 3 8.55228 3 8C3 7.44772 2.55228 7 2 7C1.44772 7 1 7.44772 1 8Z" fill="#7A7A7A" />
                  <path d="M1 2C1 2.55228 1.44772 3 2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2Z" fill="#7A7A7A" />
                  <path d="M1 14C1 14.5523 1.44772 15 2 15C2.55228 15 3 14.5523 3 14C3 13.4477 2.55228 13 2 13C1.44772 13 1 13.4477 1 14Z" stroke="#7A7A7A" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1 8C1 8.55228 1.44772 9 2 9C2.55228 9 3 8.55228 3 8C3 7.44772 2.55228 7 2 7C1.44772 7 1 7.44772 1 8Z" stroke="#7A7A7A" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1 2C1 2.55228 1.44772 3 2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2Z" stroke="#7A7A7A" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {dropdownOpen && (
                <div className={`${dropdownOpen ? 'absolute inset-0 bg-black-100 bg-blend-multiply z-50' : 'hidden'}`}>
                  <CustomDropDown dismiss={toggleDropdown} />
                </div>
              )}
            </div>
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
      <div className='flex flex-col gap-5'>
        <div className='grid grid-cols-4 2xl:flex 2xl:flex-row 2xl:flex-wrap gap-5'>
          <OverviewCard title="Total Topics" count={data ? data.topics.length : '0'} />
          <OverviewCard title="Total Models" count={data ? data.models.length : '0'} />
          <OverviewCard title="Experiments" count={data ? data.experiments.length : '0'} />
          <OverviewCard title="Total Videos" count={data ? data.videos.length : '0'} />

        </div>
        <div className='mt-9 w-full flex flex-row justify-between items-center'>
          <div className="flex flex-row items-center gap-9">
            <TabComponent tab={tab} tabList={tabList} handleActiveTab={handleActiveTab} />
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                <path d="M15 15L22 22M9.16667 17.3333C4.65634 17.3333 1 13.677 1 9.16667C1 4.65634 4.65634 1 9.16667 1C13.677 1 17.3333 4.65634 17.3333 9.16667C17.3333 13.677 13.677 17.3333 9.16667 17.3333Z" stroke="#FF9D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          {tab.topics && (
            <button onClick={() => handleModal('create')} className='w-[178px] h-[60px] rounded-[5px] bg-orange-default text-white-default flex items-center justify-center'>Add Topic +</button>
          )}
        </div>
        <div className='mt-5'>
          {tab.topics && (
            <DataTable columns={topicsColumns} data={topics} />
          )}
          {tab.models && <DataTable columns={modelsColumns} data={models} />}
          {tab.experiments && <DataTable columns={experimentsColumns} data={experiments} />}
          {tab.videos && <DataTable columns={videoColumns} data={videos} />}
        </div>

      </div>

      {modal.create && (
        <CustomModal isOpen={modal.create} onClose={handleModalClose} title={tab.topics ? 'Add Topic' : 'Add'} subtitle={""}>
          {tab.topics && <CreateTopic subjects={data?.subjects} levels={data?.levels} syllabus={data?.syllabus} onRefresh={handleModalClose} />}
        </CustomModal>
      )}

    </>
  )
}


export const OverviewCard = ({ title, count }) => {
  return (
    <div className='h-[200px] bg-overview bg-white-default rounded-[10px] flex justify-center relative py-14'>
      <div className='flex flex-col px-[76px] gap-2'>
        <span className='text-black-100 text-[20px] font-medium leading-[25px] text-center'>{title}</span>
      </div>
      <div className='absolute bottom-2'>
        <span className='text-orange-default text-[50px] font-bold text-center'>{count}</span>
      </div>
    </div>
  );
}


interface Props {
  dismiss: () => void;
}

export const CustomDropDown: React.FC<Props> = ({ dismiss }) => {
  const userProfileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userProfileRef.current && !userProfileRef.current.contains(event.target as Node)) {
        dismiss();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dismiss]);
  return (<>
    <div ref={userProfileRef} className="absolute">
      <div className="h-auto rounded-lg bg-white-default shadow-drop relative">
        <div className="absolute -top-[6px] right-8 w-[13.24px] h-[13.24px] bg-white-default" style={{ transform: 'rotate(135deg)' }}></div>
        <div className='flex flex-col'>
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button className="text-orange-default block w-full text-left px-4 py-2 text-sm" role="menuitem">
              Edit
            </button>
            <button className="text-red-default block w-full text-left px-4 py-2 text-sm" role="menuitem">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </>)
}