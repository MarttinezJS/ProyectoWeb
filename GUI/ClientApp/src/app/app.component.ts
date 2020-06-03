import { Component } from '@angular/core';
import { User } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  user: User;

  constructor(private afAuth: AngularFireAuth) {
    afAuth.user.subscribe( user => {
      this.user = user;
    });
  }
}
