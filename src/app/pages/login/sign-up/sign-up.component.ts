import { Component, QueryList, ViewChildren } from '@angular/core';
import { LoginInputComponent } from "../../../components/login/login-input/login-input.component";
import { LoginButtonComponent } from "../../../components/login/login-button/login-button.component";
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-sign-up',
  imports: [LoginInputComponent, LoginButtonComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  constructor(private router: Router, private userService: UserService, private notify: NotificationService) {}

  @ViewChildren(LoginInputComponent) inputs!: QueryList<LoginInputComponent>;

  redirectToLoginPage() {
    this.router.navigate(['login'], { replaceUrl: true });
  }

  createUser() {
    let hasValidInput: boolean = true;

    for (const input of this.inputs) {

      if (!input.validateField()) hasValidInput = false;
    };

    if (!hasValidInput) return;

    const values = this.inputs.toArray().map((input) => input.getInputValue().toString());

    const nome:           string = values[0];
    const email:          string = values[1];
    const senha:          string = values[2];
    const confirmarSenha: string = values[3];

    if (senha != confirmarSenha) {
      alert('Senhas divergente. Por favor verifique');

      return;
    }

    let jsonData: { "nome": string, "email": string, "senha": string };

    jsonData = {
      "nome": nome,
      "email": email,
      "senha": senha
    };

    this.userService.createUser(jsonData).subscribe({
      next: (res) => {
        this.router.navigate(['login'], { replaceUrl: true });
      },
      error: (err) => {
        console.error('erro: ', err);
        this.notify.show({"icon": "fa-warning", "type": 'error', "title": 'Erro ao cadastrar', "message": err.message})
      },
    });
  }

}
