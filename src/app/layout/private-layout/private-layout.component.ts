import { Component, OnInit } from '@angular/core';

// Typescript file of the private-layout component
// it acts as a mould for every page of the website
// this component holds the sidebar and the pages together

@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.css']
})
export class PrivateLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
