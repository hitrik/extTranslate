chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting == "openTab")
            chrome.tabs.create({url: "http://webmaster40.ru"});
    });