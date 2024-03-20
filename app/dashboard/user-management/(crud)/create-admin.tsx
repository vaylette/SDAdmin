import { useState, FormEvent } from 'react';
import toast from 'react-hot-toast';
import { usePostData } from '@/app/constants/hooks';
import { apiUrls } from '@/app/constants/apiUrls';

interface CreateAdminProps {

    onRefresh: () => void;
}
export default function CreateAdmin(
    { onRefresh }: CreateAdminProps
) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        identity: '',
        permissionLevel: '',
        terms: true
    });

    const [loading, setLoading] = useState(false);
    const postData = usePostData();

    const handleChange = (fieldName: string, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const { firstName, lastName, email, phoneNumber, identity, permissionLevel } = formData;

        if (firstName === '' || lastName === '' || email === '' || phoneNumber === '' || identity === '' || permissionLevel === '') {
            toast.error('Please fill all the required fields!');
            return;
        }
        setLoading(true);
        try {
            const response = await postData(apiUrls.postAdminUser, formData, false);
            if (response) {
                onRefresh()
                toast.success('Admin created successfully');
            }
        } catch (error: any) {
            toast.error('Failed to create admin');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 text-lg text-black-400 pb-[92px]'>
                <div className='flex gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label className=''>First name</label>
                        <input type='text' value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className=''>Last name</label>
                        <input type='text' value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0' />
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className=''>Email</label>
                    <input type='email' value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0' />
                </div>

                <div className="flex flex-col gap1">
                    <label className=''>Add phone number</label>
                </div>

                <div className='relative flex items-center bg-black-500 rounded-[4px]'>
                    <select className='appearance-none bg-transparent text-black-400 px-3 py-2 rounded-l-[4px] h-[60px] text-black-400 focus:outline-none focus:ring-0'>
                        <option value='TZ'>🇹🇿 +255</option>
                    </select>
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                        <path d="M11 1L6 6L1 1" stroke="#222222" strokeOpacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <svg width="1" height="28" viewBox="0 0 1 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                        <line x1="0.5" y1="-2.18557e-08" x2="0.500001" y2="28" stroke="#222222" strokeOpacity="0.4" />
                    </svg>

                    <input type='tel' value={formData.phoneNumber} onChange={(e) => handleChange('phoneNumber', e.target.value)} className='bg-transparent rounded-r-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0 flex-grow' />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className=''>Identity</label>
                    <select value={formData.identity} onChange={(e) => handleChange('identity', e.target.value)} className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0'>
                        <option value='' disabled>Select Identity</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className=''>Permission level</label>
                    <select value={formData.permissionLevel} onChange={(e) => handleChange('permissionLevel', e.target.value)} className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0'>
                        <option value='' disabled>Select permission</option>
                        <option value="superadmin">SuperAdmin</option>
                        <option value="contentadmin">Content admin</option>
                        <option value="contentmoderator">Content moderator</option>
                        <option value="customercare">Customer Care</option>
                    </select>
                </div>
                <button type="submit" className='w-full h-[60px] rounded-[30px] bg-orange-default flex items-center justify-center mt-[89px] text-white-default text-xl'>{loading ? 'Loading...' : 'Confirm'}</button>
            </form>
        </>
    );
}
