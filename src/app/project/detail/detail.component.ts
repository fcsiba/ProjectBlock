import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import {ActivatedRoute, Router, ParamMap } from "@angular/router";
import { Observable } from 'rxjs';
import { Project } from "src/app/shared/models/project";
import { ProjectService } from 'src/app/shared/services/project.service';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
product;
project;
products$: Observable<Project[]>;
 orderProduct: any;
productkey:string;
  constructor(public afs: AngularFirestore, public route: ActivatedRoute,public projectservice:ProjectService) {
 this.productkey = this.route.snapshot.paramMap.get('id');
    console.log(this.productkey)
   
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
 if(this.products$ == null) {
      
      this.products$ = this.projectservice.getAllProducts(ref=>ref);
    }else{
      this.products$ = this.projectservice.getAllProducts(ref=>ref);
    }
    
    
    console.log('fetching data from the database...')
    console.log(this.products$)
}
}