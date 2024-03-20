
export default function CreateAdmin() {
    return (<>
        <form className='flex flex-col gap-5 text-lg text-black-400 pb-[92px]'>
            <div className='flex gap-4'>
                <div className='flex flex-col gap-2'>
                    <label className=''>First name</label>
                    <input type='text' className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className=''>Last name</label>
                    <input type='text' className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0' />
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <label className=''>Email</label>
                <input type='email' className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0' />
            </div>

            <div className="flex flex-col gap1">
                <label className=''>Add phone number</label>
            </div>

            <div className='relative flex items-center bg-black-500 rounded-[4px]'>
                <select className='appearance-none bg-transparent text-black-400 px-3 py-2 rounded-l-[4px] h-[60px] text-black-400 focus:outline-none focus:ring-0'>
                    <option value='TZ'>🇹🇿 +255</option>
                </select>
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M11 1L6 6L1 1" stroke="#222222" stroke-opacity="0.4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                <svg width="1" height="28" viewBox="0 0 1 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                    <line x1="0.5" y1="-2.18557e-08" x2="0.500001" y2="28" stroke="#222222" stroke-opacity="0.4" />
                </svg>

                <input type='tel' className='bg-transparent rounded-r-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0 flex-grow' />
            </div>


            <div className='flex flex-col gap-2'>
                <label className=''>Identity</label>
                <select className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0'>
                    <option selected disabled>Select Identity</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div className='flex flex-col gap-2'>
                <label className=''>Permission level</label>
                <select className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0'>
                    <option selected disabled>Select permission</option>
                    <option value="superadmin">SuperAdmin</option>
                    <option value="contentadmin">Content admin</option>
                    <option value="contentmoderator">Content moderator</option>
                    <option value="customercare">Customer Care</option>
                </select>
            </div>
            <button className='w-full h-[60px] rounded-[30px] bg-orange-default flex items-center justify-center mt-[89px] text-white-default text-xl'>Confirm</button>
        </form>
    </>);
}