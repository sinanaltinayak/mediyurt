import { Component, OnInit } from '@angular/core';
import { AppModule } from 'src/app/app.module';
import { MediyurtService } from 'src/app/services/mediyurt.service';
import { StudentsService } from 'src/app/services/students.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Student } from 'src/app/models/student';
import { Manager } from 'src/app/models/manager';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AppComponent} from '../../app.component';
import { ApplicationsService } from 'src/app/services/applications.service';
import { Application } from 'src/app/models/application';
import { RoomsService } from 'src/app/services/rooms.service';
import { Room } from 'src/app/models/room';
import { PaymentService } from 'src/app/services/payment.service';
import { Payment } from 'src/app/models/payment';

@Component({
  selector: 'app-sidebar',
  templateUrl: `./sidebar.component.html`,
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  username: string = "";
  studentNumber!: number;
  fullname: string = "";
  password: string = "";
  confirmPassword: string = "";

  usernameErrorMessage: string = "";
  studentNumberErrorMessage: string = "";
  passwordErrorMessage: string = "";

  userType:string = AppModule.userType;
  signMode:string = "signin";
  hidePassword = true;

  currentManager = new Map<string, Manager>();
  currentStudent = new Map<string, Student>();
  allStudents = new Map<string, Student>();

  constructor(public _service: StudentsService, public _appService: ApplicationsService, public _paymentService: PaymentService, public _roomService: RoomsService, public myapp: AppComponent, private _router: Router) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  loginUser(){
    this._service.loginStudent(this.username, this.password).snapshotChanges().pipe(map(changes=> changes.map(c=>
      ({id: c.payload.doc.id, 
        fullname: c.payload.doc.data().fullname, 
        number: c.payload.doc.data().number, 
        username: c.payload.doc.data().username, 
        password: c.payload.doc.data().password, 
        currentRoomID: c.payload.doc.data().currentRoomID  })
      
      )
    )
  ).subscribe(data => { 
    if(data.length != 0){
      this.currentStudent.set(data[0].id, new Student(data[0].fullname, data[0].number, data[0].currentRoomID, data[0].username, data[0].password));
      this.userType = "student";
      AppModule.userStudent = this.currentStudent;
      AppModule.userType = this.userType;
      this.myapp.openSnackBar("Welcome "+data[0].fullname, "Continue");
    }
    else{
      this._service.loginManager(this.username, this.password).snapshotChanges().pipe(map(changes=>changes.map(c=>
        ({id: c.payload.doc.id,
          fullname: c.payload.doc.data().fullname, 
          username: c.payload.doc.data().username, 
          password: c.payload.doc.data().password,  })
          )
        )
      ).subscribe(data => {
        if(data.length != 0){
          this.currentManager.set(data[0].id, new Manager(data[0].fullname, data[0].username, data[0].password));
          this.userType = "management";
          AppModule.userManager = this.currentManager;
          AppModule.userType = this.userType;
          this.getAllApplications();
          this.getAllRooms();
          this.myapp.openSnackBar("Welcome "+data[0].fullname, "Continue");
        }
        else{
          this.usernameErrorMessage = "User could not be found."
        }
      })
    }
    
  });
  }

  logoutUser(){
    if(this._router.url != "/home"){
      this._router.navigate(['home']);
    }
    AppModule.userManager = new Map<string, Manager>();
    AppModule.userStudent = new Map<string, Student>();
    AppModule.userType = "default";
    this.username = "";
    this.password = "";
    this.usernameErrorMessage = "";
    if(this._router.url == "/home"){
      window.location.reload();
    }
    this.myapp.openSnackBar("Successfully logged out.", "Continue");
  }

  changeSignMode(){
    if(this.signMode == "signin"){
      this.signMode = "signup";
    }
    else{
      this.signMode = "signin";
    }
  }

  registerUser(){

    if(Array.from(this.allStudents.values()).find(x => x.username == this.username)){
      this.usernameErrorMessage = "User Name is taken.";
    }
    else{
      this.usernameErrorMessage = "";
    }
    if(Array.from(this.allStudents.values()).find(x => x.number == this.studentNumber)){
      this.studentNumberErrorMessage = "This student already has an account.";
    }
    else{
      this.studentNumberErrorMessage = "";
    }
    if(this.password != this.confirmPassword){
      this.passwordErrorMessage = "Passwords do not match."
    }
    else{
      this.passwordErrorMessage = "";
    }

    if(this.usernameErrorMessage == "" && this.studentNumberErrorMessage == "" && this.passwordErrorMessage == ""){
      let registerStudent = new Student(this.fullname, this.studentNumber, "", this.username, this.password);
      this._service.create(registerStudent);
      this._service.loginStudent(this.username, this.password).snapshotChanges().pipe(map(changes=> changes.map(c=>
        ({id: c.payload.doc.id, 
          fullname: c.payload.doc.data().fullname, 
          number: c.payload.doc.data().number, 
          username: c.payload.doc.data().username, 
          password: c.payload.doc.data().password, 
          currentRoomID: c.payload.doc.data().currentRoomID  })
        
        )
      )
    ).subscribe(data => {
      if(data.length != 0){
        this.currentStudent.set(data[0].id, new Student(data[0].fullname, data[0].number, data[0].currentRoomID, data[0].username, data[0].password));
        this.userType = "student";
        AppModule.userStudent = this.currentStudent;
        AppModule.userType = this.userType;
        this.myapp.openSnackBar("Welcome "+data[0].fullname, "Continue");
      }
    });
    }
  }

  getAllStudents(){
    this._service.getAll().snapshotChanges().pipe(
      map(changes=> changes.map(c=>
        ({id: c.payload.doc.id, 
          fullname: c.payload.doc.data().fullname, 
          number: c.payload.doc.data().number, 
          username: c.payload.doc.data().username, 
          password: c.payload.doc.data().password, 
          currentRoomID: c.payload.doc.data().currentRoomID  })
        
        )
      )
    ).subscribe(data => { 
      AppModule.allStudents.clear();
      data.forEach(el=> {
        this.allStudents.set(el.id, new Student(el.fullname, el.number, el.currentRoomID, el.username, el.password));
        AppModule.allStudents.set(el.id, new Student(el.fullname, el.number, el.currentRoomID, el.username, el.password));
      }
      );
    });
  }

  getAllApplications(){

    let result: Application[] =[];

    this._appService.getAll().snapshotChanges().pipe(
      map(changes=> changes.map(c=>
        ({id: c.payload.doc.id, 
          appliedRoomID: c.payload.doc.data().appliedRoomID,
          currentRoomID: c.payload.doc.data().currentRoomID, 
          dateSent: c.payload.doc.data().dateSent, 
          dateReturned: c.payload.doc.data().dateReturned, 
          note: c.payload.doc.data().note,
          studentID: c.payload.doc.data().studentID, 
          type: c.payload.doc.data().type, 
          status: c.payload.doc.data().status, 
        })
        )
      )
    ).subscribe(data => { 
      data.forEach(el=> {
        let row = new Application(el.type, el.studentID, el.currentRoomID, el.appliedRoomID, el.dateSent, el.dateReturned, el.note, el.status);
        result.push(row);
        AppModule.allApplications.set(el.id, row);
        });
      AppModule.applicationsInfo = result; 
    }); 

  }

  getAllPayments(){

    let result: Payment[] =[];

    this._paymentService.getAll().snapshotChanges().pipe(
      map(changes=> changes.map(c=>
        ({id: c.payload.doc.id, 
          roomID: c.payload.doc.data().roomID,
          date: c.payload.doc.data().date, 
          isPaid: c.payload.doc.data().status,
          studentID: c.payload.doc.data().studentID, 
          price: c.payload.doc.data().price, 
        })
        )
      )
    ).subscribe(data => { 
      data.forEach(el=> {
        let row = new Payment(el.studentID, el.roomID, el.price, el.date, el.isPaid);
        result.push(row);
        AppModule.allPayments.set(el.id, row);
        });
      AppModule.paymentsInfo = result; 
    }); 

  }

  
  getAllRooms(){
    this._roomService.getAll().snapshotChanges().pipe(
      map(changes=> changes.map(c=>
        ({id: c.payload.doc.id, 
          currentCapacity: c.payload.doc.data().currentCapacity,
          description: c.payload.doc.data().description, 
          maxCapacity: c.payload.doc.data().maxCapacity, 
          name: c.payload.doc.data().name, 
          price: c.payload.doc.data().price, 
          status: c.payload.doc.data().status,  
          isFull: c.payload.doc.data().isFull,  
        })
        )
      )
    ).subscribe(data => { 
      data.forEach(el=> {
        AppModule.allRooms.set(el.id, new Room(el.name, el.maxCapacity, el.description, el.price, el.status, el.currentCapacity, el.isFull))
      }
      );
    });
  }

}
