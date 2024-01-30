'use client'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/16/solid'
import SelectBox from '@/app/_components/form/SelectBox';

export interface Subject {
    _id: string;
    isActive: boolean;
    isDeleted: boolean;
    name: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
}
  
interface CreateTopicProps {
  subjects: Subject[];
}
  

export default function CreateTopic({ subjects } : CreateTopicProps) {
  const options = subjects?.map(subject => ({ name: subject.name}))
  return (
    <>
        <form className='flex flex-col gap-5 text-lg text-black-400 pb-[92px]'>
          <div className='flex flex-col gap-2'>
            <label className=''>Name</label>
            <input type='text' className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0' />
          </div>
          <div className='flex flex-col gap-2'>
            <label className=''>Curriculum</label>
            <select className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0'>
              <option selected disabled>Select curriculum</option>
              <option>NECTA</option>
              <option>CAMBRIDGE</option>
            </select>
          </div>
          <div className='flex flex-col gap-2'>
            <label className=''>Description</label>
            <textarea rows={4} className='w-full bg-black-500 rounded-[4px] h-auto text-black-400 p-2 focus:outline-none focus:ring-0'  />
          </div>
          <div className='flex flex-col gap-2'>
            <label className=''>Subjects</label>
            <SelectBox options={options} />
          </div>
          <button className='w-full h-[60px] rounded-[30px] bg-orange-default flex items-center justify-center mt-[89px] text-white-default text-xl'>Save Changes</button>
        </form>
    </>
  )
}
