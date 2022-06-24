import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {Personal} from '../../../interfaces/personal.interace';

const ELEMENT_DATA: Personal[] = [
  {nombres: "Raúl Marcelo", apellidos: "Armas Benavides",DNI:"73262442", estatus_dot:"", tienda:"LIMTAMBO"},
  {nombres: "Ronnie Osmar", apellidos: "Oliva Moya",DNI:"73262441", estatus_dot:"", tienda:"MILITAR"},
  {nombres: "Dayana Yuliza", apellidos: "Armas Benavides",DNI:"73262443", estatus_dot:"", tienda:"LIMTAMBO"},
  {nombres: "Raúl Marcelo", apellidos: "Armas Calderón",DNI:"0324322", estatus_dot:"", tienda:"COMAS C1"},
  {nombres: "David Mauricio", apellidos: "Armas Quispe",DNI:"43242343", estatus_dot:"", tienda:"COMAS C2"},
  {nombres: "Mauricio Claude", apellidos: "Mulder Bedoya",DNI:"4344443", estatus_dot:"", tienda:"COMAS C2"}
];

class Group {
  level: number = 0;
  parent: Group;
  expanded: boolean = true;
  get visible(): boolean {
    return !this.parent || (this.parent.visible && this.parent.expanded);
  }
}

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})


export class PersonalComponent implements OnInit {

  displayedColumns: string[] = ['nombres', 'apellidos', 'DNI','estatus_dot', 'tienda'];
  //dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<Personal | Group>([]);
  acc_desc: any;
  groupByColumns: string[] = ['tienda'];

  constructor() { 
    this.dataSource.data = this.addGroups(ELEMENT_DATA, this.groupByColumns);
    this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
   }
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


  customFilterPredicate(data: Personal | Group, filter: string): boolean {
    return (data instanceof Group) ? data.visible : this.getDataRowVisible(data);
  }

  getDataRowVisible(data: Personal): boolean {
    const groupRows = this.dataSource.data.filter(
      row => {
        if (!(row instanceof Group)) return false;
        
        let match = true;
        this.groupByColumns.forEach(
          column => {
            if (!row[column] || !data[column] || row[column] !== data[column]) match = false;
          }
        );
        return match;
      }
    );

    if (groupRows.length === 0) return true;
    if (groupRows.length > 1) throw "Data row is in more than one group!";
    const parent = <Group>groupRows[0];  // </Group> (Fix syntax coloring)

    return parent.visible && parent.expanded;
  }

  groupHeaderClick(row) {
    row.expanded = !row.expanded
    this.dataSource.filter = performance.now().toString();  // hack to trigger filter refresh
  }

  addGroups(data: any[], groupByColumns: string[]): any[] {
    var rootGroup = new Group();
    return this.getSublevel(data, 0, groupByColumns, rootGroup);
  }

  getSublevel(data: any[], level: number, groupByColumns: string[], parent: Group): any[] {
    // Recursive function, stop when there are no more levels. 
    if (level >= groupByColumns.length)
      return data;

    var groups = this.uniqueBy(
      data.map(
        row => {
          var result = new Group();
          result.level = level + 1;
          result.parent = parent;
          for (var i = 0; i <= level; i++)
            result[groupByColumns[i]] = row[groupByColumns[i]];
          return result;
        }
      ),
      JSON.stringify);

    const currentColumn = groupByColumns[level];

    var subGroups = [];
    groups.forEach(group => {
      let rowsInGroup = data.filter(row => group[currentColumn] === row[currentColumn])
      let subGroup = this.getSublevel(rowsInGroup, level + 1, groupByColumns, group);
      subGroup.unshift(group);
      subGroups = subGroups.concat(subGroup);
    })
    return subGroups;
  }

  uniqueBy(a, key) {
    var seen = {};
    return a.filter(function (item) {
      var k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
  }

  isGroup(index, item): boolean {
    return item.level;
  }

  

}
