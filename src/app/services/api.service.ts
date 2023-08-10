import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {EnvService} from './env.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    headerOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
        withCredentials: false,
    };

    constructor(
        private env: EnvService,
        private http: HttpClient
    ) { }

    checkVersion(version: any): Observable<any> {
        return this.http.get(this.env.API_URL + 'checkVersion', {params: { version}});
    }
    login(user: any, pass: any, DID: any): Observable<any> {
        return this.http.post(this.env.API_URL + 'login', {params: { user, pass, DID}});
    }
    getViajesChofer(user: any): Observable<any>
    {
        return this.http.get<any>(this.env.API_URL + 'getItinerarios', {params: {user}});
    }
    getItinerario(id: any) {
        return this.http.get<any>(this.env.API_URL + 'getItinerario', { params: {id: id} });
    }
    itinerarioVisto(id: any) {
        return this.http.get<any>(this.env.API_URL + 'itinerarioVisto', { params: {id: id} });
    }
    getInspeccion(id: any) {
        return this.http.get<any>(this.env.API_URL + 'getInspeccion', { params: {id: id} });
    }
    changeInspeccion(data: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | any) {
        return this.http.get<any>(this.env.API_URL + 'changeInspeccion', {params: {...data}});
    }
    getTipoEvidencias() {
        return this.http.get<any>(this.env.API_URL + 'getTipoEvidencias');
    }
    getEvidencias(id: any) {
        return this.http.get<any>(this.env.API_URL + 'getEvidencias', {params: {id: id}});
    }
    getImagenesExt(data: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | any)
    {
        return this.http.get<any>(this.env.API_URL + 'getImagesExt', {params: {...data}});
    }

    getItinerarioExt(data: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | any)
    {
        return this.http.get<any>(this.env.API_URL + 'getItinerarioExt', {params: {...data}});
    }

    createPdf(fotos: any)
    {
        return this.http.post<any>(this.env.API_URL + 'createPdf', {...fotos});
    }
    insertItinerarioExt(foto: any)
    {
        return this.http.post<any>(this.env.API_URL + 'insertItinerarioExt', {...foto});
    }
    romperSelloExt(data: any)
    {
        return this.http.post<any>(this.env.API_URL + 'romperSelloExt', {...data});
    }
    getFallas(): Observable<any> 
    {
        return this.http.get<any>(this.env.API_URL + 'getFallas');
    }
    getCategorias(): Observable<any> 
    {
        return this.http.get<any>(this.env.API_URL + 'getCategorias');
    }
    getCategoriasObjetos(reporte: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | undefined): Observable<any> 
    {
        return this.http.get<any>(this.env.API_URL + 'getCategoriasObjetos', {params: {...reporte}});
    }
    sendReport(reporte: any): Observable<any> 
    {
        return this.http.post<any>(this.env.API_URL + 'sendReport', {...reporte});
    }
    terminarViaje(data: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | undefined): Observable<any> 
    {
        return this.http.get<any>(this.env.API_URL + 'terminarViaje', {params: {...data}});
    }
    getSemanasNomina()
    {
        return this.http.get<any>(this.env.API_URL + 'getSemanasNomina');
    }
    getNominaChofer(reporte: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | undefined): Observable<any> 
    {
        return this.http.get<any>(this.env.API_URL + 'getNominaChofer', {params: {...reporte}});
    }

    getVencimientos(ChoferID: any){
        return this.http.get<any>(this.env.API_URL + 'getVencimientos', {params: {...ChoferID}});
    }

    getProductosNormales(): Observable<any> {
        return this.http.get<any>(this.env.API_URL + 'getProductosNormales');
    }

    getAgricultoresPorProducto(id: any): Observable<any> {
        return this.http.get<any>(this.env.API_URL + 'getAgricultoresPorProducto', {params: {id_productos: id}});
    }

    checkAlertas(id: any): Observable<any> {
        return this.http.get<any>(this.env.API_URL + 'checkAlertas', {params: {id}});
    }
    
    getReporteHarvest(data: any) {
        return this.http.get<any>(this.env.API_URL + 'getReporteHarvest', { params: data });
    }

    getAllInventarioProductos() {
        return this.http.get<any>(this.env.API_URL + 'getAllInventarioProductos');
    }

    getInventarioProducto(id: any) {
        return this.http.get<any>(this.env.API_URL + 'getInventarioProducto', {params: {id}});
    }

    getAgricultores() {
        return this.http.get<any>(this.env.API_URL + 'getAgricultores');
    }

    getRazonesSociales() {
        return this.http.get<any>(this.env.API_URL + 'getRazonesSociales');
    }

    getCatalogoProductos() {
        return this.http.get<any>(this.env.API_URL + 'getCatalogoProductos');
    }

    getContratosAgricultorNombre(id: any) {
        return this.http.get<any>(this.env.API_URL + 'getContratosAgricultorNombre', {params: {id}});
    }

    getProductosContratoDropdown(id: any) {
        return this.http.get<any>(this.env.API_URL + 'getProductosContratoDropdown', {params: {id_contratos: id}});
    }

    getReporteAgentes(data: any) {
        return this.http.get<any>(this.env.API_URL + 'getReporteAgentes', {params: {...data}});
    }

    getContratosAgricultorApp(id: any) {
        return this.http.get<any>(this.env.API_URL + 'getContratosAgricultorApp', {params: {id}});
    }

    getReporteRecepcionSorteo(data: any) {
        return this.http.get<any>(this.env.API_URL + 'getReporteRecepcionSorteo', {params: {...data}});
    }

    saveRevisionMecanica(data: any){
        return this.http.post<any>(this.env.API_URL + 'saveRevisionMecanica', {... data});
    }
    
    getPuntosRevisionMecanica(){
        return this.http.get<any>(this.env.API_URL + 'getPuntosRevisionMecanica');
    }

    //diesel
    getCamionesTabla(){
        return this.http.get<any>(this.env.API_URL_DIESEL + 'getCamionesTabla');
    }

    getCamion(data: any) {
        return this.http.get<any>(this.env.API_URL_DIESEL + 'getCamion', {params: {... data}});
    }

    saveCarga(data: any){
        return this.http.post<any>(this.env.API_URL_DIESEL + 'saveCarga', {... data})
    }

    getHistorialAnterior(data: any){
        return this.http.get<any>(this.env.API_URL_DIESEL + 'getHistorialAnterior', {params: {...data}});
    }

    getProveedores(){
        return this.http.get<any>(this.env.API_URL_DIESEL + 'getProveedores');
    }

    

}
