import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "appHallsPipe"
})
export class HallsPipe implements PipeTransform {
  transform(halls: string[]): string {
    return halls.reduce((acc, cur, index) => {
      return index ? acc + ", " + cur : acc + cur;
    }, "");
  }
}
