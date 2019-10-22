import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ListacompraService } from '../../services/listacompra.service';





@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {




  constructor( public listaCompraService: ListacompraService, ) {
    this.listaCompraService.cargarStorage();
  }

  ngOnInit() {
  }

}
