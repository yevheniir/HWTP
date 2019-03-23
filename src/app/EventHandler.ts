import { Event } from './Event';
import { Reducer } from './reducers/reducer';

export class EventHandler {
  currentMass: any = [];
  mass: any;
  reducer: Reducer;

  constructor(mass, reducer: Reducer) {
    this.mass = mass;
    this.reducer = reducer;
    mass.subscribe((val) => {
      this.currentMass = val;
    });
  }

  use(event: Event) {
    this.mass.next(this.reducer.reduce(this.currentMass, event)) ;
  }

  getArray() {
    return this.currentMass;
  }
}
