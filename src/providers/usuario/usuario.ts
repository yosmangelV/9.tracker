import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class UsuarioProvider {

  clave:string;
  user:any={};
  private doc:Subscription;

  constructor( private afDB: AngularFirestore,
  				private platform: Platform,
  				private storage: Storage ){
    
  }

  verificaUsuario(clave:string){

  	clave=clave.toLocaleLowerCase();

  	return new Promise((resolve,reject)=>{
  		
  		this.doc=this.afDB.doc(`/usuarios/${clave}`)
  			.valueChanges().subscribe(data=>{
  				console.log(data);
  				if(data){
  					this.clave=clave;
  					this.user=data;
  					this.guardarStorage();
  					resolve(true);
  				}else{
  					resolve(false);
  				}
  				
  			});
  	});
  }

  guardarStorage(){
  	if(this.platform.is('cordova')){
  		this.storage.set("clave",this.clave);
  	}else{
  		localStorage.setItem('clave',this.clave);
  	}
  }

  cargarStorage(){
  	return new Promise((resolve,reject)=>{
  		if(this.platform.is('cordova')){
  			this.storage.get('clave').then(val=>{
  				if(val){
  					this.clave=val;
  					resolve(true)
  				}else{
  					resolve(false);
  				}
  			});
	  	}else{
	  		if(localStorage.getItem('clave')){
	  			this.clave=localStorage.getItem('clave');
	  			resolve(true);
	  		}else{
	  			resolve(false);
	  		}
	  	}
  	});
  }

  borrarUsuario(){
    this.clave=null;
    if (this.platform.is('cordova')){
      this.storage.remove('clave');
    }else{
      localStorage.removeItem('clave'); 
    }

    this.doc.unsubscribe();
  }
}
