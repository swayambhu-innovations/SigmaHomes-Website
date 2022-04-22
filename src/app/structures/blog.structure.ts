export type post ={
    route:string,
    title:string,
    date:string,
    description:string,
    featuredImage:string;
    tags:string[];
    authorName:string;
    authorImage:string;
    likes:number;
    dislikes:number;
    shares:number;
    isFavorite:boolean;
}
export type PostData = {
    authorName:string;
    authorImage:string;
    date:string;
    description:string;
    featuredImage:string;
    published:boolean;
    route:string;
    tags:string[];
    title:string;
    slugs:string[];
    sourceFile:string;
}