import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Platform, NavController ,LoadingController} from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ServieApiServiceService } from '../serviceapi/servie-api-service.service';
import { AlertServiceService } from 'src/app/serviceapi/alert-service.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private nativeStorage: NativeStorage,public formBuilder: FormBuilder,public apiService: ServieApiServiceService,
    private alertService: AlertServiceService,private navCtrl: NavController)  {}

    ngOnInit() {
    }

  get password() {
    return this.registrationForm.get("password");
  }
  get email() {
    return this.registrationForm.get('email');
  }
   
  public errorMessages = {
    password: [
      { type: 'required', message: 'password is required' },
      { type: 'maxlength', message: 'password cant be longer than 100 characters' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    
  };
  registrationForm = this.formBuilder.group({
    password: ['', [Validators.required, Validators.maxLength(100)]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
      ]
    ],
  
  });


  public submit() {
  
     let  email=this.registrationForm.value.email
     let password=this.registrationForm.value.password 

     this.apiService.login(email,password).subscribe(
      data => {
      },
      error => {
        let text:string =error;
        
        this.alertService.presentToast(text);

        console.log(error);
      },
      () => { 
        // aller vers la passage suivante  sans retour 
        this.navCtrl.navigateRoot("/intro") 
     
      }
    );

  }


}


