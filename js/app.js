// model
var model = {
	loggedIn: false,
	userID: 'userid',
	username: 'person',
	categories: [
		{
			category: 'long-form',
			selected: false
		},
		{
			category: 'entertainment',
			selected: false
		}
	],
	articles: [
		{
			imageURL: 'http://i.amz.mshcdn.com/wB2HLbw1XpLwzQBnaQivWm-KD_4=/950x534/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fstory%2Fthumbnail%2F15170%2Fsddefault.jpg',
			url: 'http://mashable.com/2016/07/21/cheap-thrills-veena-cover/',
			headline: 'Indian musician sisters give Sia\'s \'Cheap Thrills\' a soulful instrumental remix',
			label: 'entertainment',
			deck: '"Cheap Thrills" like you\'ve never heard before.',
			source: 'Mashable',
			bookmarked: 'true'
		}
	]
};

// view
var templateLogin;
var templateCategories;
var templateArticles;

function compileTemplates() {
	var loginData = $('#login-template').html();
	templateLogin = Handlebars.compile(loginData);

	var categoryData = $('#categories-template').html();
	templateCategories = Handlebars.compile(categoryData);

	var articleData = $('#articles-template').html();
	templateArticles = Handlebars.compile(articleData);
}

function renderLogin() {
	var renderedTemplate = templateLogin(model);
	$('#loginContainer').html(renderedTemplate);
}

function renderCategories() {
	var renderedTemplate = templateCategories(model);
	$('#categories').html(renderedTemplate);
}

function renderArticles() {
	var renderedTemplate = templateArticles(model);
	$('#main').html(renderedTemplate);
}

// controller
function setup() {
	compileTemplates();
	renderLogin();

	// Event listeners
	renderArticles();
	renderCategories();
	$('#loginContainer').on('click', '#loginSubmit', handleLogin);
}

function handleLogin() {
	model.username = $('#username').val();
	model.loggedIn = true;
	// Send AJAX Post request here, then render
	renderLogin();
}

$(document).ready(setup);
