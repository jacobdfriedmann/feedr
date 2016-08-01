//MODEL
var model = {
  loggedIn: false,
  userId: '',
  username: '',
  categories: [],
  articles: []
};


//VIEW
var loginTemplate;
var categoryTemplate;
var articleTemplate;

function compileTemplates() {
  var loginSource = $('#login-template').html();
  loginTemplate = Handlebars.compile(loginSource);

  var categorySource = $('#categories-template').html();
  categoryTemplate = Handlebars.compile(categorySource);

  var articleSource = $('#articles-template').html();
  articleTemplate = Handlebars.compile(articleSource);
}

function renderLogin() {
	var display = loginTemplate(model);
	$('#loginContainer').html(display);
}

function renderCategories() {
	$('#categories').html('');
 	for (var i = 0; i < model.categories.length; i++) {
 		var display = categoryTemplate(model.categories[i]);
		$('#categories').append(display);
	}
}

function renderArticles() {
	$('#main').html('');
 	for (var i = 0; i < model.articles.length; i++) {
 		var display = articleTemplate(model.articles[i]);
		$('#main').append(display);
	}
}

//CONTROLLER
function setup() {
  compileTemplates();
  renderLogin();

  //event listeners
  $('#loginContainer').on('click', '#loginSubmit', login);
  $('#categories').on('click', 'span', toggleInterest);
  $('#main').on('click', 'article', toggleBookmark);
}

function login() {
  	var userInput = $('#usernameInput').val();
  	$.ajax({
    	url : '/login',
    	type: "POST",
    	data : {"username": userInput},
   		success: function(data) {
   			model.userId = data.userId;
   			model.username = userInput;
   			model.loggedIn = true;
   			renderLogin();
   			getCategories();
   			getFeed();
   			getBookmarks();
   		}
   	});
}

//getting stuff
function getCategories() {
	$.ajax({
		type: 'GET',
		url: '/categories?userId=' + model.userId,
		success: function(data) {
			model.categories = data;
			renderCategories();
		}
	});
}

function getFeed() {
	$.ajax({
		type: 'GET',
		url: '/feed?userId=' + model.userId,
		success: function(data) {
			model.articles = data;
			renderArticles();
		}
	});
}

function getBookmarks() {
	$.get('/bookmarks?userId='+ model.userId, function(data) {
		for (var i = 0; i < model.articles.length; i++) {
			var index = data.indexOf(model.articles[i].id)
			model.articles[i].bookmarked = index < 0? false : true;
		}
	});
	renderArticles();
}

//toggling categories and bookmarks
function toggleInterest() {
  var isUserInterest = $(this).hasClass('label-primary');
  var interestName = $(this).text();
  var url = '/interests/' + interestName + '?userId=' + model.userId;
  if (isUserInterest) {
    $.ajax({
      type: 'DELETE',
      url: url,
      success: function(data) {
      	getCategories();
      	getFeed();
      }
    });
  } else {
    $.post(url, function(data) {
      	getCategories();
      	getFeed();
    });
  }
}

function toggleBookmark() {
	var index = $(this).index();
	var article = model.articles[index]
	var id = article.id;
	var isBookmarked = article.bookmarked;
	var url = '/bookmarks/'+ id +'?userId=' + model.userId;
	if (isBookmarked) { 
    $.ajax({
      type: 'DELETE',
      url: url,
      success: function(data) {
      	getBookmarks();
      	getFeed();
      	}
    });

  	} else {
    $.post(url, function(data) {
      	getBookmarks;
      	getFeed();
    	});
  	}	
}


$(document).ready(setup);
