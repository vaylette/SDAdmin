'use client'

import CustomModal from '@/app/_components/aside-modal/aside-modal'
import DataTable from '@/app/_components/datatable'
import { apiUrls } from '@/app/constants/apiUrls'
import { useRetrieveData } from '@/app/constants/hooks'
import { User } from '@/app/types/types'
import { createColumnHelper } from '@tanstack/react-table'
import { useState, useEffect } from "react"
import toast from 'react-hot-toast'
import CreateAdmin from './(crud)/create-admin'
import InviteStudent from './(crud)/invite-student'

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
  edit: boolean
}

export default function UserManagement() {
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
    edit: false
  })

  const handleModal = (modalType: string): void => {
    setModal((prev) => ({ ...prev, [modalType]: true }))
  }

  const handleModalClose = (): void => {
    setModal({ create: false, invite: false, edit: false })
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

  const admins: User[] | undefined = (data?.users as User[])?.filter(user => user.type === 'Administrator')?.map((item) => {
    const itemsAsAdmin = item as User;
    return {
      ref_no: '',
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
      action: null
    };
  });

  const students: User[] | undefined = (data?.users as User[])?.filter(user => user.type === 'Student')?.map((item) => {
    const itemsAsStudent = item as User;
    return {
      ref_no: '',
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
      action: null
    };
  });

  const teachers: User[] | undefined = (data?.users as User[])?.filter(user => user.type === 'Teacher')?.map((item) => {
    const itemsAsTeacher = item as User;
    return {
      ref_no: '',
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
      action: null
    };
  });

  const parents: User[] | undefined = (data?.users as User[])?.filter(user => user.type === 'Parent')?.map((item) => {
    const itemsAsParent = item as User;
    return {
      ref_no: '',
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
      action: null
    };
  });

  const unverified_users: User[] | undefined = (data?.users as User[])?.filter(user => user.type === '')?.map((item) => {
    const itemsAsUnVerified = item as User;
    return {
      ref_no: '',
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
      action: null
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
          {tab.admins && (
            <button onClick={() => handleModal('create')} className='w-[178px] h-[60px] rounded-[5px] bg-orange-default text-white-default flex items-center justify-center'>Add Admin +</button>
          )}
          {tab.students && (
            <button onClick={() => handleModal('invite')} className='w-[178px] h-[60px] rounded-[5px] bg-orange-default text-white-default flex items-center justify-center'>Invite Student +</button>
          )}
        </div>
        {tab.admins && <DataTable columns={usersColumns} data={admins ?? admins} />}
        {tab.students && <DataTable columns={usersColumns} data={students ?? students} />}
        {tab.teachers && <DataTable columns={usersColumns} data={teachers ?? teachers} />}
        {tab.parents && <DataTable columns={usersColumns} data={parents ?? parents} />}
        {tab.unVerified && <DataTable columns={usersColumns} data={unverified_users ?? unverified_users} />}
      </div>
      <CustomModal isOpen={modal.create || modal.invite} onClose={handleModalClose} title={modal.create ? 'Add Admin' : 'Invite Student'} subtitle = {modal.invite ? "Please add the student’s information and we will send invite email" : ""}>
        {modal.create && (<>
          <CreateAdmin />
        </>)}
        {modal.invite && (<>
          <InviteStudent />
        </>)}
      </CustomModal>
    </>
  )
}
