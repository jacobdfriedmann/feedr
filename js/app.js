// Model

var model = {
  loggedIn: false,
  userId: '',
  username: '',
  categories: [],
  articles: []
};

// View

var loginTemplate;
var categoryTemplate;
var articleTemplate;

function compileTemplates() {
  var loginSource = $('#login-template').html();
  loginTemplate = Handlebars.compile(loginSource);

  var categorySource = $('#category-template').html();
  categoryTemplate = Handlebars.compile(categorySource);

  var articleSource = $('#article-template').html();
  articleTemplate = Handlebars.compile(articleSource);
}

function renderLogin() {
  var renderedTemplate = loginTemplate(model);
  $('#loginContainer').html(renderedTemplate);
}

function renderCategories() {
  var renderedTemplate = categoryTemplate(model);
  $('#categories').html(renderedTemplate);
}

function renderArticles() {
  var renderedTemplate = articleTemplate(model);
  $('#main').html(renderedTemplate);
}

// Controller

function setup() {
  compileTemplates();
  renderLogin();

  // Event Listeners
  $('#loginContainer').on('click', '#loginSubmit', login);
  $('#categories').on('click', 'span', toggleInterest);
  $('#main').on('click', 'article', toggleBookmark);
}

function login() {
  var enteredUsername = $('#username').val();

  $.post('/login', {username: enteredUsername}, function (data) {
    model.username = enteredUsername;
    model.userId = data.userId;
    model.loggedIn = true;

    // Load categories and feed for this user, rerender
    loadCategories();
    loadArticles();
  });
}

function toggleInterest() {
  var isUserInterest = $(this).hasClass('label-primary');
  var interestName = $(this).text();
  var url = '/interests/' + interestName + '?userId=' + model.userId;

  if (isUserInterest) {
    $.ajax({
      type: 'DELETE',
      url: url,
      success: function() {
        loadCategories();
        loadArticles();
      }
    });
  } else {
    $.post(url, function() {
      loadCategories();
      loadArticles();
    });
  }
}

function toggleBookmark() {
  var articleIndex = $(this).index();
  var article = model.articles[articleIndex];
  var articleId = article.id;
  var bookmarked = article.bookmarked;
  var url = '/bookmarks/' + articleId + '?userId=' + model.userId;

  if (bookmarked) {
    $.ajax({
      type: 'DELETE',
      url: url,
      success: function() {
        loadCategories();
        loadArticles();
      }
    });
  } else {
    $.post(url, function() {
      loadCategories();
      loadArticles();
    });
  }
}

function loadCategories() {
  $.get('/categories?userId=' + model.userId, function(data) {
    model.categories = data;
    renderCategories();
  });
}

function loadArticles() {
  $.get('/feed?userId=' + model.userId, function(data) {
    model.articles = data;
    renderArticles();
  });
}

$(document).ready(setup);
