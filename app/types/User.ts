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