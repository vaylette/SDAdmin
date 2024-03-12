import React, { useState } from 'react';

interface FileUploadProps {
    label: string;
    text?: string;
    onFileSelected?: (file: File | null) => void;
    fileUrl?: string; // New optional parameter for file URL
}

const FileUpload = ({ label, text = "Upload file", onFileSelected, fileUrl }: FileUploadProps) => {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file);
        if (file) {
            setFileName(file.name);
            onFileSelected?.(file);
        } else {
            setFileName('');
            onFileSelected?.(null);
        }
    };

    const handleRemoveFile = () => {
        setFileName('');
        onFileSelected?.(null);
    };

    const renderFileName = () => {
        if (fileName || fileUrl) {
            const displayText = fileName || fileUrl!;
            return (
                <span className="truncate" title={displayText}>{displayText}</span>
            );
        }
        return <span>Select file</span>;
    };

    return (
        <div className='flex flex-col gap-2'>
            <label>{label}</label>
            <div className='relative flex items-center'>
                <input
                    type='file'
                    className='absolute inset-0 opacity-0 w-full h-full z-10 cursor-pointer'
                    onChange={handleFileChange}
                />
                <div className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0 flex items-center justify-between'>
                    {fileUrl ? (
                        <>
                            {renderFileName()}
                            <button onClick={handleRemoveFile} className='bg-red-500 text-white px-2 py-1 rounded'>
                                Remove
                            </button>
                        </>
                    ) : (
                        renderFileName()
                    )}
                    <button className='flex items-center justify-center bg-[#FF9D0D] text-[#ffffff] text-sm rounded-[30px] w-[90px] p-2 h-10'>
                        {text ?? "Upload"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
