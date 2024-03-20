//@ts-nocheck
import { useEffect, useState } from "react"
import { apiUrls } from "@/app/constants/apiUrls"
import { useRetrieveData, useDeleteData } from "@/app/constants/hooks"
import { createColumnHelper } from "@tanstack/react-table"
import toast from "react-hot-toast"
import { Model, Topic } from "@/app/types/types"
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
import { CustomDropDown } from "../(components)/custom_dropdown"

interface Modal {
    models: boolean,
    edit: boolean,
    id: number
}

export const ModelsContent = ({ tab }) => {
    const [data, setData] = useState({
        models: [],
        subjects: [],
        levels: [],
        syllabus: [{ name: "Cambridge", _id: "0" }, { name: "NECTA", _id: "0" }, { name: "Montessori", _id: "2" }],
        UpdateModel: {},
    })

    const [modal, setModal] = useState<Modal>({
        models: false,
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
            Object.keys(prevStates).forEach(id => {
                updatedStates[id] = false;
            });

            // Toggle the state of the clicked dropdown
            updatedStates[rowId] = !prevStates[rowId];

            return updatedStates;
        });
    };

    const handleModalClose = (): void => {
        setModal({ models: false, edit: false, id: 0 })
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
            const [modelsResult, subjectsResult, levelsResult] = await Promise.all([
                retrieveData(`${apiUrls.getModels}`),
                retrieveData(`${apiUrls.getSubjects}`),
                retrieveData(`${apiUrls.getLevels}`),
            ])

            setData(prev => ({
                ...prev,
                models: modelsResult,
                subjects: subjectsResult,
                levels: levelsResult
            }))
        } catch (error: any) {
            toast.error(error)
        } finally { }
    }

    const handleModelDelete = async (data: any) => {
        try {
            await deleteData(`${apiUrls.deleteModels}/${data._id}`);
            getData()
        } catch (error) {
            toast.error('An error occurred while deleting the model');
        }
    };

    const models: Model[] = data?.models?.map((item) => {
        const itemAsModel = item as Model;
        return {
            ref_no: '',
            _id: itemAsModel._id,
            name: itemAsModel.name,
            subject: itemAsModel.subject?.name,
            fileType: itemAsModel.fileType,
            description: itemAsModel.description,
            modelFileUrl: itemAsModel.modelFileUrl,
            ARExperienceFileUrl: itemAsModel.ARExperienceFileUrl,
            action: null
        }
    })

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
                                                    modal.id = info.row.index;
                                                    handleModal('models')
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
    return (
        <>
            <div className="flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-2xl font-bold"></h1>
                    <button onClick={() => handleModal('models')} className='w-[178px] h-[60px] rounded-[5px] bg-orange-default text-white-default flex items-center justify-center'>Add 3D Model +</button>
                </div>
                <DataTable columns={modelsColumns} data={models} />
                {modal.models && (
                    modal.edit ? (
                        <CustomModal isOpen={modal.models} onClose={handleModalClose} title={"Edit 3D Model"} subtitle={"Please edit the model’s information"}>
                            <UpdateModel initialData={{
                                data: data.models[modal.id ?? 0],
                                syllabus: data.syllabus,
                                subjects: data.subjects,
                                levels: data.levels
                            }} onRefresh={handleModalClose} />
                        </CustomModal>
                    ) : (
                        <CustomModal isOpen={modal.models} onClose={handleModalClose} title={"Add 3D Model"} subtitle={"Please add the model’s information"}>
                            <CreateModel subjects={data?.subjects} onRefresh={handleModalClose} />
                        </CustomModal>
                    )
                )}
            </div>

        </>
    );


}