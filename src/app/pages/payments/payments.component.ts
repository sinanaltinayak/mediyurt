import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AppModule } from 'src/app/app.module';
import { Payment } from 'src/app/models/payment';
import { Room } from 'src/app/models/room';
import { Student } from 'src/app/models/student';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements AfterViewInit {

  allPayments = new Map<string, Payment>();
  allStudents = new Map<string, Student>();
  allRooms = new Map<string, Room>();

  date: string = new Date().toString();

  displayedColumns: string[] = [ 'date', 'studentName', 'roomName', 'price', 'status'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  public dataSource: MatTableDataSource<Payment>;

  constructor(public _service: PaymentService) { 
    this.dataSource = new MatTableDataSource(AppModule.paymentsInfo);
    this.allPayments = AppModule.allPayments;
    this.allStudents = AppModule.allStudents;
    this.allRooms = AppModule.allRooms;

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
}

