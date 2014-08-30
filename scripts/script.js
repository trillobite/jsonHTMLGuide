
var templates = {
	textDiv: function(rawData, id) {
		return $jConstruct('div', {
		    id: id,
		    class: 'textLeft',
		    text: rawData, 
		});
	},
    
    docBody: $jConstruct('div', {
        id: 'docBody',
        text: '<h1>jsonHTML</h1>',
    }),
    
    navigation: function(tutorialBody) {
        var changeText = function(filePath) {
            project.getData(filePath)().done(function(data) {
                tutorialBody.text = data;
                tutorialBody.refresh();
            });
        };
        var navObjects = [
            $jConstruct('div', {
                id: 'navOverview',
                text: '<h5>Introduction</h5>',
            }).event('click', function() {
                changeText('scripts/text/overview.txt');
            }).css({
                'background-color': '#d7d7d6',
            }),
            
            $jConstruct('div', {
                id: 'navUsage',
                text: '<h5>The Basics</h5>',
            }).event('click', function() {
            	changeText('scripts/text/usage.txt');
            }),
            
            $jConstruct('div', {
                id: 'navAppending',
                text: '<h5>Appending Objects</h5>'
            }).event('click', function() {
                changeText('scripts/text/appending.txt');
            }),
            
            $jConstruct('div', {
                id: 'navStyling',
                text: '<h5>Styling Objects</h5>'
            }).event('click', function() {
                changeText('scripts/text/styling.txt');
            }),
            
            $jConstruct('div', {
                id: 'navAddChild',
                text: '<h5>Adding Child Objects</h5>',
            }).event('click', function() {
                changeText('scripts/text/children.txt');
            }),
            
            $jConstruct('div', {
                id: 'navUtilize',
                text: '<h5>Utilizing Your Database</h5>',
            }).event('click', function() {
                changeText('scripts/text/usingDb.txt');
            }),
            
            $jConstruct('div', {
                id: 'navEvents',
                text: '<h5>Adding Events</h5>',
            }).event('click', function() {
                changeText('scripts/text/eventing.txt');
            }),
            
            $jConstruct('div', {
                id: 'navRefresh',
                text: '<h5>Refreshing Your Objects</h5>',
            }).event('click', function() {
                changeText('scripts/text/refresh.txt');
            }),
            
            $jConstruct('div', {
                id: 'navExperimental',
                text: '<h5>Experimental Exploits</h5>',
            }).event('click', function() {
                changeText('scripts/text/experimental.txt');
            }),
            
            $jConstruct('div', {
                id: 'navDownload',
                text: '<h5>Download jsonHTML<h5>',
            }).event('click', function() {
                changeText('scripts/text/download.txt');
            }),
        ];
        
        var navigation = $jConstruct('div', {
            id: 'nav',
            text: '<h3>Navigation</h3>',
        });
        
        $.each(navObjects, function(indx, obj) { //make sure the nav keeps track of where it's at!
            obj.class = 'navigationButton';
            obj.event('click', function() {
                $('.navigationButton').each(function() {
                    this.style['background-color'] = 'white';
                });
                $('#'+obj.id).css({
                    'background-color': '#d7d7d6',
                });
            })
            navigation.addChild(obj);
        });
        
        return navigation;
    },
    
    container: function() {
        return $jConstruct('div', {
            id: 'container',
            class: 'center',
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
    var container = templates.container();
	var main = templates.docBody;
	project.getData('scripts/text/overview.txt')().done(function(data) {
	    var textField = templates.textDiv(data, 'textField');
	    main.addChild(textField);
	    container.addChild(main);
	    container.addChild(templates.navigation(textField));
	    container.appendTo('body');
	});
	
});