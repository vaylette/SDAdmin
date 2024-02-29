import CustomEditor from "@/app/_components/custom_editor"
import SelectBox from "@/app/_components/form/SelectBox"
import FileUpload from "@/app/_components/form/uploadFile"
import { Divider } from "@/app/_components/header/notifications"
import { apiUrls } from "@/app/constants/apiUrls"
import { usePostData } from "@/app/constants/hooks"
import { FormEvent, useState } from "react"
import toast from "react-hot-toast"

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
        { name: "Text", id: "text" },
    ];

    const [formData, setFormData] = useState({
        topic: initialData?.topicId,
        questionType: '',
        question: '',
        answer: ''
    })

    const handleChange = (fieldName: string, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }))
        console.log(fieldName, value)
    }
    const [loading, setLoading] = useState(false)

    const postData = usePostData()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (formData.questionType === '' || formData.question === null || formData.answer === null) {
            toast.error('Please fill all the required fields!')
            return
        }
        setLoading(true)
        try {
            
            const response = await postData(`${apiUrls.postQuestions}`, formData, false)
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

                                <div className='flex flex-col gap-2'>
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
                            </div>
                            <div className='flex flex-col gap-1 w-full'>
                                <label className='text-start'>Question</label>
                                <CustomEditor initialData={formData.question} onChange={(data) => {
                                    handleChange('question', data)
                                }} />
                            </div>
                            <div className='flex flex-col gap-1 w-full'>
                                <label className='text-start'>Answer</label>
                                <CustomEditor initialData={formData.answer} onChange={(data) => handleChange('answer', data)} />
                            </div>

                            {/* <div className="flex flex-col gap-1 text-right w-full mt-10">
                                <svg width="135" height="17" viewBox="0 0 135 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.24 7H9.84V8.76H6.24V12.34H4.34V8.76H0.74V7H4.34V3.4H6.24V7ZM28.5089 15H26.2489L24.8489 11.3H18.4489L17.0689 15H14.8489L20.4089 0.76H22.8689L28.5089 15ZM19.4289 8.66L19.1289 9.44H24.1489L23.8489 8.66C23.1422 6.9 22.4022 4.95333 21.6289 2.82C20.7089 5.27333 19.9756 7.22 19.4289 8.66ZM37.157 6.08V0.76H39.157V15H37.237V13.48C36.4637 14.6533 35.3237 15.24 33.817 15.24C32.377 15.24 31.2304 14.7533 30.377 13.78C29.5237 12.8067 29.097 11.4933 29.097 9.84C29.097 8.18667 29.5237 6.87333 30.377 5.9C31.2304 4.92667 32.377 4.44 33.817 4.44C35.2704 4.44 36.3837 4.98667 37.157 6.08ZM31.177 9.92C31.177 11.0667 31.4504 11.9533 31.997 12.58C32.5437 13.2067 33.277 13.52 34.197 13.52C35.1437 13.52 35.8837 13.1933 36.417 12.54C36.9504 11.9133 37.217 11.0133 37.217 9.84C37.217 8.68 36.9504 7.77333 36.417 7.12C35.8837 6.48 35.1437 6.16 34.197 6.16C33.277 6.16 32.5437 6.49333 31.997 7.16C31.4504 7.82667 31.177 8.74667 31.177 9.92ZM48.993 6.08V0.76H50.993V15H49.073V13.48C48.2996 14.6533 47.1596 15.24 45.653 15.24C44.213 15.24 43.0663 14.7533 42.213 13.78C41.3596 12.8067 40.933 11.4933 40.933 9.84C40.933 8.18667 41.3596 6.87333 42.213 5.9C43.0663 4.92667 44.213 4.44 45.653 4.44C47.1063 4.44 48.2196 4.98667 48.993 6.08ZM43.013 9.92C43.013 11.0667 43.2863 11.9533 43.833 12.58C44.3796 13.2067 45.113 13.52 46.033 13.52C46.9796 13.52 47.7196 13.1933 48.253 12.54C48.7863 11.9133 49.053 11.0133 49.053 9.84C49.053 8.68 48.7863 7.77333 48.253 7.12C47.7196 6.48 46.9796 6.16 46.033 6.16C45.113 6.16 44.3796 6.49333 43.833 7.16C43.2863 7.82667 43.013 8.74667 43.013 9.92ZM70.7119 7.88C70.7119 10.1467 70.0652 11.9533 68.7719 13.3L70.5519 15.2L69.3519 16.36L67.4719 14.36C66.3919 15 65.1585 15.32 63.7719 15.32C61.6652 15.32 59.9852 14.6333 58.7319 13.26C57.4519 11.9 56.8119 10.1067 56.8119 7.88C56.8119 5.66667 57.4519 3.86667 58.7319 2.48C59.9852 1.12 61.6652 0.439999 63.7719 0.439999C65.8519 0.439999 67.5319 1.12 68.8119 2.48C70.0785 3.86667 70.7119 5.66667 70.7119 7.88ZM63.7719 13.4C64.6252 13.4 65.3852 13.2133 66.0519 12.84L64.3319 11L65.5119 9.84L67.3119 11.76C68.0985 10.7733 68.4919 9.48 68.4919 7.88C68.4919 6.17333 68.0652 4.82667 67.2119 3.84C66.3452 2.85333 65.1985 2.36 63.7719 2.36C62.3452 2.36 61.1985 2.85333 60.3319 3.84C59.4652 4.85333 59.0319 6.2 59.0319 7.88C59.0319 9.57333 59.4652 10.9133 60.3319 11.9C61.1852 12.9 62.3319 13.4 63.7719 13.4ZM79.1695 10.5V4.68H81.1695V15H79.2495V13.46C78.4629 14.6467 77.3829 15.24 76.0095 15.24C74.8762 15.24 73.9895 14.92 73.3495 14.28C72.7095 13.64 72.3895 12.7467 72.3895 11.6V4.68H74.3895V11.32C74.3895 12.76 75.1162 13.48 76.5695 13.48C77.3029 13.48 77.9162 13.22 78.4095 12.7C78.9162 12.1667 79.1695 11.4333 79.1695 10.5ZM92.7447 9.92V10.5H84.9647C85.058 11.5133 85.358 12.28 85.8647 12.8C86.3714 13.3067 87.058 13.56 87.9247 13.56C89.2314 13.56 90.0847 12.9867 90.4847 11.84H92.5047C92.2247 12.8933 91.678 13.7267 90.8647 14.34C90.0647 14.94 89.0714 15.24 87.8847 15.24C86.4047 15.24 85.2114 14.7467 84.3047 13.76C83.398 12.7733 82.9447 11.4667 82.9447 9.84C82.9447 8.21333 83.398 6.90667 84.3047 5.92C85.2114 4.93333 86.3914 4.44 87.8447 4.44C89.3647 4.44 90.5647 4.95333 91.4447 5.98C92.3114 7.00667 92.7447 8.32 92.7447 9.92ZM87.8447 6.12C87.058 6.12 86.4114 6.36 85.9047 6.84C85.4114 7.32 85.1047 8.01333 84.9847 8.92H90.6847C90.5914 8.08 90.2914 7.40667 89.7847 6.9C89.2914 6.38 88.6447 6.12 87.8447 6.12ZM98.2798 15.26C95.4132 15.26 93.9065 14.08 93.7598 11.72H95.7598C95.8398 12.44 96.0732 12.9467 96.4598 13.24C96.8465 13.5333 97.4598 13.68 98.2998 13.68C99.8198 13.68 100.58 13.2 100.58 12.24C100.58 11.8267 100.42 11.5067 100.1 11.28C99.7798 11.0533 99.2065 10.8667 98.3798 10.72L97.3198 10.52C95.1332 10.12 94.0398 9.09333 94.0398 7.44C94.0398 6.52 94.3932 5.79333 95.0998 5.26C95.8065 4.71333 96.7798 4.44 98.0198 4.44C100.86 4.44 102.313 5.59333 102.38 7.9H100.44C100.4 7.20667 100.187 6.72 99.7998 6.44C99.4132 6.14667 98.8198 6 98.0198 6C97.3798 6 96.8865 6.12 96.5398 6.36C96.1932 6.6 96.0198 6.94 96.0198 7.38C96.0198 7.78 96.1732 8.09333 96.4798 8.32C96.7865 8.53333 97.2732 8.70667 97.9398 8.84L99.0198 9.02C100.287 9.26 101.2 9.62 101.76 10.1C102.32 10.58 102.6 11.2467 102.6 12.1C102.6 13.1 102.22 13.88 101.46 14.44C100.7 14.9867 99.6398 15.26 98.2798 15.26ZM108.813 4.68V6.32H106.733V12.52C106.733 12.8267 106.82 13.0533 106.993 13.2C107.18 13.3333 107.486 13.4 107.913 13.4H108.813V15C108.373 15.04 107.966 15.06 107.593 15.06C106.62 15.06 105.9 14.8733 105.433 14.5C104.966 14.1267 104.733 13.5267 104.733 12.7V6.32H103.073V4.68H104.733V1.72H106.733V4.68H108.813ZM112.437 3.22H110.397V1.08H112.437V3.22ZM112.417 15H110.417V4.68H112.417V15ZM122.995 13.76C122.048 14.7467 120.815 15.24 119.295 15.24C117.775 15.24 116.542 14.7467 115.595 13.76C114.648 12.7733 114.175 11.4667 114.175 9.84C114.175 8.2 114.648 6.88667 115.595 5.9C116.528 4.92667 117.762 4.44 119.295 4.44C120.828 4.44 122.062 4.92667 122.995 5.9C123.928 6.87333 124.395 8.18667 124.395 9.84C124.395 11.48 123.928 12.7867 122.995 13.76ZM117.075 12.54C117.622 13.1933 118.362 13.52 119.295 13.52C120.228 13.52 120.962 13.1933 121.495 12.54C122.042 11.8867 122.315 10.9867 122.315 9.84C122.315 8.69333 122.042 7.79333 121.495 7.14C120.962 6.48667 120.228 6.16 119.295 6.16C118.362 6.16 117.622 6.48667 117.075 7.14C116.528 7.79333 116.255 8.69333 116.255 9.84C116.255 10.9867 116.528 11.8867 117.075 12.54ZM131.319 4.44C132.452 4.44 133.339 4.76 133.979 5.4C134.619 6.02667 134.939 6.92 134.939 8.08V15H132.939V8.36C132.939 6.92 132.212 6.2 130.759 6.2C130.092 6.2 129.492 6.45333 128.959 6.96C128.426 7.48 128.159 8.22 128.159 9.18V15H126.159V4.68H128.079V6.22C128.866 5.03333 129.946 4.44 131.319 4.44Z" fill="#FF9D0D" />
                                </svg>

                            </div> */}

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