import axios from 'axios';
export async function getOpenRouterFeedback(question, userAnswer) {
  const prompt = `
You are an intelligent AI interview assistant.


Your task is to evaluate a candidate's answer to an interview question. Start by determining whether the answer is relevant, strong, weak, or shows honesty about failure.

Then:

- Give specific, constructive feedback in 3–5 lines.
- If the answer shows success, provide a stronger sample answer.
- If the answer shows failure or no achievement (e.g., "I failed"), acknowledge their honesty and provide a sample answer that:
  - Demonstrates learning from failure,
  - Shows resilience or effort,
  - Still leaves a positive impression.

Keep the tone professional, helpful, and encouraging.
Format:
Feedback: [Write constructive feedback in 3-5 lines]
Sample Answer: [Provide a strong sample answer]

Interview Question: ${question}
Candidate's Answer: ${userAnswer}
`;


  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model:"openai/gpt-3.5-turbo", // or google/gemini-pro
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that gives professional feedback and great interview answers.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000/',
          'X-Title': 'Interview-Feedback-App',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (err) {
    console.error("❌ OpenRouter Error:", err.response?.data || err.message);
    throw new Error("Failed to get AI feedback from OpenRouter");
  }
}
