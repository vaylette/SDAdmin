'use client'
// import DataTable from "@/app/_components/datatable"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel } from '@tanstack/react-table'
import { useState } from "react"

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

interface Modal {
  create: boolean,
  edit: boolean
}

export default function UserManagement() {
  
  const [tab, setTab] = useState<Tab>({
    admins:true,
    students:false,
    parents:false,
    teachers:false,
  })

  const [modal, setModal] = useState<Modal>({
    create: false,
    edit: false
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
      role: 'Admin, Teacher',
      permission: 'Level 1',
      action: null
    },
    {
      s_no: '',
      name: 'Dany Mashujaa',
      email: 'dany@gmail.com',
      phone: '255765381198',
      role: 'Admin, Teacher',
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
      role: 'Admin, Teacher',
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
      cell: (info) => (info.row.index + 1 + "").padStart(2, "0"),
      size: 75,
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

  const table = useReactTable({ 
    data, 
    columns, 
    getCoreRowModel: getCoreRowModel(), 
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 8
      }
    }
  })

  const handleModal = (modalType: string): void => {
    setModal((prev) => ({ ...prev, [modalType]: true }))
  }

  const handleModalClose = (): void => {
    setModal({ create: false, edit: false });
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
            {tab.admins && (
              <button onClick={() => handleModal('create')} className='w-[178px] h-[60px] rounded-[5px] bg-orange-default text-white-default flex items-center justify-center'>Add Admin +</button>
            )}
          </div>
          <div className='flex flex-col gap-10 text-[15px]'>
            <table className='min-w-full h-auto rounded-[10px] text-black-100 bg-white-default'>
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
            <div className='flex justify-end text-black-400 leading-4'>
              <div className='flex flex-row items-center gap-[10px]'>
              <span>
                Showing&nbsp;    
                {table.getState().pagination?.pageIndex !== undefined && table.options.state.pagination?.pageSize !== undefined &&
                  (table.getState().pagination.pageIndex * table.options.state.pagination.pageSize + 1)
                } to&nbsp;
                {table.getState().pagination?.pageIndex !== undefined && table.options.state.pagination?.pageSize !== undefined &&
                  Math.min((table.getState().pagination.pageIndex + 1) * table.options.state.pagination.pageSize as number, users.length)
                } of {users.length} entries
                </span>

                <div className='flex flex-row gap-[10px] items-center'>
                  <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className='cursor-pointer bg-black-400 w-6 h-6 flex items-center justify-center rounded-sm'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M6.65807 8.69893L2.89593 4.92857L6.65807 1.15821L5.49986 0L0.571289 4.92857L5.49986 9.85714L6.65807 8.69893Z" fill="white"/>
                    </svg>
                  </button>
                  <span className='leading-normal'>Page {table.options.state.pagination?.pageIndex as number + 1}</span>
                  <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className='cursor-pointer bg-orange-default w-6 h-6 flex items-center justify-center rounded-sm'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0 8.69893L3.76214 4.92857L0 1.15821L1.15821 0L6.08679 4.92857L1.15821 9.85714L0 8.69893Z" fill="white"/>
                    </svg>
                  </button>  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${modal.create || modal.edit ? 'fixed inset-0 bg-black-100 bg-blend-multiply z-50 justify-end' : 'hidden'}`}>
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
                <h6 className='text-black-100 text-3xl font-bold'>Add {tab.admins ? 'Admin' : (tab.parents ? 'Parent' : (tab.students ? 'Student' : 'Teacher'))}</h6>
                <div className='w-full h-[1px] bg-black-200'></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
