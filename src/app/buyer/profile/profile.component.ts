import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/shared/services/user.service";
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import {ActivatedRoute, Router, ParamMap } from "@angular/router";
import { User } from "src/app/shared/models/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user;
userData;
key:string;
  constructor(public afs: AngularFirestore,public userservice:UserService,public router:ActivatedRoute, public afAuth: AngularFireAuth) {
this.key = this.router.snapshot.paramMap.get('uid');
    console.log(this.key)
    this.afs.collection('users',ref=>ref.where('uid','==',this.key).limit(1)).valueChanges()
    .pipe(map(result=>result))
    .subscribe(
      data => {
        
        this. user = JSON.parse(JSON.stringify(data));
        this.userData = this.user;
        console.log(this.userData);
        });
  
   }

  ngOnInit() {
  
}
}
