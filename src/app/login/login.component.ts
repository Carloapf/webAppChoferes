import { Component, OnInit } from '@angular/core';
import {EnvService} from '../services/env.service';
import {FormBuilder, FormGroup} from '@angular/forms';
//import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';

import {AuthenticationService} from '../services/authentication.service';
import { ApiService } from '../services/api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    version: string;
    formgroup: FormGroup;
    versionActual: any;
    actualizar: boolean = false;
    constructor(
        private env: EnvService,
        private formBuilder: FormBuilder,
        private auth: AuthenticationService,
        private api: ApiService,
        //private screenOrientation: ScreenOrientation
    ) {
        this.version = this.env.Version;
        this.formgroup = this.formBuilder.group({
        user: '',
        pass: ''
        });
    }
    ngOnInit() 
    {
        
        console.log(this.version);
        this.api.checkVersion(this.version)
        .pipe(finalize(async () => 
        {
        //   await this.loader.dismiss();
        }))
        .subscribe(r => 
        {
            this.actualizar = r.data;
        })
    }
    /*ionViewDidEnter() 
    {
        this.screenOrientation.unlock();
        //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }*/
    login(frm: any) 
    {
        console.log(frm);
        this.auth.login(frm);
        this.formgroup.reset();
    }

}
