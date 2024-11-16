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
    userId: string;
    title: string;
    description?: string;
    image?: string;
    mood: string;
}