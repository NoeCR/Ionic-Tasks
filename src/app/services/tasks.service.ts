import { Injectable } from '@angular/core';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  public list: List[] = [];

  constructor() {
    this.loadStorage();
  }

  createList( title: string ): number {
    const newList = new List(title);
    this.list.push( newList );
    this.saveStorage();
    return newList.id;
  }
  removeList( list: List) {
    this.list = this.list.filter( listData => listData.id !== list.id );
    this.saveStorage();
  }
  getList( id: string | number ) {
    id = Number( id );
    return this.list.find( listData => listData.id === id );
  }
  saveStorage() {
    localStorage.setItem( 'data', JSON.stringify( this.list ) );
  }

  loadStorage() {
    if ( localStorage.getItem( 'data' ) ) {
      this.list = JSON.parse( localStorage.getItem( 'data' ) );
    }
  }
}
