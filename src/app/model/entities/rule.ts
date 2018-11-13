import { Property } from "./property";
import { Aspect } from "./aspect";

export class RuleInput {
    constructor(public formula: string, public aspectId: string, public propertyId: string, public enabled = true) { }
}

export class Rule {
    public id: string;
    public formula: string;
    public property: Property;
    public enabled = true;
    public aspect: Aspect;
}

export class FlatRuleGroup {
    public groups: Map<string, RuleGroup>;

    constructor() {
        this.groups = new Map();
    }

    public addRule(p: Rule) {
        this._getGroup(p.property.id, p.property.name).addRule(p);
    }

    public ruleGroups(): RuleGroup[] {
        return Array.from(this.groups.values());
    }

    private _getGroup(propertyId: string, propertyName: string): RuleGroup {
        const existGroup = this.groups.get(propertyId);
        if (existGroup) {
            return existGroup;
        }
        const newGroup = new RuleGroup(propertyId, propertyName);
        this.groups.set(propertyId, newGroup);
        return newGroup;
    }

}

export class RuleGroup {

    public readonly items: Rule[] = [];

    constructor(public readonly key: string,
        public readonly name: string) { }

    public addRule(r: Rule) {
        this.items.push(r);
    }
}