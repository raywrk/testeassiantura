import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TesteService {

  constructor(private http: HttpClient) {}

  enviarArquivo(base64: string): Observable<any> {
    const formData = new FormData();

    const regex = /^data:image\/(png|jpg|jpeg);base64,/;
    if (regex.test(base64)) {
      // Remove a parte do cabeçalho "data:image/png;base64,"
      const base64WithoutHeader = base64.replace(regex, '');
      const blob = new Blob([this.base64toUint8Array(base64WithoutHeader)]);
      formData.append('image', blob, 'image.png');
    } else {
      console.error('A string não está em um formato válido de base64.');
    }

    // const bf = Buffer.from(base64, 'base64')
    // formData.append('image', bf.toString(), 'image.png');

    return this.http.post<any>(
      'https://api.imgbb.com/1/upload?key=6de35111a331b5386b41aa71609e2802', formData);
  }

  private base64toUint8Array(base64: string): Uint8Array {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; ++i) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

}
