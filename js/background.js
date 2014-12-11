var KEEP_TAB_ID = 0;
var KEEP_WINDOW_ID = 0;
var KEEP_URL = 'https://keep.google.com/';
var KEEP_WINDOW_TYPE = 'normal';

function createKeep() {
	if (KEEP_WINDOW_TYPE === 'normal') {
		chrome.tabs.create({
			url: KEEP_URL,
			active: true
		}, function(tab) {});
	} else {
		chrome.windows.create({
			url: KEEP_URL,
			type: 'panel',
			focused: true,
			width: 400
		}, function(window) {});
	}
}

function goToKeep() {
	if (KEEP_WINDOW_ID > 0) {
		chrome.windows.get(KEEP_WINDOW_ID, function(window) {
			chrome.windows.update(KEEP_WINDOW_ID, { focused: true });
			chrome.tabs.update(KEEP_TAB_ID, { active:true }, function(tab) {});
		});
	} else {
		chrome.windows.getAll({ populate:true }, function(windows) {
			for (var i = 0, window; window = windows[i]; i++) {
				for (var j = 0, tab; tab = window.tabs[j]; j++) {
					if (tab.url.indexOf(KEEP_URL) != -1) {
						chrome.tabs.update(tab.id, { selected: true });
						return;
					}
				}
			}
			createKeep();
		});
	}
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	
	if (request.greeting == 'create') {
		if (typeof request.type != 'undefined') {
			KEEP_WINDOW_TYPE = request.type;
		}
		
		if (KEEP_TAB_ID == 0 && KEEP_WINDOW_ID > 0) {
			chrome.windows.remove(KEEP_WINDOW_ID, function() {
			});
		} else {
			chrome.tabs.remove(KEEP_TAB_ID, function() {
			});
		}
		
		createKeep();
		sendResponse({ farewell: 'close current' });
	}
	
	if (request.greeting == 'getType') {
		sendResponse({ farewell: KEEP_WINDOW_TYPE });
	}
});