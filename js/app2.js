// Your code here
//MODEL
var categories =[];

var articles = [
	{ 
		"id": -595284414,
		"title": "My Article",
	    "url": "http://example.com",
	    "imageUrl": "http://example.com/feature.png",
	    "description": "This is an article about the world",
	    "category": "science",
	    "date": "2016-07-21T11:08:24.000Z",
	    "source": "Mashable",
	    "bookmarked": false
	}
];

var user = {
	loggedIn: false,
	username: "",
	userId: 0
};	

//VIEW
function setupLogin(){
	$('#loginContainer').html('');
	var source = $('#login-template').html();
	var template = Handlebars.compile(source);
	var loginDisplay = template(user);
	$('#loginContainer').append(loginDisplay);
}

function renderCategories() {
	$('#categories').html('');
	$.ajax({
		type: 'GET',
		url: 'http://www.localhost:3010/categories?userId=' + user.userId,
		success: function(data) {
			categories = data;
		}
	});
	var source = $('#categories-template').html();
	var template = Handlebars.compile(source);
	for (var i = 0; i < categories.length; i++) {
		$('#categories').append(template(categories[i]));
	}
}

function renderArticles(){
	$('#main').html('');
	var source = $('#articles-template').html();
	var template = Handlebars.compile(source);

	for (var i = 0; i < articles.length; i++) {
		$('#main').append(template(articles[i]));
	}
}

//CONTROLLER
function setup() {
	renderCategories();
	renderArticles();
	$('#loginSubmit').on('click', login);
}

function login() {
	user.username = $('#username').val();
	user.loggedIn = true;
	setupLogin();
	$.ajax({
		type: 'POST',
		url: 'http://www.localhost:3010/login?username=' + user.username,
		sucess: function(data) {
			user.userId = data["userId"];
		}
	});
	renderArticles();
	renderCategories();
}


$(document).ready(setup);