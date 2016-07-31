// Your code here
// model
var Model = {
	articles: undefined,
	categories:undefined,
	username: undefined,
	userId: undefined,
	loggedIn: false,
	interest: undefined,
	bookmarks: [],
	loadCategories: function (){
		$.get("http://localhost:3010/categories?userId=" + this.userId, function(response) {
			console.log("Loading Categories...");
			console.log(response);
			Model.categories = response;
      View.renderCategories();
		});/// end of ajax request
	},
	loadArticles: function(){
		 $.get('/feed?userId=' + Model.userId, function (response) {
      Model.articles = response;
      View.renderArticles();
    });
	}
}// End of Model
	
// View
var View = {
  loginTemplate: undefined,
	categoriesTemplate: undefined,
	mainTemplate: undefined,

  init: function() {
    var loginTemplateSource = $('#login-template').html();
		var categoriesTemplateSource = $('#categories-template').html();
		var mainTemplateSource = $('#main-template').html();
  	
		this.loginTemplate = Handlebars.compile(loginTemplateSource);
		this.categoriesTemplate = Handlebars.compile(categoriesTemplateSource);
		this.mainTemplate = Handlebars.compile(mainTemplateSource);
  },
	
	renderLogin: function(){
	$('#loginContainer').html(this.loginTemplate(Model));
		console.log("Login rendered...")
	},
	
	renderCategories: function(){
		$('#categories').html(this.categoriesTemplate(Model));
		console.log("Categories rendered...")
	
	},
	
	renderArticles: function(){
		$('#main').html(this.mainTemplate(Model));
		console.log("Articles rendered...")
}
	
}	// end of View object	
// Controller

var Controller = {
	init: function(){
		View.renderLogin();
		$('#loginContainer').on('click', '#loginSubmit', this.handleLogin);
    $('#categories').on('click', '.label', this.handleCategory);
		$('#main').on('click', 'article', this.handleBookmarks);
	},

	handleLogin: function (event){
		var username = $('#username').val();
    $.post('/login', { username: username }, function (response) {
      Model.loggedIn = true;
      Model.userId = response.userId;
      Model.username = username;

      Model.loadCategories();
      Model.loadArticles();
      View.renderLogin();
    });
	
	},
	
	handleCategory: function (){
		var category = $(this).text();
    if ($(this).hasClass('label-default')) {
      $.post('/interests/' + category + '?userId=' + Model.userId, function (response) {
        Model.loadCategories();
        Model.loadArticles();
      });
    } else {
      $.ajax({
        type: 'DELETE',
        url: '/interests/' + category + '?userId=' + Model.userId,
        success: function (data) {
          Model.loadCategories();
          Model.loadArticles();
        }
      });
    }
	},
	
	handleBookmarks: function () {
    var articleIndex = $(this).index();
    var article = Model.articles[articleIndex];
    var articleId = article.id;
    var bookmarked = article.bookmarked;

    if (!bookmarked) {
      $.post('/bookmarks/' + articleId + '?userId=' + Model.userId, function (response) {
        Model.loadArticles();
      });
    } else {
      $.ajax({
        type: 'DELETE',
        url: '/bookmarks/' + articleId + '?userId=' + Model.userId,
        success: function (response) {
          Model.loadArticles();
        }
      });
    }
  }
	
} // end of controller

function setup() {
  View.init();
  Controller.init();
}
$(document).ready(setup);