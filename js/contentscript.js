// build options link in black menu
document.getElementById('gbom').innerHTML = document.getElementById('gbom').innerHTML + 
		'<li><div class="gbmt gbmh"></div></li>' + // separator
		'<li>' +
			'<a href="#" class="gbmt" onclick="' + 
					'document.location.href=\'' + chrome.extension.getURL('options.html?refer=keep') + '\'; return false;">' +
				'Options' +
			'</a>' +
		'</li>';

// insert new element to body
function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

var options_button = '<div id="keep_options" data-tooltip="Options" onclick="window.open(\'' + 
		chrome.extension.getURL('options.html') + 
		'\');"><div class="icon"></div></div>';

document.getElementsByClassName('notes-container')[0].childNodes[1].childNodes[1].childNodes[0]
	.insertAdjacentHTML('beforeend', options_button);
// You can use native DOM methods to insert the fragment:
//document.body.insertBefore(create(element), document.body.childNodes[0]);

// TODO: build listener to create new notes

/*
function newNote() {
	console.log('hello');
	document.getElementsByTagName('textarea')[0].click();
}

newNote();
*/
