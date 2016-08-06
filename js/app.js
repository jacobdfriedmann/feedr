// model

var model = {
	userId: 0,
	username: '',
	access_token: '',
	loggedIn: false,
	categories: [],
	articles: []
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
	$('#main').on('click', 'article', toggleBookmarks);


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
		getCategories();
		getArticles();
	});
	}	
	
	function getCategories() {
			var url = '/categories?userId=';
			var user = model.userId;

			$.get(url + user, function(response) {
				model.categories = response;
				renderCategories();
			});
			
		}

	function getArticles() {
		var user = model.userId;
		var url = '/feed?userId=';

			$.get(url + user, function(response) {
				model.articles = response;
				renderArticles();
			});
		}


	function toggleCategories() {
		var categoryName = $(this).attr('data-name');
		var selected = $(this).hasClass('label-primary');
		var user = model.userId;
		var url = '/interests/'+categoryName+'?userId='+user;

		if (selected) {
			$.ajax({
				type: 'DELETE',
				url: url,
				success: function(){
					getCategories();
					getArticles();
				}
			});
		} else {
			$.post(url, function(){
				getCategories();
				getArticles();

			});
		}

	}


	function toggleBookmarks() {
		var articleIndex = $(this).index(); //couldn't get this to work using $(this).attr()
  		var article = model.articles[articleIndex];
  		var articleId = article.id;
		var bookmarked = article.bookmarked;
		var user = model.userId;
		var url = '/bookmarks/'+articleId+'?userId='+user;

		console.log(articleId);

		if (bookmarked) {
			$.ajax({
				type: 'DELETE',
				url: url,
				success: function(){
					getArticles();
				}
			});
		} else {
			$.post(url, function(){
				getArticles();
			});
		}

	}


		
	});




