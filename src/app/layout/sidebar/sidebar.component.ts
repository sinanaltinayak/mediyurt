import { Component, OnInit } from '@angular/core';
import { AppModule } from 'src/app/app.module';
import { StudentsService } from 'src/app/services/students.service';
import { map } from 'rxjs/operators';
import { Student } from 'src/app/models/student';
import { Manager } from 'src/app/models/manager';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { ApplicationsService } from 'src/app/services/applications.service';
import { RoomsService } from 'src/app/services/rooms.service';
import { Room } from 'src/app/models/room';
import { PaymentsService } from 'src/app/services/payments.service';

// Typescript file of the sidebar component, this component is included in every page of the website
// and it has all the necessary operations when the users enters to an account

@Component({
  selector: 'app-sidebar',
  templateUrl: `./sidebar.component.html`,
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  // These variables are for storing the values that are entered in the form fields in HTML file
  username: string = "";
  studentNumber!: number;
  fullname: string = "";
  password: string = "";
  confirmPassword: string = "";
  hidePassword = true;

  // Error messages
  usernameErrorMessage: string = "";
  studentNumberErrorMessage: string = "";
  passwordErrorMessage: string = "";

  // userType is for determining the accessibility of some features
  userType:string = AppModule.userType;

  // signMode is for deciding which menu will be shown in the log in part
  signMode:string = "signin";

  // these maps store the user information with the format of <"User ID","User Information"> 
  currentManager = new Map<string, Manager>();
  currentStudent = new Map<string, Student>();
  allStudents = new Map<string, Student>();

  // stores the rooms
  allRooms = new Map<string, Room>();

  // constructor with the needed classes
  constructor(
    public _studentService: StudentsService, 
    public _appService: ApplicationsService, 
    public _paymentService: PaymentsService, 
    public _roomService: RoomsService, 
    public myapp: AppComponent, 
    private _router: Router) 
  { }

  // ngOnInit function is called in launch
  ngOnInit(): void {
    this.getAllStudents();
    this.getAllRooms();
  }

  // loginUser function is for taking necessary information from the user and trying to find a user with those information.
  loginUser(){

    // tries to find a student first
    this._studentService.loginStudent(this.username, this.password).snapshotChanges().pipe(map(changes=> changes.map(c=>
      ({id: c.payload.doc.id, 
        fullname: c.payload.doc.data().fullname, 
        number: c.payload.doc.data().number, 
        username: c.payload.doc.data().username, 
        password: c.payload.doc.data().password, 
        currentRoomID: c.payload.doc.data().currentRoomID  })
      
      )
    )
  ).subscribe(data => { 
    // if there is a student exist with those values, local and global variables are changed accordingly
    if(data.length != 0){
      this.currentStudent.set(data[0].id, new Student(data[0].fullname, data[0].number, data[0].currentRoomID, data[0].username, data[0].password));
      this.userType = "student";
      AppModule.userStudent = this.currentStudent;
      AppModule.userType = this.userType;
      // gets necessary data from the database
      this.getAllApplications();
      // welcome message
      this.myapp.openSnackBar("Welcome "+data[0].fullname, "Continue");
    }
    // if there is not a student, it tries to find a manager
    else{
      this._studentService.loginManager(this.username, this.password).snapshotChanges().pipe(map(changes=>changes.map(c=>
        ({id: c.payload.doc.id,
          fullname: c.payload.doc.data().fullname, 
          username: c.payload.doc.data().username, 
          password: c.payload.doc.data().password,  })
          )
        )
      ).subscribe(data => {
        // if there is a manager exist with those values, local and global variables are changed accordingly
        if(data.length != 0){
          this.currentManager.set(data[0].id, new Manager(data[0].fullname, data[0].username, data[0].password));
          this.userType = "management";
          AppModule.userManager = this.currentManager;
          AppModule.userType = this.userType;

          // gets necessary data from the database
          this.getAllApplications();
          this.getAllPayments();
          this.getAllRooms();
          this.myapp.openSnackBar("Welcome "+data[0].fullname, "Continue");
        }
        // if there is not any user, displays error message
        else{
          this.usernameErrorMessage = "User could not be found."
        }
      })
    }
    
  });
  }

  // logoutUser function is for clearing the global variables and heading out to the home page
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

  // changeSignMode function is a switch for changing the log in menu
  changeSignMode(){
    if(this.signMode == "signin"){
      this.signMode = "signup";
    }
    else{
      this.signMode = "signin";
    }
    this.username = "";
    this.password = "";
  }

  // registerUser function is for creating a new student account
  registerUser(){

    // checks for necessary conditions and changes error message variables accordingly
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

    // if there is not a single error message, it creates a student account and changes global&local variables
    if(this.usernameErrorMessage == "" && this.studentNumberErrorMessage == "" && this.passwordErrorMessage == ""){
      let registerStudent = new Student(this.fullname, this.studentNumber, "", this.username, this.password);
      this._studentService.create(registerStudent);
      this._studentService.loginStudent(this.username, this.password).snapshotChanges().pipe(map(changes=> changes.map(c=>
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

  // this function is for getting all the students with their information and storing them globally
  getAllStudents(){
    this._studentService.getAll().snapshotChanges().pipe(
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

  // same as above, gets all the payments and stores them
  getAllPayments(){

    AppModule.paymentsInfo = [];

    this._paymentService.getAll().snapshotChanges().pipe(
      map(changes=> changes.map(c=>
        ({id: c.payload.doc.id, 
          roomID: c.payload.doc.data().roomID,
          date: c.payload.doc.data().date, 
          studentID: c.payload.doc.data().studentID, 
          price: c.payload.doc.data().price, 
          status: c.payload.doc.data().status,
        })
        )
      )
    ).subscribe(data => { 
      let result= [];
      data.forEach(el=> {
        let row = ({
          studentID: el.studentID, 
          studentName: this.getStudentName(el.studentID),
          roomID: el.roomID, 
          roomName: this.getRoomName(el.roomID),
          price: el.price, 
          date: el.date, 
          status: el.status
        });
        result.push(row);
        });
      AppModule.paymentsInfo = result; 
    }); 

  }
   
  // same as above, gets all the applications and stores them
  getAllApplications(){


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
      AppModule.applicationsInfo = [];
      AppModule.studentHasApplication = false;
      let result = [];
      data.forEach(el=> {
        let row = ({
          id: el.id,
          type: el.type, 
          studentID: el.studentID, 
          studentName: this.getStudentName(el.studentID),
          currentRoomID: el.currentRoomID, 
          currentRoomName: this.getRoomName(el.currentRoomID),
          appliedRoomID: el.appliedRoomID, 
          appliedRoomName: this.getRoomName(el.appliedRoomID),
          dateSent: el.dateSent, 
          dateReturned: el.dateReturned, 
          note: el.note, 
          status: el.status});
        
          if(el.studentID == Array.from(AppModule.userStudent.keys())[0] && el.status == "Pending"){
            AppModule.studentHasApplication = true;
          }
        result.push(row);
        console.log(result.length)
        });
        AppModule.applicationsInfo = result; 
    }); 
  }

  // same as above, gets all the rooms and stores them
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
        this.allRooms.set(el.id, new Room(el.name, el.maxCapacity, el.description, el.price, el.status, el.currentCapacity, el.isFull));
        AppModule.allRooms.set(el.id, new Room(el.name, el.maxCapacity, el.description, el.price, el.status, el.currentCapacity, el.isFull))
      }
      );
    });
  }
  // a function for getting a student name from their id
  getStudentName(studentId: string){
    if( this.allStudents.get(studentId) != undefined){
      return this.allStudents.get(studentId).fullname;
    }
    else{
      return "Student Removed";
    }
  }

  // a function for getting a room name from its id
  getRoomName(roomId: string){
    if( this.allRooms.get(roomId) != undefined){
      return this.allRooms.get(roomId).name;
    }
    else{
      return "Room Removed";
    }
  }


}
