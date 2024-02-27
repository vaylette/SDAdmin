export type SmartUser = {
    name: string;
    email: string;
    phoneNumber: string | number;
    status: boolean | number;
    terms: boolean;
    createdAt: string;
    updatedAt: string;
    isActive: boolean | number;
    isDeleted: boolean | number;
    password: string;
    access_token: string;
    refresh_token: string;
    _id: string | number;
}

export type Topic = {
    ref_no: string | number | null | undefined,
    _id: string,
    name: string,
    subject: {} | any,
    level: {} | any,
    syllabus: string,
    sections: string | number | any,
    coverImageUrl?: string,
    action: null
}

export type User = {
    ref_no: string | number | null | undefined
    name: string,
    email: string,
    gender: string | null,
    address: string | null,
    dob: string | null,
    phoneNumber: string | number | null,
    profilePic: string | null,
    level: string | null,
    terms: boolean | null,
    status: string | number,
    school: string | null,
    type: string | null,
    action: null
}

export type Model = {
    ref_no: string | number | null | undefined
    name: string,
    level: string,
    subject: string,
    topic: string,
    action: null
}
  
export type Experiment = {
    ref_no: string | number | null | undefined
    name: string,
    level: string,
    subject: string,
    topic: string,
    action: null
}

export type Video = {
    ref_no: string | number | null | undefined
    name: string,
    level: string,
    subject: string,
    topic: string,
    video_link: string,
    action: null
}

export type SelectOption = {
    name: string;
    id: string | number | null;
}
  
export const curriculumOptions: SelectOption[] = [
  { name: 'NECTA', id: '' },
  { name: 'Cambridge', id: '' },
  { name: 'Montessori', id: '' },
]


export type FormData<T> = T

export type TopicFormData = {
    name: string;
    curriculum: string | null;
    description: string;
    subject: string | null;
    level: string | null;
}
  