import { useState, FormEvent } from 'react';
import toast from 'react-hot-toast';
import { usePatchData, usePostData } from '@/app/constants/hooks';
import { apiUrls } from '@/app/constants/apiUrls';
import { useAccessControl } from '@/app/constants/control';
import PhoneNumberInput from '../components/phoneInput';

interface CreateAdminProps {
    initialData: any,
    onRefresh: () => void;
}
export default function UpdateAdmin(
    { initialData, onRefresh }: CreateAdminProps
) {
    const accessControl = useAccessControl()
    const _name = initialData?.name.split(" ")
    const [formData, setFormData] = useState({
        firstName: _name[0],
        lastName: _name[1],
        email: initialData?.email,
        password: initialData?.password,
        phoneNumber: initialData?.phoneNumber,
        identity: initialData?.identity,
        permissionLevel: initialData?.type.toLowerCase(),
        terms: true
    });

    const [loading, setLoading] = useState(false);
    const patchData = usePatchData();

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
            const response = await patchData(`${apiUrls.postAdminUser}/${initialData?._id}`, formData, false);
            if (response) {
                onRefresh()
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

                {/* <div className='flex flex-col gap-2'>
                    <label className=''>Password</label>
                    <input type='password' value={formData.password} onChange={(e) => handleChange('password', e.target.value)} className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0' />
                </div> */}

                <PhoneNumberInput handleChange={handleChange} formData={initialData?.phoneNumber} />

                <div className='flex flex-col gap-2'>
                    <label className=''>Identity</label>
                    <select disabled={!accessControl?.isSuperAdmin()} value={formData.identity} onChange={(e) => handleChange('identity', e.target.value)} className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0'>
                        <option value='' disabled>Select Identity</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className=''>Permission level</label>
                    <select disabled={!accessControl?.isSuperAdmin()} value={formData.permissionLevel} onChange={(e) => handleChange('permissionLevel', e.target.value)} className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0'>
                        <option value='' disabled>Select permission</option>
                        <option value="superadmin">Super Admin</option>
                        <option value="contentadmin">Content Admin</option>
                        <option value="contentmoderator">Content Moderator</option>
                        <option value="customercare">Customer Care</option>
                    </select>
                </div>
                <button type="submit" className='w-full h-[60px] rounded-[30px] bg-orange-default flex items-center justify-center mt-[89px] text-white-default text-xl'>{loading ? 'Loading...' : 'Confirm'}</button>
            </form>
        </>
    );
}
