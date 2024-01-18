// 'use client'
// import { useMemo } from "react"
// import { useReactTable, flexRender, getCoreRowModel } from "@tanstack/react-table"

// interface DataTableProps {
//     columns: Array<any>;
//     data: Array<any>;
// }

// export default function DataTable({ columns, data}: DataTableProps) {
//     const tableData = useMemo(() => data, [data])
//     const columnDef = useMemo(() => columns, [columns])

//     const tableInstance = useReactTable({
//         columns: columnDef,
//         data: tableData,
//         getCoreRowModel: getCoreRowModel(),
//     })
//   return (
//     <>
//         <table className='min-w-full h-auto rounded-[10px] text-black-100 bg-white-default text-[15px]'>
//             <thead className='uppercase font-medium'>
//                 {tableInstance.getHeaderGroups().map((headerEl) => {
//                     <tr key={headerEl.id} className='border-b-[1px] border-b-black-700 w-full'>
//                         {headerEl.headers.map((columnEl) => {
//                             return (
//                                 <th key={columnEl.id}>
//                                     {columnEl.isPlaceholder ? null : flexRender(
//                                         columnEl.column.columnDef.header,
//                                         columnEl.getContext()
//                                     )}
//                                 </th>
//                             )
//                         })}
//                     </tr>
//                 })}
//             </thead>
//             <tbody>
//                 {tableInstance.getRowModel().rows.map((rowEl) => {
//                     return (
//                         <tr key={rowEl.id}>
//                             {rowEl.getVisibleCells().map((cellEl) => {
//                                 return (
//                                     <td key={cellEl.id}>
//                                         {flexRender(
//                                             cellEl.column.columnDef.cell,
//                                             cellEl.getContext()
//                                         )}
//                                     </td>
//                                 )
//                             })}
//                         </tr>
//                     )
//                 })}
//             </tbody>
//         </table>
//     </>
//   )
// }
