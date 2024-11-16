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