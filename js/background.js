var KEEP_TAB_ID = 0;
var KEEP_WINDOW_ID = 0;
var KEEP_URL = 'https://drive.google.com/keep/';

var KEEP_WINDOW_TYPE = 'panel';
var KEEP_WINDOW_WIDTH = 400;
var KEEP_WINDOW_HEIGHT = 400;

var KEEP_OBJ = '';

function getKeepUrl() {
  return KEEP_URL;
}

function createKeepPanel() {
	
	var type = KEEP_WINDOW_TYPE;
	var width = KEEP_WINDOW_WIDTH;
	var height = KEEP_WINDOW_HEIGHT;
	
	chrome.storage.local.get([ 'windowType', 'windowWidth', 'windowHeight' ], function(items) {
		if (items.windowType && items.windowType.length > 0) {
			type = items.windowType;
		}
		if (items.windowWidth && items.windowWidth > 0) {
			width = items.windowWidth;
		}
		if (items.windowHeight && items.windowHeight > 0) {
			height = items.windowHeight;
		}
		
		var windowObj;
		if (type == 'normal') {
			chrome.tabs.create({
				url: getKeepUrl(),
				active: true
			}, function(tab) {});
		} else {
			chrome.windows.create({
				url: getKeepUrl(),
				type: type,
				focused: true,
				width: width,
				height: height
			}, function(window) {});
		}
	});
}

function goToKeep() {
	if (KEEP_WINDOW_ID > 0) {
		chrome.windows.get(KEEP_WINDOW_ID, function(window) {
			chrome.windows.update(KEEP_WINDOW_ID, { focused: true });
			chrome.tabs.update(KEEP_TAB_ID, {active:true}, function(tab) {});
		});
	} else {
		chrome.windows.getAll({ populate:true }, function(windows) {
			for (var i = 0, window; window = windows[i]; i++) {
				for (var j = 0, tab; tab = window.tabs[j]; j++) {
					if (tab.url.indexOf(getKeepUrl()) != -1) {
						chrome.tabs.update(tab.id, { selected: true });
						return;
					}
				}
			}
			createKeepPanel();
		});
	}
}
