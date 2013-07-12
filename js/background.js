var KEEP_TAB_ID = 0;
var KEEP_WINDOW_ID = 0;
var KEEP_URL = 'https://drive.google.com/keep/';
var KEEP_WINDOW_TYPE = 'panel';
var KEEP_OBJ;

// override with localstorage
chrome.storage.local.get([ 'windowType' ], function(items) {
	if (items.windowType && items.windowType.length > 0) {
		KEEP_WINDOW_TYPE = items.windowType;
	}
});

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
		if (request.url != undefined) {
			KEEP_URL = request.url;
		}
		if (request.type != undefined) {
			KEEP_WINDOW_TYPE = request.type;
		}
		chrome.storage.local.set({ 'windowType': KEEP_WINDOW_TYPE }, function() {});
		
		if (KEEP_TAB_ID == 0 && KEEP_WINDOW_ID > 0) {
			chrome.windows.remove(KEEP_WINDOW_ID, function() {
				console.log('close window complete');
			});
		} else {
			chrome.tabs.remove(KEEP_TAB_ID, function() {
				console.log('close tab complete');
			});
		}
		
		createKeep();
		sendResponse({ farewell: 'close current' });
	}
	
	if (request.greeting == 'getType') {
		sendResponse({ farewell: KEEP_WINDOW_TYPE });
	}
	
	if (request.greeting == 'saveUrl') {
		if (request.url != undefined) {
			KEEP_URL = request.url;
			chrome.storage.local.set({ 'url': KEEP_URL }, function() {});
		}
		sendResponse({ farewell: 'done' });
	}
});