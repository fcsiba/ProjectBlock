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
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
@Component({
  selector: 'app-myproject',
  templateUrl: './myproject.component.html',
  styleUrls: ['./myproject.component.css']
})
export class MyprojectComponent implements OnInit {
products$: Observable<Project[]>;
userId;
board={};
  constructor(public projectService: ProjectService, public router: Router, public afAuth: AngularFireAuth, public afs: AngularFirestore,public userservice: UserService,public route:ActivatedRoute,private toastr:ToastrService) { 
  this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })}

  ngOnInit() {
  
   if(this.products$ == null) {
      
      this.products$ = this.projectService.getAllProducts(ref=>ref);
    }else{
      this.products$ = this.projectService.getAllProducts(ref=>ref);
    }
    
    
    console.log('fetching data from the database...')
    console.log(this.products$)
  
  }
 onDelete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.projectService.afs.doc('Project/' + id).delete();
      this.toastr.warning('Deleted successfully','');
    }
    }
   
  
}
