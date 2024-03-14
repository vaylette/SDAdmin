//@ts-nocheck
'use client'
import { useState, useEffect, useRef } from "react"
import { TabComponent, TabItem } from "@/app/_components/tab"
import DataTable from "@/app/_components/datatable"
import { createColumnHelper } from "@tanstack/react-table"
import { useDeleteData, useRetrieveData } from "@/app/constants/hooks"
import toast from "react-hot-toast"
import { apiUrls, baseUrl } from "@/app/constants/apiUrls"
import { Topic, Model, Experiment, Video } from "@/app/types/types"
import Modal from "@/app/_components/modal"
import CreateTopic from "./(crud)/create-topic"
import CustomModal from "@/app/_components/aside-modal/aside-modal"
import CreateModel from "./(crud)/create-model"
import CreateVideo from "./(crud)/create-video"
import CreateExperiment from "./(crud)/create-experiment"
import CreateDiyExperiment from "./(crud)/create-diy-experiment"
import Dropdown, {
  DropdownToggle,
  DropdownMenu,
  DropdownMenuWrapper,
  MenuItem,
  DropdownButton
} from "@trendmicro/react-dropdown";

import { FiMoreVertical } from "react-icons/fi";
import UpdateTopic from "./(crud)/update-topic"
import UpdateModel from "./(crud)/update-model"
import UpdateDiyExperiment from "./(crud)/update-diy-experiment"
import UpdateExperiment from "./(crud)/update-experiment"
import UpdateVideo from "./(crud)/update-video"
import { TopicsContent } from "./(data)/topics"
import { ModelsContent } from "./(data)/models"
import { ExperimentsContent } from "./(data)/experiments"
import { VideosContent } from "./(data)/videos"
import { CustomDropDown } from "./(components)/custom_dropdown"
import { OverviewCard } from "./(components)/overview"
import SimulationsContent from "./(data)/simulations"

interface ContentTab {
  topics: boolean
  models: boolean
  simulations: boolean
  experiments: boolean
  videos: boolean
  [key: string]: boolean
}

interface Modal {
  topics: boolean,
  models: boolean,
  simulations: boolean,
  videos: boolean,
  experiments: boolean,
  diy: boolean,
  edit: boolean
}

export default function ContentManagement() {
  const [tab, setTab] = useState<ContentTab>({
    topics: true,
    models: false,
    simulations: false,
    experiments: false,
    videos: false,
  })

  const [data, setData] = useState({
    topics: [],
    models: [],
    simulations: [],
    experiments: [],
    videos: [],
    subjects: [],
    levels: [],
    syllabus: [{ name: "Cambridge", _id: "0" }, { name: "NECTA", _id: "0" }, { name: "Montessori", _id: "2" }],
    UpdateTopic: {},
    UpdateModel: {},
    UpdateExperiment: {},
    UpdateDiyExperiment: {},
    UpdateVideo: {}
  })

  const getData = async () => {
    try {
      const [topicsResult, modelsResult, simulationResults, experimentsResult, videosResult, subjectsResult, levelsResult] = await Promise.all([
        retrieveData(`${apiUrls.getTopics}`),
        retrieveData(`${apiUrls.getModels}`),
        retrieveData(`${apiUrls.getSimulations}`),
        retrieveData(`${apiUrls.getExperiments}`),
        retrieveData(`${apiUrls.getVideos}`),
        retrieveData(`${apiUrls.getSubjects}`),
        retrieveData(`${apiUrls.getLevels}`),
      ])

      setData(prev => ({
        ...prev,
        topics: topicsResult,
        models: modelsResult,
        simulations: simulationResults,
        experiments: experimentsResult,
        videos: videosResult,
        subjects: subjectsResult,
        levels: levelsResult
      }))
    } catch (error: any) {
      toast.error(error)
    } finally { }
  }

  const [modal, setModal] = useState<Modal>({
    topics: false,
    models: false,
    simulations: false,
    experiments: false,
    diy: false,
    videos: false,
    edit: false
  })

  const handleModal = (modalType: string): void => {
    setModal((prev) => ({ ...prev, [modalType]: true }))
  }

  const [dropdownStates, setDropdownStates] = useState({});

  const toggleDropdownForRow = (rowId: any) => {
    setDropdownStates(prevStates => {
      const updatedStates: any = {};

      // Close any open dropdowns
      Object.keys((prevStates)).forEach(id => {
        updatedStates[id] = false;
      });

      // Toggle the state of the clicked dropdown
      updatedStates[rowId] = !prevStates.hasOwnProperty(rowId);

      return updatedStates;
    });
  };


  const retrieveData = useRetrieveData()
  const deleteData = useDeleteData()

  const columnHelper = createColumnHelper()

  useEffect(() => {
    getData()
  }, [])

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
    columnHelper.accessor('action', {
      header: () => '',
      cell: (info) => (
        <>
          <div className='flex flex-row gap-6 font-medium'>
            <a href={`/dashboard/content-management/${data.topics[info.row.index]}`} className='text-orange-default flex items-center gap-2'>
              <span>More</span>
            </a>
            <div className="inline-block">
              <div className="cursor__pointer">
                <Dropdown onSelect={() => toggleDropdownForRow(info.row.id)}>
                  <Dropdown.Toggle btnStyle="link" noCaret onClick={() => toggleDropdownForRow(info.row.id)}>
                    <FiMoreVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                  {dropdownStates.hasOwnProperty(info.row.id) && (
                      <CustomDropDown
                        dismiss={() => setDropdownStates(prevStates => ({ ...prevStates, [info.row.id]: false }))}
                        onEdit={() => {
                          modal.edit = true
                          handleModal('topics')
                        }}
                        onDelete={() => {
                        }}
                      />
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
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
    columnHelper.accessor('description', {
      header: () => 'Description',
      cell: info => info.getValue(),
      size: 10,
    }),
    columnHelper.accessor('action', {
      header: () => '',
      cell: (info) => (
        <>
          <div className='flex flex-row gap-6 font-medium'>
            <div className="inline-block">
              <div className="cursor__pointer">
                <Dropdown onSelect={() => toggleDropdownForRow(info.row.id)}>
                  <Dropdown.Toggle btnStyle="link" noCaret onClick={() => toggleDropdownForRow(info.row.id)}>
                    <FiMoreVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {dropdownStates[info.row.id] && (
                      <CustomDropDown
                        dismiss={() => setDropdownStates(prevStates => ({ ...prevStates, [info.row.id]: false }))}
                        onEdit={() => {
                          modal.edit = true
                          handleModal('models')
                          data.UpdateModel = info.row.original;
                        }}
                        onDelete={() => {
                          handleModelDelete(info.row.original);
                        }}
                      />
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </>
      )
    }),
  ]

  const simulationsColumns = [
    columnHelper.accessor('ref_no', {
      header: () => 'REF NO',
      cell: (info) => (info.row.index + 1 + "").padStart(2, "0"),
      size: 5,
    }),
    columnHelper.accessor('name', {
      header: () => 'Name',
      cell: info => info.getValue(),
      size: 10,
    }),
    columnHelper.accessor('subject', {
      header: () => 'Subject',
      cell: info => info.getValue(),
      size: 10,
    }),
    columnHelper.accessor('description', {
      header: () => 'Description',
      cell: info => info.getValue(),
      size: 10,
    }),
    columnHelper.accessor('action', {
      header: () => '',
      cell: (info) => (
        <>
          <div className='flex flex-row gap-6 font-medium'>
            <div className="inline-block">
              <div className="cursor__pointer">
                <Dropdown onSelect={() => toggleDropdownForRow(info.row.id)}>
                  <Dropdown.Toggle btnStyle="link" noCaret onClick={() => toggleDropdownForRow(info.row.id)}>
                    <FiMoreVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                  {dropdownStates.hasOwnProperty(info.row.id) && (
                      <CustomDropDown
                        dismiss={() => setDropdownStates(prevStates => ({ ...prevStates, [info.row.id]: false }))}
                        onEdit={() => {
                          modal.edit = true
                          handleModal('simulations')
                        }}
                        onDelete={() => {
                        }}
                      />
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
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
    columnHelper.accessor('description', {
      header: () => 'Description',
      cell: info => info.getValue(),
      size: 10,
    }),
    columnHelper.accessor('action', {
      header: () => '',
      cell: (info) => (
        <>
          <div className='flex flex-row gap-6 font-medium'>
            <div className="inline-block">
              <div className="cursor__pointer">
                <Dropdown onSelect={() => toggleDropdownForRow(info.row.id)}>
                  <Dropdown.Toggle btnStyle="link" noCaret onClick={() => toggleDropdownForRow(info.row.id)}>
                    <FiMoreVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {dropdownStates[info.row.id] && (
                      <CustomDropDown
                        dismiss={() => setDropdownStates(prevStates => ({ ...prevStates, [info.row.id]: false }))}
                        onEdit={() => {
                          modal.edit = true
                          handleModal('experiments')
                          data.UpdateExperiment = info.row.original;
                        }}
                        onDelete={() => {
                          handleExperimentDelete(info.row.original);
                        }}
                      />
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
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
    columnHelper.accessor('description', {
      header: () => 'Description',
      cell: info => info.getValue(),
      size: 30,
    }),
    // columnHelper.accessor('videoFileUrl', {
    //   header: () => 'Url',
    //   cell: info => info.getValue(),
    //   size: 30,
    // }),
    columnHelper.accessor('action', {
      header: () => '',
      cell: (info) => (
        <>
          <div className='flex flex-row gap-6 font-medium'>
            <div className="inline-block">
              <div className="cursor__pointer">
                <Dropdown onSelect={() => toggleDropdownForRow(info.row.id)}>
                  <Dropdown.Toggle btnStyle="link" noCaret onClick={() => toggleDropdownForRow(info.row.id)}>
                    <FiMoreVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {dropdownStates.hasOwnProperty(info.row.id) && (
                      <CustomDropDown
                        dismiss={() => setDropdownStates(prevStates => ({ ...prevStates, [info.row.id]: false }))}
                        onEdit={() => {
                          modal.edit = true
                          handleModal('videos')
                        }}
                        onDelete={() => {
                        }}
                      />
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </>
      )
    }),
  ]

  const tabList: TabItem<string>[] = [
    { name: 'Topics', tab: 'topics', columns: topicsColumns },
    { name: 'Models', tab: 'models', columns: modelsColumns },
    { name: 'Simulations', tab: 'simulations', columns: simulationsColumns },
    { name: 'Experiments', tab: 'experiments', columns: experimentsColumns },
    { name: 'Videos', tab: 'videos', columns: videoColumns },
  ]

  const handleActiveTab = (activeTab: keyof ContentTab): void => {
    setTab((prev) => ({
      topics: false,
      models: false,
      simulations: false,
      experiments: false,
      videos: false,
      [activeTab]: true,
    }))
  }

  return (
    <>
      <div className='flex flex-col gap-5'>
        <div className='grid grid-cols-5 2xl:flex 2xl:flex-row 2xl:flex-wrap gap-5'>
          <OverviewCard title="Total Topics" count={data?.topics?.length ?? 0} />
          <OverviewCard title="Total Models" count={data?.models?.length ?? 0} />
          <OverviewCard title="Total Simulations" count={data?.simulations?.length ?? 0} />
          <OverviewCard title="Experiments" count={data?.experiments?.length ?? 0} />
          <OverviewCard title="Total Videos" count={data?.videos?.length ?? 0} />


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
        </div>
        {tab.topics && (
          <TopicsContent tab={tab} />
        )}
        {tab.models && (
          <ModelsContent tab={tab} />)}
        {tab.simulations && (
          <SimulationsContent tab={tab} />)}
        {tab.experiments && (
          <ExperimentsContent subjectsResult={data?.subjects} levelsResult={data?.levels} tab={tab} />
        )}
        {tab.videos && (
          <VideosContent subjectsResult={data?.subjects} levelsResult={data?.levels} tab={tab} />
        )}

      </div >
    </>
  )
}
