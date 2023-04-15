import { Component, Input, ViewChild, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { TesteService } from './teste.service';

@Component({
  selector: 'hello',
  template: ` <br/>
  <canvas #sigPad width="600" height="250" (mousedown)="onMouseDown($event)"
  (mousemove)="onMouseMove($event)" (touchstart)="onTouchStart($event)"
  (touchmove)="onTouchMove($event)" (touchend)="onTouchEnd($event)"></canvas>
  <br/>
  <button (click)="clear()">Limpar </button>
  <button (click)="save()">Salvar </button>
  <br/>
  `,
  styles: [`
  canvas {
    border: 1px solid #ced4da;
    border-radius: 8px;
  }
  span {
    width: 300px;
  }
  button{
    width: 150px;
    height: 50px;
    background: #E9E8E8;
    border-radius: 10px;
    border: none;
    color: black;
    font-weight: 600;
  }
  `]
})
export class AssinaturaComponent {

  @Output() imageSalva = new EventEmitter<string>();

  @ViewChild('sigPad') sigPad;
  sigPadElement;
  context;
  isDrawing = false;
  img;

  constructor(private testeService: TesteService){

  }

  ngAfterViewInit() {
    this.sigPadElement = this.sigPad.nativeElement;
    this.context = this.sigPadElement.getContext('2d');
    this.context.strokeStyle = '#000';
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(e) {
    this.isDrawing = false;
  }

  onTouchEnd(e) {
    this.isDrawing = false;
  }

  onMouseDown(e) {
    this.isDrawing = true;
    const coords = this.relativeCoords(e);
    this.context.moveTo(coords.x, coords.y);
  }

  onTouchStart(e) {
    this.isDrawing = true;
    const coords = this.relativeCoords(e.touches[0]);
    this.context.moveTo(coords.x, coords.y);
  }

  onMouseMove(e) {
    if (this.isDrawing) {
      const coords = this.relativeCoords(e);
      this.context.lineTo(coords.x, coords.y);
      this.context.stroke();
    }
  }

  onTouchMove(e) {
    if (this.isDrawing) {
      const coords = this.relativeCoords(e.touches[0]);
      this.context.lineTo(coords.x, coords.y);
      this.context.stroke();
    }
  }

  private relativeCoords(event) {
    const bounds = event.target.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    return { x: x, y: y };
  }

  clear() {
    this.context.clearRect(0, 0, this.sigPadElement.width, this.sigPadElement.height);
    this.context.beginPath();
  }

  save() {
    this.img = this.sigPadElement.toDataURL("image/png");
    this.testeService.enviarArquivo(this.img).subscribe((response) => {
      const id = response.data.id;
      console.log(id);
      this.imageSalva.emit(id); // emitir o ID da imagem
    });
  }

}
