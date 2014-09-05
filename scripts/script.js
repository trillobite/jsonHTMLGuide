
var templates = {
    //Holds the text for the Guide.
	textDiv: function(rawData, id) {
		return $jConstruct('div', {
		    id: id,
		    class: 'textLeft',
		    text: rawData, 
		});
	},
    
    //Holds everything except the NAV... I think...
    docBody: $jConstruct('div', {
        id: 'docBody',
        text: '<h5>Welcome to,</h5><h1 style="color: #CC6600">The jsonHTML Guide</h1>',
    }),
    
    navigation: function(tutorialBody) {
        //Function that changes the text of the Body.
        var changeText = function(filePath) {
            project.getData(filePath)().done(function(data) {
                tutorialBody.text = data;
                tutorialBody.refresh();
                function scrollToTop() {
                    $('html, body').animate({ scrollTop: 0 }, 'fast');
                }
                setTimeout(scrollToTop, 300);
            });
        };
        
        //Creates the Navigation Menu Links.
        var link = function(name, file) {
            return $jConstruct('div', {
                class: 'navigationButton',
                text: '<h5>' + name + '</h5>',
            }).event('click', function() {
                changeText('scripts/text/' + file);
            });
        };
        
        //All the links in the NAV menu.
        var navObjects = [
            link('Introduction', 'overview.txt').css({
                'background-color': '#d7d7d6', //The introduction is the "home"
            }),
            link('The Basics', 'usage.txt'),
            link('Appending Objects', 'appending.txt'),
            link('Styling Objects', 'styling.txt'),
            link('Adding Child Objects', 'children.txt'),
            link('Utilizing Your Database', 'usingDb.txt'),
            link('Adding Events', 'eventing.txt'),
            link('Refreshing Your Objects', 'refresh.txt'),
            link('Experimental Exploits', 'experimental.txt'),
            link('Download jsonHTML', 'download.txt'),
        ];
        
        //keeps the nav window contained and happy.
        var floatContainer = $jConstruct('div', {
            id: 'box',
        });
        
        //Main div for the Navigation menu.
        var navigation = $jConstruct('div', {
            id: 'nav',
            text: '<h3 style="color: #CC6600">Navigation</h3>',
        });
        
        //makes sure the nav keeps track of where it's at!
        $.each(navObjects, function(indx, obj) { 
            obj.event('click', function() {
                $.each(navObjects, function(indx2, obj2) {
                    obj2.css({
                        'background-color': 'white',
                    });
                });
                obj.css({
                    'background-color': '#d7d7d6',
                });
            })
            navigation.addChild(obj);
        });
        
        floatContainer.addChild(navigation);
        return floatContainer;
    },
    
    //Everything should be contained in this.
    container: function() {
        return $jConstruct('div', {
            id: 'container',
            class: 'center',
        });
    },
};

var project = {
    //Opends the text files, sends the data on resolve.
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