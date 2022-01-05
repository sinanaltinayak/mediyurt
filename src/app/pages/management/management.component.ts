import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Application } from 'src/app/models/application';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'type', 'studentName', 'currentRoom', 'appliedRoom', 'date', 'note', 'status'];
  dataSource: MatTableDataSource<Application>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  date: string = new Date().toString();

  constructor() { 

    const paymentList = [
      new Application("Room Change","Sinan Altınayak", "Room 4","Room 3", this.date, "nolur"),
      new Application("Room Application","Tuğçe Yenisey Erkan", "","Room 12",  this.date, "çok kötü her şey"),
      new Application("Room Application","Kerem Kepenek", "", "Room 3", this.date, "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi quod voluptatum accusantium impedit labore, sit tenetur fuga iste facilis eius. Error culpa eligendi mollitia voluptates autem non, cum quis nisi! Loremipsum dolor sit amet, consectetur adipisicing elit. Quis incidunt ad hic ullam commodi sunt, velit ex ipsa laudantium expedita voluptatibus, eveniet optio excepturi ab perspiciatis iure eius asperiores fugiat."),
      new Application("Room Change","Derya Nur Çaman", "Room 4", "Room 15", this.date, "arakadaşım sigara içyior"),
    ];

    this.dataSource = new MatTableDataSource(paymentList);
  }

  ngAfterViewInit() { 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  requestStudents = [
    { firstName: 'Frank', lastName: 'Murphy', room: 'Room5', newRoom: 'Room1', message: 'İhtiyacım var :(' },
    { firstName: 'Vic', lastName: 'Reynolds', room: 'Room2', newRoom: 'Room3', message: 'Odamın deniz manzarası yok' },
    { firstName: 'Gina', lastName: 'Jabowski',room: 'Room5', newRoom: 'Room1', message: 'Oda arkadaşlarım horluyor! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi quod voluptatum accusantium impedit labore, sit tenetur fuga iste facilis eius. Error culpa eligendi mollitia voluptates autem non, cum quis nisi! Loremipsum dolor sit amet, consectetur adipisicing elit. Quis incidunt ad hic ullam commodi sunt, velit ex ipsa laudantium expedita voluptatibus, eveniet optio excepturi ab perspiciatis iure eius asperiores fugiat.' },
    { firstName: 'Jessi', lastName: 'Glaser', room: 'Room3', newRoom: 'Room6', message: 'Oda nemli.' },
    { firstName: 'Jay', lastName: 'Bilzerian', room: 'Room7', newRoom: 'Room10', message: 'Canım öyle istedi' }
];

  applicationStudents = [
    { firstName: 'Frank', lastName: 'Murphy', newRoom: 'Room1', message: 'İhtiyacım var :(' },
    { firstName: 'Vic', lastName: 'Reynolds', newRoom: 'Room3', message: 'Deniz manzarası var.'  },
    { firstName: 'Gina', lastName: 'Jabowski', newRoom: 'Room1', message: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi quod voluptatum accusantium impedit labore, sit tenetur fuga iste facilis eius. Error culpa eligendi mollitia voluptates autem non, cum quis nisi! Loremipsum dolor sit amet, consectetur adipisicing elit. Quis incidunt ad hic ullam commodi sunt, velit ex ipsa laudantium expedita voluptatibus, eveniet optio excepturi ab perspiciatis iure eius asperiores fugiat.'  },
    { firstName: 'Jessi', lastName: 'Glaser', newRoom: 'Room6', message: 'Oda güzel.'  },
    { firstName: 'Jay', lastName: 'Bilzerian', newRoom: 'Room10', message: 'Canım öyle istedi' }
  ];

}
