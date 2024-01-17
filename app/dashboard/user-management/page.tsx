'use client'
import { useState } from "react"

interface Tab {
  admins: boolean,
  students: boolean,
  parents: boolean,
  teachers: boolean
}
export default function UserManagement() {
  return (
    <>
      <div className='w-full h-full p-6'>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-row gap-[10px]'>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
