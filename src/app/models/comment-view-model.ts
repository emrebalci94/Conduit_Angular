import { Comment } from "./comment";

export class CommentViewModel {
    error:boolean;
    obj:{
        comments:Comment[],
        totalCount:number
    };
}
