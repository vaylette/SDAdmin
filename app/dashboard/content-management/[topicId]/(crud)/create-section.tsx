import CustomEditor from "@/app/_components/custom_editor"
import SelectBox from "@/app/_components/form/SelectBox"
import FileUpload from "@/app/_components/form/uploadFile"
import { Divider } from "@/app/_components/header/notifications"
import { useState } from "react"

interface CreateSectionsProps {
    onBack: () => void;
}

export default function CreateSections({ onBack }: CreateSectionsProps) {
    const data = {
        topics: {
            name: "Add Section",
            syllabus: "NECTA",
        },
        subject: {
            name: "Biology"
        },
        level: {
            name: "Form Four"
        }
    }
    const sectionOrders = [{ name: "1", id: "0" }]

    const [formData, setFormData] = useState({
        sectionName: '',
        sectionOrder: ''
    })

    const handleChange = (fieldName: string, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }))
    }
    const [loading, setLoading] = useState(false)

    return (
        <>
            <div className='min-w-full h-auto rounded-[10px] text-black-100 bg-white-default'>
                <div className="flex flex-col px-7 pt-10">
                    <div className="flex gap-5 justify-between self-start items-center">
                        <svg onClick={onBack} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.70711 0.292893C10.0976 0.683418 10.0976 1.31658 9.70711 1.70711L3.41421 8H17C17.5523 8 18 8.44771 18 9C18 9.55228 17.5523 10 17 10H3.41421L9.70711 16.2929C10.0976 16.6834 10.0976 17.3166 9.70711 17.7071C9.31658 18.0976 8.68342 18.0976 8.29289 17.7071L0.292893 9.70711C-0.0976311 9.31658 -0.097631 8.68342 0.292893 8.29289L8.29289 0.292893C8.68342 -0.0976311 9.31658 -0.097631 9.70711 0.292893Z" fill="#222222" fill-opacity="0.6" />
                        </svg>

                        <div className="flex-auto text-3xl not-italic font-bold leading-8 text-neutral-800 text-opacity-80">
                            {data?.topics.name}
                        </div>

                    </div>
                    <div className="flex gap-5 justify-between self-start mt-8 ml-10 text-lg leading-[normal] text-neutral-800 text-opacity-60 max-md:flex-wrap max-md:ml-0 max-md:max-w-full">
                        <div className="grow not-italic whitespace-nowrap">
                            <span className="text-neutral-800">Topic:</span>{" "}
                            <span className="font-medium text-orange-200">Food Nutrients</span>
                        </div>
                        <div className="grow not-italic whitespace-nowrap">
                            <span className="text-neutral-800">Subject:</span>{" "}
                            <span className="font-medium">{data?.subject.name}</span>
                        </div>
                        <div className="flex-auto not-italic">
                            <span className="text-neutral-800">Level:</span>{" "}
                            <span className="font-medium">{data?.level.name}</span>
                        </div>
                        <div className="grow not-italic whitespace-nowrap">
                            <span className="text-neutral-800">Syllabus:</span>{" "}
                            <span className="font-medium">{data?.topics?.syllabus}</span>
                        </div>
                    </div>

                    <div className="pl-9 mt-6">
                        <Divider />
                        <form className='flex flex-col gap-5 text-lg text-black-400 pb-[92px]'>
                            <div className='grid grid-cols-2 gap-4 w-full'>
                                <div className='flex flex-col items-start gap-2'>
                                    <label className='text-right'>Section name:</label>
                                    <input type='text' className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0' />
                                </div>
                                <div className='flex flex-col items-start gap-2'>
                                    <div className='flex flex-col gap-2 w-full'>
                                        <div className="flex items-center">
                                            <label htmlFor="fileType">Selection Order</label>
                                            <span className="ml-2 flex items-center">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM5.49982 9.50004C5.22368 9.50004 4.99982 9.7239 4.99982 10C4.99982 10.2762 5.22368 10.5 5.49982 10.5L6.99978 10.5L8.49982 10.5C8.77596 10.5 8.99982 10.2762 8.99982 10C8.99982 9.7239 8.77596 9.50004 8.49982 9.50004H7.49978V6.50004C7.49978 6.2239 7.27592 6.00004 6.99978 6.00004H5.99978C5.72364 6.00004 5.49978 6.2239 5.49978 6.50004C5.49978 6.77619 5.72364 7.00004 5.99978 7.00004H6.49978V9.50004H5.49982ZM7.99978 4.00004C7.99978 4.55233 7.55206 5.00004 6.99978 5.00004C6.44749 5.00004 5.99978 4.55233 5.99978 4.00004C5.99978 3.44776 6.44749 3.00004 6.99978 3.00004C7.55206 3.00004 7.99978 3.44776 7.99978 4.00004Z" fill="#222222" fill-opacity="0.4" />
                                                </svg>
                                            </span>
                                        </div>

                                        <SelectBox
                                            options={sectionOrders}
                                            selected={formData.sectionOrder !== null ? { name: sectionOrders.find(opt => opt.id === formData.sectionOrder)?.name || '', id: formData.sectionOrder } : null}
                                            onChange={(value) => handleChange('sectionOrder', value?.id)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 w-full'>
                                <label className='text-start'>Content</label>
                                <CustomEditor />
                            </div>
                            <div className='flex flex-col gap-1 w-full'>
                                <FileUpload label={"Upload file (*pdf)"} text={"Add file"} />
                            </div>
                            <button className={`w-full h-[60px] rounded-[30px] bg-orange-default flex items-center justify-center mt-[50px] text-white-default text-xl ${loading ? 'flex flex-row gap-2 items-center' : ''}`} disabled={loading}>
                                <span>Add Section</span>
                                {loading && (
                                    <svg height="40" width="40" className="text-white-default">
                                        <circle className="dot" cx="10" cy="20" r="3" />
                                        <circle className="dot" cx="20" cy="20" r="3" />
                                        <circle className="dot" cx="30" cy="20" r="3" />
                                    </svg>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}