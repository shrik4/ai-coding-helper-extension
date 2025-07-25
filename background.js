chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "get_ai_hint") {
    // Async function for OpenRouter fetch
    (async () => {
      try {
        const apiKey = "your api key";
        const prompt = `Help me solve this coding problem:\n\n${request.problem}`;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
            "HTTP-Referer": "https://chrome-extension.local", // REQUIRED!
            "X-Title": "AI Coding Helper"
          },
          body: JSON.stringify({
            model: "openai/gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }]
          })
        });

        const data = await response.json();
        const aiReply = data.choices?.[0]?.message?.content || "No response from AI.";
        sendResponse({ reply: aiReply });

      } catch (error) {
        console.error("Fetch error:", error);
        sendResponse({ reply: "⚠️ Error getting response from OpenRouter." });
      }
    })();

    return true; // 🔥 CRITICAL: Keeps message channel open for async
  }
});
