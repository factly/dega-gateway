export interface ITag {
    id?: string;
    name?: string;
    slug?: string;
    description?: string;
    meta?: string;
}

export class Tag implements ITag {
    constructor(public id?: string, public name?: string, public slug?: string, public description?: string, public meta?: string) {}
}
