import { Component, AfterViewInit, ViewChild, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Application } from 'src/app/models/application';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs';
import { ApplicationsService } from 'src/app/services/applications.service';

import { AppModule } from 'src/app/app.module';
import { Student } from 'src/app/models/student';
import { Room } from 'src/app/models/room';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementComponent implements OnInit, AfterViewInit{

  currentApplication = new Map<string, Application>();
  allApplications = new Map<string, Application>();
  allStudents = new Map<string, Student>();
  allRooms = new Map<string, Room>();

  currentRoomName: string ="";
  appliedRoomName: string="";
  studentName: string="";
  date: string = new Date().toString();

  applicationList = [
    new Application("Room Change","Sinan Altınayak", "Room 4","Room 3", this.date, "nolur"),
    new Application("Room Application","Tuğçe Yenisey Erkan", "","Room 12",  this.date, "çok kötü her şey"),
    new Application("Room Application","Kerem Kepenek", "", "Room 3", this.date, "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi quod voluptatum accusantium impedit labore, sit tenetur fuga iste facilis eius. Error culpa eligendi mollitia voluptates autem non, cum quis nisi! Loremipsum dolor sit amet, consectetur adipisicing elit. Quis incidunt ad hic ullam commodi sunt, velit ex ipsa laudantium expedita voluptatibus, eveniet optio excepturi ab perspiciatis iure eius asperiores fugiat."),
    new Application("Room Change","Derya Nur Çaman", "Room 4", "Room 15", this.date, "arakadaşım sigara içyior"),
  ];
  

  displayedColumns: string[] = ['type', 'studentName', 'currentRoom', 'appliedRoom', 'date', 'note', 'status'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  public dataToDisplay: Application[] = [];
  public dataSource: MatTableDataSource<Application>;

  constructor(public _service: ApplicationsService) { 
    this.dataSource = new MatTableDataSource(AppModule.applicationsInfo);
    this.allApplications = AppModule.allApplications;
    this.allStudents = AppModule.allStudents;
    this.allRooms = AppModule.allRooms;

  }

  ngAfterViewInit() {
      
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(){
  }

  getAllApplications(){

    let result: Application[] =[];
    this._service.getAll().snapshotChanges().pipe(
      map(changes=> changes.map(c=>
        ({id: c.payload.doc.id, 
          appliedRoomID: c.payload.doc.data().appliedRoomID,
          currentRoomID: c.payload.doc.data().currentRoomID, 
          date: c.payload.doc.data().date, 
          note: c.payload.doc.data().note,
          studentID: c.payload.doc.data().studentID, 
          type: c.payload.doc.data().type, 
        })
        )
      )
    ).subscribe(data => { 
      data.forEach(el=> {
        let row = new Application(el.type, el.studentID, el.currentRoomID, el.appliedRoomID, el.date, el.note);
        result.push(row);
        });
      this.dataToDisplay = result; 
    }); 
  }


  hm(){
    console.log( AppModule.allApplications);
  }

  getStudentName(studentId: string){
    return this.allStudents.get(studentId).fullname;
  }

  getRoomName(roomId: string){
    return this.allRooms.get(roomId).name;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
//   requestStudents = [
//     { firstName: 'Frank', lastName: 'Murphy', room: 'Room5', newRoom: 'Room1', message: 'İhtiyacım var :(' },
//     { firstName: 'Vic', lastName: 'Reynolds', room: 'Room2', newRoom: 'Room3', message: 'Odamın deniz manzarası yok' },
//     { firstName: 'Gina', lastName: 'Jabowski',room: 'Room5', newRoom: 'Room1', message: 'Oda arkadaşlarım horluyor! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi quod voluptatum accusantium impedit labore, sit tenetur fuga iste facilis eius. Error culpa eligendi mollitia voluptates autem non, cum quis nisi! Loremipsum dolor sit amet, consectetur adipisicing elit. Quis incidunt ad hic ullam commodi sunt, velit ex ipsa laudantium expedita voluptatibus, eveniet optio excepturi ab perspiciatis iure eius asperiores fugiat.' },
//     { firstName: 'Jessi', lastName: 'Glaser', room: 'Room3', newRoom: 'Room6', message: 'Oda nemli.' },
//     { firstName: 'Jay', lastName: 'Bilzerian', room: 'Room7', newRoom: 'Room10', message: 'Canım öyle istedi' }
// ];

//   applicationStudents = [
//     { firstName: 'Frank', lastName: 'Murphy', newRoom: 'Room1', message: 'İhtiyacım var :(' },
//     { firstName: 'Vic', lastName: 'Reynolds', newRoom: 'Room3', message: 'Deniz manzarası var.'  },
//     { firstName: 'Gina', lastName: 'Jabowski', newRoom: 'Room1', message: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi quod voluptatum accusantium impedit labore, sit tenetur fuga iste facilis eius. Error culpa eligendi mollitia voluptates autem non, cum quis nisi! Loremipsum dolor sit amet, consectetur adipisicing elit. Quis incidunt ad hic ullam commodi sunt, velit ex ipsa laudantium expedita voluptatibus, eveniet optio excepturi ab perspiciatis iure eius asperiores fugiat.'  },
//     { firstName: 'Jessi', lastName: 'Glaser', newRoom: 'Room6', message: 'Oda güzel.'  },
//     { firstName: 'Jay', lastName: 'Bilzerian', newRoom: 'Room10', message: 'Canım öyle istedi' }
//   ];
}
