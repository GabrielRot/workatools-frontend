import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login-input',
  imports: [FormsModule, NgIf],
  templateUrl: './login-input.component.html',
  styleUrl: './login-input.component.scss'
})
export class LoginInputComponent {
  @ViewChild('loginInput') loginInput!: ElementRef<HTMLInputElement>;
  @ViewChild('loginInputComponentContainer') loginInputComponentContainer!: ElementRef<HTMLDivElement>;

  @Input() text:           string  = '';
  @Input() type:           string  = 'text';
  @Input() placeholder:    string  = '';
  @Input() name:           string  = '';
  @Input() id:             string  = '';
  @Input() inputBorder?:   boolean = false;
  @Input() requiredInput?: boolean = false;

  @Input() inputValue: string = '';

  getInputValue(): string {
    return this.inputValue;
  }

  showRequiredText = false;

  validateField() {
    const removeRequiredStyle = (_event: any) => {
      if (_event.target.value.trim() !== '') {
        this.loginInput.nativeElement.classList.remove('input-not-filled');

        this.showRequiredText = false;

        this.loginInput.nativeElement.removeEventListener('keyup', removeRequiredStyle);
      }
    }

    if (this.requiredInput && String(this.inputValue).replace(/\s/g, '') == '') {
      this.loginInput.nativeElement.classList.add('input-not-filled');

      this.showRequiredText = true;
      
      this.loginInput.nativeElement.addEventListener('keyup', removeRequiredStyle);

      return false;
    }

    return true;
  }

}
