const axios = require("axios");

const generateAIReport = async (idea) => {
    const prompt = `
                    You are an expert startup consultant. Analyze the given startup idea
                    and return a structured JSON object with:
                    problem, customer, market, competitor, tech_stack, risk_level, profitability_score, justification.

                    Rules:
                    - competitor must contain exactly 3 items
                    - profitability_score must be 0-100
                    - return ONLY JSON

                    Input:
                    ${JSON.stringify(idea)}
                `;

    const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            model: "anthropic/claude-3-haiku",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "HTTP-Referer": process.env.SITE_URL || "http://localhost:3000",
                "X-Title": "AI Startup Validator",
            },
        }
    );

    return JSON.parse(response.data.choices[0].message.content);
};

module.exports = generateAIReport;