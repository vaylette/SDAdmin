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
    ref_no: string | number | null | undefined
    name: string,
    subject: {} | any,
    level: {} | any,
    syllabus: string,
    sections: string | number | any,
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
}
  
export const curriculumOptions: SelectOption[] = [
  { name: 'NECTA' },
  { name: 'CAMBRIDGE' }
]
  
export const levelOptions: SelectOption[] = [
  { name: 'Form One' },
  { name: 'Form Two' },
  { name: 'Form Three' },
  { name: 'Form Four' }
]
  