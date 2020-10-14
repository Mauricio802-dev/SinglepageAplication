import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url:string = 'https://identitytoolkit.googleapis.com/v1/accounts:'
  private apikey:string = 'AIzaSyDQwTT0uiSZYur-7FE0G2dsVoTl3Ppl0eo'

  userToken: string;


  // crear nuevos usuarios
  // signUp?key=[API_KEY]


  // login
  // signInWithPassword?key=[API_KEY]

  constructor(private http:HttpClient) { 
    this.leerToken();
  }

  logout(){}

  login( usuario: UsuarioModel ){

    const authData = {

      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apikey}`,authData
    ).pipe(
      map( resp => {
        this.guardarToken(resp ['idToken'])
        return resp
      }))

  }

  nuevoUsuario( usuario:UsuarioModel ){

  const authData = {

    ...usuario,
    returnSecureToken: true
  };

  return this.http.post(
    `${this.url}signUp?key=${this.apikey}`,authData
  ).pipe(
    map( resp => {
      this.guardarToken(resp ['idToken'])
      return resp
    })
  )

  }

  private guardarToken( idToken: string ){

    this.userToken = idToken;
    localStorage.setItem('token', idToken)
  }

  leerToken(){
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token')
    }else{
      this.userToken = '';
    }
  }
}