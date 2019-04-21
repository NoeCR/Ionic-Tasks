import { ListItem } from './list-item.model';

export class List {
    id: number;
    title: string;
    createAt: Date;
    finishedIn: Date;
    complete: boolean;
    items: ListItem[];

    constructor( title: string ) {
        this.title = title;
        this.createAt = new Date();
        this.complete = false;
        this.items = [];
        this.id = new Date().getTime();
    }
}