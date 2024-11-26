export class EmployeeModel{
    empId:number;
    name:string;
    city:string;
    state:string;
    email:string;
    contact:string;
    address:string;
    pincode:string;

    constructor(){
        this.empId=1;
        this.name="";
        this.city="";
        this.state="";
        this.email="";
        this.contact="";
        this.address="";
        this.pincode="";
    }

}