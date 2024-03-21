import SelectBox from "@/app/_components/form/SelectBox";
import FileUpload from "@/app/_components/form/uploadFile";
import { apiUrls } from "@/app/constants/apiUrls";
import { usePatchData } from "@/app/constants/hooks";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface Subject {
    _id: string;
    isActive: boolean;
    isDeleted: boolean;
    name: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
}

interface UpdateSimulationProps {
    subjects: Subject[];
    data: any;
    onRefresh: () => void;
}

export default function UpdateSimulation({ data, onRefresh }: UpdateSimulationProps) {
    const subjectOptions = data?.subjects?.map((subject: { name: any; _id: any; }) => ({ name: subject.name, id: subject._id }))
    const fileTypeOptions =
    [{ name: data?.data.fileType, id: "1" }]

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: data?.data?.name,
        subject: subjectOptions.find((opt: { id: any; }) => opt.id == data?.data.subject)?.id,
        fileType: fileTypeOptions.find((opt) => opt.name == data?.data.fileType)?.name,
        description: data?.data.description || '',
        thumbnail: data?.data.thumbnail || '',
        simulationFile: data?.data.simulationFileUrl || '',
    })

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
        setLoading(true)
        try {
            const response = await patchData(`${apiUrls.patchSimulations}/${data.data._id}`, formData, true)
            if (response) {
                onRefresh();
            }
        } catch (error: any) {
            toast.error(`${error?.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8 text-lg text-black-400 pb-[92px]' encType='multipart/form-data'>
                <div className='flex flex-col gap-2'>
                    <label>Simulation Name</label>
                    <input
                        type='text'
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label>Subject</label>
                    <SelectBox
                        options={subjectOptions}
                        selected={formData.subject !== null ? { name: subjectOptions.find((opt: { id: any; }) => opt.id === formData.subject)?.name || '', id: formData.subject } : null}
                        onChange={(value) => handleChange('subject', value?.id)}
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <div className="flex items-center">
                        <label htmlFor="fileType">File type</label>
                        <span className="ml-2 flex items-center">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM5.49982 9.50004C5.22368 9.50004 4.99982 9.7239 4.99982 10C4.99982 10.2762 5.22368 10.5 5.49982 10.5L6.99978 10.5L8.49982 10.5C8.77596 10.5 8.99982 10.2762 8.99982 10C8.99982 9.7239 8.77596 9.50004 8.49982 9.50004H7.49978V6.50004C7.49978 6.2239 7.27592 6.00004 6.99978 6.00004H5.99978C5.72364 6.00004 5.49978 6.2239 5.49978 6.50004C5.49978 6.77619 5.72364 7.00004 5.99978 7.00004H6.49978V9.50004H5.49982ZM7.99978 4.00004C7.99978 4.55233 7.55206 5.00004 6.99978 5.00004C6.44749 5.00004 5.99978 4.55233 5.99978 4.00004C5.99978 3.44776 6.44749 3.00004 6.99978 3.00004C7.55206 3.00004 7.99978 3.44776 7.99978 4.00004Z" fill="#222222" fill-opacity="0.4" />
                            </svg>
                        </span>
                    </div>

                    <SelectBox
                        options={fileTypeOptions}
                        selected={formData.fileType !== null ? { name: fileTypeOptions.find(opt => opt.name === formData.fileType)?.name, id: formData.fileType } : null}
                        onChange={(value) => handleChange('fileType', value?.name)}
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={formData.description ?? ""}
                        onChange={(e) => handleChange('description', e.target.value)}
                        className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <FileUpload allowedFileTypes={[".png",".jpg", ".jpeg"]} fileUrl={formData.thumbnail} label={"Thumbnail"} onFileSelected={(file) => {
                        handleChange('thumbnail', file)
                    }} />
                </div>

                <div className='flex flex-col gap-2'>
                    <FileUpload allowedFileTypes={[".gif"]} fileUrl={formData.simulationFile} label={"Simulation File"} onFileSelected={(file) => {
                        handleChange('simulationFile', file)
                    }} />
                </div>

                <button className={`w-full h-[60px] rounded-[30px] bg-orange-default flex items-center justify-center mt-[89px] text-white-default text-xl ${loading ? 'flex flex-row gap-2 items-center' : ''}`} disabled={loading} type="submit">
                    <span>Update Simulation</span>
                    {loading && (
                        <svg height="40" width="40" className="text-white-default">
                            <circle className="dot" cx="10" cy="20" r="3" />
                            <circle className="dot" cx="20" cy="20" r="3" />
                            <circle className="dot" cx="30" cy="20" r="3" />
                        </svg>
                    )}
                </button>
            </form>
        </>
    );
}
