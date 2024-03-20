//@ts-nocheck
import { useEffect, useState } from "react"
import { apiUrls } from "@/app/constants/apiUrls"
import { useRetrieveData, useDeleteData } from "@/app/constants/hooks"
import { createColumnHelper } from "@tanstack/react-table"
import toast from "react-hot-toast"
import { Model, Simulation, Topic } from "@/app/types/types"
import Dropdown from "@trendmicro/react-dropdown";
import { FiMoreVertical } from "react-icons/fi"
import DataTable from "@/app/_components/datatable"
import CustomModal from "@/app/_components/aside-modal/aside-modal"
import CreateTopic from "../(crud)/create-topic"
import UpdateTopic from "../(crud)/update-topic"
import { TabComponent } from "@/app/_components/tab"
import CreateModel from "../(crud)/create-model"
import UpdateModel from "../(crud)/update-model"
import { CustomDropDown } from "../(components)/custom_dropdown"
import CreateSimulation from "../(crud)/create-simulation"
import UpdateSimulation from "../(crud)/update-simulations"

interface Modal {
    simulations: boolean,
    edit: boolean,
    id: number,
  }
  
  export const SimulationsContent = ({ tab }) => {
    const [data, setData] = useState({
      simulations: [],
      subjects: [],
      levels: [],
      syllabus: [{ name: "Cambridge", _id: "0" }, { name: "NECTA", _id: "0" }, { name: "Montessori", _id: "2" }],
      UpdateSimulation: {},
    })
  
    const [modal, setModal] = useState<Modal>({
      simulations: false,
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
      setModal({ simulations: false, edit: false, id: 0 })
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
        const [simulationsResult, subjectsResult, levelsResult] = await Promise.all([
          retrieveData(`${apiUrls.getSimulations}`),
          retrieveData(`${apiUrls.getSubjects}`),
          retrieveData(`${apiUrls.getLevels}`),
        ])
  
        setData(prev => ({
          ...prev,
          simulations: simulationsResult,
          subjects: subjectsResult,
          levels: levelsResult
        }))
      } catch (error: any) {
        toast.error(error)
      } finally { }
    }
  
    const handleSimulationDelete = async (data: any) => {
      try {
        await deleteData(`${apiUrls.deleteSimulations}/${data._id}`);
        getData()
      } catch (error) {
        toast.error('An error occurred while deleting the simulation');
      }
    };
  
    const simulations: Simulation[] = data?.simulations?.map((item) => {
      const itemAsSimulation = item as Simulation;
      return {
        ref_no: '',
        _id: itemAsSimulation._id,
        name: itemAsSimulation.name,
        thumbnail: itemAsSimulation.thumbnail,
        subject: itemAsSimulation.subject,
        description: itemAsSimulation.description,
        simulationFileUrl: itemAsSimulation.simulationFileUrl,
        action: null
      }
    })
  
    const simulationsColumns = [
      columnHelper.accessor('ref_no', {
        header: () => 'REF NO',
        cell: (info) => (info.row.index + 1 + "").padStart(2, "0"),
        size: 5,
      }),
      columnHelper.accessor('name', {
        header: () => 'Simulation Name',
        cell: info => info.getValue(),
        size: 10,
      }),
    //   columnHelper.accessor('subject', {
    //     header: () => 'Subject',
    //     cell: info => info.getValue(),
    //     size: 10,
    //   }),
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
                            modal.id = info.row.index
                            handleModal('simulations')
                          }}
                          onDelete={() => {
                            handleSimulationDelete(info.row.original);
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
            <button onClick={() => handleModal('simulations')} className='w-[178px] h-[60px] rounded-[5px] bg-orange-default text-white-default flex items-center justify-center'>Add 2D Simulation +</button>
          </div>
          <DataTable columns={simulationsColumns} data={simulations} />
  
          {modal.simulations && (
            modal.edit ? (
              <CustomModal isOpen={modal.simulations} onClose={handleModalClose} title={"Edit 2D Simulation"} subtitle={"Please edit the simulation’s information"}>
                <UpdateSimulation subjects={data?.subjects} data={{
                  data: data?.simulations[modal.id],
                  subjects: data?.subjects
                }} onRefresh={handleModalClose} />
              </CustomModal>
            ) : (
              <CustomModal isOpen={modal.simulations} onClose={handleModalClose} title={"Add 2D Simulation"} subtitle={"Please add the simulation’s information"}>
                <CreateSimulation subjects={data?.subjects} onRefresh={handleModalClose} />
              </CustomModal>
            )
          )}
        </div>
  
      </>
    );
  }
  
  export default SimulationsContent;
  