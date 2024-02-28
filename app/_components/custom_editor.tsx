import React from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from '@/ckeditor5/build/ckeditor';

const editorConfiguration = {
    toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo'
    ],
    height: "900px"
};

interface EditorProps {
    initialData: any,
    onChange?: (data: any | null) => void
}

function CustomEditor({ initialData, onChange }: EditorProps) {
    const handleEditorChange = (event: any, editor: any) => {
        const data = editor.getData();
        onChange?.(data);
    };

    return (
        <CKEditor
            editor={Editor}
            config={editorConfiguration}
            data={initialData}
            onChange={handleEditorChange}
        />
    );
}

export default CustomEditor;
