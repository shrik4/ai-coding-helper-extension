document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("getHelpBtn");
  const responseDiv = document.getElementById("response");
  const textarea = document.getElementById("problem");

  if (!button || !textarea || !responseDiv) {
    console.error("❌ One or more popup elements not found.");
    return;
  }

  button.addEventListener("click", () => {
    const problem = textarea.value.trim();

    if (!problem) {
      responseDiv.textContent = "⚠️ Please enter a coding problem first.";
      return;
    }

    chrome.runtime.sendMessage({ type: "get_ai_hint", problem }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Runtime error:", chrome.runtime.lastError.message);
        responseDiv.textContent = "⚠️ " + chrome.runtime.lastError.message;
        return;
      }

      responseDiv.textContent = response?.reply || "⚠️ No response received.";
    });
  });
});
