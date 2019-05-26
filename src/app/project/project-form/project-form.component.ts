import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from 'src/app/shared/models/project';
import * as firebase from 'firebase';
import { FormArray, FormControl, FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/shared/services/project.service';
import { UserService } from 'src/app/shared/services/user.service';
import { map } from 'rxjs/operators';
import {ActivatedRoute, Router, ParamMap } from "@angular/router";
@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
projectForm: FormGroup;
  downloadUrl;
   downloadUrl1;
user;
  imgUploaded: boolean = false;
  imgUploaded1: boolean = false;
  showMsg: boolean = false;
board={};
  progress: {percentage:number}={percentage: 0}
  successMessage: string = '';
  selectedFile = null;
  selectedFile1 = null;
  products$: Observable<Project[]>;
  constructor(private http: HttpClient,private firestore: AngularFirestore,public projectservice:ProjectService,public userservice:UserService,public route:ActivatedRoute) { 
this.projectForm = new FormGroup({
      'title':new FormControl('',Validators.required),
      'description':new FormControl('',Validators.required),
      'terms':new FormControl(),
      'price':new FormControl(),
      'supervisor':new FormControl(),
       'organ':new FormControl(),
       'topic':new FormControl()
      
    })
   
    console.log('fetching data from the database...')
    console.log(this.products$)
    console.log(this.route.snapshot.params['id']);
  }

  ngOnInit() {
  

  this.userservice.afAuth.authState.subscribe(user => {

this.user=user;

 });
  if(this.products$ == null) {
      
      this.products$ = this.projectservice.getAllProducts(ref=>ref);
      console.log("done");
    }else{
      this.products$ = this.projectservice.getAllProducts(ref=>ref);
      console.log("done");
    }
    console.log(this.products$);
    
  }
resetForm(form?: NgForm) {
    if (form != null)
      
    this.userservice.userData = {
      id: null,
      email: '',
      pass: '',
      contact: '',
      organ: '',
    }
  }
  onFileSelected(event){
    this.selectedFile = event.target.files[0];
  }
  onFileSelected1(event){
    this.selectedFile1 = event.target.files[0];
  }


  upload(event){
    // create a reference to the firebase storage   
  const file: File = event.target.files[0];
  
  const metadata = {'contentType': file.type};
  const path = `Project/${new Date().getTime()}_${file.name}`;
  const bucketStore = firebase.storage().ref(path);
  

  const uploadTask=bucketStore.put(file,metadata);

  console.log("uploading", file.name);
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,(uploadSnapshot: firebase.storage.UploadTaskSnapshot)=>{
    this.progress.percentage = Math.round((uploadSnapshot.bytesTransferred/uploadSnapshot.totalBytes)*100)
    console.log(this.progress.percentage)
  })

  uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot)=>{
    const percentage = uploadSnapshot.bytesTransferred / uploadSnapshot.totalBytes * 100
    bucketStore.getDownloadURL().then((url)=>{
      this.downloadUrl = url
    })
  
  })
  this.checkUrl()
}

upload1(event){
    // create a reference to the firebase storage   
  const file: File = event.target.files[0];
  
  const metadata = {'contentType': file.type};
  const path = `Project/${new Date().getTime()}_${file.name}`;
  const bucketStore = firebase.storage().ref(path);
  

  const uploadTask=bucketStore.put(file,metadata);

  console.log("uploading", file.name);
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,(uploadSnapshot: firebase.storage.UploadTaskSnapshot)=>{
    this.progress.percentage = Math.round((uploadSnapshot.bytesTransferred/uploadSnapshot.totalBytes)*100)
    console.log(this.progress.percentage)
  })

  uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot)=>{
    const percentage = uploadSnapshot.bytesTransferred / uploadSnapshot.totalBytes * 100
    bucketStore.getDownloadURL().then((url)=>{
      this.downloadUrl1 = url
    })
  
  })
  this.checkUrl1()
}

checkUrl1(){
  if(this.downloadUrl1 != ''){
    this.imgUploaded1 = true
  }else{
    this.imgUploaded1 = false;
  }
}
checkUrl(){
  if(this.downloadUrl != ''){
    this.imgUploaded = true
  }else{
    this.imgUploaded = false;
  }
}
addProject(){
 
    const title= this.projectForm.get('title').value;
    const description= this.projectForm.get('description').value;
    const terms = this.projectForm.get('terms').value;
    const supervisor = this.projectForm.get('supervisor').value;
    const organ = this.projectForm.get('organ').value;
const price = this.projectForm.get('price').value; 
const topic = this.projectForm.get('topic').value;    
    const user=this.user.uid;
    const image = this.downloadUrl? this.downloadUrl: '/assets/images/img.jpg';
     const file = this.downloadUrl1? this.downloadUrl: '/assets/images/img.jpg';
    this.projectservice.uploadProject(title,description,price,terms,organ,supervisor,user,topic,image,file)
    this.showMsg= true;
    this.projectForm.reset();
}

  
}
