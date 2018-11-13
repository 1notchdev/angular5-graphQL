
import { User } from './user';

export class ProjectInput {
    constructor(public name: String, public ownerId: string) { }
}
export class Project {
    constructor(
        public id: string,
        public name: string,
        public relativeId: string,
        public relation: string,
        public dateCreated: number,
        public createdBy: string,
        public dateModified: number,
        public modifiedBy: string,
        public owner: User,
        public users: [User]
    ) { }

}