import { useRef, useEffect } from "react";

interface Props {
    dismiss: () => void;
    onEdit?: () => void; // Callback for edit action
    onDelete?: () => void; // Callback for delete action
  }
  
  export const CustomDropDown: React.FC<Props> = ({ dismiss, onEdit, onDelete }) => {
    const userProfileRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (userProfileRef.current && !userProfileRef.current.contains(event.target as Node)) {
          dismiss();
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [dismiss]);
  
    return (
      <div ref={userProfileRef} className="absolute">
        <div className="h-auto rounded-lg bg-white-default shadow-drop relative">
          <div className="absolute -top-[6px] right-8 w-[13.24px] h-[13.24px] bg-white-default" style={{ transform: 'rotate(135deg)' }}></div>
          <div className='flex flex-col'>
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {onEdit && (
                <button onClick={onEdit} className="text-orange-default block w-full text-left px-4 py-2 text-sm" role="menuitem">
                  Edit
                </button>
              )}
              {onDelete && (
                <button onClick={onDelete} className="text-red-default block w-full text-left px-4 py-2 text-sm" role="menuitem">
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  