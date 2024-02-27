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

interface ContentTab {
  topics: boolean
  models: boolean
  experiments: boolean
  videos: boolean
  [key: string]: boolean
}

interface Modal {
  topics: boolean,
  models: boolean,
  videos: boolean,
  experiments: boolean,
  diy: boolean,
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
    syllabus: [{ name: "Cambridge", _id: "0" }, { name: "NECTA", _id: "0" }, { name: "Montessori", _id: "2" }],
    UpdateTopic: {},
    UpdateModel: {},
    UpdateExperiment:{},
    UpdateDiyExperiment: {},
    UpdateVideo: {}
  })

  const [modal, setModal] = useState<Modal>({
    topics: false,
    models: false,
    experiments: false,
    diy: false,
    videos: false,
    edit: false
  })

  const handleModal = (modalType: string): void => {
    setModal((prev) => ({ ...prev, [modalType]: true }))
  }

  const handleModalClose = (): void => {
    setModal({ topics: false, models: false, experiments: false, diy: false, videos: false, edit: false })
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
      coverImageUrl: itemAsTopic.coverImageUrl,
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

  const [dropdownStates, setDropdownStates] = useState({});

  const toggleDropdownForRow = (rowId: any) => {
    setDropdownStates(prevStates => {
      const updatedStates:any = {};

      // Close any open dropdowns
      Object.keys(prevStates).forEach(id => {
        updatedStates[id] = false;
      });

      // Toggle the state of the clicked dropdown
      updatedStates[rowId] = !prevStates[rowId];

      return updatedStates;
    });
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
                          handleModal('topics')
                          data.UpdateTopic = info.row.original;
                        }}
                        onDelete={() => {
                          console.log("delete click", info.row.id)
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
                          console.log("delete click", info.row.id)
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
                          console.log("delete click", info.row.id)
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
                          handleModal('videos')
                          data.UpdateVideo = info.row.original;
                        }}
                        onDelete={() => {
                          console.log("delete click", info.row.id)
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
          <OverviewCard title="Total Topics" count={data?.topics?.length ?? 0} />
          <OverviewCard title="Total Models" count={data?.models?.length ?? 0} />
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
          {tab.topics && (
            <button onClick={() =>
              handleModal('topics')
            } className='w-[178px] h-[60px] rounded-[5px] bg-orange-default text-white-default flex items-center justify-center'>Add Topic +</button>
          )}
          {tab.models && (
            <button onClick={() => handleModal('models')} className='w-[178px] h-[60px] rounded-[5px] bg-orange-default text-white-default flex items-center justify-center'>Add Model +</button>
          )}
          {tab.experiments && (
            <button onClick={() => handleModal('experiments')} className='w-[148px] h-[60px] rounded-[5px] bg-orange-default text-white-default flex items-center justify-center'>Experiments +</button>
          )}
          {tab.experiments && (
            <button onClick={() => handleModal('diy')} className='w-[148px] h-[60px] rounded-[5px] bg-orange-default text-white-default flex items-center justify-center'>DIY Experiments +</button>
          )}
          {tab.videos && (
            <button onClick={() => handleModal('videos')} className='w-[178px] h-[60px] rounded-[5px] bg-orange-default text-white-default flex items-center justify-center'>Add Videos +</button>
          )}
        </div>
        <div className='mt-5'>
          {tab.topics && (
            <DataTable columns={topicsColumns} data={topics} />
          )}
          {tab.models && (
            <DataTable columns={modelsColumns} data={models} />)}
          {tab.experiments && (<DataTable columns={experimentsColumns} data={experiments} />)}
          {tab.videos && (<DataTable columns={videoColumns} data={videos} />)}
        </div>

      </div >

      {
        modal.topics && (modal.edit ? (
          <CustomModal isOpen={modal.topics} onClose={handleModalClose} title={tab.topics ? 'Edit Topic' : 'Edit'} subtitle={""}>
            <UpdateTopic subjects={data?.subjects} levels={data?.levels} syllabus={data?.syllabus} data={data.UpdateTopic} onRefresh={handleModalClose} />
          </CustomModal>
        ) : (
          <CustomModal isOpen={modal.topics} onClose={handleModalClose} title={tab.topics ? 'Add Topic' : 'Add'} subtitle={""}>
            <CreateTopic subjects={data?.subjects} levels={data?.levels} syllabus={data?.syllabus} onRefresh={handleModalClose} />
          </CustomModal>
        ))
      }


      {
        modal.models && (
          modal.edit ? (
            <CustomModal isOpen={modal.models} onClose={handleModalClose} title={"Edit Model"} subtitle={"Please edit the model’s information"}>
              <UpdateModel subjects={data?.subjects} data={data.UpdateModel} onRefresh={handleModalClose} />
            </CustomModal>
          ) : (
            <CustomModal isOpen={modal.models} onClose={handleModalClose} title={"Add Model"} subtitle={"Please add the model’s information"}>
              <CreateModel subjects={data?.subjects} onRefresh={handleModalClose} />
            </CustomModal>
          )
        )
      }

      {
        modal.experiments && (
          modal.edit ? (
            <CustomModal isOpen={modal.experiments} onClose={handleModalClose} title={"Edit Experiment"} subtitle={"Please edit the experiment’s information"}>
              <UpdateExperiment subjects={data?.subjects} data={data.UpdateExperiment} onRefresh={handleModalClose} />
            </CustomModal>
          ) : (
            <CustomModal isOpen={modal.experiments} onClose={handleModalClose} title={"Add Experiment"} subtitle={"Please add information"}>
              <CreateExperiment subjects={data?.subjects} onRefresh={handleModalClose} />
            </CustomModal>
          )
        )
      }

      {
        modal.diy && (
          modal.edit ? (
            <CustomModal isOpen={modal.diy} onClose={handleModalClose} title={"Edit DIY Experiment"} subtitle={"Please edit the DIY experiment’s information"}>
              <UpdateDiyExperiment subjects={data?.subjects} data={data.UpdateDiyExperiment} onRefresh={handleModalClose} />
            </CustomModal>
          ) : (
            <CustomModal isOpen={modal.diy} onClose={handleModalClose} title={"Add DIY Experiment"} subtitle={"Please add information"}>
              <CreateDiyExperiment subjects={data?.subjects} onRefresh={handleModalClose} />
            </CustomModal>
          )
        )
      }

      {
        modal.videos && (
          modal.edit ? (
            <CustomModal isOpen={modal.videos} onClose={handleModalClose} title={"Edit Video"} subtitle={"Please edit the video’s information"}>
              <UpdateVideo subjects={data?.subjects} data={data.UpdateVideo} onRefresh={handleModalClose} />
            </CustomModal>
          ) : (
            <CustomModal isOpen={modal.videos} onClose={handleModalClose} title={"Add Video"} subtitle={"Please add the video’s information"}>
              <CreateVideo subjects={data?.subjects} onRefresh={handleModalClose} />
            </CustomModal>
          )
        )
      }


    </>
  )
}

interface Card {
  title: string,
  count: Number
}


export const OverviewCard = ({ title, count }: Card) => {
  return (
    <div className='h-[200px] bg-overview bg-white-default rounded-[10px] flex justify-center relative py-14'>
      <div className='flex flex-col px-[76px] gap-2'>
        <span className='text-black-100 text-[20px] font-medium leading-[25px] text-center'>{title}</span>
      </div>
      <div className='absolute bottom-2'>
        <span className='text-orange-default text-[50px] font-bold text-center'>{count?.toString()}</span>
      </div>
    </div>
  );
}


interface Props {
  dismiss: () => void;
  onEdit?: () => void; // Callback for edit action
  onDelete?: () => void; // Callback for delete action
}

export const CustomDropDown: React.FC<Props> = ({ dismiss, onEdit, onDelete }) => {
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

  return (
    <div ref={userProfileRef} className="absolute">
      <div className="h-auto rounded-lg bg-white-default shadow-drop relative">
        <div className="absolute -top-[6px] right-8 w-[13.24px] h-[13.24px] bg-white-default" style={{ transform: 'rotate(135deg)' }}></div>
        <div className='flex flex-col'>
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {onEdit && (
              <button onClick={onEdit} className="text-orange-default block w-full text-left px-4 py-2 text-sm" role="menuitem">
                Edit
              </button>
            )}
            {/* {onDelete && (
              <button onClick={onDelete} className="text-red-default block w-full text-left px-4 py-2 text-sm" role="menuitem">
                Delete
              </button>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};
