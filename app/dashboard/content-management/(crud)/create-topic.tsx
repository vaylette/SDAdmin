'use client'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/16/solid'
import SelectBox from '@/app/_components/form/SelectBox'
import { curriculumOptions, levelOptions } from '@/app/types/types'

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
  const subjectOptions = subjects?.map(subject => ({ name: subject.name}))

  const [formData, setFormData] = useState({
    name: '',
    curriculum: null as string | null,
    description: '',
    subject: null as string | null,
    level: null as string | null,
  });

  const handleChange = (fieldName: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  console.log(formData)

  return (
    <>
        <form className='flex flex-col gap-8 text-lg text-black-400 pb-[92px]'>
            <div className='flex flex-col gap-2'>
                <label>Name</label>
                <input
                    type='text'
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0'
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label>Curriculum</label>
                <SelectBox
                    options={curriculumOptions}
                    selected={formData.curriculum !== null ? { name: formData.curriculum } : null}
                    onChange={(value) => handleChange('curriculum', value ? value.name : '')}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label>Description</label>
                <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className='w-full bg-black-500 rounded-[4px] h-auto text-black-400 p-2 focus:outline-none focus:ring-0'
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label>Subject</label>
                <SelectBox
                    options={subjectOptions}
                    selected={formData.subject !== null ? { name: formData.subject } : null}
                    onChange={(value) => handleChange('selectedSubjects', value.name)}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label>Level</label>
                <SelectBox
                    options={levelOptions}
                    selected={formData.level !== null ? { name: formData.level } : null}
                    onChange={(value) => handleChange('level', value.name)}
                />
            </div>
            <button className='w-full h-[60px] rounded-[30px] bg-orange-default flex items-center justify-center mt-[89px] text-white-default text-xl'>Save Changes</button>
      </form>
    </>
  )
}
