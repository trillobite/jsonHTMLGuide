
var templates = {
	textDiv: function(textArray) {
		console.log(textArray);
		var text = "";
		$.each(textArray, function() {
			text += '<p>' + this + '</p>';
		});

		return $jConstruct('div', {
			class: 'textLeft',
			text: text,
		});
	},

	overviewFile: function() {
		return $jConstruct('iframe', {
			id: 'overviewFile',
			src: 'scripts/text/overview.txt',

		}).css({
			'display': 'none',
		});
	},

	fileToHTML: function(file, id) {
		return $jConstruct('iframe', {
			id: id,
			//class: 'dataBox',
			src: file,
			onload: "project.stuff('" + id + "');",
		});
	},

};

var project = {
	stuff: function(id) {
	    $.get('overview.txt', function(data) {
	    	console.log(data);
	    });
    },
	render: function() {
		return $jConstruct('div', {
			id: 'docBody',
			text: '<h1>jsonHTML</h1>',
			
		}).addChild(templates.fileToHTML('scripts/text/overview.txt', 'test')).appendTo('body');
	},
};

$(document).ready(function() {
	project.render();
	/*while (strRawContents.indexOf('\r') >= 0) {
		strRawContents = strRawContents.replace('\r', '');
	}
	var arrLines = strRawContents.split('\n');
	alert('file ' + oFrame.src + ' has ' + arrLines.length + ' lines');
	for (var i = 0; i < arrLines.length; ++i) {
		var curLine = arrLines[i];
		console.log('line #' + (i + 1) + ' is: "' + curLine + '"');
	}*/
	//templates.overviewFile().appendTo('body');
});