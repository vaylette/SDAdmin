'use client'
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import useAuthStore, { AuthStore } from "../store/useAuthStore"
import Logout from "../actions/logout"

interface Drop {
    notifications: boolean,
    profile: boolean
}
  
export default function Header() {
    const [title, setTitle] = useState<string | null >(null)

    const authStore = useAuthStore((state) => state) as AuthStore

    const logout = Logout()

    const { user } = authStore

    const [drop, setDrop] = useState<Drop>({
        notifications: false,
        profile: false
    })

    const handleDrop = (dropType: string): void => {
        setDrop((prev) => ({ ...prev, [dropType]: true }))
    }

    const pathname: string = usePathname()

    useEffect(() => {
        switch(pathname) {
            case '/dashboard': return setTitle('Overview'); break;
            case '/dashboard/user-management': return setTitle('User Management'); break;
            case '/dashboard/content-management': return setTitle('Content Management'); break;
            default: setTitle('Overview')
        }
    }, [pathname])

  return (
    <>
      <header className="w-full h-[150px] bg-header flex flex-row justify-between items-center px-8">
        <h6 className="font-bold text-orange-default text-[40px]">{title}</h6>
        <ul className="flex flex-row gap-4 items-center">
            <li>
                <button onClick={() => handleDrop('notifications')} className='bg-orange-default w-[50px] h-[50px] rounded-full flex items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 24" fill="none">
                        <path d="M1.51759 15.1604L2.00448 14.6844C2.16158 14.5307 2.25002 14.3224 2.25002 14.1052V9.55556C2.25002 4.83046 6.16761 1.00001 11.0002 1C15.8328 0.999988 19.7503 4.83045 19.7503 9.55556V14.1052C19.7503 14.3224 19.8386 14.5307 19.9957 14.6844L20.4826 15.1605C20.6313 15.3058 20.7067 15.3796 20.766 15.4604C20.8783 15.6133 20.9521 15.7894 20.9833 15.9752C20.9998 16.0735 21 16.1766 21 16.3828C21 16.8541 21 17.0897 20.9344 17.2797C20.8097 17.6413 20.5203 17.9253 20.1505 18.0473C19.9568 18.1111 19.7166 18.1111 19.2384 18.1111H14.7502V19.3333C14.7502 21.3584 13.0713 23 11.0002 23C8.92907 23 7.25011 21.3584 7.25011 19.3333V18.1111H2.76198C2.28379 18.1111 2.04447 18.1111 1.85084 18.0473C1.48101 17.9253 1.19032 17.6413 1.06557 17.2797C1 17.0896 1 16.8541 1 16.3828C1 16.1766 1 16.0735 1.0165 15.9752C1.04768 15.7894 1.12207 15.6133 1.23438 15.4604C1.29381 15.3795 1.36845 15.3062 1.51759 15.1604Z" fill="white"/>
                        <path d="M14.7502 18.1111V19.3333C14.7502 21.3584 13.0713 23 11.0002 23C8.92907 23 7.25011 21.3584 7.25011 19.3333V18.1111M14.7502 18.1111H7.25011M14.7502 18.1111H19.2384C19.7166 18.1111 19.9568 18.1111 20.1505 18.0473C20.5203 17.9253 20.8097 17.6413 20.9344 17.2797C21 17.0897 21 16.8541 21 16.3828C21 16.1766 20.9998 16.0735 20.9833 15.9752C20.9521 15.7894 20.8783 15.6133 20.766 15.4604C20.7067 15.3796 20.6313 15.3058 20.4826 15.1605L19.9957 14.6844C19.8386 14.5307 19.7503 14.3224 19.7503 14.1052V9.55556C19.7503 4.83045 15.8328 0.999988 11.0002 1C6.16761 1.00001 2.25002 4.83046 2.25002 9.55556V14.1052C2.25002 14.3224 2.16158 14.5307 2.00448 14.6844L1.51759 15.1604C1.36845 15.3062 1.29381 15.3795 1.23438 15.4604C1.12207 15.6133 1.04768 15.7894 1.0165 15.9752C1 16.0735 1 16.1766 1 16.3828C1 16.8541 1 17.0896 1.06557 17.2797C1.19032 17.6413 1.48101 17.9253 1.85084 18.0473C2.04447 18.1111 2.28379 18.1111 2.76198 18.1111H7.25011" stroke="#FF9D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </li>
            <li className='bg-orange-default w-[50px] h-[50px] rounded-full flex items-center justify-center'>
                <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.8126 28.357C25.9393 25.6336 24.2236 23.2578 21.913 21.5723C19.6024 19.8868 16.8162 18.9785 13.9561 18.9785C11.0961 18.9785 8.30987 19.8868 5.99926 21.5723C3.68865 23.2578 1.97298 25.6336 1.09961 28.357H26.8126Z" fill="white" stroke="#FF9D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.9565 18.9954C18.8188 18.9954 22.7606 15.0537 22.7606 10.1913C22.7606 5.32894 18.8188 1.38721 13.9565 1.38721C9.09408 1.38721 5.15234 5.32894 5.15234 10.1913C5.15234 15.0537 9.09408 18.9954 13.9565 18.9954Z" fill="white" stroke="#FF9D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.8317 13.5977C16.8317 13.5977 16.1012 15.0351 13.9568 15.0351C11.8125 15.0351 11.082 13.5977 11.082 13.5977" stroke="#FF9D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22.6014 8.51507C22.5818 8.5152 22.5622 8.51527 22.5425 8.51527C19.9834 8.51527 17.6858 7.39566 16.1128 5.61954C14.5398 7.39569 12.2422 8.51532 9.68307 8.51532C8.197 8.51532 6.7991 8.13777 5.58008 7.47336C6.72538 3.94112 10.0428 1.38721 13.9567 1.38721C18.2458 1.38721 21.8186 4.45439 22.6014 8.51507Z" fill="white" stroke="#FF9D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </li>
            <li>
                <button onClick={() => handleDrop('profile')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="9" viewBox="0 0 16 9" fill="none">
                        <path d="M15 1L8 8L1 1" stroke="#FF9D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </li>
        </ul>
      </header>
      <div className={`${drop.notifications || drop.profile ? 'absolute inset-0 bg-black-100 bg-blend-multiply z-50' : 'hidden' }`}>
        {drop.notifications && (
            <>
                <div className="absolute top-[115px] right-[118px]">
                    <div className="w-[366px] h-[468px] rounded-lg bg-white-default shadow-drop relative">
                        <div className="absolute -top-[6px] right-8 w-[13.24px] h-[13.24px] bg-white-default" style={{ transform: 'rotate(135deg)' }}></div>
                    </div>
                    
                </div>
            </>
        )}
        {drop.profile && (
            <>
                <div className="absolute top-[115px] right-10">
                    <div className="w-auto h-auto rounded-lg py-9 px-[30px] bg-white-default shadow-drop relative">
                        <div className="absolute -top-[6px] right-8 w-[13.24px] h-[13.24px] bg-white-default" style={{ transform: 'rotate(135deg)' }}></div>
                        <div className='flex flex-col'>
                            <ul className='flex flex-col ga-[13px] leading-[25px]'>
                                <li className='text-orange-default text-lg'>Admin</li>
                                <li className='text-black-100 text-xl font-medium'>{user?.name}</li>
                                <li className='text-black-300 text-sm'>{user?.email}</li>
                            </ul>
                            <div className='w-full h-[1px] bg-black-500 mt-[25px]'></div>
                            <ul className='mt-[25px] flex flex-col w-full gap-7'>
                                <li className='w-full flex flex-row justify-between items-center'>
                                    <span className='flex flex-row items-center gap-[11px] text-black-400 text-base'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                            <path d="M16.6002 6.72579L16.2888 6.54211C16.2404 6.51359 16.2167 6.49927 16.1933 6.48444C15.9611 6.33695 15.7654 6.13317 15.6225 5.88937C15.6082 5.86484 15.5946 5.83912 15.5669 5.78827C15.5393 5.73749 15.5252 5.71176 15.5124 5.68629C15.3842 5.43265 15.3149 5.14999 15.3108 4.86229C15.3104 4.83337 15.3105 4.80382 15.3114 4.74507L15.3175 4.36165C15.3272 3.74808 15.3321 3.44035 15.2508 3.16417C15.1786 2.91886 15.0577 2.69291 14.8963 2.50116C14.7139 2.28441 14.4614 2.12978 13.9559 1.82091L13.536 1.56435C13.0319 1.25634 12.7798 1.10228 12.5121 1.04355C12.2754 0.99159 12.031 0.993998 11.7951 1.05015C11.5288 1.11353 11.2798 1.2716 10.7822 1.58757L10.7793 1.589L10.4785 1.78002C10.4309 1.81022 10.4068 1.82545 10.383 1.8395C10.1464 1.979 9.88219 2.05613 9.61159 2.06534C9.58431 2.06627 9.55657 2.06627 9.5011 2.06627C9.44597 2.06627 9.41704 2.06627 9.38982 2.06534C9.11863 2.05609 8.85392 1.97854 8.61693 1.83847C8.59304 1.82435 8.56941 1.809 8.52174 1.77866L8.21896 1.58592C7.71788 1.26696 7.46697 1.10724 7.19922 1.04355C6.96235 0.987197 6.71717 0.985638 6.47953 1.03827C6.21121 1.09769 5.95901 1.25289 5.45461 1.56329L5.45236 1.56435L5.03769 1.81953L5.0331 1.82251C4.53324 2.13012 4.28271 2.28429 4.10183 2.50016C3.94132 2.69171 3.82135 2.91731 3.74954 3.16197C3.66837 3.43852 3.67269 3.74692 3.68248 4.36338L3.68855 4.74625C3.68947 4.80423 3.69107 4.83304 3.69067 4.86156C3.68664 5.14984 3.61643 5.43308 3.48793 5.68717C3.47522 5.7123 3.46153 5.73743 3.43419 5.78762C3.40682 5.83785 3.39357 5.86283 3.37938 5.88707C3.23591 6.13217 3.03929 6.33714 2.80561 6.48488C2.7825 6.49949 2.75814 6.51355 2.71028 6.54167L2.40283 6.72232C1.8913 7.02289 1.63559 7.17331 1.44953 7.38736C1.28493 7.57672 1.16058 7.80134 1.08468 8.04596C0.99888 8.32248 0.998952 8.63256 1.00028 9.25265L1.00137 9.75947C1.00269 10.3754 1.0045 10.6832 1.09049 10.9578C1.16656 11.2008 1.29 11.4241 1.45368 11.6123C1.63869 11.8251 1.89185 11.9746 2.39951 12.274L2.70421 12.4537C2.75607 12.4843 2.78217 12.4994 2.80717 12.5154C3.03873 12.6632 3.23381 12.8676 3.37606 13.1113C3.39143 13.1377 3.40618 13.165 3.43568 13.2196C3.46481 13.2736 3.47972 13.3006 3.4932 13.3276C3.61792 13.578 3.68469 13.8562 3.68924 14.1393C3.68974 14.1699 3.68932 14.2008 3.68833 14.263L3.68248 14.6304C3.67263 15.249 3.66834 15.5586 3.74998 15.8359C3.82221 16.0813 3.94294 16.3072 4.10432 16.499C4.28674 16.7157 4.53962 16.8702 5.04516 17.1791L5.46498 17.4356C5.9691 17.7436 6.22107 17.8975 6.4887 17.9562C6.72547 18.0082 6.96995 18.0062 7.20587 17.95C7.47251 17.8866 7.72235 17.7279 8.22145 17.4111L8.52232 17.2201C8.56991 17.1898 8.59402 17.1747 8.61786 17.1606C8.85449 17.0211 9.11839 16.9436 9.38899 16.9344C9.41626 16.9335 9.444 16.9335 9.49948 16.9335C9.55508 16.9335 9.58279 16.9335 9.61012 16.9344C9.88131 16.9436 10.1468 17.0214 10.3838 17.1615C10.4047 17.1738 10.4256 17.1871 10.4622 17.2105L10.7821 17.4141C11.2832 17.7331 11.5336 17.8924 11.8014 17.9561C12.0383 18.0124 12.2836 18.0147 12.5213 17.9621C12.7895 17.9027 13.0422 17.7472 13.5463 17.4369L13.9673 17.1779C14.4674 16.8701 14.7182 16.7158 14.8992 16.4998C15.0597 16.3083 15.1798 16.0828 15.2516 15.8381C15.3322 15.5636 15.3273 15.2576 15.3177 14.65L15.3114 14.2537C15.3105 14.1958 15.3104 14.1669 15.3108 14.1384C15.3148 13.8501 15.3839 13.5667 15.5124 13.3126C15.5251 13.2875 15.5389 13.2622 15.5661 13.2121C15.5935 13.1619 15.6076 13.1369 15.6218 13.1126C15.7653 12.8675 15.9621 12.6624 16.1958 12.5147C16.2186 12.5002 16.2421 12.4864 16.2889 12.459L16.2905 12.4582L16.5979 12.2775C17.1094 11.977 17.3656 11.8264 17.5517 11.6123C17.7163 11.423 17.8405 11.1987 17.9164 10.954C18.0017 10.6791 18.001 10.3709 17.9997 9.75802L17.9986 9.24032C17.9973 8.62437 17.9966 8.31665 17.9106 8.042C17.8345 7.79902 17.7104 7.57572 17.5467 7.3875C17.3619 7.17495 17.1083 7.02542 16.6017 6.72656L16.6002 6.72579Z" stroke="#FF9D0D" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M6.09894 9.50006C6.09894 11.4918 7.62177 13.1065 9.50027 13.1065C11.3788 13.1065 12.9016 11.4918 12.9016 9.50006C12.9016 7.50829 11.3788 5.89364 9.50027 5.89364C7.62177 5.89364 6.09894 7.50829 6.09894 9.50006Z" stroke="#FF9D0D" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>Account</span>
                                    </span>
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
                                            <path d="M1 1L6 6L1 11" stroke="#FF9D0D" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                </li>
                                <li className='w-full'>
                                    <button onClick={logout} className='flex flex-row items-center gap-[11px] text-black-400 text-base'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
                                            <path d="M10.8993 4.89557C10.7035 4.70079 10.3869 4.70158 10.1922 4.89733C9.99738 5.09308 9.99817 5.40966 10.1939 5.60443L10.8993 4.89557ZM13.3974 8.79193C13.5931 8.98671 13.9097 8.98592 14.1045 8.79017C14.2992 8.59442 14.2984 8.27784 14.1027 8.08307L13.3974 8.79193ZM14.1027 8.79193C14.2984 8.59716 14.2992 8.28058 14.1045 8.08483C13.9097 7.88908 13.5931 7.88829 13.3974 8.08307L14.1027 8.79193ZM10.1939 11.2706C9.99817 11.4653 9.99738 11.7819 10.1922 11.9777C10.3869 12.1734 10.7035 12.1742 10.8993 11.9794L10.1939 11.2706ZM13.75 8.9375C14.0261 8.9375 14.25 8.71364 14.25 8.4375C14.25 8.16136 14.0261 7.9375 13.75 7.9375V8.9375ZM1 7.9375C0.723858 7.9375 0.5 8.16136 0.5 8.4375C0.5 8.71364 0.723858 8.9375 1 8.9375V7.9375ZM10.1939 5.60443L13.3974 8.79193L14.1027 8.08307L10.8993 4.89557L10.1939 5.60443ZM13.3974 8.08307L10.1939 11.2706L10.8993 11.9794L14.1027 8.79193L13.3974 8.08307ZM13.75 7.9375H1V8.9375H13.75V7.9375Z" fill="#FF9D0D"/>
                                            <path d="M5.25 11.625C5.25 13.9722 7.15279 15.875 9.5 15.875H13.75C16.0972 15.875 18 13.9722 18 11.625V5.25C18 2.90279 16.0972 1 13.75 1H9.5C7.15279 1 5.25 2.90279 5.25 5.25" stroke="#FF9D0D" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>Log Out</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        )}
      </div>
    </>
  )
}
