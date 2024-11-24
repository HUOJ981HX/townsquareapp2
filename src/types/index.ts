export enum AccountType {
    Google = "Google",
    Email = "Email",
}

export enum Mood {
    Happy = "Happy",
    Laugh = "Laugh",
    Surprised = "Surprised",
    Angry = "Angry",
    Sad = "Sad",
    Desperate = "Desperate",
}

export enum Gender {
    Female = "Female",
    Male = "Male",
    NonBinary = "Non-binary"
}

// export interface PostDto {
//     userId: number;
//     title: string | undefined;
//     description?: string | undefined;
//     image?: string | undefined;
//     mood: string | undefined;
// }

// interface UserAttributesFilter {
//     gender?: string;
//     age?: number;
//     friendship?: { not: null; notEmpty?: true };
//     collaboration?: { not: null; notEmpty?: true };
// }

// export interface UserFilter {
//     username: string;
//     accountType: string;
//     userAttributes?: UserAttributesFilter;
// }

export interface IRelationship {
    AND: {
        description?: string;
        openTo?: string;
    }[];
}

export interface IUserAttribute {
    AND: {
        gender?: string;
        age?: number;
        relationship?: IRelationship;
        postFilterDisplay?: string;
        postFilterQueryRole?: string;
    }[];
}

export interface IPostTable {
    title?: string;
    description?: string;
    image?: string;
    postFilterDisplay?: string;
    postFilterQueryRole?: string;
    mood?: string;
}

// export interface IPost {
//     some: {
//         AND: {
//             title?: string;
//             description?: string;
//             postFilter?: string;
//         }[];
//     };
// }

export interface IUserTable {
    username: string;
    accountType: string;
    userAttributes: IUserAttribute;
}

export interface IUserQuery extends IUserTable {
    posts: {
        some: {
            AND: IPostTable[]
        }
    };
}

