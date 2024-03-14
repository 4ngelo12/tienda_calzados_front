export interface User {
    name: string;
    lastname: string;
    email: string;
    birthdate: Date;
    password: string;
    idRole: number;
}

export interface UserLs {
    name: string;
    lastname: string;
    email: string;
    birthdate: Date;
}

export interface UpdateUser {
    id: number;
    name: string;
    lastname: string;
    email: string;
    birthdate: Date;
}

export interface UserId {
    id: number;
}