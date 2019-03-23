import { Event } from '../Event';
import { Reducer } from './reducer';

export class StuffReducer implements Reducer {
  reduce(mass: any, event: Event) {
    switch (event.type) {
      case 'ADD_ALL':
        return event.payload;

      case 'ADD':
        if (mass.indexOf(event.payload) === -1) {
          return [...mass, event.payload];
        }
        return [...mass];

      case 'DELETE':
        const newMass = mass.filter((el: any) => {
          return el.id !== event.payload.id;
        });
        return [...newMass];
    }
  }
}
