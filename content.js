window.addEventListener("load", () => {
  const codeBlocks = document.querySelectorAll("pre, code");

  codeBlocks.forEach((block) => {
    // Prevent adding the button multiple times
    if (block.querySelector(".ai-help-button")) return;

    const button = document.createElement("button");
    button.textContent = "Get AI Help";
    button.className = "ai-help-button";
    button.style.margin = "5px";
    button.style.padding = "4px 8px";
    button.style.backgroundColor = "#007bff";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "4px";
    button.style.cursor = "pointer";
    button.style.display = "block";

    button.addEventListener("click", () => {
      const problem = block.innerText.slice(0, 1000);

      if (typeof chrome !== "undefined" && chrome.runtime?.sendMessage) {
        chrome.runtime.sendMessage({ type: "get_ai_hint", problem }, (response) => {
          alert("🧠 AI Suggestion:\n\n" + (response?.reply || "No response received."));
        });
      } else {
        alert("⚠️ Chrome extension environment not detected. Please install the extension properly.");
      }
    });

    block.parentNode.insertBefore(button, block);
  });
});
