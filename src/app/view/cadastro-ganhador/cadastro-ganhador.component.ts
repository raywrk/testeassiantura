import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, HostListener, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GanhadorService } from 'src/app/shared/services/ganhador.service';
import { TesteService } from 'src/app/teste.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-ganhador',
  templateUrl: './cadastro-ganhador.component.html',
  styleUrls: ['./cadastro-ganhador.component.scss']
})
export class CadastroGanhadorComponent implements OnInit {

  @Output() novoRegistro = new EventEmitter<void>();
  @ViewChild('sigPad') sigPad;
  sigPadElement;
  context;
  isDrawing = false;
  img;

  constructor(
    private fb: FormBuilder,
    private ganhadorService: GanhadorService,
    private router: Router,
    private testeService: TesteService,
    private http: HttpClient
  ) { }

  formGanhador = this.fb.group({
    nome: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required),
    cep: new FormControl('', Validators.required),
    bairro: new FormControl('', Validators.required),
    logradouro: new FormControl('', Validators.required),
    cidade: new FormControl('', Validators.required),
    uf: new FormControl('', Validators.required),
    numero: new FormControl(null, Validators.required),
    complemento: new FormControl('', Validators.required),
    assinaturaImagem: new FormControl('', Validators.required), // AQUI
    produto: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
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

  saveImagem() {
    this.img = this.sigPadElement.toDataURL("image/png");
    this.testeService.enviarArquivo(this.img).subscribe((response) => {
      const id = response.data.id;
      console.log(id); // AQUI
      this.formGanhador.patchValue({ assinaturaImagem: id.toString() }); // convert id to string and assign to form control
    });
  }



  consultarCEP(cep: string) {
    this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe((endereco: any) => {
      this.formGanhador.patchValue({
        logradouro: endereco.logradouro,
        bairro: endereco.bairro,
        cidade: endereco.localidade,
        uf: endereco.uf
      });
    });
  }

  onLimpar() {

    // Swal.fire({
    //   title: 'Tem certeza que deseja limpar o formulário ?',
    //   text: "Você não poderá reverter isso!",
    //   icon: 'warning',
    //   position: 'bottom',
    //   showCancelButton: true,
    //   heightAuto: false,
    //   confirmButtonColor: '#39bd0e',
    //   cancelButtonText: 'Cancelar',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Sim, limpar!'
    // }).then((result) => {
    //   if (result.isConfirmed) {

    //     this.formGanhador.reset({ produto: '' });
    //     this.clear();

    //   }
    // })

    this.formGanhador.reset({ produto: '' });
    this.clear();

  }



  isFormEmpty:boolean

  async onSubmit() {

    await this.saveImagem()

    Swal.fire({
      title: 'Tem certeza que deseja registrar o ganhador ?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      position: 'bottom',
      showCancelButton: true,
      heightAuto: false,
      confirmButtonColor: '#39bd0e',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, registrar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.ganhadorService.salvar(this.formGanhador.value).subscribe(
          {
            complete: () => {
              Swal.fire(
                {
                  title: 'Salvo!',
                  text: 'Cliente ganhador registrado com sucesso',
                  heightAuto: false,
                  icon: 'success'
                }
              ).then(() => {
                this.ngAfterViewInit();
                this.onLimpar();
                this.novoRegistro.emit();
              } )
            },
            error: (error) => {
              if (error.status === 401) {
                Swal.fire(
                  'Erro!',
                  error.error.message,
                  'error'
                ).then(() => this.router.navigate(['/login']))

              } else {
                console.log(error)
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.error,
                })
              }
            }
          }
        )
      }
    })
  }


}
