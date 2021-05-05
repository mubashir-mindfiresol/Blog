export class PostModel {
    id?: string;
    title: string;
    category:string;
    description: string;
    createDate:string;
    url: string;
    username?: string;
    likeCount?:number;
    path?:string;
    data?:any;
}