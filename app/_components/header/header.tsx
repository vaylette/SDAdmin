'use client'
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import useAuthStore, { AuthStore } from "../../store/useAuthStore"
import Logout from "../../actions/logout"
import { UserProfile } from "./profile"
import { Notifications } from "./notifications"

interface Drop {
    notifications: boolean,
    profile: boolean
}

export default function Header() {
    const [title, setTitle] = useState<string | null>(null)

    const authStore = useAuthStore((state) => state) as AuthStore
    const { user } = authStore

    const logout = Logout()

    const [drop, setDrop] = useState<Drop>({
        notifications: false,
        profile: false
    })

    const handleDrop = (dropType: string, open: boolean = true): void => {
        setDrop((prev) => ({ ...prev, [dropType]: open }))
    }
    const pathname: string = usePathname()

    useEffect(() => {
        switch (true) {
            case pathname === '/dashboard':
                setTitle('Overview');
                break;
            case pathname === '/dashboard/user-management':
                setTitle('User Management');
                break;
            case pathname.startsWith('/dashboard/content-management'):
                setTitle('Content Management');
                break;
                case pathname.startsWith('/dashboard/revenue'):
                setTitle('Revenue')
                break;
            case pathname.startsWith('/dashboard/reports'):
                setTitle('Reports')
                break;
            case pathname.startsWith('/dashboard/tickets'):
                setTitle('Tickets')
                break;
            case pathname.startsWith('/dashboard/announcements'):
                setTitle('Announcements')
                break;
            default:
                setTitle('Overview');
        }
    }, [pathname]);


    return (
        <>
            <header className="w-full h-[150px] bg-header flex flex-row justify-between items-center px-8">
                <h6 className="font-bold text-orange-default text-[40px]">{title}</h6>
                <ul className="flex flex-row gap-4 items-center">
                    <li>
                        <button onClick={() => handleDrop('notifications')} className='bg-orange-default w-[50px] h-[50px] rounded-full flex items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 24" fill="none">
                                <path d="M1.51759 15.1604L2.00448 14.6844C2.16158 14.5307 2.25002 14.3224 2.25002 14.1052V9.55556C2.25002 4.83046 6.16761 1.00001 11.0002 1C15.8328 0.999988 19.7503 4.83045 19.7503 9.55556V14.1052C19.7503 14.3224 19.8386 14.5307 19.9957 14.6844L20.4826 15.1605C20.6313 15.3058 20.7067 15.3796 20.766 15.4604C20.8783 15.6133 20.9521 15.7894 20.9833 15.9752C20.9998 16.0735 21 16.1766 21 16.3828C21 16.8541 21 17.0897 20.9344 17.2797C20.8097 17.6413 20.5203 17.9253 20.1505 18.0473C19.9568 18.1111 19.7166 18.1111 19.2384 18.1111H14.7502V19.3333C14.7502 21.3584 13.0713 23 11.0002 23C8.92907 23 7.25011 21.3584 7.25011 19.3333V18.1111H2.76198C2.28379 18.1111 2.04447 18.1111 1.85084 18.0473C1.48101 17.9253 1.19032 17.6413 1.06557 17.2797C1 17.0896 1 16.8541 1 16.3828C1 16.1766 1 16.0735 1.0165 15.9752C1.04768 15.7894 1.12207 15.6133 1.23438 15.4604C1.29381 15.3795 1.36845 15.3062 1.51759 15.1604Z" fill="white" />
                                <path d="M14.7502 18.1111V19.3333C14.7502 21.3584 13.0713 23 11.0002 23C8.92907 23 7.25011 21.3584 7.25011 19.3333V18.1111M14.7502 18.1111H7.25011M14.7502 18.1111H19.2384C19.7166 18.1111 19.9568 18.1111 20.1505 18.0473C20.5203 17.9253 20.8097 17.6413 20.9344 17.2797C21 17.0897 21 16.8541 21 16.3828C21 16.1766 20.9998 16.0735 20.9833 15.9752C20.9521 15.7894 20.8783 15.6133 20.766 15.4604C20.7067 15.3796 20.6313 15.3058 20.4826 15.1605L19.9957 14.6844C19.8386 14.5307 19.7503 14.3224 19.7503 14.1052V9.55556C19.7503 4.83045 15.8328 0.999988 11.0002 1C6.16761 1.00001 2.25002 4.83046 2.25002 9.55556V14.1052C2.25002 14.3224 2.16158 14.5307 2.00448 14.6844L1.51759 15.1604C1.36845 15.3062 1.29381 15.3795 1.23438 15.4604C1.12207 15.6133 1.04768 15.7894 1.0165 15.9752C1 16.0735 1 16.1766 1 16.3828C1 16.8541 1 17.0896 1.06557 17.2797C1.19032 17.6413 1.48101 17.9253 1.85084 18.0473C2.04447 18.1111 2.28379 18.1111 2.76198 18.1111H7.25011" stroke="#FF9D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </li>
                    <li className='bg-orange-default w-[50px] h-[50px] rounded-full flex items-center justify-center'>
                        <button onClick={() => handleDrop('profile')}>
                            <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M26.8126 28.357C25.9393 25.6336 24.2236 23.2578 21.913 21.5723C19.6024 19.8868 16.8162 18.9785 13.9561 18.9785C11.0961 18.9785 8.30987 19.8868 5.99926 21.5723C3.68865 23.2578 1.97298 25.6336 1.09961 28.357H26.8126Z" fill="white" stroke="#FF9D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13.9565 18.9954C18.8188 18.9954 22.7606 15.0537 22.7606 10.1913C22.7606 5.32894 18.8188 1.38721 13.9565 1.38721C9.09408 1.38721 5.15234 5.32894 5.15234 10.1913C5.15234 15.0537 9.09408 18.9954 13.9565 18.9954Z" fill="white" stroke="#FF9D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16.8317 13.5977C16.8317 13.5977 16.1012 15.0351 13.9568 15.0351C11.8125 15.0351 11.082 13.5977 11.082 13.5977" stroke="#FF9D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22.6014 8.51507C22.5818 8.5152 22.5622 8.51527 22.5425 8.51527C19.9834 8.51527 17.6858 7.39566 16.1128 5.61954C14.5398 7.39569 12.2422 8.51532 9.68307 8.51532C8.197 8.51532 6.7991 8.13777 5.58008 7.47336C6.72538 3.94112 10.0428 1.38721 13.9567 1.38721C18.2458 1.38721 21.8186 4.45439 22.6014 8.51507Z" fill="white" stroke="#FF9D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleDrop('profile')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="9" viewBox="0 0 16 9" fill="none">
                                <path d="M15 1L8 8L1 1" stroke="#FF9D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </header>
            <div className={`${drop.notifications || drop.profile ? 'absolute inset-0 bg-black-100 bg-blend-multiply z-50' : 'hidden'}`}>
                {drop.notifications && (
                    <>
                        <Notifications user={user} onLogout={logout} title={"Notifications"} dismiss={() => handleDrop('notifications', false)} />
                    </>
                )}
                {drop.profile && (
                    <>
                        <UserProfile user={user} onLogout={logout} title={"Admin"} dismiss={() => handleDrop('profile', false)} />
                    </>
                )}
            </div>
        </>
    )
}
