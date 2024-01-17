
export default function Dashboard() {
  return (
    <>
      <div className='w-full h-full p-6'>
        <div className='grid grid-cols-4 gap-5'>
          <div className='w-[263px] h-[200px] bg-overview bg-white-default rounded-[10px] flex justify-center relative py-14'>
              <div className="flex flex-col px-[76px] gap-2">
                <span className="text-black-100 text-[20px] font-medium leading-[25px] text-center">Daily Active Users</span>
                <span className="text-orange-default text-[50px] font-bold text-center">235</span>
              </div>
              <div className='absolute top-[11px] right-[14px] w-auto rounded-[3px] h-5'>
                
              </div>
          </div>
          <div className='w-[263px] h-[200px]  bg-overview bg-white-default rounded-[10px] '>
            
          </div>
          <div className='w-[263px] h-[200px] bg-overview bg-white-default rounded-[10px] '>
            
          </div>
          <div className='w-[263px] h-[200px] bg-overview bg-white-default rounded-[10px] '>
            
          </div>
          <div className='w-[263px] h-[200px] bg-overview bg-white-default rounded-[10px] '>
            
            </div>
        </div>
      </div>
    </>
  )
}
