import {ChangeDetectionStrategy, Component} from "@angular/core";

@Component({
  selector: "app-page-not-found",
  template: `
    <div>
      <h1>Page Not Found</h1>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {
  constructor() {}
}
