import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { UsuarioProvider } from '../usuario/usuario'


@Injectable()
export class UbicacionProvider {
  usuario: FirebaseObjectObservable<any[]>;
  private watch:any;

  constructor(private geolocation: Geolocation,
              private afDB: AngularFireDatabase,
              private usuarioProvider: UsuarioProvider) {
        if(!this.usuarioProvider.clave){
          return;
        }
        this.usuario = this.afDB.object("/usuarios/" + this.usuarioProvider.clave);
    }
  iniciar_localizacion(){
    this.watch = this.geolocation.watchPosition()
                      .subscribe((data) => {
       // data can be a set of coordinates, or an error (if an error occurred).
       // data.coords.latitude
       // data.coords.longitude
      //  console.log(data);
      if(!this.usuarioProvider.clave){
        return;
      }
       this.usuario.update({lat: data.coords.latitude, lng: data.coords.longitude});
      });
  }
  stop_watch(){
    this.watch.unsubscribe();
  }

}
