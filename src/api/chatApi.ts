export const getAIResponse = async (sentMsg: string): Promise<string> => {
  const response = await fetch('http://10.0.2.2:11434/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'qwen2.5:0.5b',
      messages: [
        { role: 'user', content: sentMsg },
      ],
      temperature: 0.4,
      max_tokens: 120,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};
