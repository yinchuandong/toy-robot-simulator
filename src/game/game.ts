import { Robot } from "./robot";
import { TableTop } from "./tableTop";

export class Game {
  robot: Robot | null = null
  tableTop: TableTop | null =  null
  

  step(action: string, params: any) {}
}
