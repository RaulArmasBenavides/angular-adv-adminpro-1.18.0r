import { Component, OnInit } from '@angular/core';
import { Tienda } from 'src/app/models/tienda.model';
import { ControloperacionService } from '../../../services/controloperacion.service';
@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit {

  public tiendas: Tienda[] = [];
  constructor( private copservice: ControloperacionService,) { }

  ngOnInit(): void {
    this.cargarTienda();
  }

  cargarTienda() {

    this.copservice.cargarTiendas()
       .subscribe( (tiendas: Tienda[]) => {
         this.tiendas = tiendas;
      })

  }

}
