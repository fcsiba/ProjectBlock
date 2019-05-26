import { Component } from '@angular/core';
import { UserService } from "src/app/shared/services/user.service";
import { NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'block';
  navbarOpen=false;
constructor(public userservice:UserService){
	
}
toggleNavbar(){
	this.navbarOpen=! this.navbarOpen;
}

  logo="/assets/images/finallogi.png";
  

}

