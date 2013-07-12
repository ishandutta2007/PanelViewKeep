
chrome.storage.local.get([ 'contextMenu' ], function(items) {

	if (items.contextMenu && items.contextMenu == true) {

		var contexts = [ 'all', 'page', 'frame', 'selection', 'link', 'editable', 'image', 'video', 'audio' ];
		var parent = chrome.contextMenus.create({
			title: 'Google Keep',
			contexts: contexts
		});

		chrome.contextMenus.create({
			title: 'Open Keep',
			parentId: parent,
			contexts: contexts,
			onclick: function(info, tab) {
				goToKeep();
			}
		});

		/** sad paul wishes this code would work in panel mode **/
		
		// utility function to handle creating new note inside Keep
		function putIntoKeep() {
			if (KEEP_TAB_ID === 0) {
				setTimeout(putIntoKeep, 50);
				return;
			}
			
			var code = ""
					+ "document.getElementsByTagName('textarea')[0].focus();"
					+ "document.getElementsByTagName('textarea')[0].click();"
					+ "document.getElementsByTagName('textarea')[0].value = '" + KEEP_OBJ + "';"
					+ "document.getElementsByTagName('textarea')[0].click();";
			console.log(code);
			chrome.tabs.executeScript(KEEP_TAB_ID, { code: code });
		}

		chrome.contextMenus.create({
			title: 'Create new note',
			parentId: parent,
			contexts: contexts,
			onclick: function(info, tab) {
				KEEP_OBJ = '';
				goToKeep();
				putIntoKeep();
			}
		});
		
		chrome.contextMenus.create({
			title: 'Copy page URL to Keep',
			parentId: parent,
			contexts: contexts,
			onclick: function(info, tab) {
				KEEP_OBJ = tab.url;
				goToKeep();
				putIntoKeep();
			}
		});

		chrome.contextMenus.create({
			title: 'Copy text to Keep',
			parentId: parent,
			contexts: [ 'selection' ],
			onclick: function(info, tab) {
				KEEP_OBJ = info.selectionText;
				goToKeep();
				putIntoKeep();
			}
		});

		// link to new note
		chrome.contextMenus.create({
			title: 'Copy link to Keep',
			parentId: parent,
			contexts: [ 'link' ],
			onclick: function(info, tab) {
				KEEP_OBJ = info.linkUrl;
				goToKeep();
				putIntoKeep();
			}
		});

		// image to new note
		chrome.contextMenus.create({
			title: 'Copy image path to Keep',
			parentId: parent,
			contexts: [ 'image' ],
			onclick: function(info, tab) {
				KEEP_OBJ = info.srcUrl;
				goToKeep();
				putIntoKeep();
			}
		});
		
		/** end sad unusable code **/
		
	}
});
