function reactionTimeBot() {
    const delay = 0; // Ritardo in millisecondi
    const levels = 5; // Numero di livelli da completare
    let currentLevel = 0;

    function simulateClick(element) {
        const event = new MouseEvent('mousedown', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        element.dispatchEvent(event);

        setTimeout(() => {
            const upEvent = new MouseEvent('mouseup', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            element.dispatchEvent(upEvent);
        }, 10);
    }

    function clickWhenGreen() {
        const target = document.querySelector('.view-go');
        if (target) {
            console.log(`Cliccando sul livello ${currentLevel + 1}`);
            simulateClick(target);
            currentLevel++;
            if (currentLevel < levels) {
                console.log(`Passando al livello ${currentLevel + 1}`);
                setTimeout(() => simulateClick(document.body), 500); // Clicca per passare al livello successivo
                setTimeout(waitForGreen, 1000);
            } else {
                console.log('Test completato!');
            }
        } else {
            setTimeout(clickWhenGreen, 10);
        }
    }

    function waitForGreen() {
        const target = document.querySelector('.view-waiting');
        if (target) {
            console.log(`In attesa del verde per il livello ${currentLevel + 1}`);
            const observer = new MutationObserver((mutations) => {
                if (document.querySelector('.view-go')) {
                    observer.disconnect();
                    console.log('Verde rilevato!');
                    setTimeout(clickWhenGreen, delay);
                }
            });
            observer.observe(target, { attributes: true, childList: true, subtree: true });
        } else {
            setTimeout(waitForGreen, 50);
        }
    }

    function startTest() {
        console.log('Cercando l\'area di avvio...');
        const startArea = document.querySelector('.view-splash, .view-result');
        if (startArea) {
            console.log('Area di avvio trovata, cliccando...');
            simulateClick(startArea);
            setTimeout(waitForGreen, 100);
        } else {
            console.log('Area di avvio non trovata. Riprovando...');
            setTimeout(startTest, 500);
        }
    }

    console.log('Avvio del test...');
    startTest();
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "startBot") {
        console.log('Messaggio ricevuto, avvio del bot...');
        reactionTimeBot();
    }
});

console.log('Script content.js caricato');
