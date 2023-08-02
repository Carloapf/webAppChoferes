import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  API_URL = 'http://localhost/duranApi/index.php/choferes/';
  API_URL_DIESEL = 'http://localhost/duranApi/index.php/diesel/';
  // 'http://localhost:8083/API/index.php/api/'; // 'http://erpbajapk.dyndns.org/bajapk/API/index.php/api/';
  HARVEST_URL = 'http://localhost/duranApi/';
  Version = '1.0.6';

  constructor() { }
}