import {Component, OnInit} from '@angular/core';
import { Platform } from '@ionic/angular';
import {timer} from 'rxjs';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage';
import { Plugins } from '@capacitor/core';
const {SplashScreen} = Plugins;
const TOKEN_KEY = 'auth-token';

import {AuthenticationService} from './services/authentication.service';
import { ApiService } from './services/api.service';
import { EnvService } from './services/env.service';
import OneSignal from 'onesignal-cordova-plugin';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';



interface User {
  Nombre: string;
  // Otras propiedades del usuario
}


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    isSmallScreen = false;
    menu: any;
    user: any;
    version: string;
    constructor(
        private breakpointObserver: BreakpointObserver,
        private platform: Platform,
        private env: EnvService,
        private storage: Storage,
        protected auth: AuthenticationService,
        private router: Router,
    ) 
    {
        this.version = this.env.Version;
        this.initializeApp();
    }
    
    ngOnInit(): void 
    {
        this.breakpointObserver.observe([Breakpoints.Small]).subscribe(result => {
            this.isSmallScreen = result.matches;
          });
        this.OneSignalInit();
        //this.user = this.auth.getUserData();
        this.storage.get(TOKEN_KEY).then((r: User) => 
        {
            this.user = r;
            // console.log({user: this.user});
        })
        // -- get info user
        // this.auth.userInfo.subscribe(user => {
        //   this.user = user;
        //   console.log({user: this.user});
        // });
        /* this.storage.get(this.auth.Tokenkey).then(data => {
        this.user = data;
        }); */
    }
    initializeApp() 
    {
        this.platform.ready().then(() => 
        {
            timer(1000).subscribe(() => {
                //SplashScreen.hide().then(r => console.log(r));
            });

            // -- revisar si está autentificado el usuario
            this.auth.authenticationState.subscribe(state => 
            {
                if (state) {
                this.router.navigate(['']);
                } else {
                this.router.navigate(['login']);
                }
            });
        });

        // -- definición del menu
        this.menu = 
        [
            {
                title: 'Driver Moves',
                url: 'driver-moves-index',
                icon: 'fas fa-truck'
            },{
                title: 'Nomina',
                url: 'nomina',
                icon: 'far fa-clipboard'
            },{
                title: 'Manual',
                url: 'manual',
                icon: 'fas fa-book-open'
            },{
                title: 'Vencimientos',
                url: 'vencimientos',
                icon: 'far fa-calendar'
            }
        ];
    }
    logout() 
    {
        this.auth.logout();
    }
    OneSignalInit()
    {
        // Uncomment to set OneSignal device logging to VERBOSE  
        //OneSignal.setLogLevel(6, 0);
        
        // NOTE: Update the setAppId value below with your OneSignal AppId.
        OneSignal.setAppId("564462a6-1fee-4ef8-9c28-c188870e1e60");
        OneSignal.setNotificationOpenedHandler(function(jsonData) {
            console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        });
        // Prompts the user for notification permissions.
        //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
        OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
            console.log("User accepted notifications: " + accepted);
        });
    }
    
}
defineCustomElements(window);
