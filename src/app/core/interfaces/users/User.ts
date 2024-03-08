export interface User {
    name:      string;
    lastname:  string;
    email:     string;
    birthdate: Date;
    password:  string;
    idRole:    number;
}

export interface UserId {
    id: number;
}