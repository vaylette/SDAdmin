//@ts-nocheck
import { useEffect, useState } from "react"
import { apiUrls } from "@/app/constants/apiUrls"
import { useRetrieveData, useDeleteData } from "@/app/constants/hooks"
import { createColumnHelper } from "@tanstack/react-table"
import toast from "react-hot-toast"
import { Experiment, Model, Topic, Video } from "@/app/types/types"
import Dropdown, {
    DropdownToggle,
    DropdownMenu,
    DropdownMenuWrapper,
    MenuItem,
    DropdownButton
} from "@trendmicro/react-dropdown";
import { FiMoreVertical } from "react-icons/fi"
import DataTable from "@/app/_components/datatable"
import CustomModal from "@/app/_components/aside-modal/aside-modal"
import CreateTopic from "../(crud)/create-topic"
import UpdateTopic from "../(crud)/update-topic"
import { TabComponent } from "@/app/_components/tab"
import CreateModel from "../(crud)/create-model"
import UpdateModel from "../(crud)/update-model"
import CreateExperiment from "../(crud)/create-experiment"
import UpdateExperiment from "../(crud)/update-experiment"
import CreateVideo from "../(crud)/create-video"
import UpdateVideo from "../(crud)/update-video"
import { CustomDropDown } from "../(components)/custom_dropdown"
import { get } from "http"

interface Modal {
    videos: boolean,
    edit: boolean,
    id: number
}

export const VideosContent = ({ subjectsResult, levelsResult, tab }) => {
    const [data, setData] = useState({
        videos: [],
        subjects: subjectsResult,
        levels: levelsResult,
        syllabus: [{ name: "Cambridge", _id: "0" }, { name: "NECTA", _id: "0" }, { name: "Montessori", _id: "2" }],
        UpdateVideo: {}
    })

    const [modal, setModal] = useState<Modal>({
        videos: false,
        edit: false,
        id: 0
    })

    const handleModal = (modalType: string): void => {
        setModal((prev) => ({ ...prev, [modalType]: true }))
    }

    const [dropdownStates, setDropdownStates] = useState({});

    const toggleDropdownForRow = (rowId: any) => {
        setDropdownStates(prevStates => {
            const updatedStates: any = {};

            // Close any open dropdowns
            Object.keys(prevStates).forEach(id => {
                updatedStates[id] = false;
            });

            // Toggle the state of the clicked dropdown
            updatedStates[rowId] = !prevStates[rowId];

            return updatedStates;
        });
    };

    const handleModalClose = (): void => {
        setModal({ videos: false, edit: false, id: 0 })
        getData()
    }

    const retrieveData = useRetrieveData()
    const deleteData = useDeleteData()

    const columnHelper = createColumnHelper()

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const [videoResult] = await Promise.all([
                retrieveData(`${apiUrls.getVideos}`),
            ])

            setData(prev => ({
                ...prev,
                videos: videoResult,
                subjects: subjectsResult,
                levels: levelsResult
            }))
        } catch (error: any) {
            toast.error(error)
        } finally { }
    }


    const handleVideoDelete = async (data: any) => {
        try {
            await deleteData(`${apiUrls.deleteVideos}/${data._id}`);
            let videoResults = retrieveData(`${apiUrls.getVideos}`);
            setData(prevData => ({
                ...prevData,
                videos: prevData.videos.filter(video => video !== videoResults)
            }));
            getData()
        } catch (error) {
            toast.error('An error occurred while deleting the experiment');
        }
    };

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
                                        {dropdownStates[info.row.id] && (
                                            <CustomDropDown
                                                dismiss={() => setDropdownStates(prevStates => ({ ...prevStates, [info.row.id]: false }))}
                                                onEdit={() => {
                                                    modal.edit = true
                                                    modal.id = info.row.index
                                                    handleModal('videos')
                                                }}
                                                onDelete={() => {
                                                    handleVideoDelete(info.row.original);
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

    const videos: Video[] = data?.videos?.map((item) => {
        const itemAsVideo = item as Video;
        return {
            ref_no: '',
            _id: itemAsVideo._id,
            name: itemAsVideo.name,
            subject: itemAsVideo.subject.name,
            videoType: itemAsVideo.videoType,
            description: itemAsVideo.description,
            videoFileUrl: itemAsVideo.videoFileUrl,
            action: null
        }
    })

    return (
        <>
            <div className="flex justify-end items-start mb-2">
                <h1 className="text-2xl font-bold"></h1>
                <button onClick={() => handleModal('videos')} className='w-[178px] h-[60px] rounded-[5px] bg-orange-default text-white-default flex items-center justify-center'>Add Videos +</button>
            </div>

            <DataTable columns={videoColumns} data={videos} />

            {modal.videos && (
                modal.edit ? (
                    <CustomModal isOpen={modal.videos} onClose={handleModalClose} title={"Edit Video"} subtitle={"Please edit the video’s information"}>
                        <UpdateVideo data={{
                            data: data?.videos[modal.id],
                            subjects: data?.subjects
                        }} onRefresh={handleModalClose} />
                    </CustomModal>
                ) : (
                    <CustomModal isOpen={modal.videos} onClose={handleModalClose} title={"Add Video"} subtitle={"Please add the video’s information"}>
                        <CreateVideo subjects={data?.subjects} onRefresh={handleModalClose} />
                    </CustomModal>
                )
            )}
        </>
    );


}