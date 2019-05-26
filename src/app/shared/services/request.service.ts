import { Injectable ,NgZone} from '@angular/core';
import { Request } from "../models/request";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument,QueryFn } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RequestService {
projectData: any;
status:boolean = false;
readonly path = 'Request';
  constructor(public afs: AngularFirestore,  
    public afAuth: AngularFireAuth,public ngZone: NgZone,public router :Router) { }
    
    uploadProject(title:string,contact:number,projectid:string,requestid:string,organization:string,supervisor:string,userid:string,status:boolean,file:string){
    const requestId: string = this.afs.createId();
    
    return this.afs.doc<Request>(`Request/${requestId}`)
    .set({
    id: requestId,
    title,
    
    contact,
    
    projectid,
    requestid,
    organization,
    supervisor,
    userid,status,file
    })
  }
  getAllProducts(ref?: QueryFn): Observable<Request[]>{
    return this.afs.collection<Request>(this.path, ref)
    .snapshotChanges().pipe(map(actions => {
      return actions.map(a =>{
        const data = a.payload.doc.data() as Request;
        this.projectData = data;
        const id=a.payload.doc.id;
        return {id, ...data};
      })
    }))
  }
  updatestatus(key){
  this.status=!this.status;
    this.afs.doc<Request>(`Request/${key}`).update({
      status : this.status
    })
}
}
