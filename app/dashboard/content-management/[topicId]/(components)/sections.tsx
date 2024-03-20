//@ts-nocheck
import { Divider } from "@/app/_components/header/notifications";
import { apiUrls } from "@/app/constants/apiUrls";
import { useDeleteData, useRetrieveData } from "@/app/constants/hooks";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiMoreVertical } from "react-icons/fi";
import { CustomDropDown } from "../../(components)/custom_dropdown";
import Dropdown, {
    DropdownToggle,
    DropdownMenu,
    DropdownMenuWrapper,
    MenuItem,
    DropdownButton
} from "@trendmicro/react-dropdown";
import { info } from "console";

interface SectionsProps {
    onAddSectionClick: () => void,
    onEditSectionClick: (chapter) => void,
}

export function Sections({ onAddSectionClick, onEditSectionClick }: SectionsProps) {
    const [showAll, setShowAll] = useState(false);

    const [data, setData] = useState({
        chapters: [],
    })

    const retrieveData = useRetrieveData()

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const [chapterResults] = await Promise.all([
                retrieveData(`${apiUrls.getChapters}`),
            ])

            setData(prev => ({
                ...prev,
                chapters: chapterResults
            }))
        } catch (error: any) {
            toast.error(error)
        } finally { }
    }

    const [dropdownStates, setDropdownStates] = useState({});

    const toggleDropdownForRow = (rowId: any) => {
        setDropdownStates(prevStates => {
            const updatedStates: any = {};

            Object.keys(prevStates).forEach(id => {
                updatedStates[id] = false;
            });
            updatedStates[rowId] = !prevStates[rowId];

            return updatedStates;
        });
    };

    const deleteData = useDeleteData()

    const handleChapterDelete = async (chapterId: any) => {
        try {
            await deleteData(`${apiUrls.deleteChapter}/${chapterId}`);
            let topicChapters = retrieveData(`${apiUrls.getChapters}`);
            setData(prevData => ({
                ...prevData,
                chapters: prevData.chapters.filter(chapter => chapter !== topicChapters)
            }));
        } catch (error) {
            toast.error('An error occurred while deleting chapter');
        }
    };


    const renderChapterItem = (chapter, index) => (

        <div key={index} className="flex gap-5 justify-between self-center mt-7 max-w-full whitespace-nowrap leading-[normal] w-full max-md:flex-wrap mb-5">
            <div className="flex gap-5 justify-between text-lg">
                <div className="not-italic text-neutral-800 text-opacity-60">{index + 1 < 10 ? `0${index + 1}.` : `${index + 1}.`}</div>
                <div className="grow not-italic text-neutral-800 text-opacity-80">
                    <p className="whitespace-normal"> {`${chapter?.name}`}</p>
                </div>
            </div>
            <div className="inline-block">
                <div className="cursor__pointer">
                    <Dropdown onSelect={() => toggleDropdownForRow(chapter?._id)}>
                        <Dropdown.Toggle btnStyle="link" noCaret onClick={() => toggleDropdownForRow(chapter?._id)}>
                            <FiMoreVertical />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {dropdownStates[chapter?._id] && (
                                <CustomDropDown
                                    dismiss={() => setDropdownStates(prevStates => ({ ...prevStates, [chapter?._id]: false }))}
                                    onEdit={() => {
                                        onEditSectionClick(chapter);
                                    }}
                                    onDelete={() => {
                                        handleChapterDelete(chapter?._id);
                                    }}
                                />
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
    );

    const renderItems = () => {
        const itemsToRender = showAll ? data.chapters : data.chapters.slice(0, 3);
        return itemsToRender.map((chapter, index) => (
            <>
                {renderChapterItem(chapter, index)}
                <Divider key={`divider-${index}`} />
            </>
        ));
    };


    useEffect(() => {
        renderItems();
    }, [renderItems]);

    return (
        <>
            <div className="flex gap-4 justify-between mt-11 max-md:flex-wrap max-md:mt-10 mb-5">
                <div className="flex gap-4 items-center">
                    <div className="text-2xl not-italic font-bold leading-8 text-neutral-800 text-opacity-80">
                        Chapters
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
                <svg onClick={() => { onAddSectionClick() }} width="160" height="50" viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
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
