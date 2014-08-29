
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
};

$(document).ready(function() {
	var main = $jConstruct('div', {
		id: 'docBody',
		text: '<h1>jsonHTML</h1>',
	});
	
	project.getData('overview.txt')().done(function(data) {
	    data = data.replace(/(\r\n|\n|\r)/gm, '</p><p>');
	    data = '<p>' + data + '</p>';
	    console.log(data);
	    main.addChild($jConstruct('div', {
	        class: 'textLeft',
	        text: data,
	    }));
	    console.log(main);
	    main.appendTo('body');
	});
});