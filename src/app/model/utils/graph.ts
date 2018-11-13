import { Aspect } from "../entities/aspect";

export class AspectGraph {
    private _aspects: Aspect[] = [];
    private _aspectMap: Map<string, Aspect> = new Map();

    public addAspect(aspect: any) {
        const a = new Aspect();
        a.id = aspect.id;
        a.name = aspect.name;
        a.parents = this._map(aspect.parents);
        a.children = this._map(aspect.children);
        this._aspects.push(a);
        this._aspectMap.set(a.id, a);
    }

    private _map(aspects: any[]): Aspect[] {
        return aspects.map(a => {
            const p = new Aspect();
            p.id = a.id;
            return p;
        });
    }

    public allAspects(): Aspect[] {
        return this._aspects;
    }

    public getAspectsWhichDoNotHaveAnyRelationWith(selectedAspects: Aspect[], excludedAspects: Aspect[]) {
        selectedAspects = selectedAspects || [];
        excludedAspects = excludedAspects || [];
        const invalidAspectIds = new Set([...selectedAspects.map(a => a.id), ...excludedAspects.map(a => a.id)]);
        const allInvalidParentAspectIds = new Set(this._getAncestorsAndTheirDescendants(Array.from(invalidAspectIds)));
        const allInvalidChildrenAspectIds = new Set(this._getDecendants(Array.from(invalidAspectIds)));
        return this._aspects.filter(aspect => (!allInvalidParentAspectIds.has(aspect.id) &&
            !allInvalidChildrenAspectIds.has(aspect.id) &&
            !invalidAspectIds.has(aspect.id)
        ));
    }

    private _getAncestorsAndTheirDescendants(aspectIds: string[]) {
        const ancestors = this._getRelatedIdsForAspect(aspectIds, true);
        const decendantsOfAncestors = this._getRelatedIdsForAspect(ancestors, false);
        return Array.from([...decendantsOfAncestors, ...ancestors]);
    }

    private _getDecendants(aspectIds: string[]) {
        return this._getRelatedIdsForAspect(aspectIds, false);
    }

    public _getRelatedIdsForAspect(aspectIds: string[], upwardDirection: boolean): string[] {
        if (!aspectIds || aspectIds.length == 0) return [];
        const visitedAspects = new Set<string>();
        const relatedIds = [...aspectIds];
        var startIndex = 0;
        while (startIndex < relatedIds.length) {
            const currentAspectId = relatedIds[startIndex++];
            visitedAspects.add(currentAspectId);
            const aspect = this._aspectMap.get(currentAspectId);
            if (upwardDirection) {
                aspect.parents.forEach(aspect => {
                    if (!visitedAspects.has(aspect.id)) relatedIds.push(aspect.id);
                });
            }
            else {
                aspect.children.forEach(aspect => {
                    if (!visitedAspects.has(aspect.id)) relatedIds.push(aspect.id);
                });
            }
        }
        aspectIds.forEach(id => relatedIds.shift());
        return relatedIds;
    }

    public getParentAspectForAspect(aspectId: string) {
        return this._aspectMap.get(aspectId).parents;
    }

}

export class AspectPropertyGraph {
    private _aspectNodes: AspectNode[] = [];
    private _propertyNodes: PropertyNode[] = [];
    private _aspectLinks: AspectLinkAspect[] = [];
    private _propertyLinks: AspectLinkProperty[] = [];

    public addAspect(aspectId: string, aspectName: string, isRoot = false) {
        const node = new AspectNode(aspectId, aspectName, isRoot);
        this._aspectNodes.push(node);
    }

    public addProperty(propertyId: string, propertyName: string) {
        const node = new PropertyNode(propertyId, propertyName);
        this._propertyNodes.push(node);
    }

    public addAspectLinkAspect(sourceAspectId: string, targetAspectId: string) {
        const link = new AspectLinkAspect(sourceAspectId, targetAspectId);
        this._aspectLinks.push(link);
    }

    public addAspectLinkProperty(propertyId: string, aspectId: string) {
        const link = new AspectLinkProperty(propertyId, aspectId);
        this._propertyLinks.push(link);
    }

    public toVisualGraph() {
        /*  return {
             nodes: [].concat(...this._aspectNodes, ...this._propertyNodes).map(node => VisualNode.toNode(node)),
             edges: [].concat(...this._aspectLinks, ...this._propertyLinks).map(edge => Edge.toEdge(edge))
         } */

        return {
            nodes: [].concat(...this._aspectNodes).map(node => VisualNode.toNode(node)),
            edges: [].concat(...this._aspectLinks).map(edge => Edge.toEdge(edge))
        }
    }


}

export class VisualNode {
    constructor(public id: string, public name: string, public weight: number, public faveColor: string, public faveShape: string) { }

    public static toNode(v: VisualNode) {
        return { data: { id: v.id, name: v.name, weight: v.weight, faveColor: v.faveColor, faveShape: v.faveShape } };
    }

}

export class AspectNode extends VisualNode {
    constructor(public id: string, public name: string, public isRoot = false) {
        super(id, name, 65, isRoot ? '#86B342' : '#6FB1FC', 'triangle');
    }
}

export class PropertyNode extends VisualNode {
    constructor(public id: string, public name: string) {
        super(id, name, 65, '#F5A45D', 'rectangle');
    }
}

export class Edge {
    constructor(public sourceId: string, public targetId: string, public faveColor: string, public strength: number) { }

    public static toEdge(e: Edge) {
        return { data: { source: e.sourceId, target: e.targetId, faveColor: e.faveColor, strength: e.strength } };
    }
}

export class AspectLinkAspect extends Edge {
    constructor(public sourceId: string, public targetId: string) {
        super(sourceId, targetId, "#6FB1FC", 50);
    }
}

export class AspectLinkProperty extends Edge {
    constructor(public sourceId: string, public targetId: string) {
        super(sourceId, targetId, "#F5A45D", 50);
    }

}