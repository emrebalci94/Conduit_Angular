import { Article, ArticleViewModel } from "./article";

export class Tabtag {
    constructor(name:string,data:ArticleViewModel){
        this.name=name
        this.data=data;
    }
    name: string;
    data: ArticleViewModel
}
