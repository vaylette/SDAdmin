//@ts-nocheck
'use client'
import { useState, FormEvent } from 'react';
import SelectBox from '@/app/_components/form/SelectBox';
import { curriculumOptions } from '@/app/types/types';
import { usePatchData, usePostData } from '@/app/constants/hooks';
import toast from 'react-hot-toast';
import { apiUrls } from '@/app/constants/apiUrls';
import { useRouter } from 'next/navigation';
import FileUpload from '@/app/_components/form/uploadFile';
import { Subject } from './create-model';
import { Level, Syllabus } from './create-topic';

interface EditTopicProps {
  onRefresh: () => void;
  initialData: any;
}

export default function EditTopic({
  initialData,
  onRefresh,
}: EditTopicProps) {
  const subjectOptions = initialData?.subjects?.map((subject: any) => ({
    name: subject.name,
    id: subject._id,
  }));

  const _levelOpts = initialData?.levels?.map((level: any) => ({
    name: level.name,
    id: level._id,
    syllabus: level.syllabus
  }));

  const [levelOpts, setLevelOpts] = useState(_levelOpts as Level[]);

  const syllabusOpts = initialData?.syllabus?.map((syllabus: any) => ({
    name: syllabus.name,
    id: syllabus._id,
  }));

  const [formData, setFormData] = useState({
    name: initialData?.data.name,
    subject: subjectOptions.find((opt: any) => opt.name === initialData?.data.subject?.name)?.id,
    thumbnail: initialData?.data.thumbnail,
    descriptions: initialData?.data.descriptions,
    level: levelOpts.find((opt: any) => opt.name === initialData?.data.level?.name)?.id,
    syllabus: syllabusOpts.find((opt: any) => opt.name === initialData?.data.syllabus)?.name,
  });

  const [loading, setLoading] = useState(false);

  const patchData = usePatchData();

  const handleChange = (fieldName: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
    console.log(value, fieldName);
    if (fieldName === 'syllabus') {
      const filteredLevels: Level[] = [];
      initialData?.levels.forEach(level => {
        if (level.syllabus === value) {
          filteredLevels.push(level);
        }
      });
      setLevelOpts(filteredLevels);
    }
  };

  const hasChanged = () => {
    return Object.keys(formData).some(key => formData[key] !== initialData[key]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!hasChanged()) {
      toast.success('no changes to save')
      return;
    }

    const { name, subject, thumbnail, descriptions, level, syllabus } = formData;

    if (
      name === '' ||
      subject === null ||
      thumbnail === '' ||
      descriptions === '' ||
      level === null ||
      syllabus === null
    ) {
      toast.error('Please fill all the required fields!');
      return;
    }


    const send = new FormData()
    send.append('name', name)
    send.append('subject', formData?.subject ?? '')
    send.append('descriptions', descriptions)
    send.append('thumbnail', thumbnail)
    send.append('level', level || '')
    send.append('syllabus', syllabusOpts.find((obj: any) => obj.id === syllabus)?.name ?? "NECTA")

    setLoading(true);
    try {
      const response = await patchData(`${apiUrls.patchTopics}/${initialData?.data?._id}`, send, true);
      if (response) {
        onRefresh();
      }
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-8 text-lg text-black-400 pb-[92px]'
        encType='multipart/form-data'
      >
        <div className='flex flex-col gap-2'>
          <label>Topic Name</label>
          <input
            type='text'
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label>Syllabus</label>
          <SelectBox
            options={syllabusOpts}
            selected={
              formData.syllabus !== null
                ? { name: syllabusOpts.find((opt) => opt.name === formData.syllabus)?.name || '', id: formData.syllabus }
                : null
            }
            onChange={(value) => handleChange('syllabus', value?.name)}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label>Level</label>
          <SelectBox
            options={levelOpts}
            selected={
              formData.level !== null
                ? { name: levelOpts.find((opt: any) => opt.id === formData.level)?.name || '', id: formData.level }
                : null
            }
            onChange={(value) => handleChange('level', value?.id)}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label>Descriptions</label>
          <input
            type='text'
            value={formData.descriptions}
            onChange={(e) => handleChange('descriptions', e.target.value)}
            className='w-full bg-black-500 rounded-[4px] h-[60px] text-black-400 px-2 focus:outline-none focus:ring-0'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label>Subject</label>
          <SelectBox
            options={subjectOptions}
            selected={
              formData.subject !== null
                ? { name: subjectOptions.find((opt) => opt.id === formData.subject)?.name || '', id: formData.subject }
                : null
            }
            onChange={(value) => handleChange('subject', value?.id)}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <FileUpload
            fileUrl={`${formData.thumbnail}`}
            label={'Add thumbnail'}
            onFileSelected={(file) => {
              handleChange('thumbnail', file);
            }}
          />
        </div>

        <button
          className={`w-full h-[60px] rounded-[30px] bg-orange-default flex items-center justify-center mt-[89px] text-white-default text-xl ${loading ? 'flex flex-row gap-2 items-center' : ''
            }`}
          disabled={loading}
        >
          <span>Save Changes</span>
          {loading && (
            <svg height='40' width='40' className='text-white-default'>
              <circle className='dot' cx='10' cy='20' r='3' />
              <circle className='dot' cx='20' cy='20' r='3' />
              <circle className='dot' cx='30' cy='20' r='3' />
            </svg>
          )}
        </button>
      </form>
    </>
  );
}
