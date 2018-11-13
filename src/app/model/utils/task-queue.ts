import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
export class TaskQueue {
    private _tasks = [];

    public add(obs: Observable<any>) {
        this._tasks.push(obs);
        return this;
    }

    public completeAll() {
        if (this._tasks && this._tasks.length > 0) {
            return Observable.forkJoin(...this._tasks);
        } else {
            return Observable.of<any>("Empty task queue");
        }
    }


}