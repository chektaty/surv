import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NavController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage:NativeStorage,
    private navCtr:NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(
      async () => {
      const loggedIn=await this.storage.getItem("LoggedIn");
      this.statusBar.styleDefault();
      if(loggedIn){
            this.navCtr.navigateRoot('/intro')
      }
      this.splashScreen.hide();
    });
}
goTo(route: string):void{
  
  this.navCtr.navigateForward(`/${route}`);
}
}
