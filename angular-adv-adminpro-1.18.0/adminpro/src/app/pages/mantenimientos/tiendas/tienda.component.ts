import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Tienda } from 'src/app/models/tienda.model';
import { ControloperacionService } from '../../../services/controloperacion.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  public tiendaForm: FormGroup;
  public hospitales: Tienda[] = [];
  
  public tiendaSeleccionada: Tienda;
 
  constructor(
    private fb: FormBuilder,
    private copservice: ControloperacionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }


  guardarTienda() {

    const { nombre } = this.tiendaForm.value;

    if ( this.tiendaSeleccionada ) {
      // actualizar
      const data = {
        ...this.tiendaForm.value,
        _id: this.tiendaSeleccionada.idTienda
      }
      this.copservice.ActualizarTienda( data )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
        })

    } else {
      // crear
      
      this.copservice.RegistrarTienda( this.tiendaForm.value )
          .subscribe( (resp: any) => {
            Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`)
        })
    }
  }

}
