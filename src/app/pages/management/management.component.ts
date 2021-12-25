import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  requestStudents = [
    { firstName: 'Frank', lastName: 'Murphy', room: 'Room5', newRoom: 'Room1', message: 'İhtiyacım var :(' },
    { firstName: 'Vic', lastName: 'Reynolds', room: 'Room2', newRoom: 'Room3', message: 'Odamın deniz manzarası yok' },
    { firstName: 'Gina', lastName: 'Jabowski',room: 'Room5', newRoom: 'Room1', message: 'Oda arkadaşlarım horluyor! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi quod voluptatum accusantium impedit labore, sit tenetur fuga iste facilis eius. Error culpa eligendi mollitia voluptates autem non, cum quis nisi! Loremipsum dolor sit amet, consectetur adipisicing elit. Quis incidunt ad hic ullam commodi sunt, velit ex ipsa laudantium expedita voluptatibus, eveniet optio excepturi ab perspiciatis iure eius asperiores fugiat.' },
    { firstName: 'Jessi', lastName: 'Glaser', room: 'Room3', newRoom: 'Room6', message: 'Oda nemli.' },
    { firstName: 'Jay', lastName: 'Bilzerian', room: 'Room7', newRoom: 'Room10', message: 'Canım öyle istedi' }
];

  applicationStudents = [
    { firstName: 'Frank', lastName: 'Murphy', newRoom: 'Room1' },
    { firstName: 'Vic', lastName: 'Reynolds', newRoom: 'Room3' },
    { firstName: 'Gina', lastName: 'Jabowski', newRoom: 'Room1' },
    { firstName: 'Jessi', lastName: 'Glaser', newRoom: 'Room6' },
    { firstName: 'Jay', lastName: 'Bilzerian', newRoom: 'Room10' }
  ];

}
