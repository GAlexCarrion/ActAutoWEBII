import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class RegistroComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre_completo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Validador personalizado para confirmar que las contraseñas coinciden
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'mismatch': true };
    }
    return null;
  }

  /**
   * Maneja el envío del formulario de registro.
   * Envía los datos del usuario al backend para su registro en la base de datos.
   */
  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.registerForm.valid) {
      if (this.registerForm.errors?.['mismatch']) {
        this.errorMessage = 'Las contraseñas no coinciden.';
        return;
      }

      const { nombre_completo, email, password } = this.registerForm.value;

      this.userService.registerUser({ nombre_completo, email, password }).subscribe({
        next: (response) => {
          console.log('Usuario registrado:', response);
          this.successMessage = '¡Registro exitoso! Ahora puedes iniciar sesión.';
          this.registerForm.reset();
          setTimeout(() => {
            this.router.navigate(['/iniciar-sesion']);
          }, 2000);
        },
        error: (err) => {
          console.error('Error al registrar usuario:', err);
          // El backend enviará un mensaje de error si el email ya existe
          this.errorMessage = err.error.message || 'Error al registrar. Inténtalo de nuevo.';
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      this.registerForm.markAllAsTouched();
    }
  }
}
