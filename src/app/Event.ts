export class Event {
  type: string;
  payload: any;
  constructor(type: string, payload: any) {
    this.type = type;
    this.payload = payload;
  }
}
