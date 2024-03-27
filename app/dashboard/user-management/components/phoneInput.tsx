
import React from 'react';
import PhoneInput from 'react-phone-number-input/input'

interface phoneInputProps {
    handleChange: (fieldName: string, value: any) => void,
    formData: any
}
const PhoneNumberInput = ({ handleChange, formData }: phoneInputProps) => {
    return (
        <>
            <div className="flex flex-col gap1">
                <label className=''>Add phone number</label>
            </div>

            <div className='relative flex items-center bg-black-500 rounded-[4px]'>
                <select onChange={(e) => handleChange('countryCode', e.target.value)} className='appearance-none bg-transparent text-black-400 px-3 py-2 rounded-l-[4px] h-[60px] text-black-400 focus:outline-none focus:ring-0'>
                    <option value='TZ' >🇹🇿 +255</option>
                </select>
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M11 1L6 6L1 1" stroke="#222222" strokeOpacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <svg width="1" height="28" viewBox="0 0 1 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                    <line x1="0.5" y1="-2.18557e-08" x2="0.500001" y2="28" stroke="#222222" strokeOpacity="0.4" />
                </svg>
                <PhoneInput
                    className='bg-transparent rounded-r-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0 flex-grow'
                    country="TZ"
                    value={formData.phoneNumber}
                    onChange={(e) => {
                        handleChange('phoneNumber', e)
                    }} />
            </div>
        </>
    );
};

export default PhoneNumberInput;
