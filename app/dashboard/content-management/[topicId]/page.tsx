//@ts-nocheck
'use client'
import { apiUrls } from "@/app/constants/apiUrls";
import { usePostData, useRetrieveData } from "@/app/constants/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CreateSections from "./(crud)/create-section";
import CreateQuestions from "./(crud)/create-question";
import { Sections } from "./(components)/sections";
import { Questions } from "./(components)/questions";
import UpdateQuestions from "./(crud)/update-question";
import UpdateSections from "./(crud)/update-section";

type Params = {
  topicId: string;
};

const TopicPage = ({ params }: { params: Params }) => {
  const postData = usePostData()

  const router = useRouter()
  const [data, setData] = useState({
    topics: {},
    subject: {},
    level: {}
  })
  const retrieveData = useRetrieveData()

  const handleAddSectionClick = () => {
    setUIState({ showAddSection: true });
  };

  const handleEditSectionClick = (data) => {
    setUIState({ showUpdateSection: true, updateSectionInitialData: data });
  };

  const handleAddQuestionClick = () => {
    setUIState({ showAddQuestion: true });
  };

  const handleEditQuestionClick = (data) => {
    setUIState({ showUpdateQuestion: true, updateQuestionInitialData: data });
  };

  const [uiState, setUIState] = useState({
    showAddSection: false,
    showUpdateSection: false,
    showAddQuestion: false,
    showUpdateQuestion: false,
    updateSectionInitialData: {},
    updateQuestionInitialData: {}
  });

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const [topicsResult] = await Promise.all([
        retrieveData(`${apiUrls.getTopics}/${params.topicId}`),
      ])
      setData(prev => ({
        ...prev,
        topics: topicsResult,
      }))
      await getSubjectData(topicsResult.subject)
      await getLevelData(topicsResult.level)
    } catch (error: any) {
      toast.error(error)
    } finally { }
  }

  const getSubjectData = async (subjectId: string) => {
    try {
      const [subjectResults] = await Promise.all([
        retrieveData(`${apiUrls.getSubjects}/${subjectId}`),
      ])
      setData(prev => ({
        ...prev,
        subject: subjectResults,
      }))
    } catch (error: any) {
      toast.error(error)
    } finally { }
  }

  const getLevelData = async (levelId: string) => {
    try {
      const [levelResults] = await Promise.all([
        retrieveData(`${apiUrls.getLevels}/${levelId}`),
      ])
      setData(prev => ({
        ...prev,
        level: levelResults,
      }))
    } catch (error: any) {
      toast.error(error)
    } finally { }
  }
  return (
    <>
      {uiState.showAddSection &&
        <CreateSections onBack={() => {
          getData();
          setUIState({ showAddSection: false });
        }} initialData={{
          topic: data?.topics?.name,
          topicId: data?.topics._id,
          syllabus: data?.topics.syllabus,
          level: data?.level?.name,
          subject: data?.subject?.name,
        }} />
      }

      {uiState.showUpdateSection &&
        <UpdateSections onBack={() => {
          setUIState({ showUpdateSection: false, updateSectionInitialData: {} });
        }} initialData={{
          topic: data?.topics?.name,
          topicId: data?.topics._id,
          syllabus: data?.topics.syllabus,
          level: data?.level?.name,
          subject: data?.subject?.name,
          data: uiState.updateSectionInitialData,
        }} />
      }

      {uiState.showAddQuestion &&
        <CreateQuestions onBack={() => {
          getData();
          setUIState({ showAddQuestion: false })
        }} initialData={{
          topic: data?.topics?.name,
          topicId: data?.topics._id,
          syllabus: data?.topics.syllabus,
          level: data?.level?.name,
          subject: data?.subject?.name,
        }} />
      }
      {uiState.showUpdateQuestion && (
        <>
          <UpdateQuestions onBack={() => {
            setUIState({ showUpdateQuestion: false, UpdateQuestionInitialData: {} });
          }} initialData={{
            topic: data?.topics?.name,
            topicId: data?.topics._id,
            syllabus: data?.topics.syllabus,
            level: data?.level?.name,
            subject: data?.subject?.name,
            data: uiState.updateQuestionInitialData,
          }} />
        </>
      )
      }
      {!uiState.showAddSection &&
        !uiState.showAddQuestion &&
        !uiState.showUpdateSection &&
        !uiState.showUpdateQuestion &&
        <div className='min-w-full h-auto rounded-[10px] text-black-100 bg-white-default'>
          <div className="flex flex-col px-7 pt-10">
            <div className="flex gap-5 justify-between self-start items-center">
              <svg onClick={router.back} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.70711 0.292893C10.0976 0.683418 10.0976 1.31658 9.70711 1.70711L3.41421 8H17C17.5523 8 18 8.44771 18 9C18 9.55228 17.5523 10 17 10H3.41421L9.70711 16.2929C10.0976 16.6834 10.0976 17.3166 9.70711 17.7071C9.31658 18.0976 8.68342 18.0976 8.29289 17.7071L0.292893 9.70711C-0.0976311 9.31658 -0.097631 8.68342 0.292893 8.29289L8.29289 0.292893C8.68342 -0.0976311 9.31658 -0.097631 9.70711 0.292893Z" fill="#222222" fill-opacity="0.6" />
              </svg>

              <div className="flex-auto text-3xl not-italic font-bold leading-8 text-neutral-800 text-opacity-80">
                {data?.topics?.name}
              </div>
              <div className='flex flex-row gap-[10px]'>
                <button
                  className={`w-[68px] h-[29px] b-[#FF9D0D] bg-orange-100 rounded-[5px] flex items-center justify-center text-orange-default border-[0.5px] border-solid border-orange-200 bg-orange-400'
                }`}
                  onClick={() => router.back}
                >
                  Topic
                </button>
              </div>
            </div>
            <div className="flex gap-5 justify-between self-start mt-8 ml-10 text-lg leading-[normal] text-neutral-800 text-opacity-60 max-md:flex-wrap max-md:ml-0 max-md:max-w-full">
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
            <div className="pl-9">
              <Sections onAddSectionClick={handleAddSectionClick} onEditSectionClick={(data) => handleEditSectionClick(data)} />
              <Questions onAddQuestionClick={handleAddQuestionClick} onEditQuestionClick={(data) => handleEditQuestionClick(data)} />
            </div>
          </div>
        </div>
      }

    </>
  );
};

export default TopicPage;
