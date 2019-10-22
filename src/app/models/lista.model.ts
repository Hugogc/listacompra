import { ListaItem } from './lista-item.model';



export class Lista {
    titulo: string;
    terminada: boolean;
    items: ListaItem[];

    constructor( titulo: string ) {
        this.titulo = titulo;
        this.terminada = false;
        this.items = [];
    }





}
