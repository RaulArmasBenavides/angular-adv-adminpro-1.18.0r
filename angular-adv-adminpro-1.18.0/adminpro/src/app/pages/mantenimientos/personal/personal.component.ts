import { Component, OnInit } from '@angular/core';
import {Personal} from '../../../interfaces/personal.interace';

const ELEMENT_DATA: Personal[] = [
  {nombres: "Raúl Marcelo", apellidos: "Armas Benavides",DNI:"73262442", estatus_dot:""}
];

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  displayedColumns: string[] = ['nombres', 'apellidos', 'DNI','estatus_dot'];
  dataSource = ELEMENT_DATA;
  acc_desc: any;

  constructor() { }
  displayedColumns1 = ['acc_id', 'acc_desc'];
  ngOnInit(): void {

    const data = [
      {
        "acc_id": 1001,
        "acc_desc": "Administration"
      },

      {
        "acc_id": 1002,
        "acc_desc": "Laboratory"
      },

      {
        "acc_id": 1003,
        "acc_desc": "Staff"
      },

      {
        "acc_id": 1004,
        "acc_desc": "Office-1"
      },
      {
        "acc_id": 1005,
        "acc_desc": "Office-2"
      },
      {
        "acc_id": 1006,
        "acc_desc": "Office-2"
      }
   ];
     this.acc_desc = data;
  }

  

}
