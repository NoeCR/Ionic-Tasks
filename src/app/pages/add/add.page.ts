import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { ListItem } from '../../models/list-item.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  public list: List;
  public nameItem = '';

  constructor(private tasksService: TasksService, private route: ActivatedRoute) {
    const idList = this.route.snapshot.paramMap.get('idList');
    this.list = this.tasksService.getList(idList);
  }

  ngOnInit() {
  }

  onCheck( item: ListItem ) {

    const pending = this.list.items
                              .filter( itemData => !itemData.complete )
                              .length;

    if ( pending === 0) {
      this.list.complete = true;
      this.list.finishedIn = new Date();
    } else {
      this.list.complete = false;
      this.list.finishedIn = null;
    }

    this.tasksService.saveStorage();
  }
  addItem() {
    if ( this.nameItem.length === 0 ) {
      return;
    }

    const newItem = new ListItem( this.nameItem );
    this.list.items.push( newItem );
    this.nameItem = '';
    this.tasksService.saveStorage();
  }
  remove( index: number ) {
    this.list.items.splice(index, 1);
    this.tasksService.saveStorage();
  }
}
