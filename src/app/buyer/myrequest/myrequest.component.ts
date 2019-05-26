import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Request } from 'src/app/shared/models/request';
import { Project } from 'src/app/shared/models/project';
import * as firebase from 'firebase';
import { FormArray, FormControl, FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/shared/services/request.service';
import { UserService } from 'src/app/shared/services/user.service';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute, Router, ParamMap } from "@angular/router";
@Component({
  selector: 'app-myrequest',
  templateUrl: './myrequest.component.html',
  styleUrls: ['./myrequest.component.css']
})
export class MyrequestComponent implements OnInit {
userId;
products$: Observable<Request[]>;
  constructor(public requestService: RequestService, public router: Router, public afAuth: AngularFireAuth, public afs: AngularFirestore,public userservice: UserService,public route:ActivatedRoute,private toastr:ToastrService) { 
  this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })}

  ngOnInit() {
  if(this.products$ == null) {
      
      this.products$ = this.requestService.getAllProducts(ref=>ref);
    }else{
      this.products$ = this.requestService.getAllProducts(ref=>ref);
    }
    
    
    console.log('fetching data from the database...')
    console.log(this.products$)
  }
onDelete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.requestService.afs.doc('Request/' + id).delete();
      this.toastr.warning('Deleted successfully','');
    }
    }
}
