import React, { useState } from 'react';
import axios from 'axios';

function AiChatComponent() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse('');

    try {
      // Direct the request to your local secure backend
      const res = await axios.post('http://localhost:5000/api/chat', { prompt });
      setResponse(res.data.reply);
    } catch (err) {
      setResponse('Failed to fetch response from AI server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '10px' }}>
      <h3>AI Assistant</h3>
      <textarea 
        rows="4" 
        style={{ width: '100%' }}
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)} 
        placeholder="Ask something..."
      />
      <button onClick={handleAskAI} disabled={loading} style={{ marginTop: '10px' }}>
        {loading ? 'Thinking...' : 'Send to AI'}
      </button>
      {response && (
        <div style={{ marginTop: '20px', background: '#f0f0f0', padding: '10px' }}>
          <strong>AI Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default AiChatComponent;
