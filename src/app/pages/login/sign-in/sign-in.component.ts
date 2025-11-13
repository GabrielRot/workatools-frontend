import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { LoginInputComponent } from "../../../components/login/login-input/login-input.component";
import { LoginButtonComponent } from "../../../components/login/login-button/login-button.component";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-sign-in',
  imports: [LoginInputComponent, LoginButtonComponent, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  @Input() loginInput: string = '';
  @Input() senhaInput: string = '';

  @ViewChildren(LoginInputComponent) inputs!: QueryList<LoginInputComponent>;

  constructor(private router: Router, private authService: AuthService, private notify: NotificationService) {}

  private loginResponse: Record<number, () => void> = {
    200: () => {
       this.notify.show({"icon": "fa-check-circle", "type": "success", title: "Sucesso", "message": "Login efetuado com sucesso", })
    },
    403: () => {
       this.notify.show({"icon": "fa-warning", "type": 'error', "title": 'Erro ao fazer login', "message": "Usuario bloqueado. Por favor solicite o desbloqueio"});
    },
    401: () => {
       this.notify.show({"icon": "fa-warning", "type": 'error', "title": 'Erro ao fazer login', "message": "Login ou senha inválido"});
    }
  }

  login() {
    let hasValidInput: boolean = true;

    for(const input of this.inputs) {
      if (!input.validateField()) hasValidInput = false;
    }

    if (!hasValidInput) return;

    const values = this.inputs.toArray().map((input) => input.getInputValue().toString());

    const email: string = values[0];
    const senha: string = values[1];

    let jsonData: { "email": string, "senha": string }

    jsonData = {
      "email": email,
      "senha": senha,
    }

    this.authService.login(jsonData).subscribe({
      next: (res) => {
        console.log(res);

       },
      error: (err) => {
        const handler = this.loginResponse[err.status];

        if(handler) {
          handler();
        } else {
          this.notify.show({"icon": "fa-warning", "type": 'error', "title": 'Erro ao fazer login', "message": err.message});
        }
      }
    });
  }

  redirectToSignUpPage() {
    this.router.navigate(['sign-up']);
  }

}
