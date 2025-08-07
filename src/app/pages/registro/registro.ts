import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { CommonModule } from '@angular/common'; // Para directivas como ngIf
import { Router, RouterLink } from '@angular/router'; // Para la navegación
import { UserService } from '../../services/user'; // Importa el servicio de usuario

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink], // Añade ReactiveFormsModule y RouterLink
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
    // Inicializa el formulario de registro con validadores
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator }); // Añade el validador personalizado
  }

  // Validador personalizado para confirmar que las contraseñas coinciden
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  /**
   * Maneja el envío del formulario de registro.
   * Registra al usuario si el formulario es válido y las contraseñas coinciden.
   */
  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.registerForm.valid) {
      if (this.registerForm.errors?.['mismatch']) {
        this.errorMessage = 'Las contraseñas no coinciden.';
        return;
      }

      const { username, email, password } = this.registerForm.value;

      // Primero, verifica si el email ya existe
      this.userService.getUsers().subscribe(users => {
        const userExists = users.some(user => user.email === email);
        if (userExists) {
          this.errorMessage = 'Este correo electrónico ya está registrado.';
        } else {
          // Si el email no existe, procede con el registro
          this.userService.registerUser({ username, email, password }).subscribe({
            next: (response) => {
              console.log('Usuario registrado:', response);
              this.successMessage = '¡Registro exitoso! Ahora puedes iniciar sesión.';
              this.registerForm.reset(); // Limpia el formulario
              // Opcional: Redirigir al usuario a la página de inicio de sesión después de un tiempo
              setTimeout(() => {
                this.router.navigate(['/iniciar-sesion']);
              }, 2000);
            },
            error: (err) => {
              console.error('Error al registrar usuario:', err);
              this.errorMessage = 'Error al registrar. Inténtalo de nuevo.';
            }
          });
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      // Marca todos los campos como "touched" para mostrar los errores de validación
      this.registerForm.markAllAsTouched();
    }
  }
}