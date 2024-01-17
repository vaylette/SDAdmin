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
        </div>
      </div>
    </>
  )
}
