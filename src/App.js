import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:8081/echo', { message: input });
      setResult(res.data.echo);
    } catch (err) {
      setError('Error: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Echo App</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={4}
          style={{ width: '100%' }}
          placeholder="Type something to echo..."
        />
        <button type="submit" disabled={loading} style={{ marginTop: 8 }}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      <div style={{ marginTop: 24, padding: 16, border: '1px solid #ccc', minHeight: 40 }}>
        <strong>Echoed Result:</strong>
        <div>{result}</div>
      </div>
    </div>
  );
}

export default App;
