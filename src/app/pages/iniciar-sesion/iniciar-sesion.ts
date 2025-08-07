import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService, User } from '../../services/user'; // Importa el servicio de usuario y la interfaz User

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
    // Inicializa el formulario de inicio de sesión
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * Maneja el envío del formulario de inicio de sesión.
   * Valida las credenciales contra los usuarios registrados en la base de datos simulada.
   */
  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.userService.getUsers().subscribe({
        next: (users: User[]) => {
          // Busca un usuario que coincida con el email y la contraseña
          const foundUser = users.find(user => user.email === email && user.password === password);

          if (foundUser) {
            this.successMessage = '¡Inicio de sesión exitoso!';
            console.log('Usuario autenticado:', foundUser);
            // Aquí podrías guardar el estado de sesión (ej. en localStorage o un servicio de autenticación)
            localStorage.setItem('currentUser', JSON.stringify(foundUser)); // Simulación de sesión
            this.loginForm.reset();
            // Redirigir al usuario a la página de inicio o a un dashboard
            setTimeout(() => {
              this.router.navigate(['/productos']); // Redirige a la página de productos
            }, 1500);
          } else {
            this.errorMessage = 'Correo electrónico o contraseña incorrectos.';
          }
        },
        error: (err) => {
          console.error('Error al obtener usuarios:', err);
          this.errorMessage = 'Error de conexión. Inténtalo de nuevo.';
        }
      });
    } else {
      this.errorMessage = 'Por favor, ingresa tu correo y contraseña.';
      this.loginForm.markAllAsTouched();
    }
  }
}