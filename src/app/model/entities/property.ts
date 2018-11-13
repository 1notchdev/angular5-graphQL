export class PropertyInput {
    constructor(public aspectId: string, public name: string, public kind: string, public attributes: string) { }
}


export class Property {
    public id: string;
    public name: string;
    public kind: string
    public aspectId: string;
    public aspectName: string;
    public dateCreated: Date;
}

export class FlatPropertyGroup {
    public properties: Property[];
    public groups: Map<string, string>;

    constructor() {
        this.properties = [];
        this.groups = new Map();
    }

    public addProperty(p: Property) {
        this.properties.push(p);
    }

    public addGroup(aspectId: string, aspectName) {
        this.groups.set(aspectId, aspectName);
    }

    public getGroupName(aspectId: string) {
        return this.groups.get(aspectId);
    }

}