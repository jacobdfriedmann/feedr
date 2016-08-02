// model

var model = {
	userId: 0,
	username: '',
	access_token: '',
	loggedIn: false,
	categories: [
	{
		name: 'memes',
		selected: false
	},
	{
		name: 'design',
		selected: true
	}
	],
	articles: [
	{
	id: -595284414,
    title: 'MashReads Podcast: "Listen to Me" takes you on the road trip from your nightmares',
    url: 'http://mashable.com/2016/07/20/listen-to-me-mashreads-podcast/',
    imageUrl: 'http://i.amz.mshcdn.com/qSwzoAgsMSJbfaSuY5dj_JKaLAM=/950x534/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F150784%2Flisten-to-me.jpg',
    description: 'Buckle up!',
    category: 'entertainment',
    date: '',
    source: 'Mashable',
    bookmarked: false
	},
	{
	id: -092835902,
	title: 'Indian musician sisters give Sia\'s "Cheap Thrills" a soulful instrumental remix',
	url: 'http://mashable.com/2016/07/21/cheap-thrills-veena-cover/',
	imageUrl: 'http://i.amz.mshcdn.com/wB2HLbw1XpLwzQBnaQivWm-KD_4=/950x534/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fstory%2Fthumbnail%2F15170%2Fsddefault.jpg',
	description: '"Cheap Thrills" like you\'ve never heard before.',
	category: 'entertainment',
	date: '',
	source: 'Mashable',
	bookmarked: true
	}
	]
};

//view
var categoryTemplate;
var articleTemplate;
var loginTemplate;

$ (document).ready (function(){
	var categoryTemplateSource = $('#categories-template').html();
	var articleTemplateSource = $('#articles-template').html();
	var loginTemplateSource = $('#login-template').html();

	categoryTemplate = Handlebars.compile(categoryTemplateSource);
	articleTemplate = Handlebars.compile(articleTemplateSource);
	loginTemplate = Handlebars.compile(loginTemplateSource);

});

function renderCategories() {
	var categoriesHtml = categoryTemplate(model);
	$('#categories').html(categoriesHtml);
}

function renderArticles() {
	var articlesHtml = articleTemplate(model);
	$('#main').html(articlesHtml);
}

function renderLogin() {
	var loginHtml = loginTemplate(model);
	$('#loginContainer').html(loginHtml);
}


//controller
	$(document).ready(function() {
		renderLogin();
	

	//event listeners
	$('#loginContainer').on('click', '#loginSubmit', processLogin);
	$('#categories').on('click', 'span', toggleCategories);


	function processLogin() {
	var name = $('input[id="username"]').val();
	var loginData = {
		username: name
	};
	var url = '/login';

	$.post(url, loginData, function(loginResponse){
		model.username = name;
		model.userId = loginResponse.userId;
		model.loggedIn = true;
		renderLogin();
	});

	//get categories & feed for this user, rerender


	}
	

		//get username

		//process login

		//first render
		

		renderArticles();
		renderCategories();
	});




