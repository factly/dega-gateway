export interface IStatus {
    id?: string;
    name?: string;
    clientId?: string;
}

export class Status implements IStatus {
    constructor(public id?: string, public name?: string, public clientId?: string) {}
}
