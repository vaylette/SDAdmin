import React, { useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface EditorProps {
    initialData: any,
    onChange?: (data: any | null) => void
}


export function TinyMCE({ initialData, onChange }: EditorProps) {
    const editorRef: any = useRef();
    const _apiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY
    const handleChange = () => {
        onChange?.(editorRef.current?.getContent())
    }
    return (
        <>
            <form>
                <Editor
                    apiKey={_apiKey}
                    onInit={(evt, editor: any) => {
                        editorRef.current = editor
                    }}
                    initialValue={initialData}
                    init={{
                        height: 500,
                        menubar: true,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'codesample'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'code' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    }}
                    onChange={handleChange}
                />
            </form>
        </>
    )

}


function CustomEditor({ initialData, onChange }: EditorProps) {
    const handleEditorChange = (markdown: string) => {
        onChange?.(markdown);
    };

    return (
        <TinyMCE initialData={initialData} onChange={handleEditorChange} />
    );
}

export default CustomEditor;
