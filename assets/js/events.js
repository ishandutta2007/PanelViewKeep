chrome.browserAction.onClicked.addListener(goToKeep);

chrome.windows.onRemoved.addListener(function(windowId) {
	if (windowId == KEEP_WINDOW_ID) {
		KEEP_TAB_ID = 0;
		KEEP_WINDOW_ID = 0;
	}
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
	if (tabId == KEEP_TAB_ID) {
		KEEP_TAB_ID = 0;
		KEEP_WINDOW_ID = 0;
	}
});

chrome.windows.onCreated.addListener(function(window) {
	chrome.windows.get(window.id, { populate: true }, function(window) {
		if (window.tabs[0].url.indexOf(KEEP_URL) != -1) {
			if (KEEP_WINDOW_TYPE == 'panel') {
				KEEP_TAB_ID = 0;
			} else {
				KEEP_TAB_ID = window.tabs[0].id;
			}
			KEEP_WINDOW_ID = window.id;
		}
	});
});

chrome.tabs.onCreated.addListener(function(tab) {
	if (tab.url.indexOf(KEEP_URL) != -1) {
		KEEP_TAB_ID = tab.id;
		KEEP_WINDOW_ID = tab.windowId;
	}
});
