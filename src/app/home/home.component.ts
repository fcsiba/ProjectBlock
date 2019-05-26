import { Component, OnInit } from '@angular/core';
import {App} from 'src/assets/js/app.js';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  
  App.initWeb3();
  App.initContract();
  App.reloadProjects();
  App.sellProject();
  App.buyProject();

}
}
