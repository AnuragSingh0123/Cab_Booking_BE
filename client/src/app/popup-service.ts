import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  messageSignal = signal<string>("");
  message = this.messageSignal;

  show(text: string, duration: number = 4000) {
    this.messageSignal.set(text);
    setTimeout(() => {
      this.messageSignal.set("");
    }, duration);
  }
}
