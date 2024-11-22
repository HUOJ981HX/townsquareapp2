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

export interface PostDto {
    userId: number;
    title: string | undefined;
    description?: string | undefined;
    image?: string | undefined;
    mood: string | undefined;
}

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
    }[];
}

export interface IPost {
    some: {
        AND: {
            title?: string;
            description?: string;
            postFilter?: string;
        }[];
    };
}

export interface IUser {
    username: string;
    accountType: string;
    userAttributes: IUserAttribute;
    posts: IPost;
}
