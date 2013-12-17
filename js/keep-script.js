$(document).ready(function() {
	
	// build overlay and options dialog
	var dialogs = '';
	
	$.ajax({
		url: chrome.extension.getURL('/html/dialogs.html'),
		success: function(data, xhr, status) {
			$('body').append(data);
			
			$('.modal-dialog-title-close, .modal-dialog-buttons button.goog-buttonset-action').click(function() {
				$('.glass').addClass('hide');
				$(this).closest('.modal-dialog').addClass('hide');
			});
			$('.modal-dialog-buttons button.donate').click(function() {
				window.open('http://bit.ly/paneldonate');
			});
			chrome.storage.local.get([ 'contextMenu' ], function(items) {
				if (items.contextMenu && items.contextMenu == true) {
					$('#options_contextMenu').attr('checked', true);
				}
			});
			$('#options_contextMenu').click(function() {
				if ($('#options_contextMenu').attr('checked') == undefined) {
					chrome.storage.local.set({ 'contextMenu': false }, function() {});
				} else {
					chrome.storage.local.set({ 'contextMenu': true }, function() {});
				}
			});
		}
	});
	
	// add send to tab/panel link
	var windowType = '';
	chrome.runtime.sendMessage({ greeting: 'getType' }, function(response) {
		windowType = response.farewell;
		
		// add options link
		var sendLink = '<a class="hSRGPd keep_ext_options" href="#" data-open="options">Panel View Options</a>';
		if (windowType == 'normal') {
			sendLink += '<a class="hSRGPd keep_ext_sendto" href="#" data-type="panel">Send to Panel</a>';
		} else {
			sendLink += '<a class="hSRGPd keep_ext_sendto" href="#" data-type="normal">Send to Tab</a>';
		}
		
		$('div.hSRGPd-haAclf').prepend(sendLink);
	});
	
	// send to tab/panel click
	$('div.hSRGPd-haAclf').on('click', '.keep_ext_sendto', function() {
		var url = location.href;
		var type = $(this).attr('data-type');
		
		chrome.runtime.sendMessage({ greeting: 'create', url: url, type: type }, function(response) {
		});
	});
	
	// options click
	$('div.hSRGPd-haAclf').on('click', '.keep_ext_options', function() {
		var openAttr = $(this).attr('data-open');
		$('.glass, #' + openAttr + '-dialog').removeClass('hide');
	});
	
	// save location on page load (so that switching accounts triggers a url save)
	chrome.runtime.sendMessage({ greeting: 'saveUrl', url: window.location.href }, function(response) {
	});
	
	// save url on going to and from archived notes
	$('.notes-container').on('click', '.yePe5c, .LgbsSe-Bz112c-a4fUwd', function() {
		chrome.runtime.sendMessage({ greeting: 'saveUrl', url: window.location.href }, function(response) {
		});
	});
	
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	// can't use this in a panel, because sendMessage needs a tab id
});
