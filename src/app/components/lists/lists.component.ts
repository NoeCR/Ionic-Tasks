import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Router } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @Input() complet = true;
  @ViewChild( IonList ) list: IonList;

  constructor(public tasksService: TasksService,
              private router: Router,
              private alertCtrl: AlertController) { }

  ngOnInit() {}


  selectedList( item: List ) {
    if ( this.complet ) {
      this.router.navigateByUrl(`/tabs/tab2/add/${item.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/add/${item.id}`);
    }
  }

  async addList() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva tarea',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Nombre de la tarea'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Crear',
          handler: ( data ) => {
            console.log(data);
            if ( data.title.length === 0) {
              return;
            }
            // Create new task
            const id = this.tasksService.createList( data.title );
            this.router.navigateByUrl(`/tabs/tab1/add/${id}`);
          }
        }
      ]
    });
    await alert.present();
  }

  async updateList( item: List ) {
    console.log(item);
    const alert = await this.alertCtrl.create({
      header: 'Actualizar',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: item.title,
          placeholder: 'Nombre de la tarea'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Actualizar',
          handler: ( data ) => {
            console.log(data);
            if ( data.title.length === 0) {
              return;
            }
            // Update title
            item.title = data.title;
            this.tasksService.saveStorage();
            this.list.closeSlidingItems();
          }
        }
      ]
    });
    await alert.present();
  }
  removeList( item: List ) {
    this.tasksService.removeList( item );
  }
}
