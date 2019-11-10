import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { UbicacionProvider } from '../providers/ubicacion/ubicacion';

//firebase

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, FirestoreSettingsToken } from 'angularfire2/firestore';
import { firebaseConfig } from '../config/firebase.config';


//plugins 

import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFirestoreModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    { provide: FirestoreSettingsToken, useValue: {} },
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    UbicacionProvider
  ]
})
export class AppModule {}
