import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { ApiService } from '../../providers/api-service';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ApiService]
})
export class LoginPage {

  login = {
  	username: '',
  	password: '',
  };

  error : string;
  token : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiService: ApiService,private alertCtrl: AlertController) {
    this.token = '';
  }

   logForm()
  {
    console.log("WEWEW");
  }
  
  loginUser(username, password){
    
    this.apiService.login(username,password)
    .subscribe(data => 
      {
        this.token = data.token;
        console.log('tok');

         var loginDetails = { 
        'username': username, 
        'password': password, 
        'token': this.token
        };

         window.localStorage.removeItem("selectedViolations");
         window.localStorage.removeItem("sessionDriver");
         window.localStorage.setItem('loginDetails', JSON.stringify(loginDetails));

         console.log(this.error);
         if(this.token.length > 1){
            this.loginSuccessful();
             this.navCtrl.setRoot(HomePage);
         }
      },
      errormsg => 
      {
        this.error = errormsg;
        if(this.error)
         {
              this.loginFailed();
         }
      }
      );


  }

  loginSuccessful() {
    let alert = this.alertCtrl.create({
      title: "Login is successful!",
      buttons: ['Ok']
    });
    alert.present();
  }

  loginFailed(){
     let alert = this.alertCtrl.create({
      title: "Invalid email account or password!",
      buttons: ['Ok']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
