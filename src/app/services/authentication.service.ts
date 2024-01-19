import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Storage} from '@ionic/storage';
import {Platform, ToastController, LoadingController} from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import {ApiService} from './api.service';
import OneSignal from 'onesignal-cordova-plugin';
const TOKEN_KEY = 'auth-token';
let DID = '';
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    public Tokenkey: string = TOKEN_KEY;
    authenticationState = new BehaviorSubject(false);
    userInfo = new BehaviorSubject({});
    user: Object | null = null;
    loader: any;
    constructor(
        private api: ApiService,
        private storage: Storage,
        private toast: ToastController,
        private platform: Platform,
        private loading: LoadingController
    ) {
        this.platform.ready().then(() => 
        {
            
            this.checkToken();
            OneSignal.getDeviceState(function(state: { userId: string; })
            {
                DID = state.userId;
                console.log(DID)
            });
        });
    }

    async createDatabase() {
        await this.storage.create();
    }

    async setToken(token: string) {
        await this.storage.set(TOKEN_KEY, token);
    }

    getUserInfo() {
        return this.userInfo.value;
    }
    

    checkToken() {
        this.createDatabase();
        this.storage.get(TOKEN_KEY).then((res) => {
            if (res) {
                this.authenticationState.next(true);
            }
        });
        
    }

    async login(formgrp: any) 
    {
        await this.storage.create();
        await this.presentLoading();
        this.api.login(formgrp.user, formgrp.pass, DID)
        .pipe(
            finalize(async () => 
            {
                await this.loader.dismiss();
            })
        )
        .subscribe(r => 
        {
            //console.log(r);
            if (r._estatus === 20) {
                this.storage.set(TOKEN_KEY, r.data).then(() => {
                    this.authenticationState.next(true);
                    this.userInfo.next(r.data);
                    this.user = r.data;
                });
            } else {
                const toast = this.toast.create({
                    message: 'El Usuario o la Contraseña son incorrectas',
                    duration: 3000,
                    position: 'bottom',
                });
                toast.then((t) => t.present());
            }
        }, 
        (e) => 
        {
            //console.log(e);
        });
    }

    async loginPatios(formgrp: any) 
    {
        await this.storage.create();
        await this.presentLoading();
        this.api.loginPatios(formgrp.user, formgrp.pass)
        .pipe(
            finalize(async () => 
            {
                await this.loader.dismiss();
            })
        )
        .subscribe(r => 
        {
            //console.log(r);
            if (r._estatus === 20) {
                this.storage.set(TOKEN_KEY, r.data).then(() => {
                    this.authenticationState.next(true);
                    this.userInfo.next(r.data);
                    this.user = r.data;
                });
            } else {
                const toast = this.toast.create({
                    message: 'El Usuario o la Contraseña son incorrectas',
                    duration: 3000,
                    position: 'bottom',
                });
                toast.then((t) => t.present());
            }
        }, 
        (e) => 
        {
            //console.log(e);
        });
    }

    logout() {
        return this.storage.remove(TOKEN_KEY).then(() => {
            this.authenticationState.next(false);
            this.userInfo.next({});
        });
    }

    isAuthenticated() {
        return this.authenticationState.value;
    }

    async presentLoading() {
        this.loader = await this.loading.create({
            message: 'Iniciando sesión...',
        });
        await this.loader.present();
    }

}
