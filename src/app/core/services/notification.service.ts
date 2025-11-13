import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: number;
  icon?: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: Notification[] = [];

  private notificationSubject = new BehaviorSubject<Notification[]>([]);

  notification$ = this.notificationSubject.asObservable();

  show(pOptions: { "icon"?: string, "type": Notification['type'], "title": string, "message": string}) {
    const id = Date.now();

    this.notifications.push({ id, ...pOptions});

    this.notificationSubject.next(this.notifications);

    setTimeout(() => this.remove(id), 50000);
  }

  remove(id: number) {
    this.notifications = this.notifications.filter(notification => notification.id != id);

    this.notificationSubject.next(this.notifications);
  }
}
