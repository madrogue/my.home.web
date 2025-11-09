/**
 * @jest-environment node
 *
 * This test file requires the Node.js environment because it starts a real server process
 * and makes actual HTTP requests using axios. The default Jest environment (jsdom) is
 * designed for browser-like testing and does not support real network sockets or process spawning.
 *
 * By specifying @jest-environment node, we ensure that only this test file runs in Node,
 * while all other tests (such as React component tests) continue to use jsdom or the default environment.
 * This keeps test environments isolated and avoids side effects for the rest of the test suite.
 */

const axios = require('axios');
let server;
const PORT = process.env.TEST_PORT || 18080;

beforeAll((done) => {
  // Import the actual server.js app and start it on a test port
  server = require('child_process').spawn('node', ['server.js'], {
    cwd: __dirname + '/../',
    env: { ...process.env, PORT },
    stdio: 'inherit'
  });
  // Wait a moment for the server to start
  setTimeout(done, 1000);
});

afterAll((done) => {
  server.kill();
  setTimeout(done, 500);
});

describe('Response headers', () => {
  it('should include x-responsetime, x-powered-by, and x-request-id (all lowercase)', async () => {
    const res = await axios.get(`http://localhost:${PORT}/`);
    expect(res.headers['x-responsetime']).toMatch(/\d+ms/);
    expect(res.headers['x-powered-by']).toBe('my.home.web');
    expect(res.headers['x-request-id']).toMatch(/[0-9a-f\-]{36}/);
  });

  it('should have unique x-request-id for each request', async () => {
    const res1 = await axios.get(`http://localhost:${PORT}/`);
    const res2 = await axios.get(`http://localhost:${PORT}/`);
    expect(res1.headers['x-request-id']).not.toBe(res2.headers['x-request-id']);
  });

  it('should have x-responsetime in ms format', async () => {
    const res = await axios.get(`http://localhost:${PORT}/`);
    expect(res.headers['x-responsetime']).toMatch(/^\d+ms$/);
  });

  it('should always include x-powered-by', async () => {
    const res = await axios.get(`http://localhost:${PORT}/`);
    expect(res.headers['x-powered-by']).toBe('my.home.web');
  });
});
