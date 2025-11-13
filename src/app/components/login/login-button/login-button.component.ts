import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-login-button',
  imports: [],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.scss'
})
export class LoginButtonComponent {

  @Input() text:  string  = '';
  @Input() class: string  = '';
  @Input() id:    string  = '';
  @Input() type:  string  = 'primary';


}
