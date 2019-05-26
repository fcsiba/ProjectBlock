import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public userservice:UserService) { }

  ngOnInit() {
  }

}
