const gemini_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export const generateGeminiResponse = async (prompt) => {
  try {
    const response = await fetch(
      `${gemini_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      },
    );
    if (!response.ok) {
      throw new Error(`Gemini API Error: ${await response.text()}`);
    }
    const data = await response.json();

    if (!data || !data.candidates || !data.candidates[0]) {
      throw new Error('Invalid response structure from Gemini');
    }

    const text = data.candidates[0].content.parts?.[0]?.text;

    if (!text) {
      throw new Error('No text found in Gemini response');
    }

    const cleanText = text
      .trim()
      .replace(/^```json/, '')
      .replace(/```$/, '')
      .replace(/```json/g, '');

    try {
      return JSON.parse(cleanText);
    } catch (err) {
      throw new Error(`JSON Parse Error: ${err.message}`);
    }
  } catch (error) {
    console.log(`error from gemini :${error}`);
    throw error;
  }
};
