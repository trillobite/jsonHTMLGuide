
var templates = {
	textDiv: function(rawData, id) {
		var text = project.parseRaw(rawData);
		return $jConstruct('div', {
		    id: id,
		    class: 'textLeft',
		    text: text, 
		});
	},
    
    docBody: $jConstruct('div', {
        id: 'docBody',
        text: '<h1>jsonHTML</h1>',
    }),
};

var project = {
	getData: function(fileName) {
		var dfd = new $.Deferred();
	    $.get(fileName, function(data) {
	    	dfd.resolve(data);
	    });
	    return dfd.promise;
    },
    parseRaw: function(raw) {
        raw = raw.replace(/(\r\n|\n|\r)/gm, '</p><p>');
        raw = '<p>' + raw + '</p>';
        return raw;
    },
};

$(document).ready(function() {
	var main = templates.docBody;
	project.getData('overview.txt')().done(function(data) {
	    main.addChild(templates.textDiv(data, 'textField'));
	    main.appendTo('body');
	});
});