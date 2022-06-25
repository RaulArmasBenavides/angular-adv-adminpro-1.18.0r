import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Tienda } from '../../../models/tienda.model';
import { ControloperacionService } from '../../../services/controloperacion.service';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-templateform',
  templateUrl: './templateform.component.html',
  styleUrls: ['./templateform.component.css']
})
export class TemplateformComponent implements OnInit {

  public TiendaForm: FormGroup;
  public lista_tiendas: Tienda[] = [];
  
  public tiendaSeleccionado: Tienda;
 
  constructor( private fb: FormBuilder,
               private coservice: ControloperacionService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
  }

  guardarTienda() {

    const { nombre } = this.TiendaForm.value;

    if ( this.tiendaSeleccionado ) {
      // actualizar tienda
      const data = {
        ...this.TiendaForm.value,
        _id: this.tiendaSeleccionado.idTienda
      }
      this.coservice.ActualizarTienda( data )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
        })

    } else {
      // crear una nueva tienda     
      this.coservice.RegistrarTienda( this.TiendaForm.value )
          .subscribe( (resp: any) => {
            Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
            //this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`)
        })
    }
  }

}
