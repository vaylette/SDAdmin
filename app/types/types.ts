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
    subject: {} | any,
    level: {} | any,
    syllabus: string,
    sections: string | number | any,
    action: null
  }
  
 export type Experiment = {
    ref_no: string | number | null | undefined
    name: string,
    subject: {} | any,
    level: {} | any,
    syllabus: string,
    sections: string | number | any,
    action: null
  }