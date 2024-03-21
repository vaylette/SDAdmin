'use client'

import CustomModal from '@/app/_components/aside-modal/aside-modal'
import DataTable from '@/app/_components/datatable'
import { apiUrls } from '@/app/constants/apiUrls'
import { useDeleteData, usePatchData, useRetrieveData } from '@/app/constants/hooks'
import { User } from '@/app/types/types'
import { createColumnHelper } from '@tanstack/react-table'
import { useState, useEffect } from "react"
import toast from 'react-hot-toast'
import CreateAdmin from './(crud)/create-admin'
import InviteStudent from './(crud)/invite-student'
import UpdateAdmin from './(crud)/update-admin'
import RBAC from '@/app/constants/control'
import useAuthStore, { AuthStore } from '@/app/store/useAuthStore'
import AccessControl from '@/app/constants/control'

interface Tab {
  admins: boolean
  students: boolean
  parents: boolean
  teachers: boolean
  unVerified: false
  [key: string]: boolean
}

interface Modal {
  create: boolean,
  invite: boolean,
  edit: boolean,
  id: number,
}

export default function UserManagement() {
  const authStore = useAuthStore((state) => state) as AuthStore;
  const { user } = authStore;

  const accessControl = new AccessControl(user);

  const [tab, setTab] = useState<Tab>({
    admins: true,
    students: false,
    parents: false,
    teachers: false,
    unVerified: false,
  })

  const [data, setData] = useState({
    users: [],
  })

  const retrieveData = useRetrieveData()

  const [modal, setModal] = useState<Modal>({
    create: false,
    invite: false,
    edit: false,
    id: 0
  })

  const handleModal = (modalType: string): void => {
    setModal((prev) => ({ ...prev, [modalType]: true }))
  }

  const handleModalClose = (): void => {
    setModal({ create: false, invite: false, edit: false, id: 0 })
    getData()
  }

  const columnHelper = createColumnHelper()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const [usersResult] = await Promise.all([
        retrieveData(`${apiUrls.getUsers}`),
      ])

      setData(prev => ({
        ...prev,
        users: usersResult,
      }))
    } catch (error: any) {
      toast.error(error)
    } finally { }
  }

  const deleteData = useDeleteData()

  const handleRestrictUser = async (id: any) => {
    try {
      await deleteData(`${apiUrls.restrictUser}/${id}`, "Restricted successfully");
      getData()
    } catch (error) {
      toast.error('An error occurred while restricting a user');
    }
  };

  const handleUnRestrictUser = async (id: any) => {
    try {
      await deleteData(`${apiUrls.unrestrictUser}/${id}`, "Unrestricted successfully");
      getData()
    } catch (error) {
      toast.error('An error occurred while unrestricting a user');
    }
  };


  const admins: User[] | undefined = (data?.users as User[])?.filter(user => ['Admin', 'SuperAdmin', 'ContentAdmin', 'ContentModerator', 'CustomerCare'].includes(user.type ?? ""))?.map((item) => {
    const itemsAsAdmin = item as User;
    return {
      ref_no: '',
      _id: itemsAsAdmin._id,
      name: itemsAsAdmin.name,
      email: itemsAsAdmin.email,
      gender: itemsAsAdmin.gender,
      address: itemsAsAdmin.address,
      dob: itemsAsAdmin.dob,
      phoneNumber: itemsAsAdmin.phoneNumber,
      profilePic: itemsAsAdmin.profilePic,
      level: itemsAsAdmin.level,
      terms: itemsAsAdmin.terms,
      status: itemsAsAdmin.status,
      school: itemsAsAdmin.school,
      type: itemsAsAdmin.type,
      action: null,
      isActive: itemsAsAdmin.isActive
    };
  });

  const students: User[] | undefined = (data?.users as User[])?.filter(user => user.type === 'Student')?.map((item) => {
    const itemsAsStudent = item as User;
    return {
      ref_no: '',
      _id: itemsAsStudent._id,
      name: itemsAsStudent.name,
      email: itemsAsStudent.email,
      gender: itemsAsStudent.gender,
      address: itemsAsStudent.address,
      dob: itemsAsStudent.dob,
      phoneNumber: itemsAsStudent.phoneNumber,
      profilePic: itemsAsStudent.profilePic,
      level: itemsAsStudent.level,
      terms: itemsAsStudent.terms,
      status: itemsAsStudent.status,
      school: itemsAsStudent.school,
      type: itemsAsStudent.type,
      action: null,
      isActive: itemsAsStudent.isActive
    };
  });

  const teachers: User[] | undefined = (data?.users as User[])?.filter(user => user.type === 'Teacher')?.map((item) => {
    const itemsAsTeacher = item as User;
    return {
      ref_no: '',
      _id: itemsAsTeacher._id,
      name: itemsAsTeacher.name,
      email: itemsAsTeacher.email,
      gender: itemsAsTeacher.gender,
      address: itemsAsTeacher.address,
      dob: itemsAsTeacher.dob,
      phoneNumber: itemsAsTeacher.phoneNumber,
      profilePic: itemsAsTeacher.profilePic,
      level: itemsAsTeacher.level,
      terms: itemsAsTeacher.terms,
      status: itemsAsTeacher.status,
      school: itemsAsTeacher.school,
      type: itemsAsTeacher.type,
      action: null,
      isActive: itemsAsTeacher.isActive
    };
  });

  const parents: User[] | undefined = (data?.users as User[])?.filter(user => user.type === 'Parent')?.map((item) => {
    const itemsAsParent = item as User;
    return {
      ref_no: '',
      _id: itemsAsParent._id,
      name: itemsAsParent.name,
      email: itemsAsParent.email,
      gender: itemsAsParent.gender,
      address: itemsAsParent.address,
      dob: itemsAsParent.dob,
      phoneNumber: itemsAsParent.phoneNumber,
      profilePic: itemsAsParent.profilePic,
      level: itemsAsParent.level,
      terms: itemsAsParent.terms,
      status: itemsAsParent.status,
      school: itemsAsParent.school,
      type: itemsAsParent.type,
      action: null,
      isActive: itemsAsParent.isActive
    };
  });

  const unverified_users: User[] | undefined = (data?.users as User[])?.filter(user => user.type === '')?.map((item) => {
    const itemsAsUnVerified = item as User;
    return {
      ref_no: '',
      _id: itemsAsUnVerified._id,
      name: itemsAsUnVerified.name,
      email: itemsAsUnVerified.email,
      gender: itemsAsUnVerified.gender,
      address: itemsAsUnVerified.address,
      dob: itemsAsUnVerified.dob,
      phoneNumber: itemsAsUnVerified.phoneNumber,
      profilePic: itemsAsUnVerified.profilePic,
      level: itemsAsUnVerified.level,
      terms: itemsAsUnVerified.terms,
      status: itemsAsUnVerified.status,
      school: itemsAsUnVerified.school,
      type: itemsAsUnVerified.type,
      action: null,
      isActive: itemsAsUnVerified.isActive
    };
  });


  const usersColumns = [
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
    columnHelper.accessor('email', {
      header: () => 'Email',
      cell: info => info.getValue(),
      size: 10,
    }),
    columnHelper.accessor('phoneNumber', {
      header: () => 'Phone',
      cell: info => info.getValue(),
      size: 10,
    }),
    columnHelper.accessor('type', {
      header: () => 'Type',
      cell: info => info.getValue(),
      size: 30,
    }),
    columnHelper.accessor('action', {
      header: () => '',
      cell: (info: any) => (
        <>
          <div className='flex flex-row gap-6 font-medium'>
            {tab.admins && accessControl.isSuperAdmin() && (
              <>
                <button onClick={() => {
                  modal.id = info.row.index
                  handleModal('edit')
                }} className='text-orange-default'>Edit</button>
              </>
            )}
            {info.row.original.isActive && (
              <>
                <button onClick={() => {
                  const id = info.row.original._id
                  handleRestrictUser(id)
                }
                } className='text-red-default'>Restrict</button>
              </>
            )}
            {!info.row.original.isActive && (
              <>
                <button onClick={() => {
                  const id = info.row.original._id
                  handleUnRestrictUser(id)
                }
                } className='text-red-default'>Un Restrict</button>
              </>
            )}

          </div>
        </>
      )
    }),
  ]

  const tabList = [
    { name: 'Admins', tab: 'admins' },
    { name: 'Students', tab: 'students' },
    { name: 'Parents', tab: 'parents' },
    { name: 'Teachers', tab: 'teachers' },
    { name: 'Un Verified', tab: 'unVerified' },
  ]

  const handleActiveTab = (activeTab: keyof Tab): void => {
    setTab((prev) => ({
      admins: false,
      students: false,
      parents: false,
      teachers: false,
      unVerified: false,
      [activeTab]: true,
    }))
  }

  return (
    <>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-row justify-between text-[20px]'>
          <div className='flex flex-row gap-[10px]'>
            {tabList?.map((item, index) => (
              <button key={index} className={`w-[128px] h-[60px] rounded-[5px] flex items-center justify-center ${tab[item.tab as keyof Tab] ? 'bg-orange-default text-white-default' : 'text-orange-default border-[0.5px] border-solid border-orange-200 bg-orange-400'}`} onClick={() => handleActiveTab(item.tab as keyof Tab)}>
                {item.name}
              </button>
            ))}
          </div>
          {tab.admins && accessControl.isSuperAdmin() && (
            <button onClick={() => handleModal('create')} className='w-[178px] h-[60px] rounded-[5px] bg-orange-default text-white-default flex items-center justify-center'>Add Admin +</button>
          )}
          {/* {tab.students && (
            <button onClick={() => handleModal('invite')} className='w-[178px] h-[60px] rounded-[5px] bg-orange-default text-white-default flex items-center justify-center'>Invite Student +</button>
          )} */}
        </div>
        {tab.admins && <DataTable columns={usersColumns} data={admins ?? admins} />}
        {tab.students && <DataTable columns={usersColumns} data={students ?? students} />}
        {tab.teachers && <DataTable columns={usersColumns} data={teachers ?? teachers} />}
        {tab.parents && <DataTable columns={usersColumns} data={parents ?? parents} />}
        {tab.unVerified && <DataTable columns={usersColumns} data={unverified_users ?? unverified_users} />}
      </div>
      <CustomModal isOpen={modal.create || modal.invite || modal.edit} onClose={handleModalClose} title={modal.create ? 'Add Admin' : modal.edit ? 'Edit User' : 'Invite Student'} subtitle={modal.invite ? "Please add the student’s information and we will send invite email" : ""}>
        {modal.create && (<>
          <CreateAdmin onRefresh={handleModalClose} />
        </>)}
        {modal.edit && tab.admins && (
          <>
            <UpdateAdmin initialData={admins[modal.id]} onRefresh={handleModalClose} />
          </>
        )}
        {/* {modal.invite && (<>
          <InviteStudent />
        </>)} */}
      </CustomModal>
    </>
  )
}
