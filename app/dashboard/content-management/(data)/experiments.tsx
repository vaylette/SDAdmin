import { useEffect, useState } from "react"
import { apiUrls } from "@/app/constants/apiUrls"
import { useRetrieveData, useDeleteData } from "@/app/constants/hooks"
import { createColumnHelper } from "@tanstack/react-table"
import toast from "react-hot-toast"
import { Experiment, Model, Topic } from "@/app/types/types"
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
import { CustomDropDown } from "../(components)/custom_dropdown"

interface Modal {
  experiments: boolean,
  edit: boolean
}

export const ExperimentsContent = ({ subjectsResult, levelsResult, tab }) => {
  const [data, setData] = useState({
    experiments: [],
    subjects: [],
    levels: [],
    syllabus: [{ name: "Cambridge", _id: "0" }, { name: "NECTA", _id: "0" }, { name: "Montessori", _id: "2" }],
    UpdateExperiment: {},
  })

  const [modal, setModal] = useState<Modal>({
    experiments: false,
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
      Object.keys(prevStates).forEach(id => {
        updatedStates[id] = false;
      });

      // Toggle the state of the clicked dropdown
      updatedStates[rowId] = !prevStates[rowId];

      return updatedStates;
    });
  };

  const handleModalClose = (): void => {
    setModal({ experiments: false, edit: false })
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
      const [modelsResult] = await Promise.all([
        retrieveData(`${apiUrls.getExperiments}`),
      ])

      setData(prev => ({
        ...prev,
        experiments: modelsResult,
        subjects: subjectsResult,
        levels: levelsResult
      }))
    } catch (error: any) {
      toast.error(error)
    } finally { }
  }


  const handleExperimentDelete = async (data: any) => {
    try {
      await deleteData(`${apiUrls.deleteExperiments}/${data._id}`);
      let experimentResults = retrieveData(`${apiUrls.getExperiments}`);
      setData(prevData => ({
        ...prevData,
        experiments: prevData.experiments.filter(experiment => experiment !== experimentResults)
      }));
    } catch (error) {
      toast.error('An error occurred while deleting the experiment');
    }
  };



  const experiments: Experiment[] = data?.experiments?.map((item) => {
    const itemAsExperiment = item as Experiment;
    return {
      ref_no: '',
      _id: itemAsExperiment._id,
      name: itemAsExperiment.name,
      subject: itemAsExperiment.subject?.name,
      description: itemAsExperiment.description,
      modelFileUrl: itemAsExperiment.modelFileUrl,
      ARExperienceFileUrl: itemAsExperiment.ARExperienceFileUrl,
      materials: itemAsExperiment.materials,
      stepsFileUrl: itemAsExperiment.stepsFileUrl,
      action: null
    }
  })
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

  return (
    <>
      <div className="flex justify-end items-start mb-2">
      <h1 className="text-2xl font-bold"></h1>
        <button onClick={() => handleModal('experiments')} className='w-[148px] h-[60px] rounded-[5px] bg-orange-default text-white-default flex items-center justify-center mx-10'>Experiments +</button>
        <button onClick={() => handleModal('experiments')} className='w-[148px] h-[60px] rounded-[5px] bg-orange-default text-white-default flex items-center justify-center'>DIY Experiments +</button>
      </div>
  
      <DataTable columns={experimentsColumns} data={experiments} />
      
      {modal.experiments && (
        modal.edit ? (
          <CustomModal isOpen={modal.experiments} onClose={handleModalClose} title={"Edit Experiment"} subtitle={"Please edit the experiment’s information"}>
            <UpdateExperiment subjects={data?.subjects} data={data.UpdateExperiment} onRefresh={handleModalClose} />
          </CustomModal>
        ) : (
          <CustomModal isOpen={modal.experiments} onClose={handleModalClose} title={"Add Experiment"} subtitle={"Please add information"}>
            <CreateExperiment subjects={data?.subjects} onRefresh={handleModalClose} />
          </CustomModal>
        )
      )}
    </>
  );
  

}