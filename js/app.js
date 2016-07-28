// Model
var user = {
    loggedin: false,
    id: '',
    name: 'jacob'
}
var categories = [
    {
        category: 'long-form',
        status: 'default'
    },
    {
        category: 'entertainment',
        status: 'primary'
    },
    {
        category: 'world',
        status: 'primary'
    },
    {
        category: 'politics',
		status: 'default'
    },
    {
        category: 'science',
		status: 'default'
    },
    {
        category: 'sports',
		status: 'default'
    },
    {
        category: 'tech',
		status: 'primary'
    },
    {
        category: 'food',
		status: 'default'
    },
    {
        category: 'drugs',
		status: 'default'
    },
    {
        category: 'music',
		status: 'default'
    },
    {
        category: 'lifestyle',
		status: 'default'
    }
    ];
var articles = [
    {
        image: 'http://i.amz.mshcdn.com/L_9u_4ZUmVyyh4UmK7mdFUCRxRc=/950x534/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fstory%2Fthumbnail%2F15058%2Fe082211bc6dd4805955737eb42cb3037.png',
        url: 'http://mashable.com/2016/07/20/tiffany-trump-pop-song/',
        title: 'Anyway, here\'s Tiffany Trump\'s pop song',
        text: 'Back in 2011, when a Donald Trump presidency was just just a daydream in his head, daughter Tiffany Trump had a different dream: To make pop music.',
        category: 'entertainment',
        source: 'Mashable',
        bookmarked: true
    }
];

// View
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

    //$('#categories').empty();
    //categories.forEach(function(cat){
        $('#categories').html(categoriesTemplate(categories));
    //});

    //$('#articles').empty();
    //articles.forEach(function(art){
        $('#articles').append(articlesTemplate(articles));
    //});
}

// Controller
document.ready(function() {

});