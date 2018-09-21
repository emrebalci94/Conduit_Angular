import { User } from "./user";
import { Tag } from "./tag";

export class Article {
    id:number;
    authorUserId:number;
    body:string;
    createdAt:Date;
    description:string;
    slug:string;
    title:string;
    updatedAt:Date;
    authorUser:User;
    tags:string[];
    likedUserIds:number[];
}

export class ArticleViewModel{
    articles:Article[];
    totalCount:number;
}