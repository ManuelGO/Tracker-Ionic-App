import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsuarioProvider } from '../providers/usuario/usuario';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private usuarioService: UsuarioProvider) {
    platform.ready().then(() => {
      this.usuarioService.cargar_storage()
          .then(()=>{
            if(this.usuarioService.clave){
              this.rootPage = HomePage;
            }else{
              this.rootPage = 'LoginPage';
            }
            statusBar.styleDefault();
            splashScreen.hide();
          })

    });
  }
}
