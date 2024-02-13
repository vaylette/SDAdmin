import React, { useEffect, useRef } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const CustomModal: React.FC<Props> = ({ isOpen, onClose, title, subtitle, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;
  return (
    <div ref={modalRef} className={`${isOpen ? 'fixed top-0 left-0 right-0 bottom-0 inset-0 bg-black-100 bg-blend-multiply z-50 justify-end' : 'hidden'}`}>
      <div className='w-full h-full flex justify-end'>
        <div className='block bg-white-100 w-[432px] h-full relative pt-[100px] px-[50px] overflow-y-visible'>
          <div className='absolute top-10 -left-[50px]'>
            <button onClick={onClose} className='w-[50px] h-[60px] bg-orange-default flex items-center justify-center rounded-l-sm'>
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 1L1 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 1L16 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className='flex flex-col gap-10'>
            <h6 className='text-black-100 text-3xl font-bold h-5'>{title}</h6>
            {subtitle && (<>
              <p className='text-[#22222299] text-lg h-10'>{subtitle}</p>
            </>)
            }
            <div className='w-full h-[1px] bg-black-200'></div>
            <div className='flex flex-col gap-5 text-lg text-black-400 pb-[92px]'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
