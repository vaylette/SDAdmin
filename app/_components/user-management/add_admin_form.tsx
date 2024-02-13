

export default function AddAdminForm() {
    return (<>
            <form className='flex flex-col gap-5 text-lg text-black-400 pb-[92px]'>
                <div className='flex flex-col gap-2'>
                    <label className=''>First name</label>
                    <input type='text' className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className=''>Last name</label>
                    <input type='text' className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className=''>Email</label>
                    <input type='email' className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className=''>Add phone number</label>
                    <input type='phone' className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className=''>Permission level</label>
                    <select className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0'>
                        <option selected disabled>Select permission</option>
                        <option>Level 1 (Content upload)</option>
                        <option>Level 2 (Content download)</option>
                    </select>
                </div>
                <button className='w-full h-[60px] rounded-[30px] bg-orange-default flex items-center justify-center mt-[89px] text-white-default text-xl'>Confirm</button>
            </form>
    </>);
}