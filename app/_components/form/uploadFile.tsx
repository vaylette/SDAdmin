import React, { useState } from 'react';

interface FileUploadProps {
    label: string;
    text?: string;
    onFileSelected?: (file: File | null) => void;
    fileUrl?: string;
    allowedFileTypes?: string[];
}

const FileUpload = ({ label, text = "Upload file", onFileSelected, fileUrl, allowedFileTypes }: FileUploadProps) => {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
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

    // Construct accept string from allowed file types
    const acceptString = allowedFileTypes ? allowedFileTypes.join(',') : undefined;


    const renderPreview = () => {
        if (typeof fileUrl === 'string') {
            const ext = fileUrl.split('.').pop()?.toLowerCase();
            if (ext === 'png' || ext === 'jpg' || ext === 'jpeg' || ext === 'gif') {
                return <img src={fileUrl} alt="File Preview" className="w-10 h-10 object-cover rounded" />;
            } else if (ext === 'mp4') {
                return (
                    <video controls className="w-10 h-10">
                        <source src={fileUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                );
            } else if (ext === 'glb') {
                // const modelUrl = fileUrl;
                // const object3D = viewerUtils.loadGLB(modelUrl);
                // return (
                //     <div className="small-preview-wrapper">
                //         <Viewer object3D={object3D} />
                //     </div>
                // )
            } else {
                return null;
            }
        }
        return null;
    };



    const renderFileName = () => {
        if (fileName || fileUrl) {
            const displayText = fileName || fileUrl!;
            return (
                <>
                    {renderPreview()}
                    <p></p>
                    <span className="truncate" title={displayText}>
                        {displayText}
                    </span>
                </>
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
                    accept={acceptString}
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
