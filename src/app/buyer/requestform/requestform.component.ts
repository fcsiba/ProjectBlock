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
import {ActivatedRoute, Router, ParamMap } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-requestform',
  templateUrl: './requestform.component.html',
  styleUrls: ['./requestform.component.css']
})
export class RequestformComponent implements OnInit {
requestForm: FormGroup;
user;
status:boolean=false;
productkey:string;
orderProduct: any;
product;
showMsg: boolean = false;
  constructor(private http: HttpClient,private afs: AngularFirestore,public requestservice:RequestService,public userservice:UserService,public route:ActivatedRoute,public router:Router,private toastr:ToastrService) {
this.requestForm = new FormGroup({
      
      'supervisor':new FormControl(),
       'organ':new FormControl(),
       'contact':new FormControl()
      
    })
   this.productkey = this.route.snapshot.paramMap.get('id');
    console.log(this.productkey);
    this.afs.collection('Project',ref=>ref.where('id','==',this.productkey).limit(1)).valueChanges()
    .pipe(map(result=>result))
    .subscribe(
      data => {
        
        this. orderProduct = JSON.parse(JSON.stringify(data));
        this.product = this.orderProduct;
        console.log(this.product[0].id);
        });
        
   
   }

  ngOnInit() {
  this.userservice.afAuth.authState.subscribe(user => {

this.user=user;

 });
  }
  resetForm(form?: NgForm) {
    if (form != null)
      
    this.userservice.userData = {
      id: null,
      
      supervisor: '',
      contact: '',
      organ: ''
    
    }
  }
addProject(){
   
    const title= this.product[0].title;
    const supervisor = this.requestForm.get('supervisor').value;
    const organ = this.requestForm.get('organ').value;
    const contact= this.requestForm.get('contact').value;
    const projectid = this.product[0].id;
    const requestid=this.product[0].userid;

    const file=this.product[0].file ? this.product[0].file: '/assets/images/login.png';
    const user=this.user.uid;
   const status=this.status;
    this.requestservice.uploadProject(title,contact,projectid,requestid,organ,supervisor,user,status,file)
    this.showMsg= true;
    this.requestForm.reset();
  
}
}
