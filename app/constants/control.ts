

export default class AccessControl {
    user: any;

    constructor(user: any) {
        this.user = user;
    }

    isSuperAdmin() {
        return this.user?.type.toLowerCase() === 'superadmin' || this.user?.type.toLowerCase() === 'admin';
    }

    isContentAdmin() {
        return this.user?.type.toLowerCase() === 'contentadmin';
    }

    isContentModerator() {
        return this.user?.type.toLowerCase() === 'contentmoderator';
    }

    isCustomerCare() {
        return this.user?.type.toLowerCase() === 'customercare';
    }
}
