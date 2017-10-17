import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams,
          Slides, LoadingController, AlertController} from 'ionic-angular';
import { UsuarioProvider} from '../../providers/usuario/usuario';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements AfterViewInit{
  @ViewChild(Slides) slides: Slides;
  clave:string = "manuel";

  constructor(public navCtrl: NavController,
              private usuarioService: UsuarioProvider,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) { }

  continuar(){
      let loading = this.loadingCtrl.create({
        content: 'Espere por favor...'
      });
      loading.present();

    //verificar si la clave es valida
    this.usuarioService.verifica_usuario(this.clave)
        .then(valido=>{
          loading.dismiss().catch(()=>{});
          if(valido){
            //continuar
            this.slides.lockSwipes(false);
            this.slides.slideNext();
            this.slides.lockSwipes(true);
          }else{
            loading.dismiss().catch(()=>{});
            this.alertCtrl.create({
              title: 'Clave incorrecta',
              subTitle: 'Verifique su clave o contacte al admin',
              buttons: ["Ok!"]
            }).present();
          }
        })
        .catch(err=>{
          loading.dismiss().catch(()=>{});
          console.log('ERROR en verifica_usuario: ' + JSON.stringify(err));
        })
  }
  ingresar(){
    //tenemos la clave, ir al home
    this.navCtrl.setRoot(HomePage);
  }

  ngAfterViewInit(){
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
    this.slides.paginationType = "progress";
  }
}
