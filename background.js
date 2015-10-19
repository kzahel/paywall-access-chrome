chrome.contextMenus.create({id:"paywall",
                            title:chrome.i18n.getMessage('extName'),
                            contexts:["all"]})
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    console.log('contextmenu click',info,tab)
    if (info.linkUrl) {
        console.log('handling as link!')
        // context menu came from clicking on link...
        chrome.runtime.sendMessage("adpfpconnigelofkfenblmdhbnlaafkg", {title:info.selectionText || info.linkUrl})
    } else {
        chrome.runtime.sendMessage("adpfpconnigelofkfenblmdhbnlaafkg", {title:tab.title})
    }
})
                            


chrome.browserAction.onClicked.addListener(function(tab) {
    // access current tab data
    var content_script_fn = (function(config) {
        console.log("activeTab executeScript code");
        chrome.runtime.sendMessage("adpfpconnigelofkfenblmdhbnlaafkg", {
            title: document.title
        })
    })

    var config = {testint:123,teststring:'bananas'}
    var code = '(' + content_script_fn.toString() + ')' + '('+JSON.stringify(config)+')';
    console.log('injecting code:',code)
    chrome.tabs.executeScript(null, {code: code});
});

chrome.runtime.onMessage.addListener(function(msg){
    console.log('runtime message',msg)
    if (msg.title) {
        //https://www.google.com/search?sclient=psy-ab&site=&source=hp&q=Trump%2C+Bush+Intensify+Fight+Over+9%2F11%2C+Foreign+Policy&btnI=I%27m+Feeling+Lucky
        if (false) {
            // does not work, have to actually visit the google search results page. hm
            var url = "https://www.google.com/search?" +
                'sclient=psy-ab&site=&source=hp' +
                "&q=" + encodeURIComponent(msg.title) + "&btnI=I%27m+Feeling+Lucky"
        } else {
            var url = "https://www.google.com/search?q="+encodeURIComponent(msg.title)
        }
        
        chrome.windows.create({"url": url , "incognito": true});
    }
})
