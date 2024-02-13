import { useRef, useEffect } from "react";

interface Props {
    user: any;
    onLogout: () => void;
    title: string;
    dismiss: () => void;
}


export const Notifications: React.FC<Props> = ({ user, onLogout, title, dismiss }) => {
    const userNotificationsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
    return (
        <>
            <div ref={userNotificationsRef} className="absolute top-[115px] right-[118px]">
                <div className="w-[366px] h-[468px] rounded-lg bg-white-default shadow-drop relative">
                    <div className="absolute -top-[6px] right-8 w-[13.24px] h-[13.24px] bg-white-default" style={{ transform: 'rotate(135deg)' }}></div>
                    <div className="p-4">
                        <h3 className="text-lg font-medium text-black-default mb-4 text-[#222222CC]" style={{ fontFamily: 'Helvetica Now Display', fontWeight: 500, fontSize: '24px', lineHeight: '25px' }}>Notifications</h3>
                        {/* New notifications */}
                        <div>
                            <div className="flex items-center mb-4">
                                <span className="text-orange-default mr-2">New</span>
                                <div className="flex-1 h-[1px] bg-[#22222214]"></div>
                            </div>

                            <div className="flex items-center mb-4 cursor-pointer" onClick={() => { }}>
                                <img src="/images/bulb.png" alt="Notification" className="w-10 h-10 rounded-full mr-4" />
                                <div className="flex-1 overflow-hidden">
                                    <h4 className="text-base font-semibold text-[#222222CC] overflow-hidden whitespace-nowrap overflow-ellipsis">Topic Upload Successful</h4>
                                    <p className="text-sm text-[#22222266] bg-clip-text overflow-hidden whitespace-nowrap overflow-ellipsis">Your payment to SmartDarasa on date 03/Sep was</p>
                                </div>
                            </div>
                        </div>

                        {/* Older notifications */}
                        <div>
                            <div className="flex items-center mb-4">
                                <span className="text-orange-default mr-2">Older</span>
                                <div className="flex-1 h-[1px] bg-[#22222214]"></div>
                            </div>

                            <div className="flex items-center mb-4 cursor-pointer" onClick={() => { }}>
                                <img src="/images/bulb.png" alt="Notification" className="w-10 h-10 rounded-full mr-4" />
                                <div className="flex-1 overflow-hidden">
                                    <h4 className="text-base font-semibold text-[#222222CC] overflow-hidden whitespace-nowrap overflow-ellipsis">Another Notification</h4>
                                    <p className="text-sm text-[#22222266] bg-clip-text overflow-hidden whitespace-nowrap overflow-ellipsis">Description of the notification</p>
                                </div>
                            </div>
                            <Divider />

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