import { useState } from 'react';
import styles from '../styles/index.module.css';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  //async function that  submits the users input
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (res.ok) {
        const data = await res.json();
        setResponse(data);
      } else {
        console.error('Request failed:', res.status);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

    return (
    <div className={styles.container}>
      <h1>OpenAI Interface</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles['form-label']}>
          <h3>Prompt:</h3>
          <br/>
          <input
            className={styles['form-input']}
            type="text"
            placeholder="Enter a prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </label>
        <br />
        <br />
        <textarea
          className={styles['response-textarea']}
          value={response}
          readOnly
          placeholder="Response here ..."
          rows={10}
          cols={50}
        />
        <br />
        <button className={styles['submit-button']} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
