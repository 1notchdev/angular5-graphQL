export class Element {
    id: string;
    name: string;
    dateCreated: Date;
    createdBy: string;
    dateModified: Date;
    modifiedBy: string;

}

export class ElementInput {
    constructor(public name: string) { }
}