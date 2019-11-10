import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { LoginPage } from '../login/login';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  user:any={};

  constructor(public navCtrl: NavController,
  				private geolocalizacion:UbicacionProvider,
  				private usuario:UsuarioProvider) {
  	this.geolocalizacion.iniciarGeoLocalizacion();
  	this.geolocalizacion.inicializarTaxista();
  	
  	this.geolocalizacion.taxista.valueChanges()
  		.subscribe(data=>{
  			this.user=data;
  		
  		});
  }

  salir(){
  	
  	this.geolocalizacion.detenerUbicacion();
  	this.usuario.borrarUsuario();
  	this.navCtrl.setRoot(LoginPage);
  }
}
