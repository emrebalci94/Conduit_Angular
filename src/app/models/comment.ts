import { User } from "./user";

export class Comment {
    id:number;
    body:string;
    authorUser:User;
    updatedAt:Date;
    authorUserId:number;
    articleId:number;
}
