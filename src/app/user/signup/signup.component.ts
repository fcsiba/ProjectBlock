import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/models/user';
import * as firebase from 'firebase';
import { FormArray, FormControl, FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
productForm: FormGroup;
  downloadUrl;
 
  imgUploaded: boolean = false;
showMsg: boolean = false;
  progress: {percentage:number}={percentage: 0}
  successMessage: string = '';
  selectedFile = null;
  constructor(private http: HttpClient,private firestore: AngularFirestore,public userservice:UserService) {
this.productForm = new FormGroup({
      'email':new FormControl('',Validators.required),
      'pass':new FormControl('',Validators.required),
      'contact':new FormControl(),
      'organ':new FormControl(),
       'name':new FormControl()
      
    })
   }

  ngOnInit() {
  }
  resetForm(form?: NgForm) {
    if (form != null)
      
    this.userservice.userData = {
      id: null,
      email: '',
      pass: '',
      contact: '',
      organ: '',
      name:'',
    }
  }
addProduct(){
  
    const email = this.productForm.get('email').value;
    const pass = this.productForm.get('pass').value;
    const contact = this.productForm.get('contact').value;
    const organ = this.productForm.get('organ').value;
    
    const name = this.productForm.get('name').value;
    const image = this.downloadUrl? this.downloadUrl: '/assets/images/login.png';;
    this.userservice.SignUp(email,pass,contact,organ,name,image)
    this.productForm.reset();
    this.showMsg= true;
}
onFileSelected(event){
    this.selectedFile = event.target.files[0];
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

checkUrl(){
  if(this.downloadUrl != ''){
    this.imgUploaded = true
  }else{
    this.imgUploaded = false;
  }
}
}