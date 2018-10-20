export interface IPost {
    id?: string;
    title?: string;
    clientId?: string;
    content?: string;
}

export class Post implements IPost {
    constructor(public id?: string, public title?: string, public clientId?: string, public content?: string) {}
}
