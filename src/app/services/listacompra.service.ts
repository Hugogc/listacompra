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
              private alertCtrl: AlertController,
              public storage: Storage) {
    this.cargarStorage();
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
            console.log(data);
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
    return this.listas [this.listaActiva].items;
  }
  irLista(i: number ) {
    this.listaActiva = i;//this.listaActiva = this.listas[ i ]
    this.router.navigateByUrl( '/agregar' );
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
