import { Component, OnInit } from '@angular/core';
import { APIService } from '../../app_services/api.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { APIData , LoginData } from '../../app_services/models/api.data.structure'
import { StoreComponent } from '../store/store.component';
import { StoreModule } from '../store/store.module';

@Component({
  selector: 'app-login',
  styleUrls: ['./template/login.component.scss'],
  templateUrl: './template/login.component.html',
})

export class LoginComponent implements OnInit {
  private username;
  private password;
  private loginMessage;
  //private type;

  constructor(private _apiService: APIService ,private route: ActivatedRoute, private router: Router){}

  ngOnInit() {

  }

  showDashboard(){
    this.router.navigate(['dashboard'], { relativeTo: this.route });
  }

  // View(){
  //   //this.router.navigate(['dashboard'], { relativeTo: this.route });
  //   StoreComponent.prototype.settings.actions= {
  //     add: true,
  //     edit: true,
  //     delete: false,
  //     };
  // }

  loginClick(){
    if(this.username != null && this.password != null){
      this._apiService.login({ username: this.username, password: this.password  }).subscribe((apiresponse: APIData)=>{
        this.loginMessage = apiresponse.msg;
        //apiresponse.msg.includes('Manager')
        if( apiresponse.msg.includes('Successful') ){ 
          //this.View();
          this.showDashboard();
          
        } else {
          this.loginMessage = apiresponse.msg;
        }
        console.log(apiresponse.msg);
        //console.log(this.type+"");
        console.log(this.username+"");
      })
    } else 
    this.loginMessage = 'Username or Password Can not Be Empty ';
  }
}
