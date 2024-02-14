'use client'
import { Divider } from "@/app/_components/header/notifications";
import { apiUrls } from "@/app/constants/apiUrls";
import { usePostData, useRetrieveData } from "@/app/constants/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
    <div className='min-w-full h-auto rounded-[10px] text-black-100 bg-white-default'>
      <div className="flex flex-col px-7 pt-10">
        <div className="flex gap-5 justify-between self-start items-center">
          <svg onClick={router.back} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.70711 0.292893C10.0976 0.683418 10.0976 1.31658 9.70711 1.70711L3.41421 8H17C17.5523 8 18 8.44771 18 9C18 9.55228 17.5523 10 17 10H3.41421L9.70711 16.2929C10.0976 16.6834 10.0976 17.3166 9.70711 17.7071C9.31658 18.0976 8.68342 18.0976 8.29289 17.7071L0.292893 9.70711C-0.0976311 9.31658 -0.097631 8.68342 0.292893 8.29289L8.29289 0.292893C8.68342 -0.0976311 9.31658 -0.097631 9.70711 0.292893Z" fill="#222222" fill-opacity="0.6" />
          </svg>

          <div className="flex-auto text-3xl not-italic font-bold leading-8 text-neutral-800 text-opacity-80">
            {data?.topics.name}
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
          <Sections />
          <Questions />
        </div>
      </div>
    </div>
  );
};

export default TopicPage;

export function Sections() {
  const [showAll, setShowAll] = useState(false);

  const items = [
    'Introduction to Food Nutrients',
    'Second Item',
    'Third Item',
    'Fourth Item',
    'Fifth Item',
  ];

  const renderItems = () => {
    if (showAll) {
      return items.map((item, index) => (
        <>
          <div key={index} className="flex gap-5 justify-between self-center mt-7 max-w-full whitespace-nowrap leading-[normal] w-full max-md:flex-wrap mb-5">
            <div className="flex gap-5 justify-between text-lg">
              <div className="not-italic text-neutral-800 text-opacity-60">{index + 1 < 10 ? `0${index + 1}.` : `${index + 1}.`}</div>
              <div className="grow not-italic text-neutral-800 text-opacity-80">
                {item}
              </div>
            </div>
            <div className="flex gap-5 justify-between self-start text-base font-medium">
              <div className="not-italic text-[#FF9D0D]">Edit</div>
              <div className="not-italic text-[#FF0000]">Delete</div>
            </div>
          </div>
          <Divider />
        </>
      ));
    } else {
      const limitedItems = items.slice(0, 3);
      return limitedItems.map((item, index) => (
        <>
          <div key={index} className="flex gap-5 justify-between self-center mt-7 max-w-full whitespace-nowrap leading-[normal] w-full max-md:flex-wrap mb-5">
            <div className="flex gap-5 justify-between text-lg">
              <div className="not-italic text-neutral-800 text-opacity-60">{index + 1 < 10 ? `0${index + 1}.` : `${index + 1}.`}</div>
              <div className="grow not-italic text-neutral-800 text-opacity-80">
                {item}
              </div>
            </div>
            <div className="flex gap-5 justify-between self-start text-base font-medium">
              <div className="not-italic text-[#FF9D0D]">Edit</div>
              <div className="not-italic text-[#FF0000]">Delete</div>
            </div>
          </div>
          <Divider />
        </>
      ));
    }
  };

  useEffect(() => {
    renderItems();
  }, [renderItems]);

  return (
    <>
      <div className="flex gap-4 justify-between mt-11 max-md:flex-wrap max-md:mt-10 mb-5">
        <div className="flex gap-4 items-center">
          <div className="text-2xl not-italic font-bold leading-8 text-neutral-800 text-opacity-80">
            Sections
          </div>
          {!showAll && (
            <button
              className="text-base not-italic text-[#FF9D0D] underline leading-[normal] cursor-pointe mt-1"
              onClick={() => setShowAll(true)}
            >
              See All
            </button>
          )}
          {showAll && (
            <button
              className="text-base not-italic text-[#FF9D0D] underline leading-[normal] cursor-pointer mt-1"
              onClick={() => setShowAll(false)}
            >
              Show Less
            </button>
          )}
          {showAll && (
            <div onClick={() => {
              setShowAll(false)
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.6667 11.6667L17 17M7.22222 13.4444C3.78578 13.4444 1 10.6587 1 7.22222C1 3.78578 3.78578 1 7.22222 1C10.6587 1 13.4444 3.78578 13.4444 7.22222C13.4444 10.6587 10.6587 13.4444 7.22222 13.4444Z" stroke="#FF9D0D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          )}
        </div>
        <svg width="160" height="50" viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="160" height="50" rx="5" fill="#FF9D0D" fill-opacity="0.1" />
          <rect x="0.25" y="0.25" width="159.5" height="49.5" rx="4.75" stroke="#FF9D0D" stroke-opacity="0.5" stroke-width="0.5" />
          <path d="M34.492 31H32.458L31.198 27.67H25.438L24.196 31H22.198L27.202 18.184H29.416L34.492 31ZM26.32 25.294L26.05 25.996H30.568L30.298 25.294C29.662 23.71 28.996 21.958 28.3 20.038C27.472 22.246 26.812 23.998 26.32 25.294ZM42.2753 22.972V18.184H44.0753V31H42.3473V29.632C41.6513 30.688 40.6253 31.216 39.2693 31.216C37.9733 31.216 36.9413 30.778 36.1733 29.902C35.4053 29.026 35.0213 27.844 35.0213 26.356C35.0213 24.868 35.4053 23.686 36.1733 22.81C36.9413 21.934 37.9733 21.496 39.2693 21.496C40.5773 21.496 41.5793 21.988 42.2753 22.972ZM36.8933 26.428C36.8933 27.46 37.1393 28.258 37.6313 28.822C38.1233 29.386 38.7833 29.668 39.6113 29.668C40.4633 29.668 41.1293 29.374 41.6093 28.786C42.0893 28.222 42.3293 27.412 42.3293 26.356C42.3293 25.312 42.0893 24.496 41.6093 23.908C41.1293 23.332 40.4633 23.044 39.6113 23.044C38.7833 23.044 38.1233 23.344 37.6313 23.944C37.1393 24.544 36.8933 25.372 36.8933 26.428ZM52.9277 22.972V18.184H54.7277V31H52.9997V29.632C52.3037 30.688 51.2777 31.216 49.9217 31.216C48.6257 31.216 47.5937 30.778 46.8257 29.902C46.0577 29.026 45.6737 27.844 45.6737 26.356C45.6737 24.868 46.0577 23.686 46.8257 22.81C47.5937 21.934 48.6257 21.496 49.9217 21.496C51.2297 21.496 52.2317 21.988 52.9277 22.972ZM47.5457 26.428C47.5457 27.46 47.7917 28.258 48.2837 28.822C48.7757 29.386 49.4357 29.668 50.2637 29.668C51.1157 29.668 51.7817 29.374 52.2617 28.786C52.7417 28.222 52.9817 27.412 52.9817 26.356C52.9817 25.312 52.7417 24.496 52.2617 23.908C51.7817 23.332 51.1157 23.044 50.2637 23.044C49.4357 23.044 48.7757 23.344 48.2837 23.944C47.7917 24.544 47.5457 25.372 47.5457 26.428ZM65.2747 31.288C63.5827 31.288 62.2627 30.904 61.3147 30.136C60.3787 29.368 59.9047 28.246 59.8927 26.77H61.8187C61.8547 28.69 63.0187 29.65 65.3107 29.65C66.2587 29.65 66.9847 29.47 67.4887 29.11C68.0047 28.738 68.2627 28.204 68.2627 27.508C68.2627 26.944 68.0527 26.512 67.6327 26.212C67.2127 25.9 66.4567 25.624 65.3647 25.384L64.2667 25.15C62.9467 24.886 61.9507 24.454 61.2787 23.854C60.6067 23.254 60.2707 22.426 60.2707 21.37C60.2707 20.314 60.6787 19.474 61.4947 18.85C62.3107 18.214 63.4147 17.896 64.8067 17.896C66.4867 17.896 67.7467 18.256 68.5867 18.976C69.4387 19.696 69.8767 20.686 69.9007 21.946H67.9927C67.9327 21.118 67.6567 20.512 67.1647 20.128C66.6847 19.732 65.9047 19.534 64.8247 19.534C63.9847 19.534 63.3427 19.69 62.8987 20.002C62.4547 20.314 62.2327 20.758 62.2327 21.334C62.2327 21.922 62.4307 22.366 62.8267 22.666C63.2227 22.99 63.9547 23.266 65.0227 23.494L66.1387 23.728C67.6027 24.04 68.6527 24.49 69.2887 25.078C69.9367 25.666 70.2607 26.458 70.2607 27.454C70.2607 28.642 69.8167 29.578 68.9287 30.262C68.0527 30.946 66.8347 31.288 65.2747 31.288ZM80.3511 26.428V26.95H73.3491C73.4331 27.862 73.7031 28.552 74.1591 29.02C74.6151 29.476 75.2331 29.704 76.0131 29.704C77.1891 29.704 77.9571 29.188 78.3171 28.156H80.1351C79.8831 29.104 79.3911 29.854 78.6591 30.406C77.9391 30.946 77.0451 31.216 75.9771 31.216C74.6451 31.216 73.5711 30.772 72.7551 29.884C71.9391 28.996 71.5311 27.82 71.5311 26.356C71.5311 24.892 71.9391 23.716 72.7551 22.828C73.5711 21.94 74.6331 21.496 75.9411 21.496C77.3091 21.496 78.3891 21.958 79.1811 22.882C79.9611 23.806 80.3511 24.988 80.3511 26.428ZM75.9411 23.008C75.2331 23.008 74.6511 23.224 74.1951 23.656C73.7511 24.088 73.4751 24.712 73.3671 25.528H78.4971C78.4131 24.772 78.1431 24.166 77.6871 23.71C77.2431 23.242 76.6611 23.008 75.9411 23.008ZM85.9435 31.216C84.6235 31.216 83.5555 30.772 82.7395 29.884C81.9235 28.996 81.5155 27.82 81.5155 26.356C81.5155 24.88 81.9235 23.698 82.7395 22.81C83.5435 21.934 84.6115 21.496 85.9435 21.496C87.0835 21.496 88.0195 21.808 88.7515 22.432C89.4955 23.056 89.9395 23.896 90.0835 24.952H88.2475C88.1275 24.34 87.8575 23.872 87.4375 23.548C87.0295 23.224 86.5315 23.062 85.9435 23.062C85.1635 23.062 84.5395 23.35 84.0715 23.926C83.6155 24.49 83.3875 25.3 83.3875 26.356C83.3875 27.412 83.6155 28.228 84.0715 28.804C84.5395 29.368 85.1635 29.65 85.9435 29.65C86.5435 29.65 87.0535 29.482 87.4735 29.146C87.8935 28.81 88.1575 28.324 88.2655 27.688H90.1015C89.9575 28.768 89.5075 29.626 88.7515 30.262C87.9955 30.898 87.0595 31.216 85.9435 31.216ZM95.6211 21.712V23.188H93.7491V28.768C93.7491 29.044 93.8271 29.248 93.9831 29.38C94.1511 29.5 94.4271 29.56 94.8111 29.56H95.6211V31C95.2251 31.036 94.8591 31.054 94.5231 31.054C93.6471 31.054 92.9991 30.886 92.5791 30.55C92.1591 30.214 91.9491 29.674 91.9491 28.93V23.188H90.4551V21.712H91.9491V19.048H93.7491V21.712H95.6211ZM98.8826 20.398H97.0466V18.472H98.8826V20.398ZM98.8646 31H97.0646V21.712H98.8646V31ZM108.385 29.884C107.533 30.772 106.423 31.216 105.055 31.216C103.687 31.216 102.577 30.772 101.725 29.884C100.873 28.996 100.447 27.82 100.447 26.356C100.447 24.88 100.873 23.698 101.725 22.81C102.565 21.934 103.675 21.496 105.055 21.496C106.435 21.496 107.545 21.934 108.385 22.81C109.225 23.686 109.645 24.868 109.645 26.356C109.645 27.832 109.225 29.008 108.385 29.884ZM103.057 28.786C103.549 29.374 104.215 29.668 105.055 29.668C105.895 29.668 106.555 29.374 107.035 28.786C107.527 28.198 107.773 27.388 107.773 26.356C107.773 25.324 107.527 24.514 107.035 23.926C106.555 23.338 105.895 23.044 105.055 23.044C104.215 23.044 103.549 23.338 103.057 23.926C102.565 24.514 102.319 25.324 102.319 26.356C102.319 27.388 102.565 28.198 103.057 28.786ZM115.877 21.496C116.897 21.496 117.695 21.784 118.271 22.36C118.847 22.924 119.135 23.728 119.135 24.772V31H117.335V25.024C117.335 23.728 116.681 23.08 115.373 23.08C114.773 23.08 114.233 23.308 113.753 23.764C113.273 24.232 113.033 24.898 113.033 25.762V31H111.233V21.712H112.961V23.098C113.669 22.03 114.641 21.496 115.877 21.496Z" fill="#FF9D0D" />
          <path d="M138.916 24.1706H145V25.8626H138.916V32H137.084V25.8626H131V24.1706H137.084V18H138.916V24.1706Z" fill="#FF9D0D" />
        </svg>

      </div>
      <Divider />
      {renderItems()}
    </>
  );
}


export const Questions = () => {
  const [showAll, setShowAll] = useState(false);

  const questions = [
    'What unit measures electrical resistance?',
    'Second Question',
    'Third Question',
    'Fourth Question',
    'Fifth Question',
  ];

  const renderQuestions = () => {
    if (showAll) {
      return questions.map((question, index) => (
        <>
          <div className="flex gap-5 justify-between self-center mt-7 max-w-full whitespace-nowrap leading-[normal] w-full max-md:flex-wrap mb-5">
            <div className="flex gap-5 justify-between text-lg">
              <div className="not-italic text-neutral-800 text-opacity-60">{index + 1 < 10 ? `0${index + 1}.` : `${index + 1}.`}</div>
              <div className="grow not-italic text-neutral-800 text-opacity-80">
                {question}
              </div>
            </div>
            <div className="flex gap-5 justify-between self-start text-base font-medium">
              <div className="not-italic text-[#FF9D0D]">Edit</div>
              <div className="not-italic text-[#FF0000]">Delete</div>
            </div>
          </div>
          <Divider />
        </>
      ));
    } else {
      const limitedQuestions = questions.slice(0, 3);
      return limitedQuestions.map((question, index) => (
        <>
          <div className="flex gap-5 justify-between self-center mt-7 max-w-full whitespace-nowrap leading-[normal] w-full max-md:flex-wrap mb-5">
            <div className="flex gap-5 justify-between text-lg">
              <div className="not-italic text-neutral-800 text-opacity-60">{index + 1 < 10 ? `0${index + 1}.` : `${index + 1}.`}</div>
              <div className="grow not-italic text-neutral-800 text-opacity-80">
                {question}
              </div>
            </div>
            <div className="flex gap-5 justify-between self-start text-base font-medium">
              <div className="not-italic text-[#FF9D0D]">Edit</div>
              <div className="not-italic text-[#FF0000]">Delete</div>
            </div>
          </div>
          <Divider />
        </>
      ));
    }
  };

  return (
    <>
      <div className="flex gap-5 justify-between mt-12 max-w-full whitespace-nowrap max-md:flex-wrap max-md:mt-10 mb-5">
        <div className="flex gap-4 items-center">
          <div className="grow text-2xl not-italic font-bold leading-8 text-neutral-800 text-opacity-80">
            Questions
          </div>
          {!showAll && (
            <button
              className="text-base not-italic text-[#FF9D0D] underline leading-[normal] cursor-pointer mt-1"
              onClick={() => setShowAll(true)}
            >
              See All
            </button>
          )}
          {showAll && (
            <button
              className="text-base not-italic text-[#FF9D0D] underline leading-[normal] cursor-pointer mt-1"
              onClick={() => setShowAll(false)}
            >
              Show Less
            </button>
          )}
          {showAll && (
            <div onClick={() => {
              setShowAll(false)
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.6667 11.6667L17 17M7.22222 13.4444C3.78578 13.4444 1 10.6587 1 7.22222C1 3.78578 3.78578 1 7.22222 1C10.6587 1 13.4444 3.78578 13.4444 7.22222C13.4444 10.6587 10.6587 13.4444 7.22222 13.4444Z" stroke="#FF9D0D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          )}
        </div>
        <svg width="171" height="50" viewBox="0 0 171 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="171" height="50" rx="5" fill="#FF9D0D" fill-opacity="0.1" />
          <rect x="0.25" y="0.25" width="170.5" height="49.5" rx="4.75" stroke="#FF9D0D" stroke-opacity="0.5" stroke-width="0.5" />
          <path d="M34.492 31H32.458L31.198 27.67H25.438L24.196 31H22.198L27.202 18.184H29.416L34.492 31ZM26.32 25.294L26.05 25.996H30.568L30.298 25.294C29.662 23.71 28.996 21.958 28.3 20.038C27.472 22.246 26.812 23.998 26.32 25.294ZM42.2753 22.972V18.184H44.0753V31H42.3473V29.632C41.6513 30.688 40.6253 31.216 39.2693 31.216C37.9733 31.216 36.9413 30.778 36.1733 29.902C35.4053 29.026 35.0213 27.844 35.0213 26.356C35.0213 24.868 35.4053 23.686 36.1733 22.81C36.9413 21.934 37.9733 21.496 39.2693 21.496C40.5773 21.496 41.5793 21.988 42.2753 22.972ZM36.8933 26.428C36.8933 27.46 37.1393 28.258 37.6313 28.822C38.1233 29.386 38.7833 29.668 39.6113 29.668C40.4633 29.668 41.1293 29.374 41.6093 28.786C42.0893 28.222 42.3293 27.412 42.3293 26.356C42.3293 25.312 42.0893 24.496 41.6093 23.908C41.1293 23.332 40.4633 23.044 39.6113 23.044C38.7833 23.044 38.1233 23.344 37.6313 23.944C37.1393 24.544 36.8933 25.372 36.8933 26.428ZM52.9277 22.972V18.184H54.7277V31H52.9997V29.632C52.3037 30.688 51.2777 31.216 49.9217 31.216C48.6257 31.216 47.5937 30.778 46.8257 29.902C46.0577 29.026 45.6737 27.844 45.6737 26.356C45.6737 24.868 46.0577 23.686 46.8257 22.81C47.5937 21.934 48.6257 21.496 49.9217 21.496C51.2297 21.496 52.2317 21.988 52.9277 22.972ZM47.5457 26.428C47.5457 27.46 47.7917 28.258 48.2837 28.822C48.7757 29.386 49.4357 29.668 50.2637 29.668C51.1157 29.668 51.7817 29.374 52.2617 28.786C52.7417 28.222 52.9817 27.412 52.9817 26.356C52.9817 25.312 52.7417 24.496 52.2617 23.908C51.7817 23.332 51.1157 23.044 50.2637 23.044C49.4357 23.044 48.7757 23.344 48.2837 23.944C47.7917 24.544 47.5457 25.372 47.5457 26.428ZM72.4747 24.592C72.4747 26.632 71.8927 28.258 70.7287 29.47L72.3307 31.18L71.2507 32.224L69.5587 30.424C68.5867 31 67.4767 31.288 66.2287 31.288C64.3327 31.288 62.8207 30.67 61.6927 29.434C60.5407 28.21 59.9647 26.596 59.9647 24.592C59.9647 22.6 60.5407 20.98 61.6927 19.732C62.8207 18.508 64.3327 17.896 66.2287 17.896C68.1007 17.896 69.6127 18.508 70.7647 19.732C71.9047 20.98 72.4747 22.6 72.4747 24.592ZM66.2287 29.56C66.9967 29.56 67.6807 29.392 68.2807 29.056L66.7327 27.4L67.7947 26.356L69.4147 28.084C70.1227 27.196 70.4767 26.032 70.4767 24.592C70.4767 23.056 70.0927 21.844 69.3247 20.956C68.5447 20.068 67.5127 19.624 66.2287 19.624C64.9447 19.624 63.9127 20.068 63.1327 20.956C62.3527 21.868 61.9627 23.08 61.9627 24.592C61.9627 26.116 62.3527 27.322 63.1327 28.21C63.9007 29.11 64.9327 29.56 66.2287 29.56ZM80.0866 26.95V21.712H81.8866V31H80.1586V29.614C79.4506 30.682 78.4786 31.216 77.2426 31.216C76.2226 31.216 75.4246 30.928 74.8486 30.352C74.2726 29.776 73.9846 28.972 73.9846 27.94V21.712H75.7846V27.688C75.7846 28.984 76.4386 29.632 77.7466 29.632C78.4066 29.632 78.9586 29.398 79.4026 28.93C79.8586 28.45 80.0866 27.79 80.0866 26.95ZM92.3042 26.428V26.95H85.3022C85.3862 27.862 85.6562 28.552 86.1122 29.02C86.5682 29.476 87.1862 29.704 87.9662 29.704C89.1422 29.704 89.9102 29.188 90.2702 28.156H92.0882C91.8362 29.104 91.3442 29.854 90.6122 30.406C89.8922 30.946 88.9982 31.216 87.9302 31.216C86.5982 31.216 85.5242 30.772 84.7082 29.884C83.8922 28.996 83.4842 27.82 83.4842 26.356C83.4842 24.892 83.8922 23.716 84.7082 22.828C85.5242 21.94 86.5862 21.496 87.8942 21.496C89.2622 21.496 90.3422 21.958 91.1342 22.882C91.9142 23.806 92.3042 24.988 92.3042 26.428ZM87.8942 23.008C87.1862 23.008 86.6042 23.224 86.1482 23.656C85.7042 24.088 85.4282 24.712 85.3202 25.528H90.4502C90.3662 24.772 90.0962 24.166 89.6402 23.71C89.1962 23.242 88.6142 23.008 87.8942 23.008ZM97.2858 31.234C94.7058 31.234 93.3498 30.172 93.2178 28.048H95.0178C95.0898 28.696 95.2998 29.152 95.6478 29.416C95.9958 29.68 96.5478 29.812 97.3038 29.812C98.6718 29.812 99.3558 29.38 99.3558 28.516C99.3558 28.144 99.2118 27.856 98.9238 27.652C98.6358 27.448 98.1198 27.28 97.3758 27.148L96.4218 26.968C94.4538 26.608 93.4698 25.684 93.4698 24.196C93.4698 23.368 93.7878 22.714 94.4238 22.234C95.0598 21.742 95.9358 21.496 97.0518 21.496C99.6078 21.496 100.916 22.534 100.976 24.61H99.2298C99.1938 23.986 99.0018 23.548 98.6538 23.296C98.3058 23.032 97.7718 22.9 97.0518 22.9C96.4758 22.9 96.0318 23.008 95.7198 23.224C95.4078 23.44 95.2518 23.746 95.2518 24.142C95.2518 24.502 95.3898 24.784 95.6658 24.988C95.9418 25.18 96.3798 25.336 96.9798 25.456L97.9518 25.618C99.0918 25.834 99.9138 26.158 100.418 26.59C100.922 27.022 101.174 27.622 101.174 28.39C101.174 29.29 100.832 29.992 100.148 30.496C99.4638 30.988 98.5098 31.234 97.2858 31.234ZM106.766 21.712V23.188H104.894V28.768C104.894 29.044 104.972 29.248 105.128 29.38C105.296 29.5 105.572 29.56 105.956 29.56H106.766V31C106.37 31.036 106.004 31.054 105.668 31.054C104.792 31.054 104.144 30.886 103.724 30.55C103.304 30.214 103.094 29.674 103.094 28.93V23.188H101.6V21.712H103.094V19.048H104.894V21.712H106.766ZM110.027 20.398H108.191V18.472H110.027V20.398ZM110.009 31H108.209V21.712H110.009V31ZM119.53 29.884C118.678 30.772 117.568 31.216 116.2 31.216C114.832 31.216 113.722 30.772 112.87 29.884C112.018 28.996 111.592 27.82 111.592 26.356C111.592 24.88 112.018 23.698 112.87 22.81C113.71 21.934 114.82 21.496 116.2 21.496C117.58 21.496 118.69 21.934 119.53 22.81C120.37 23.686 120.79 24.868 120.79 26.356C120.79 27.832 120.37 29.008 119.53 29.884ZM114.202 28.786C114.694 29.374 115.36 29.668 116.2 29.668C117.04 29.668 117.7 29.374 118.18 28.786C118.672 28.198 118.918 27.388 118.918 26.356C118.918 25.324 118.672 24.514 118.18 23.926C117.7 23.338 117.04 23.044 116.2 23.044C115.36 23.044 114.694 23.338 114.202 23.926C113.71 24.514 113.464 25.324 113.464 26.356C113.464 27.388 113.71 28.198 114.202 28.786ZM127.021 21.496C128.041 21.496 128.839 21.784 129.415 22.36C129.991 22.924 130.279 23.728 130.279 24.772V31H128.479V25.024C128.479 23.728 127.825 23.08 126.517 23.08C125.917 23.08 125.377 23.308 124.897 23.764C124.417 24.232 124.177 24.898 124.177 25.762V31H122.377V21.712H124.105V23.098C124.813 22.03 125.785 21.496 127.021 21.496Z" fill="#FF9D0D" />
          <path d="M149.916 24.1706H156V25.8626H149.916V32H148.084V25.8626H142V24.1706H148.084V18H149.916V24.1706Z" fill="#FF9D0D" />
        </svg>

      </div>
      <Divider />
      {renderQuestions()}
    </>
  );
};
