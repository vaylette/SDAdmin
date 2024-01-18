'use client'
import DataTable from "@/app/_components/datatable"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useState, useReducer } from "react"

export default function UserManagement() {
  interface Tab {
    admins: boolean,
    students: boolean,
    parents: boolean,
    teachers: boolean
  }

  type User = {
    s_no: string | number | null | undefined
    name: string,
    email: string,
    phone: string,
    role: string,
    permission: string,
    action: null
  }

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

  const users: User[] = [
    {
      s_no: '',
      name: 'Carlos Mtibwa',
      email: 'carlos@gmail.com',
      phone: '255765381198',
      role: 'Admin',
      permission: 'Level 1',
      action: null
    },
    {
      s_no: '',
      name: 'Samwel Yanga',
      email: 'samwel@gmail.com',
      phone: '255765381198',
      role: 'Teacher',
      permission: 'Level 1',
      action: null
    },
    {
      s_no: '',
      name: 'Zulfa Ihefu',
      email: 'zulfa@gmail.com',
      phone: '255765381198',
      role: 'Admin',
      permission: 'Level 1',
      action: null
    },
    {
      s_no: '',
      name: 'Fetty Simba',
      email: 'fetty@gmail.com',
      phone: '255765381198',
      role: 'Teacher',
      permission: 'Level 1',
      action: null
    },
    {
      s_no: '',
      name: 'Sajidu Mlandege',
      email: 'sajidu@gmail.com',
      phone: '255765381198',
      role: 'Admin,Teacher',
      permission: 'Level 1',
      action: null
    },
    {
      s_no: '',
      name: 'Dany Mashujaa',
      email: 'dany@gmail.com',
      phone: '255765381198',
      role: 'Admin,Teacher',
      permission: 'Level 1',
      action: null
    },
    {
      s_no: '',
      name: 'Jean Yanga',
      email: 'jean@gmail.com',
      phone: '255765381198',
      role: 'Teacher',
      permission: 'Level 1',
      action: null
    },
    {
      s_no: '',
      name: 'Abdul Arsenal',
      email: 'abdul@gmail.com',
      phone: '255765381198',
      role: 'Admin',
      permission: 'Level 1',
      action: null
    },
    {
      s_no: '',
      name: 'Waissa Mwaisa',
      email: 'waissa@gmail.com',
      phone: '255765381198',
      role: 'Admin,Teacher',
      permission: 'Level 1',
      action: null
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

  const columnHelper = createColumnHelper<User>()

  const columns = [
    columnHelper.accessor('s_no', {
      header: () => 'S/No',
      cell: (info) => info.row.index +1,
      
    }),
    columnHelper.accessor('name', {
      header: () => 'Name',
      cell: info => info.getValue()
    }),
    columnHelper.accessor('email', {
      header: () => 'Email',
      cell: info => info.getValue()
    }),
    columnHelper.accessor('phone', {
      header: () => 'Phone',
      cell: info => info.getValue()
    }),
    columnHelper.accessor('role', {
      header: () => 'Role',
      cell: info => info.getValue()
    }),
    columnHelper.accessor('permission', {
      header: () => 'Permission',
      cell: info => info.getValue()
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

  const [data, setData] = useState(() => [...users])
  const rerender = useReducer(() => ({}), {})[1]

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel()})

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
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id} className='border-b-[1px] border-b-black-700'>
                    {headerGroup.headers.map(header => (
                      <th key={header.id} className='p-8'>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id} className='text-centere border-b-[1px] border-b-black-700'>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className='p-8 text-center'>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
