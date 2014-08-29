
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
	getData: function(fileName) {
		var dfd = new $.Deferred();
	    $.get(fileName, function(data) {
	    	dfd.resolve(data);
	    });
	    return dfd.promise;
    },
    renderBody: function(data) {
    	return $jConstruct('div', {
    		text: data,
    	});
    },
	render: function() {
		return $jConstruct('div', {
			id: 'docBody',
			text: '<h1>jsonHTML</h1>',
			
		});
	},
};

$(document).ready(function() {
	var main = project.render();
	project.getData('overview.txt').done(function(data) {
		main.addChild(project.renderBody(data)).appendTo('body');
	});
});