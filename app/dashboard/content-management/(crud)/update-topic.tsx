'use client'

import { useState, FormEvent, useEffect } from 'react'
import SelectBox from '@/app/_components/form/SelectBox'
import { curriculumOptions } from '@/app/types/types'
import { usePatchData, usePostData, usePutData } from '@/app/constants/hooks'
import toast from 'react-hot-toast'
import { apiUrls } from '@/app/constants/apiUrls'
import { useRouter } from 'next/navigation'
import FileUpload from '@/app/_components/form/uploadFile'

export interface Subject {
    _id: string;
    isActive: boolean;
    isDeleted: boolean;
    name: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
}

export interface Level {
    _id: string;
    isActive: boolean;
    isDeleted: boolean;
    name: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
}

export interface Syllabus {
    _id: string;
    name: string;
}

interface CreateTopicProps {
    subjects: Subject[];
    levels: Level[];
    syllabus: Syllabus[];
    data: {},
    onRefresh: () => void;
}


export default function UpdateTopic({ subjects, levels, syllabus, data, onRefresh }: CreateTopicProps) {
    const subjectOptions = subjects?.map(subject => ({ name: subject.name, id: subject._id }))

    const levelOpts = levels?.map(level => ({ name: level.name, id: level._id }))

    const syllabusOpts = syllabus?.map(syllabus => ({ name: syllabus.name, id: syllabus._id }))

    const [formData, setFormData] = useState({
        name: '',
        subject: null as string | null,
        thumbnail: '',
        level: null as string | null,
        syllabus: null as string | null,
    })

    useEffect(() => {
        formData.name = data.name;
        formData.subject = data.subject;
        formData.thumbnail = data.coverImageUrl;
        formData.level = data.level;
        formData.syllabus = data.syllabus;
    })

    const [loading, setLoading] = useState(false)

    const patchData = usePatchData()

    const router = useRouter()

    const handleChange = (fieldName: string, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }))
    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const { name, subject, thumbnail, level, syllabus } = formData

        if (name === '' || subject === null || thumbnail === '' || level === null || syllabus === null) {
            toast.error('Please fill all the required fields!')
            return
        }

        setLoading(true)

        const send = new FormData()
        send.append('name', name)
        send.append('subject', subject)
        send.append('coverImageUrl', thumbnail)
        send.append('level', level || '')
        send.append('syllabus', syllabusOpts.find(obj => obj.id === syllabus)?.name ?? "NECTA")

        try {
            const response = await patchData(`${apiUrls.patchTopics}/${data._id}`, send, true)
            if (response) {
                onRefresh()
            }
        } catch (error: any) {
            toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8 text-lg text-black-400 pb-[92px]' encType='multipart/form-data'>
                <div className='flex flex-col gap-2'>
                    <label>Topic Name</label>
                    <input
                        type='text'
                        value={data.name ?? formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label>Subject</label>
                    <SelectBox
                        options={subjectOptions}
                        selected={
                            formData.subject !== null ?
                                { name: subjectOptions.find(opt => opt.id === formData.subject)?.name || '', id: formData.subject } :
                                subjectOptions.find(opt => opt.name === data.subject)
                        }
                        onChange={(value) => handleChange('subject', value?.id)}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <FileUpload label={"Add thumbnail"} onFileSelected={(file) => {
                        handleChange('thumbnail', file);
                    }} fileUrl={`${data.coverImageUrl}`} />
                </div>
                <div className='flex flex-col gap-2'>
                    <label>Level</label>
                    <SelectBox
                        options={levelOpts}
                        selected={formData.level !== null
                            ? levelOpts.find(opt => opt.id === formData.level)
                            : levelOpts.find(opt => opt.name === data.level)}
                        onChange={(value) => handleChange('level', value?.id)}
                    />
                </div>


                <div className='flex flex-col gap-2'>
                    <label>Syllabus</label>
                    <SelectBox
                        options={syllabusOpts}
                        selected={
                            formData.syllabus !== null ?
                                { name: syllabusOpts.find(opt => opt.id === formData.syllabus)?.name || '', id: formData.syllabus } :
                                syllabusOpts.find(opt => opt.name === data.syllabus)
                        }
                        onChange={(value) => handleChange('syllabus', value)}
                    />
                </div>
                <button className={`w-full h-[60px] rounded-[30px] bg-orange-default flex items-center justify-center mt-[89px] text-white-default text-xl ${loading ? 'flex flex-row gap-2 items-center' : ''}`} disabled={loading}>
                    <span>Save Changes</span>
                    {loading && (
                        <svg height="40" width="40" className="text-white-default">
                            <circle className="dot" cx="10" cy="20" r="3" />
                            <circle className="dot" cx="20" cy="20" r="3" />
                            <circle className="dot" cx="30" cy="20" r="3" />
                        </svg>
                    )}
                </button>
                {/* <button className={`w-full h-[60px] rounded-[30px] bg-red-default flex items-center justify-center mt-[12px] text-white-default text-xl ${loading ? 'flex flex-row gap-2 items-center' : ''}`} disabled={loading}>
                    <span>Delete</span>
                    {loading && (
                        <svg height="40" width="40" className="text-white-default">
                            <circle className="dot" cx="10" cy="20" r="3" />
                            <circle className="dot" cx="20" cy="20" r="3" />
                            <circle className="dot" cx="30" cy="20" r="3" />
                        </svg>
                    )}
                </button> */}
            </form>
        </>
    )
}
