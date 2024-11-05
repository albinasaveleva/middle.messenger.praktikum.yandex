export default class EventBus {
  _events: { [key: string]: any[] } = {};

  on(event: string, callback: any): void {
    if (!this._events[event]) {
      this._events[event] = [];
    }

    this._events[event].push(callback);
  }

  off(event: string, callback: any): void {
    if (!this._events[event]) {
      return;
    }

    this._events[event] = this._events[event].filter(event => event !== callback);
  }

  emit(event: string, ...args: unknown[]): void {
    if (!this._events[event]) {
      return;
    }

    this._events[event].forEach(cb => { cb(...args) })
  }
} 
