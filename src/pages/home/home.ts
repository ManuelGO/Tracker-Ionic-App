import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion'
import { UsuarioProvider } from '../../providers/usuario/usuario'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  usuario:any = {};
  constructor(public navCtrl: NavController,
              private ubicacionProvider: UbicacionProvider,
              private usuarioProvider: UsuarioProvider) {

            this.ubicacionProvider.iniciar_localizacion();
            this.ubicacionProvider.usuario
                .subscribe((data)=>{
                  console.log(data);
                  this.usuario = data;
                })

  }
  salir(){
    this.usuarioProvider.borrar_usuario();
    this.ubicacionProvider.stop_watch();
    this.navCtrl.setRoot("LoginPage");
  }

}
