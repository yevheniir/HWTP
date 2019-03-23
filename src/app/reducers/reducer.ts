import { Event } from '../Event';

export interface Reducer {
  reduce(mass: any, event: Event);
}
