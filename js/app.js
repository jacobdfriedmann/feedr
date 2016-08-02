// Model
var user = {
    loggedin: false,
    id: '',
    name: ''
}
/*var categories = [
    {
        name: 'long-form',
        selected: false
    },
    {
        name: 'entertainment',
        selected: true
    },
    {
        name: 'world',
        selected: true
    },
    {
        name: 'politics',
		selected: false
    },
    {
        name: 'science',
		selected: false
    },
    {
        name: 'sports',
		selected: false
    },
    {
        name: 'tech',
		selected: true
    },
    {
        name: 'food',
		selected: false
    },
    {
        name: 'drugs',
		selected: false
    },
    {
        name: 'music',
		selected: false
    },
    {
        name: 'lifestyle',
		selected: false
    }
    ];
var articles = [
    {
        id: '',
        title: 'Anyway, here\'s Tiffany Trump\'s pop song',
        url: 'http://mashable.com/2016/07/20/tiffany-trump-pop-song/',
        imageUrl: 'http://i.amz.mshcdn.com/L_9u_4ZUmVyyh4UmK7mdFUCRxRc=/950x534/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fstory%2Fthumbnail%2F15058%2Fe082211bc6dd4805955737eb42cb3037.png',
        description: 'Back in 2011, when a Donald Trump presidency was just just a daydream in his head, daughter Tiffany Trump had a different dream: To make pop music.',
        category: 'entertainment',
        date: '',
        source: 'Mashable',
        bookmarked: true
    }
];*/

// View
var loginTemplate;
var categoriesTemplate;
var articlesTemplate;

$(document).ready(function () {
	var templateSource;
    
    templateSource = $('#login-template').html();
	loginTemplate = Handlebars.compile(templateSource);

    templateSource = $('#categories-template').html();
	categoriesTemplate = Handlebars.compile(templateSource);

	templateSource = $('#articles-template').html();
	articlesTemplate = Handlebars.compile(templateSource);

    renderView();
});

function renderView() {
    $('#loginContainer').html(loginTemplate(user));

    $('#categories').html(categoriesTemplate(categories));

    $('#articles').html(articlesTemplate(articles));
}

// Controller
$(document).ready(function() {
    $('#loginContainer').on('click', 'button', function(){
        var username = $('#username').val();

        var url = 'http://localhost:3010/login';
        var data = {"username": username};
        $.ajax({
			type: 'POST',
			url: url,
            data: data,
			success: function(response){
                user.loggedin = true;
                user.name = username;
                user.id = response.userId;

                getCategories();
            }
		});
    });

    $('#categories').on('click','span', function(){
        categoryAction = ($(this).hasClass('label-default')) ? 'POST' : 'DELETE';
        var url = 'http://localhost:3010/interests/'+encodeURIComponent($(this).text())+'?userId='+user.id;

        $.ajax({
            type: categoryAction,
            url: url,
            success: function(response){
                console.log(response);

                getCategories();
            }
        });
    });

    $('#articles').on('click','article', function(){
        categoryAction = ($(this).attr('bookmarked')==='false') ? 'POST' : 'DELETE';
        var url = 'http://localhost:3010/bookmarks/'+$(this).attr('id')+'?userId='+user.id;

        $.ajax({
            type: categoryAction,
            url: url,
            success: function(response){
                console.log(response);

                getCategories();
            }
        });
    });
});

function getCategories() {
    var url = 'http://localhost:3010/categories?userId='+user.id;

    $.ajax({
        type: 'GET',
        url: url,
        success: function(response){
            categories = response;

            getFeed();
        }
    });
}
/*function getInterests() {
    var url = 'http://localhost:3010/interests?userId='+user.id;

    $.ajax({
        type: 'GET',
        url: url,
        success: function(response){
            console.log('Interests='+response);

            getFeed();
        }
    });
}*/

function getFeed() {
    var url = 'http://localhost:3010/feed?userId='+user.id;

    $.ajax({
        type: 'GET',
        url: url,
        success: function(response){
            articles = response;

            renderView();
        }
    });
}
