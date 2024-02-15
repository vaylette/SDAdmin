
export default function OverviewCard({ title, quantity, growth }: { title: string | null, quantity: string | number | null, growth: number | null }) {
  return (
    <>
        <div className='h-[200px] bg-overview bg-white-default rounded-[10px] flex justify-center relative py-14'>
            <div className='flex flex-col px-[76px] gap-2'>
              <span className='text-black-100 text-[20px] font-medium leading-[25px] text-center'>{title}</span>
            </div>
            <div className='absolute bottom-2'>
              <span className='text-orange-default text-[50px] font-bold text-center'>0</span>
            </div>
            {growth && (
                <div className={`absolute top-[11px] right-[14px] w-auto rounded-[3px] h-auto ${growth < 0 ? 'bg-red-default' : 'bg-green-100'} py-[1px] px-[7px] bg-opacity-10`}>
                    <span className={`${growth < 0 ? 'text-red-default' : 'text-green-100'} font-medium text-[14px]`}>{growth} %</span>
                </div>
            )}
        </div>
    </>
  )
}


