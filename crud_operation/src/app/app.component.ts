import { Component } from '@angular/core';
import { FormControl, FormGroup, MinLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  employeeForm: FormGroup =new FormGroup({});
  employeeObj: EmployeeModel=new EmployeeModel();
  employeeList: EmployeeModel[]=[];

  constructor(){
    this.createForm();
    debugger;
    const oldData=localStorage.getItem("empData");
    if(oldData != null){
      const parseData=JSON.parse(oldData);
      this.employeeList=parseData;
    }
  }

  createForm(){
    this.employeeForm=new FormGroup({
        empId:new FormControl(this.employeeObj.empId),
        name:new FormControl(this.employeeObj.name,[Validators.required]),
        city:new FormControl(this.employeeObj.city),
        state:new FormControl(this.employeeObj.state),
        email:new FormControl(this.employeeObj.email),
        contact:new FormControl(this.employeeObj.contact),
        address:new FormControl(this.employeeObj.address),
        pincode:new FormControl(this.employeeObj.pincode,[Validators.required,Validators.minLength(3)]),
    });
  }

  onSave(){
    debugger;
    const oldData=localStorage.getItem("empData");
    if(oldData != null){
        const parseData=JSON.parse(oldData);
        this.employeeForm.controls['empId'].setValue(parseData.length+1);
        this.employeeList.unshift(this.employeeForm.value);
    }
    else{
      this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem("empData",JSON.stringify(this.employeeList));
    this.onReset();
  }

  onEdit(item:EmployeeModel){
      this.employeeObj=item;
      this.createForm();
  }

  onUpdate(){
    debugger;
    const record=this.employeeList.find(m=>m.empId==this.employeeForm.controls['empId'].value);
    if(record != undefined){
      record.empId=this.employeeForm.controls['empId'].value;
      record.name=this.employeeForm.controls['name'].value;
      record.city=this.employeeForm.controls['city'].value;
      record.state=this.employeeForm.controls['state'].value;
      record.email=this.employeeForm.controls['email'].value;
      record.contact=this.employeeForm.controls['contact'].value;
      record.address=this.employeeForm.controls['address'].value;
      record.pincode=this.employeeForm.controls['pincode'].value;
    }
    localStorage.setItem('empData',JSON.stringify(this.employeeList));
    this.onReset();
  }


  onDelete(id:number){
     const isDelete=confirm("are you want to delete");
     if(isDelete){
      const index=this.employeeList.findIndex(m=>m.empId==id);
      this.employeeList.splice(index,1);
      localStorage.setItem('empData',JSON.stringify(this.employeeList));
     }
  }


  onReset(){
    this.employeeObj=new EmployeeModel();
    this.createForm();
  }

}
