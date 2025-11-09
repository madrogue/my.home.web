
const moment = require('moment');

class Logger {
  constructor(config = {}) {
    this.config = config || {};
  }

  _getTimestamp() {
    if (!this.config.timestamps) return '';
    const fmt = this.config.timestampFormat || 'YYYY-MM-DD HH:mm:ss.SSS';
    return moment().format(fmt) + ' ';
  }


  debug(...args) {
    if (this._shouldLog('debug')) {
      const prefix = this._getTimestamp() + '[DEBUG]';
      switch (this.config.type) {
        case 'console':
        default:
          console.debug(prefix, ...args);
          break;
        // future: add other logger types here
      }
    }
  }


  warning(...args) {
    if (this._shouldLog('warning')) {
      const prefix = this._getTimestamp() + '[WARNING]';
      switch (this.config.type) {
        case 'console':
        default:
          console.warn(prefix, ...args);
          break;
        // future: add other logger types here
      }
    }
  }


  error(...args) {
    if (this._shouldLog('error')) {
      const prefix = this._getTimestamp() + '[ERROR]';
      switch (this.config.type) {
        case 'console':
        default:
          console.error(prefix, ...args);
          break;
        // future: add other logger types here
      }
    }
  }

  _shouldLog(level) {
    const levels = ['debug', 'warning', 'error'];
    const configLevel = this.config.level || 'debug';
    const configLevelIdx = levels.indexOf(configLevel);
    const msgLevelIdx = levels.indexOf(level);
    return msgLevelIdx >= configLevelIdx;
  }
}

module.exports = Logger;
