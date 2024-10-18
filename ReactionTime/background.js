chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("humanbenchmark.com/tests/reactiontime")) {
    console.log('Inviando messaggio di avvio al content script...');
    chrome.tabs.sendMessage(tab.id, {action: "startBot"});
  } else {
    alert("Per favore, vai alla pagina del test di tempo di reazione su Human Benchmark.");
  }
});

console.log('Background script caricato');
