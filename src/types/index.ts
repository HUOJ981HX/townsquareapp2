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

interface UserAttributesFilter {
    gender?: string;
    age?: number;
    friendship?: { not: null; };
    collaboration?: { not: null; };
    relationship?: { not: null; };
  }
  
 export interface UserFilter {
    username?: string | { not: null; };
    accountType?: string;
    publicId?: string;
    userAttributes?: {
      is: UserAttributesFilter;
    };
  }
  