import {Position} from "./Position";

export interface Portfolio {
  id: number;
  asOf: string; // iso date yyyy-mm-dd
  positions: Position[];
}