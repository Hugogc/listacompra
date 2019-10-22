import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListacompraService } from '../services/listacompra.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor( public router: Router,
               public listaCompraService: ListacompraService, ) {

  }
}
