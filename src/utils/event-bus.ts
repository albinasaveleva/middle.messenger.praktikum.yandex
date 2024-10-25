export default class EventBus {
  _events = {};

  on(event, callback) {
    if (!this._events[event]) {
      this._events[event] = [];
    }

    this._events[event].push(callback);
  }

  off(event, callback) {
    if (!this._events[event]) {
      return;
    }

    this._events[event] = this._events[event].filter(event => event !== callback);
  }

  emit(event, ...args) {
    if (!this._events[event]) {
      return;
    }

    this._events[event].forEach(cb => { cb(...args) })
  }
} 
