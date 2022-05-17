import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { ApiService } from '../services/api.service';
import { User } from './User.model';

@Component({
  selector: 'app-users-main',
  templateUrl: './users-main.component.html',
  styleUrls: ['./users-main.component.css']
})
export class UsersMainComponent implements OnInit {

  formValue !: FormGroup;
  userData !: any;
  userModel : User = new User();
  constructor(private formbuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name : [''],
      surname : [''],
      email: ['']
    })
    this.getUsers();
  }
  postUser(){
    this.userModel.name = this.formValue.value.name;
    this.userModel.surname = this.formValue.value.surname;
    this.userModel.email = this.formValue.value.email;

    this.api.postUser(this.userModel).subscribe(res=>{
      console.log(res);
      this.formValue.reset()
      this.getUsers();
    })
  }

  getUsers(){
    this.api.getUser().subscribe(res=>{
      this.userData = res;
    })
  }

  deleteUser(row: any){
    this.api.deleteUser(row.id).subscribe(res =>{
      console.log(res)
      this.getUsers();
    })
  }

}
