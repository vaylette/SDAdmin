'use client'


export default function Modal({ children, onClose }: { children: React.ReactNode, onClose: () => void }) {
  return (
    <>
        <div className={`absolute min-h-screen inset-0 bg-black-100 bg-blend-multiply z-50 justify-end`}>
        <div className='w-full h-full flex justify-end'>
          <div className='block bg-white-100 w-[432px] h-full relative pt-[100px] px-[50px]'>
            <div className='absolute top-10 -left-[50px]'>
              <button onClick={onClose} className='w-[50px] h-[60px] bg-orange-default flex items-center justify-center rounded-l-sm'>
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 1L1 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 1L16 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className='flex flex-col gap-10'>
                <h6 className='text-black-100 text-3xl font-bold'></h6>
                <div className='w-full h-[1px] bg-black-200'></div>
                
            </div>
          </div>
        </div>

        </div>
    </>
  )
}
