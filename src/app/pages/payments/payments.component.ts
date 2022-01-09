import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AppModule } from 'src/app/app.module';
import { Payment } from 'src/app/models/payment';
import { Room } from 'src/app/models/room';
import { Student } from 'src/app/models/student';
import { PaymentsService } from 'src/app/services/payments.service';

// Typescript file of the payments component, this component is for displaying the payments page
// and it has all the necessary operations for the page

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements AfterViewInit {

  allStudents = new Map<string, Student>();
  allRooms = new Map<string, Room>();

  date: string = new Date().toString();

  displayedColumns: string[] = [ 'date', 'studentName', 'roomName', 'price', 'status'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  public dataSource: MatTableDataSource<any>;

  constructor(public _service: PaymentsService) { 
    this.dataSource = new MatTableDataSource(AppModule.paymentsInfo);
    this.allStudents = AppModule.allStudents;
    this.allRooms = AppModule.allRooms;

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    const sortState: Sort = {active: 'date', direction: 'desc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);

    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.date.toLowerCase().includes(filter) || data.studentName.toLowerCase().includes(filter) || data.roomName.toLowerCase().includes(filter) || data.price.toString() === filter;
    };
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    console.log(this.dataSource.filter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

