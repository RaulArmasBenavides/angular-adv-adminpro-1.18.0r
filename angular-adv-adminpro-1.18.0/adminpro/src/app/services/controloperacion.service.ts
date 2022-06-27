import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Tienda } from '../models/tienda.model';
import { Personal } from '../models/personal.model';
const base_url = environment.base_urltamb;


@Injectable({
  providedIn: 'root'
})
export class ControloperacionService {

  constructor(private http: HttpClient) { }

  //SINCRONIZACIÓN CON GEOVICTORIA 
  SyncGeoVictoriaData() {
    const url = `${ base_url }/Empleado/SyncGeoVictoriaAsync`;
    return this.http.get( url)
              .pipe(
                map( (resp: {codigo: boolean }) => resp.codigo )
              );
  }

  //TIENDAS
  cargarTiendas() {
    const url = `${ base_url }/Tienda/TiendaListar`;
    return this.http.get( url)
              .pipe(
                map( (resp: {codigo: boolean, listajson: Tienda[] }) => resp.listajson )
              );
  }

  RegistrarTienda( tienda: { Nombre: string, dot_teo_pt: number,dot_teo_ft:number,jefe_zonal:string,Direccion:string,iddistrito:number } ) {
    const url = `${ base_url }/Tienda/TiendaAdicionar`;
    return this.http.post( url, tienda);//, this.headers );
  }

  ActualizarTienda( tienda: Tienda  ) {

    const url = `${ base_url }/Tienda/TiendaActualizar`;
    return this.http.put( url, tienda);//, this.headers );
  }
  //CONTROL
  cargarControl() {
    const url = `${ base_url }/Tienda/TiendasControl`;
    return this.http.get( url)
              .pipe(
                map( (resp: {codigo: boolean, listajson: Tienda[] }) => resp.listajson )
              );
  }

  

  //PERSONAL
  cargarPersonal() {

    const url = `${ base_url }/Empleado/EmpleadoListar`;
    return this.http.get( url)
              .pipe(
                map( (resp: {codigo: boolean, listajson: Personal[] }) => resp.listajson )
              );
  }





}
