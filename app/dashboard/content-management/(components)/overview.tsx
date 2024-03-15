import { useRef, useEffect } from "react";

interface Card {
  title: string,
  count: Number
}


export const OverviewCard = ({ title, count }: Card) => {
  return (
    <div className='h-[200px] bg-overview bg-white-default rounded-[10px] flex justify-center relative py-14'>
      <div className='flex flex-col px-[76px] gap-2'>
        <span className='text-black-100 text-[20px] font-medium leading-[25px] text-center'>{title}</span>
      </div>
      <div className='absolute bottom-2'>
        <span className='text-orange-default text-[50px] font-bold text-center'>{count?.toString()}</span>
      </div>
    </div>
  );
}

