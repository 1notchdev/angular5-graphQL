export class ScenarioInput {
    constructor(public name: string, public color: string) { }
}

export class Scenario {
    public id: string;
    public name: string;
    public color: string;
    public dateCreated: Date;
    public createdBy: string;
    public dateModified: Date;
    public modifiedBy: string;
    public base: Scenario[];

}
