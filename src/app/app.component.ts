import {ChangeDetectionStrategy, Component} from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div class="movie-app">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ["./app.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
}
