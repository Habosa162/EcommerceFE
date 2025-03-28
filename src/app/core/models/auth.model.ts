import { ReactiveFormsModule } from '@angular/forms';
export interface ILoginUser{
  Email:string ,
  Password:string
}


export interface IRegisterUser{
  FName : string,
  LName : string,
  Email : string,
  Password : string,
  Role:string,
  ProfileImage:string
}
