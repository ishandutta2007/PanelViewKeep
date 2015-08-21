var KEEP_TAB_ID = 0;
var KEEP_WINDOW_ID = 0;
var KEEP_URL = 'https://keep.google.com/';
var KEEP_WINDOW_TYPE = 'normal';

chrome.storage.sync.get('window_type', function(items) {
	if (items.window_type !== undefined) {
		KEEP_WINDOW_TYPE = items.window_type;
	}
});

chrome.storage.sync.get('icon_alt', function(items) {
	chrome.browserAction.setIcon({ 'path': 'dist/img/icon_16' + (items.icon_alt ? '_alt' : '') + '.png' }, function() {});
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
        if (KEEP_TAB_ID > 0) {
            chrome.tabs.get(KEEP_TAB_ID, function(tab) {
                if (tab.url.indexOf(KEEP_URL) == -1) {
                    createKeep();
                } else {
                    chrome.windows.get(KEEP_WINDOW_ID, function(window) {
                        chrome.windows.update(KEEP_WINDOW_ID, { focused: true });
                        chrome.tabs.update(KEEP_TAB_ID, { active:true }, function(tab) {});
                    });
                }
            });
        } else {
            chrome.windows.get(KEEP_WINDOW_ID, function(window) {
                chrome.windows.update(KEEP_WINDOW_ID, { focused: true });
            });
        }
	} else {
        createKeep();
	}
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	if (request.greeting == 'create') {
		if (typeof request.type != 'undefined') {
			KEEP_WINDOW_TYPE = request.type;

			chrome.storage.sync.set({ 'window_type': KEEP_WINDOW_TYPE }, function() {
				// do nothing
			});

		}

		if (KEEP_TAB_ID === 0 && KEEP_WINDOW_ID > 0) {
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

	if (request.greeting == 'icon') {
		if (typeof request.alt != 'undefined') {
			chrome.storage.sync.set({ 'icon_alt': request.alt }, function() {
				chrome.browserAction.setIcon({ 'path': 'dist/img/icon_16' + (request.alt ? '_alt' : '') + '.png' }, function() {
					sendResponse({ farewell: request.alt });
				});
			});
		}
	}
});
