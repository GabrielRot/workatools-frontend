import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from '../../core/services/notification.service';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-notification',
  imports: [NgClass, NgFor],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  @Input() icon?:   string = '';
  @Input() title?:  string = '';
  @Input() message: string = '';

  notifications: any[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notification$.subscribe(notification => this.notifications = notification);
  }

  remove(id: number) {
    this.notificationService.remove(id);
  }

}
