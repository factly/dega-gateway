export interface ICategory {
    id?: string;
    name?: string;
    description?: string;
    slug?: string;
    parent?: string;
    meta?: string;
}

export class Category implements ICategory {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public slug?: string,
        public parent?: string,
        public meta?: string
    ) {}
}
