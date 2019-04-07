import {ChangeDetectionStrategy, Component} from "@angular/core";

@Component({
  selector: "app-loader",
  template: `
    <div class="loader">
      <div class="loader__spinner"></div>
    </div>
  `,
  styleUrls: ["./loader.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  constructor() {
  }
}
