import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Usuario } from '../login/usuario';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  private usuario: Usuario = new Usuario();
  
  objetoRetorno: any[];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }
  
  ngOnInit() {
    this.createForm(new Usuario());
  }

  createForm(usuario: Usuario) {
    this.formLogin = this.formBuilder.group({
      login: [usuario.login],
      senha: [usuario.senha]
    })
  }

  classeErro = "SemErro"
  retorno:object;
  teste = [];

  onSubmit() {

    this.authService.autenticar(this.formLogin.value).subscribe(
      (response:any)=> {
        if (response.cod == "200") {
          this.router.navigate(['/home'])
          this.classeErro = "SemErro"
        }
        else if (response.cod == "300") {
          this.classeErro = "alert alert-danger"
        }
      }
    );
    console.log ('Fora',this.objetoRetorno)
    //this.retorno = JSON.parse(this.objetoRetorno)
    //console.log (this.retorno)
    //console.log(this.retorno);
    
    // if (this.objetoRetorno.cod == "200") {
    //   this.router.navigate(['/'])
    //   this.classeErro = "SemErro"
    // }
    // else if (this.objetoRetorno.cod == "300") {
    //   this.classeErro = "alert alert-danger"
    // }
  }

}
