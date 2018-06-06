import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Cancer site, stedet hvor du fucker folks pcer op.';
  URL = 'https://google.dk'

  constructor(private socket: Socket) { }
  openSite() {
    alert('YAAAH');
    this.socket.emit('openUrl', this.URL);
  }
  say(){
    this.socket.emit('say', "allaaaah");
  }
  notification(){
    var notificationOBJ = {
      title: "yoyo man",
      message: "u deed",
      sound: true,
      time: 5000,
      wait: true,
      type: "info"
    }
    this.socket.emit('notification',notificationOBJ )
    
  }
}
