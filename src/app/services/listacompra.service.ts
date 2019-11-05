import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';
import { ListaItem } from '../models/lista-item.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';



@Injectable({
  providedIn: 'root'
})
export class ListacompraService {
  listas: Lista[] = [];
  listaActiva = 0;
  nombreItem = '';

  constructor(public router: Router,
              public alertCtrl: AlertController,
              public storage: Storage,
               ) {

  }

  async agregarLista() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Ej. Mercadona',
        }
      ],

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Crear',
          handler: ( data ) => {
            if (data.titulo.length === 0 ) {
              return;
            }
            this.crearLista( data.titulo );
            this.guardarStorage();
          }
        }
      ],
    });

    alert.present();
  }

  cambioCheck( item: ListaItem ) {
    this.guardarStorage();
  }
  anadirItem() {
    if ( this.nombreItem.length === 0) {
      return;
    }
    const nuevoItem = new ListaItem( this.nombreItem );
    this.listas[this.listaActiva].items.push( nuevoItem );
    this.nombreItem = '';
    this.guardarStorage();
  }
  getItems() {
    return this.listas[this.listaActiva].items;
  }
  irLista(i: number ) {
    this.listaActiva = i;
    this.router.navigateByUrl( '/agregar' );
  }
  async presentAlertConfirm( i: number ) {
    const alert = await this.alertCtrl.create({
      header: '¿Desea borrar la lista?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',

        }, {
          text: 'Si',
          handler: () => {
            this.borrarLista( i );
          }
        }
      ]
    });

    alert.present();
  }
  borrarLista( i: number ) {
    this.listas.splice( i, 1 );
    this.guardarStorage();
  }
  borrarItem( i: number ) {
    this.listas[this.listaActiva].items.splice( i, 1 );
    this.guardarStorage();
  }
   crearLista( titulo: string ) {
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();
  }
   guardarStorage() {
    this.storage.set('data', this.listas );
  }
  cargarStorage() {
      this.storage.get('data').then((val) => {
      this.listas = val;
    });
  }
}
