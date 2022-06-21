import { Component, OnInit } from '@angular/core';
import {CentroVacunacion} from '../../../interfaces/centro.interface'


const ELEMENT_DATA: CentroVacunacion[] = [
  {nombre: "Parque1", direccion: 'Av. La Marina 123', distrito:'San Miguel'},
  {nombre: "Parque2", direccion: 'Av. La Marina 125', distrito:'San Luis'},
  {nombre: "Parque3", direccion: 'Av. La Marina 126', distrito:'Jesus María'},
];

@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.css']
})
export class CentrosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'direccion', 'distrito'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
