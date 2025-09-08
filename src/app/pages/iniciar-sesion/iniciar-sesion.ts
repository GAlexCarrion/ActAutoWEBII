import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user'; // Importa el servicio de usuario

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './iniciar-sesion.html',
  styleUrl: './iniciar-sesion.css'
})
export class IniciarSesionComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * Maneja el envío del formulario de inicio de sesión.
   * Envía las credenciales al backend para su validación.
   */
  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.loginForm.valid) {
      this.userService.loginUser(this.loginForm.value).subscribe({
        next: (response) => {
          // La respuesta del backend indica un login exitoso
          this.successMessage = response.message;
          console.log('Usuario autenticado:', response.user);
          // Opcionalmente, aquí puedes guardar el estado del usuario en un servicio
          
          this.loginForm.reset();
          setTimeout(() => {
            this.router.navigate(['/productos']); // Redirige a la página de productos
          }, 1500);
        },
        error: (err) => {
          // El backend envió un error (ej. credenciales inválidas)
          console.error('Error de login:', err);
          this.errorMessage = err.error.message || 'Error de conexión. Inténtalo de nuevo.';
        }
      });
    } else {
      this.errorMessage = 'Por favor, ingresa tu correo y contraseña.';
      this.loginForm.markAllAsTouched();
    }
  }
}
