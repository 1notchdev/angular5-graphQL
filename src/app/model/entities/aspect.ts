import { Property } from "./property";
import { Rule } from "./rule";

export class AspectInput {
    constructor(public name: string, public kind: string, public description: string) { }
}

export class Aspect {
    public id: string;
    public name: string;
    public kind: string;
    public dateCreated: Date;
    public dateModified: Date;
    public description: string;
    public modifiedBy: string;
    public createdBy: string;
    public parents: Aspect[];
    public children: Aspect[];
    public properties: Property[];
    public rules: Rule[];

}


