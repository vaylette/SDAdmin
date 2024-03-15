import { apiUrls } from "@/app/constants/apiUrls";
import { useRetrieveData } from "@/app/constants/hooks";
import { useRef, useEffect, useState } from "react";

interface Props {
    user: any;
    onLogout: () => void;
    title: string;
    dismiss: () => void;
}

interface Notification {
    title: string;
    subtitle: string;
}

export const Notifications: React.FC<Props> = ({ user, onLogout, title, dismiss }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const userNotificationsRef = useRef<HTMLDivElement>(null);

    const retrieveData = useRetrieveData()

    const fetchData = async () => {
        try {
            const [overViewResults] = await Promise.all([
                retrieveData(`${apiUrls.getNotifications}`),
            ]);
            setNotifications(overViewResults);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData()
        const handleClickOutside = (event: MouseEvent) => {
            if (userNotificationsRef.current && !userNotificationsRef.current.contains(event.target as Node)) {
                dismiss();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dismiss]);


    const isNew = (createdAt: string): boolean => {
        const notificationDate = new Date(createdAt);
        const currentDate = new Date();

        // Define your logic here, for example, consider notifications created within the last 24 hours as new
        const timeDifference = currentDate.getTime() - notificationDate.getTime();
        const hoursDifference = timeDifference / (1000 * 3600);

        return hoursDifference < 24;
    };
    // Filter new and older notifications
    const newNotifications = notifications.filter(notification => isNew(notification?.createdAt)); // Implement isNew function
    const olderNotifications = notifications.filter(notification => !isNew(notification?.createdAt));

    return (
        <>
            <div ref={userNotificationsRef} className="absolute top-[115px] right-[118px]">
                <div className="w-[366px] h-[468px] rounded-lg bg-white-default shadow-drop relative">
                    <div className="absolute -top-[6px] right-8 w-[13.24px] h-[13.24px] bg-white-default" style={{ transform: 'rotate(135deg)' }}></div>
                    <div className="p-4">
                        <h3 className="text-lg font-medium text-black-default mb-4 text-[#222222CC]" style={{ fontFamily: 'Helvetica Now Display', fontWeight: 500, fontSize: '24px', lineHeight: '25px' }}>{title}</h3>
                        {/* New notifications */}
                        <div>
                            {newNotifications.length > 0 && (
                                <>
                                    <div className="flex items-center mb-4">
                                        <span className="text-orange-default mr-2">New</span>
                                        <div className="flex-1 h-[1px] bg-[#22222214]"></div>
                                    </div>

                                    {newNotifications.map(notification => (
                                        <div key={notification?._id} className="flex items-center mb-4 cursor-pointer" onClick={() => { }}>
                                            <img src="/images/bulb.png" alt="Notification" className="w-10 h-10 rounded-full mr-4" />
                                            <div className="flex-1 overflow-hidden">
                                                <h4 className="text-base font-semibold text-[#222222CC] overflow-hidden whitespace-nowrap overflow-ellipsis">{notification.title}</h4>
                                                <p className="text-sm text-[#22222266] bg-clip-text overflow-hidden whitespace-nowrap overflow-ellipsis">{notification.subtitle}</p>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>

                        {/* Older notifications */}
                        <div>
                            {olderNotifications.length > 0 && (
                                <>
                                    <div className="flex items-center mb-4">
                                        <span className="text-orange-default mr-2">Older</span>
                                        <div className="flex-1 h-[1px] bg-[#22222214]"></div>
                                    </div>

                                    {olderNotifications.map(notification => (
                                        <div key={notification._id} className="flex items-center mb-4 cursor-pointer" onClick={() => { }}>
                                            <img src="/images/bulb.png" alt="Notification" className="w-10 h-10 rounded-full mr-4" />
                                            <div className="flex-1 overflow-hidden">
                                                <h4 className="text-base font-semibold text-[#222222CC] overflow-hidden whitespace-nowrap overflow-ellipsis">{notification.title}</h4>
                                                <p className="text-sm text-[#22222266] bg-clip-text overflow-hidden whitespace-nowrap overflow-ellipsis">{notification.subtitle}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <Divider />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export function Divider() {
    return (
        <>
            <div className="flex items-center mb-4">
                <div className="flex-1 h-[1px] bg-[#22222214]"></div>
            </div>
        </>
    );
}