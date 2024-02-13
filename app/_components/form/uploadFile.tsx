
import React, { useState } from 'react';

const FileUpload = ({ label }) => {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName('');
        }
    };

    return (
        <div className='flex flex-col gap-2'>
            <label className=''>{label}</label>
            <div className='relative flex items-center'>
                <input
                    type='file'
                    className='absolute inset-0 opacity-0 w-full h-full z-10 cursor-pointer'
                    onChange={handleFileChange}
                />
                <div className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0 flex items-center justify-between'>
                    <span>{fileName || 'Select file'}</span>
                    <button className='flex items-center justify-center bg-[#FF9D0D] text-[#ffffff] text-sm rounded-[30px] w-[90px] p-2 h-10'>
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
