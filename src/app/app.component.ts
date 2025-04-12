import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DisplayCCComponent } from './components/display-cc.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DisplayCCComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'CreditCardProject';
}
