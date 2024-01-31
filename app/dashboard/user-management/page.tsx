'use client'

import DataTable from '@/app/_components/datatable'
import { apiUrls } from '@/app/constants/apiUrls'
import { useRetrieveData } from '@/app/constants/hooks'
import { User } from '@/app/types/types'
import { createColumnHelper } from '@tanstack/react-table'
import { useState, useEffect } from "react"
import toast from 'react-hot-toast'

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
  edit: boolean
}

export default function UserManagement() {

  const [data, setData] = useState({
    users: [],
  })

  const retrieveData = useRetrieveData()
  
  const [tab, setTab] = useState<Tab>({
    admins:true,
    students:false,
    parents:false,
    teachers:false,
    unVerified: false,
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
    } finally{}
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

  const adminsColumns = [
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
    { name: 'Admins', tab: 'admins', columns: adminsColumns },
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
        </div>
        {tab.admins && <DataTable columns={adminsColumns} data={admins} />}
      </div>
      <div className={`${modal.create || modal.edit ? 'absolute min-h-screen inset-0 bg-black-100 bg-blend-multiply z-50 justify-end' : 'hidden'}`}>
        <div className='w-full h-full flex justify-end'>
          <div className='block bg-white-100 w-[432px] h-full relative pt-[100px] px-[50px]'>
            <div className='absolute top-10 -left-[50px]'>
              <button onClick={handleModalClose} className='w-[50px] h-[60px] bg-orange-default flex items-center justify-center rounded-l-sm'>
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 1L1 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 1L16 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className='flex flex-col gap-10'>
                <h6 className='text-black-100 text-3xl font-bold'>{modal.create ? 'Add Admin' : 'Edit Profile'}</h6>
                <div className='w-full h-[1px] bg-black-200'></div>
                <form className='flex flex-col gap-5 text-lg text-black-400 pb-[92px]'>
                  <div className='flex flex-col gap-2'>
                    <label className=''>First name</label>
                    <input type='text' className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label className=''>Last name</label>
                    <input type='text' className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label className=''>Email</label>
                    <input type='email' className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label className=''>Add phone number</label>
                    <input type='phone' className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label className=''>Permission level</label>
                    <select className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0'>
                      <option selected disabled>Select permission</option>
                      <option>Level 1 (Content upload)</option>
                      <option>Level 2 (Content download)</option>
                    </select>
                  </div>
                  <button className='w-full h-[60px] rounded-[30px] bg-orange-default flex items-center justify-center mt-[89px] text-white-default text-xl'>{modal.create ? 'Confirm' : 'Save Changes'}</button>
                </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
