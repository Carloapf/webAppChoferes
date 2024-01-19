// Importa la clase Injectable de Angular
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // Función para mostrar una notificación
  showNotification(title: string, options?: NotificationOptions) {
    // Verifica si las notificaciones son compatibles con el navegador
    if ('Notification' in window) {
      // Pide permiso al usuario para mostrar notificaciones
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          // Crea una nueva notificación
          const notification = new Notification(title, options);
        }
      });
    }
  }
}
