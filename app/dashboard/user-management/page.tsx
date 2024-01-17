'use client'
import { useState } from "react"

interface Tab {
  admins: boolean,
  students: boolean,
  parents: boolean,
  teachers: boolean
}
export default function UserManagement() {
  const [tab, setTab] = useState<Tab>({
    admins:true,
    students:false,
    parents:false,
    teachers:false,
  })

  const tabList = [
    {
      name: 'Admins',
      tab: 'admins'
    },
    {
      name: 'Students',
      tab: 'students'
    },
    {
      name: 'Parents',
      tab: 'parents'
    },
    {
      name: 'Teachers',
      tab: 'teachers'
    },
  ]

  const users = [
    {
      name: 'Carlos Mtibwa',
      email: 'carlos@gmail.com',
      phone: '255765381198',
      role: 'Admin',
      permission: 'Level 1'
    },
    {
      name: 'Samwel Yanga',
      email: 'samwel@gmail.com',
      phone: '255765381198',
      role: 'Teacher',
      permission: 'Level 1'
    },
    {
      name: 'Zulfa Ihefu',
      email: 'zulfa@gmail.com',
      phone: '255765381198',
      role: 'Admin',
      permission: 'Level 1'
    },
    {
      name: 'Fetty Simba',
      email: 'fetty@gmail.com',
      phone: '255765381198',
      role: 'Teacher',
      permission: 'Level 1'
    },
    {
      name: 'Sajidu Mlandege',
      email: 'sajidu@gmail.com',
      phone: '255765381198',
      role: 'Admin,Teacher',
      permission: 'Level 1'
    },
    {
      name: 'Dany Mashujaa',
      email: 'dany@gmail.com',
      phone: '255765381198',
      role: 'Admin,Teacher',
      permission: 'Level 1'
    },
    {
      name: 'Jean Yanga',
      email: 'jean@gmail.com',
      phone: '255765381198',
      role: 'Teacher',
      permission: 'Level 1'
    },
    {
      name: 'Abdul Arsenal',
      email: 'abdul@gmail.com',
      phone: '255765381198',
      role: 'Admin',
      permission: 'Level 1'
    },
    {
      name: 'Waissa Mwaisa',
      email: 'waissa@gmail.com',
      phone: '255765381198',
      role: 'Admin,Teacher',
      permission: 'Level 1'
    },
  ]

  const handleActiveTab = (activeTab: keyof Tab): void => {
    setTab((prev) => ({
      admins: false,
      students: false,
      parents: false,
      teachers: false,
      [activeTab]: true,
    }));
  };

  return (
    <>
      <div className='w-full h-full p-6'>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-row justify-between text-[20px]'>
            <div className='flex flex-row gap-[10px]'>
              {tabList?.map((item, index) => (
                <button key={index} className={`w-[128px] h-[60px] rounded-[5px] flex items-center justify-center ${tab[item.tab as keyof Tab] ? 'bg-orange-default text-white-default' : 'text-orange-default border-[0.5px] border-solid border-orange-200 bg-orange-400'}`} onClick={() => handleActiveTab(item.tab as keyof Tab)}>
                  {item.name}
                </button>
              ))}
            </div>
            <button className='w-[178px] h-[60px] rounded-[5px] bg-orange-default text-white-default flex items-center justify-center'>Add {tab.admins ? 'Admin' : (tab.parents ? 'Parent' : (tab.students ? 'Student' : 'Teacher'))} +</button>
          </div>
          <div>
            <table className='min-w-full h-auto rounded-[10px] text-black-100 bg-white-default text-[15px]'>
              <thead className='uppercase font-medium'>
                <tr className='border-b-[1px] border-b-black-700 w-full'>
                  <th className='px-8 py-9'>S/O</th>
                  <th className='px-8 py-9'>Name</th>
                  <th className='px-8 py-9'>Email</th>
                  <th className='px-8 py-9'>Phone</th>
                  <th className='px-8 py-9'>Identity</th>
                  <th className='px-8 py-9'>Permission</th>
                  <th className='px-8 py-9'></th>
                </tr>
              </thead>
              <tbody className='text-black-100'>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
