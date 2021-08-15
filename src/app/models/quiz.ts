import { Time } from "@angular/common";


import { Skill } from './skill';
import { House } from './house';
export class quiz {
  constructor(
    public id: string,
    public quiz: string,
    public description: string,
    public user_id: string,
    public diagnostic: number,
    public source: number,
    public start_available_time: string,
    public end_available_time: string,
    public skills: number,
    public houses: number,
    public due_time: string) {
  }
}



