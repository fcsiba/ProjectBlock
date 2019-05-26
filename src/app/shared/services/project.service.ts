import { Injectable ,NgZone} from '@angular/core';
import { Project } from "../models/project";
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
export class ProjectService {
projectData: any;
p:Project;
successMessage: string = '';
readonly path = 'Project'
  constructor(public afs: AngularFirestore,  
    public afAuth: AngularFireAuth,public ngZone: NgZone,public router :Router) { }

    uploadProject(title:string,description:string,price:number,terms:string,organization:string,supervisor:string,userid:string,topic:string,image:string,file:string){
    const projectId: string = this.afs.createId();
    
    return this.afs.doc<Project>(`Project/${projectId}`)
    .set({
    id: projectId,
    title,
    
    description,
    
    price,
    terms,
    organization,
    supervisor,
    userid,topic,image,file
    })
  }
 getAllProducts(ref?: QueryFn): Observable<Project[]>{
    return this.afs.collection<Project>(this.path, ref)
    .snapshotChanges().pipe(map(actions => {
      return actions.map(a =>{
        const data = a.payload.doc.data() as Project;
        this.projectData = data;
        const id=a.payload.doc.id;
        return {id, ...data};
      })
    }))
  }
  updateProduct(project: Project) {
   return this.afs.doc(`Project/${project.id}`).update(project);
  }
  getProduct1(id: String){
  return  this.afs.collection(this.path, ref=> ref.where('value', '==',true).limit(1))
    .valueChanges().pipe(map(result => result));
  }
  getProduct(id: string): Observable<Project[]> {
    const productsDocuments = this.afs.collection<Project[]>('project\detail');
    return productsDocuments.snapshotChanges()
      .pipe(
        map(changes => changes.map(({ payload: { doc } }) => {
          const data = doc.data();
          const id = doc.id
          return { id, ...data };
        })),
        map((project) => project.find(doc => doc.id === id)))
  }

}
