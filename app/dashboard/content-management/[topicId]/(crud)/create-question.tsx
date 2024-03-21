//@ts-nocheck
import CustomEditor from "@/app/_components/custom_editor"
import SelectBox from "@/app/_components/form/SelectBox"
import FileUpload from "@/app/_components/form/uploadFile"
import { Divider } from "@/app/_components/header/notifications"
import { apiUrls } from "@/app/constants/apiUrls"
import { usePostData } from "@/app/constants/hooks"
import { FormEvent, useState } from "react"
import toast from "react-hot-toast"
import { MultipleChoiceForm } from "../(components)/multiple_choice"

interface CreateSectionsProps {
    initialData: any,
    onBack: () => void;
}

export default function CreateQuestions({ initialData, onBack }: CreateSectionsProps) {
    const data = {
        topics: {
            name: initialData?.topic,
            syllabus: initialData?.syllabus,
        },
        subject: {
            name: initialData?.subject
        },
        level: {
            name: initialData?.level
        }
    }
    const questionType = [
        { name: "Choice", id: "multiple_choice" },
    ];

    const [formData, setFormData] = useState({
        topic: initialData?.topicId,
        questionType: '',
        question: '',
        answer: '',
        choices: [],
        thumbnail: null as string | null,
    })

    const handleMultipleChoiceSubmit = ({ choices, correctAnswer }) => {
        handleChange('choices', choices);
        handleChange('answer', correctAnswer);
    };

    const handleChange = (fieldName: string, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }))
    }
    const [loading, setLoading] = useState(false)

    const postData = usePostData()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (formData.questionType === '' || formData.question === '' || formData.answer === '' || formData.choices.length == 0) {
            toast.error('Please fill all the required fields!')
            return
        }
        setLoading(true)
        try {

            const response = await postData(`${apiUrls.postQuestions}`, formData, true)
            if (response) {
                onBack()
            }
        } catch (error: any) {
            toast.error(error?.message)
        } finally {
            setLoading(false)
        }
    }

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
                            <span className="font-medium text-orange-200">{data?.topics?.name}</span>
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
                                    <label className='text-right'>Question:</label>
                                    <input type='text' value={formData.question}
                                        onChange={(e) => handleChange('question', e.target.value)} className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0' />
                                </div>
                                <div className='flex flex-col gap-2 w-full'>
                                    <div className="flex items-center">
                                        <label htmlFor="fileType">Question Type</label>
                                    </div>

                                    <SelectBox
                                        options={questionType}
                                        selected={formData.questionType !== '' ? { name: questionType.find(opt => opt.id === formData.questionType)?.name || '', id: formData.questionType } : null}
                                        onChange={(value) => handleChange('questionType', value?.id)}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 w-full'>
                                <FileUpload allowedFileTypes={[".jpg",".png"]} label={"Thumbnail"} text={"Add Image"} onFileSelected={(file) => {
                                    handleChange('thumbnail', file)
                                }} />
                            </div>
                            <div className='grid grid-cols-2 gap-4 w-full'>
                                <MultipleChoiceForm onSubmit={handleMultipleChoiceSubmit} />
                            </div>
                            <button onClick={handleSubmit} className={`w-full h-[60px] rounded-[30px] bg-orange-default flex items-center justify-center mt-[50px] text-white-default text-xl ${loading ? 'flex flex-row gap-2 items-center' : ''}`} disabled={loading}>
                                <span>Add Question</span>
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