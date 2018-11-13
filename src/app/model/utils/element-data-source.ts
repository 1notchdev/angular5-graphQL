
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { Aspect } from '../entities/aspect';
import { Property } from '../entities/property';
import { Rule, RuleGroup, FlatRuleGroup } from '../entities/rule';

export class ElementDataSource {
    private readonly aspectMap = new Map<string, Aspect>();
    private aspects = [];
    constructor(private _data: any) {
        this._data.aspects.forEach(aspect => {
            const directAspect = this._mapAspect(aspect);
            this.aspects.push(directAspect);
            aspect.ancestors.forEach(asp => {
                const a = this._mapAspect(asp);
                this.aspectMap.set(a.id, a);
            });
            this.aspectMap.set(directAspect.id, directAspect);
        });

    }

    public deleteAspect(aspectId: string) {
        this.aspects = this.aspects.filter(a => a.id !== aspectId);
        this.aspectMap.delete(aspectId);
    }

    public getDirectAspects(): Aspect[] {
        return this.aspects;
    }

    private _mapProp(prop: any) {
        const p = new Property();
        p.id = prop.id;
        p.name = prop.name;
        p.kind = prop.kind;
        return p;
    }

    private _mapRule(rule: any) {
        const r = new Rule();
        r.id = rule.id;
        r.formula = rule.formula;
        r.enabled = rule.enabled;
        r.aspect = new Aspect();
        r.aspect.id = rule.aspect[0].id;
        r.property = new Property();
        r.property.id = rule.property[0].id;
        r.property.name = rule.property[0].name;
        return r;
    }

    private _mapAspect(asp: any, parents = true, properties = true, rules = true) {
        const a = new Aspect();
        a.id = asp.id;
        a.name = asp.name;
        if (parents) {
            a.parents = asp.parents.map(aspect => this._mapAspect(aspect, false, false, false));
        }
        if (properties) a.properties = asp.properties.map(prop => this._mapProp(prop));
        if (rules) a.rules = asp.rules.map(rule => this._mapRule(rule));
        return a;
    }

    public getParentAspectForAspect(aspectId: string) {
        return this.aspectMap.get(aspectId).parents;
    }

    public doesAspectHaveParents(aspect: Aspect) {
        return this.aspectMap.get(aspect.id).parents.length > 0;
    }

    public getDirectPropertiesAndRulesForAspects(aspectIds: Set<string>) {
        const properties = [];
        const flatRuleGroup = new FlatRuleGroup();
        aspectIds.forEach(id => {
            const aspect = this.aspectMap.get(id);
            aspect.properties.forEach(prop => properties.push(prop));
            aspect.rules.forEach(rule => flatRuleGroup.addRule(rule));
        });
        return [properties, flatRuleGroup.ruleGroups];
    }

}