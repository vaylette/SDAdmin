import FileUpload from "../form/uploadFile";



export default function AddTopicForm() {
    return (<>
        <form className='flex flex-col gap-5 text-lg text-black-400 pb-[92px]'>
            <div className='flex flex-col gap-2'>
                <label className=''>Topic name</label>
                <input type='text' className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0' />
            </div>
            <FileUpload label={"Add thumbnail"} />
            <button className='w-full h-[60px] rounded-[30px] bg-orange-default flex items-center justify-center mt-[89px] text-white-default text-xl'>Confirm</button>
        </form>
    </>);
}