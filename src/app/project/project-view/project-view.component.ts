import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from 'src/app/shared/models/project';
import * as firebase from 'firebase';
import { FormArray, FormControl, FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import {ActivatedRoute, Router, ParamMap } from "@angular/router";
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/shared/services/project.service';
import { UserService } from 'src/app/shared/services/user.service';
import {NgxPaginationModule} from 'ngx-pagination';
@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {
products$: Observable<Project[]>;
  userdetails;
  userdb;
  userid;
  p: number = 1;
 collection = [];
     config: any; 
  hasShop: boolean = false;
  constructor(public projectService: ProjectService, public router: Router, public afAuth: AngularFireAuth, public afs: AngularFirestore,public userservice: UserService,public route:ActivatedRoute) {
 this.config = {
    			currentPage: 1,
    			itemsPerPage: 5
    };

   
 this.route.queryParamMap
            .pipe(map(params => params.get('page')))
            .subscribe(page => this.config.currentPage = page);
    for (let i = 1; i <= 100; i++) {
      this.collection.push('products ${i}');
    }

   }

  ngOnInit() {
  if(this.products$ == null) {
      
      this.products$ = this.projectService.getAllProducts(ref=>ref);
    }else{
      this.products$ = this.projectService.getAllProducts(ref=>ref);
    }
    
    
    console.log('fetching data from the database...')
    console.log(this.products$)
  }
   pageChange(newPage: number) {
		this.router.navigate(['/view'], { queryParams: { page: newPage } });
	}
}
