'use client'
import { useMemo } from "react"
import { flexRender, getCoreRowModel, useReactTable, getPaginationRowModel } from '@tanstack/react-table'
interface DataTableProps {
  columns: Array<any>;
  data: Array<any>;
}

export default function DataTable({ columns, data }: DataTableProps) {
  const tableData = useMemo(() => data, [data])
  const columnDef = useMemo(() => columns, [columns])

  const table = useReactTable({
    data: tableData,
    columns: columnDef,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 8
      }
    }
  })
  return (
    <>
      <div className='flex flex-col gap-10 text-[12px]'>
        <table className='min-w-full h-auto rounded-[10px] text-black-100 bg-white-default'>
          <thead className='uppercase font-medium whitespace-nowrap'>
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
            {data && table.getRowModel().rows.map(row => (
              <tr key={row.id} className='text-center border-b-[1px] border-b-black-700'>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className='p-8 text-center'>
                    <div className="truncate text-center">
                      <div className="inline-block" style={{ width: '100%', overflowX: 'auto' }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </div>
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
              {table.getState().pagination.pageIndex !== undefined && table.options.state.pagination?.pageSize !== undefined &&
                (table.getState().pagination.pageIndex * table.options.state.pagination.pageSize + 1)
              } to&nbsp;
              {table.getState().pagination?.pageIndex !== undefined && table.options.state.pagination?.pageSize !== undefined &&
                Math.min((table.getState().pagination.pageIndex + 1) * table.options.state.pagination.pageSize as number, tableData?.length)
              } of {tableData?.length} entries
            </span>

            <div className='flex flex-row gap-[10px] items-center'>
              <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className='cursor-pointer bg-black-400 w-6 h-6 flex items-center justify-center rounded-sm'>
                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.65807 8.69893L2.89593 4.92857L6.65807 1.15821L5.49986 0L0.571289 4.92857L5.49986 9.85714L6.65807 8.69893Z" fill="white" />
                </svg>
              </button>
              <span className='leading-normal'>Page {table.options.state.pagination?.pageIndex as number + 1}</span>
              <button onClick={() => table.nextPage()} disabled={data && !table.getCanNextPage()} className='cursor-pointer bg-orange-default w-6 h-6 flex items-center justify-center rounded-sm'>
                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 8.69893L3.76214 4.92857L0 1.15821L1.15821 0L6.08679 4.92857L1.15821 9.85714L0 8.69893Z" fill="white" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}
