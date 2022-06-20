import { User } from "src/users/user.entity";
export declare class Blog {
    id: number;
    title: string;
    slug: string;
    description: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    updateTimestamp(): void;
    likes: number;
    headerImage: string;
    publishedDate: Date;
    isPublished: boolean;
    author: User;
}
