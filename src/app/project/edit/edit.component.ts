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
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
products = [];
  editing: boolean = false;
  pro:boolean=true;
  userId;
  editingProduct: Project;
  t;
  constructor(public projectservice:ProjectService,public route:ActivatedRoute,public afAuth: AngularFireAuth, public afs: AngularFirestore,private toastr:ToastrService,public router:Router) {
  this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })
   }

  ngOnInit() {
   this.projectservice.getAllProducts().subscribe(products => {
      this.products = products;
    });  
  }
 

  editProduct( product) {
    this.editing = !this.editing;
    this.editingProduct = product;
    this.pro =!this.pro;
  }

  updateProduct() {
    this.projectservice.updateProduct(this.editingProduct);
    this.editingProduct = {} as Project;
    this.editing = false;
    this.toastr.success('Deleted successfully','');
     this.router.navigateByUrl('/');
  }
  onDelete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.projectservice.afs.doc('Project/' + id).delete();
      this.toastr.warning('Deleted successfully','');
    }
    }
}
