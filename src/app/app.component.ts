import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'food-site';
  navItem = 'recipe';

  navChanged(navItem: string){
    this.navItem = navItem;
  }
}
