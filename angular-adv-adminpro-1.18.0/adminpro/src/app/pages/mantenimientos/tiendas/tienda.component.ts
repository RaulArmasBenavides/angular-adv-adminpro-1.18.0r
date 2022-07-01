import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Tienda } from 'src/app/models/tienda.model';
import { ControloperacionService } from '../../../services/controloperacion.service';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  public tiendaForm: FormGroup;
  public tiendas: Tienda[] = [];
  
  public tiendaSeleccionada: Tienda;
 
  constructor(
    private fb: FormBuilder,
    private copservice: ControloperacionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  
  console.log('test');
  this.activatedRoute.params
  .subscribe( ({ idTienda }) => this.cargarDatosTienda( idTienda ) );


  this.tiendaForm = this.fb.group({
    Nombre: ['', Validators.required ],
    // hospital: ['', Validators.required ],
  });

  //this.cargarHospitales();

  this.tiendaForm.get('tienda').valueChanges
      .subscribe( hospitalId => {
        this.tiendaSeleccionada = this.tiendas.find( h => h.idTienda === hospitalId );
      })

  }

  cargarDatosTienda(id: string) {

    if ( id === 'nuevo' ) {
      return;
    }
    
     this.copservice.obtenerTiendaPorId( id )
      .pipe(
        delay(100)
      )
      .subscribe( tienda => {

        if ( !tienda ) {
          return this.router.navigateByUrl(`/dashboard/tiendas`);
        }

        const { Nombre,dot_teo_pt,dot_teo_ft,Direccion,Distrito } = tienda; 
        this.tiendaSeleccionada = tienda;
        this.tiendaForm.setValue({ Nombre,dot_teo_pt,dot_teo_ft,Direccion,Distrito });
      });

  }

  guardarTienda() {

    const { nombre } = this.tiendaForm.value;

    if ( this.tiendaSeleccionada ) {
       //actualizar Tienda
      const data = {
        ...this.tiendaForm.value,
        _id: this.tiendaSeleccionada.idTienda
      }
      this.copservice.ActualizarTienda( data )
        .subscribe( resp => {
          Swal.fire('Actualizada', `${ nombre } actualizado correctamente`, 'success');
        })

    } else {
      // registrar Tienda
      this.copservice.RegistrarTienda( this.tiendaForm.value )
          .subscribe( (resp: any) => {
            Swal.fire('Creada', `${ nombre } creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`)
        })
    }
  }

}
