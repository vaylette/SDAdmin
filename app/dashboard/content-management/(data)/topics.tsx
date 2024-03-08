import { useEffect, useState } from "react"
import { apiUrls } from "@/app/constants/apiUrls"
import { useRetrieveData, useDeleteData } from "@/app/constants/hooks"
import { createColumnHelper } from "@tanstack/react-table"
import toast from "react-hot-toast"
import { Topic } from "@/app/types/types"
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
import EditTopic from "../(crud)/update-topic"
import { CustomDropDown } from "../(components)/custom_dropdown"

interface Modal {
    topics: boolean,
    edit: boolean
}

export const TopicsContent = ({ tab }) => {
    const [data, setData] = useState({
        topics: [],
        subjects: [],
        levels: [],
        syllabus: [{ name: "Cambridge", _id: "0" }, { name: "NECTA", _id: "0" }, { name: "Montessori", _id: "2" }],
        UpdateTopic: {},
    })

    const [modal, setModal] = useState<Modal>({
        topics: false,
        edit: false
    })

    const handleModal = (modalType: string): void => {
        setModal((prev) => ({ ...prev, [modalType]: true }))
    }

    const [dropdownStates, setDropdownStates] = useState({});

    const toggleDropdownForRow = (rowId: any) => {
        setDropdownStates(prevStates => {
            const updatedStates: any = {};
            Object.keys(prevStates).forEach(id => {
                updatedStates[id] = false;
            });

            // Toggle the state of the clicked dropdown
            updatedStates[rowId] = !prevStates[rowId];

            return updatedStates;
        });
    };

    const handleModalClose = (): void => {
        setModal({ topics: false, edit: false })
        getData()
    }

    const retrieveData = useRetrieveData()
    const deleteData = useDeleteData()

    const columnHelper = createColumnHelper()

    useEffect(() => {
        getData()
    }, [data])

    const getData = async () => {
        try {
            const [topicsResult, subjectsResult, levelsResult] = await Promise.all([
                retrieveData(`${apiUrls.getTopics}`),
                retrieveData(`${apiUrls.getSubjects}`),
                retrieveData(`${apiUrls.getLevels}`),
            ])

            setData(prev => ({
                ...prev,
                topics: topicsResult,
                subjects: subjectsResult,
                levels: levelsResult
            }))
        } catch (error: any) {
            toast.error(error)
        } finally { }
    }

    const handleTopicDelete = async (data: any) => {
        try {
            await deleteData(`${apiUrls.deleteTopic}/${data._id}`);
            let topicResults = retrieveData(`${apiUrls.getTopics}`);
            setData(prevData => ({
                ...prevData,
                topics: prevData.topics.filter(topic => topic !== topicResults)
            }));
            toast.success('Topic deleted successfully');
        } catch (error) {
            toast.error('An error occurred while deleting the topic');
        }
    };

    const topics: Topic[] = data?.topics?.map((item) => {
        const itemAsTopic = item as Topic;
        return {
            ref_no: '',
            _id: itemAsTopic._id,
            name: itemAsTopic.name,
            subject: itemAsTopic.subject?.name,
            level: itemAsTopic.level.name,
            syllabus: itemAsTopic.syllabus,
            descriptions: itemAsTopic.descriptions,
            sections: itemAsTopic.sections?.length,
            questions: itemAsTopic.questions.length,
            chapters: itemAsTopic.chapters.length,
            thumbnail: itemAsTopic.thumbnail,
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
        columnHelper.accessor('action', {
            header: () => '',
            cell: (info) => (
                <>
                    <div className='flex flex-row gap-6 font-medium'>
                        <a href={`/dashboard/content-management/${topics[info.row.index]._id}`} className='text-orange-default flex items-center gap-2'>
                            <span>More</span>
                        </a>

                        <div className="inline-block">
                            <div className="cursor__pointer">
                                <Dropdown onSelect={() => toggleDropdownForRow(info.row.id)
                                }>
                                    <Dropdown.Toggle btnStyle="link" noCaret onClick={() => {
                                        console.log(info.row.id)
                                        toggleDropdownForRow(info.row.id)
                                    }}>
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
                                                    handleTopicDelete(info.row.original);
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

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold"></h1>
                <button onClick={() => handleModal('topics')} className='w-[178px] h-[60px] rounded-[5px] bg-orange-default text-white-default flex items-center justify-center'>Add Topic +</button>
            </div>
            <DataTable columns={topicsColumns} data={topics} />
            {modal.topics && (modal.edit ? (
                <CustomModal isOpen={modal.topics} onClose={handleModalClose} title={tab.topics ? 'Edit Topic' : 'Edit'} subtitle={""}>
                    <EditTopic subjects={data?.subjects} levels={data?.levels} syllabus={data?.syllabus} initialData={data.topics} onRefresh={handleModalClose} />
                </CustomModal>
            ) : (
                <CustomModal isOpen={modal.topics} onClose={handleModalClose} title={tab.topics ? 'Add Topic' : 'Add'} subtitle={""}>
                    <CreateTopic subjects={data?.subjects} levels={data?.levels} syllabus={data?.syllabus} onRefresh={handleModalClose} />
                </CustomModal>
            ))}
        </div>
    );



}