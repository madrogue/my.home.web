const Logger = require('../src/log');


describe('Logger', () => {
  let output = [];
  const storeLog = (...args) => output.push(args.join(' '));
  const TIMESTAMP_REGEX = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}/;

  beforeEach(() => {
    output = [];
    console.debug = jest.fn(storeLog);
    console.warn = jest.fn(storeLog);
    console.error = jest.fn(storeLog);
  });
  it('includes timestamp when timestamps=true', () => {
    const log = new Logger({ type: 'console', level: 'debug', timestamps: true });
    log.debug('with timestamp');
    expect(output[0]).toMatch(TIMESTAMP_REGEX);
    expect(output[0]).toMatch(/\[DEBUG\] with timestamp/);
  });

  it('uses custom timestamp format', () => {
    const log = new Logger({ type: 'console', level: 'debug', timestamps: true, timestampFormat: 'YYYY' });
    log.debug('custom format');
    // Should match 4-digit year at start
    expect(output[0]).toMatch(/^\d{4} \[DEBUG\] custom format/);
  });

  it('logs debug messages when level is debug', () => {
    const log = new Logger({ type: 'console', level: 'debug' });
    log.debug('test debug');
    expect(output.join(' ')).toMatch(/test debug/);
  });

  it('logs warning messages when level is warning', () => {
    const log = new Logger({ type: 'console', level: 'warning' });
    log.warning('test warning');
    expect(output.join(' ')).toMatch(/test warning/);
    log.debug('should not log');
    expect(output.join(' ')).not.toMatch(/should not log/);
  });

  it('logs error messages when level is error', () => {
    const log = new Logger({ type: 'console', level: 'error' });
    log.error('test error');
    expect(output.join(' ')).toMatch(/test error/);
    log.warning('should not log');
    expect(output.join(' ')).not.toMatch(/should not log/);
  });

  it('defaults to debug level if level is undefined', () => {
    const log = new Logger({ type: 'console' });
    log.debug('default debug');
    expect(output.join(' ')).toMatch(/default debug/);
  });

  it('falls through to console if type is undefined', () => {
    const log = new Logger({});
    log.debug('fallback debug');
    expect(output.join(' ')).toMatch(/fallback debug/);
  });

  it('does not include timestamp if timestamps is false or undefined', () => {
    const log = new Logger({ type: 'console', level: 'debug' });
    log.debug('no timestamp');
    expect(output[0]).not.toMatch(TIMESTAMP_REGEX);
  });
});
