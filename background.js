chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startExtraction') {
        const { tabId } = request.data;

        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        }, () => {
            if (chrome.runtime.lastError) {
                console.error('Erro ao injetar o script de conteúdo:', chrome.runtime.lastError.message);
                sendResponse({ success: false, error: chrome.runtime.lastError.message });
                return;
            }

            const port = chrome.tabs.connect(tabId, { name: 'extractionChannel' });

            port.onDisconnect.addListener(() => {
                console.log('Port desconectado.');
            });

            port.postMessage({
                action: 'extractBets',
            });

            port.onMessage.addListener((response) => {
                if (response.success) {
                    sendResponse({ success: true, data: response.data });
                } else {
                    sendResponse({ success: false, error: response.error });
                }
                port.disconnect();
            });
        });

        return true;
    }
});
