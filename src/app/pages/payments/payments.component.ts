import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Payment } from 'src/app/models/payment';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'studentName', 'currentRoom', 'price', 'date', 'isPaid'];
  dataSource: MatTableDataSource<Payment>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    
    const paymentList = [
      new Payment(1,"Sinan Altınayak", "Room 3", 2500, new Date(), true),
      new Payment(2,"Tuğçe Yenisey Erkan", "Room 12", 1200, new Date(), true),
      new Payment(3,"Kerem Kepenek", "Room 3", 3000, new Date(), false),
      new Payment(4,"Derya Nur Çaman", "Room 15", 4500, new Date(), false),
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
}
