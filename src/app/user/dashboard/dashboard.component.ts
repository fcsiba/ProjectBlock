import { Component, OnInit } from '@angular/core';
import { UserService } from "../../shared/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
user;
  constructor(public userservice:UserService) { }

  ngOnInit() {

  this.userservice.afAuth.authState.subscribe(user => {

this.user=user;

 });
  }

}
