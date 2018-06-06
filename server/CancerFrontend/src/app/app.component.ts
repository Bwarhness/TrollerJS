import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  Header = 'Cancer site, stedet hvor du fucker folks pcer op.';
  URL = 'https://google.dk'

  constructor(private socket: Socket) { }
  openSite() {
    alert('YAAAH');
    this.socket.emit('openUrl', this.URL);
  }
  say(Speach) {
    this.socket.emit('say', Speach.value);
    Speach.value = '';
  }
  powerOff() {
    this.socket.emit('powerOff');
  }
  changeVolume(volume) {
    this.socket.emit('changeVolume', volume);
  }
  killApplication(name) {
    console.log(name)
    this.socket.emit('killApplication', name.value);
    name.value = '';
  }
  notification(title, message, sound, time, wait, type) {
    const notificationOBJ = {
      title: title,
      message: message,
      sound:  (sound === 'true'),
      time: time,
      wait: (wait === 'true'),
      type: type
    };
    console.log(notificationOBJ);
    this.socket.emit('notification', notificationOBJ);
  }
}
