$(document).ready(function() {

  var model = {
    loggedIn: false,
    userId: undefined,
    username: undefined,
    categories: undefined,
    articles: undefined
  };

  function renderLogin() {
    var source = $('#login-template').html();
    var template = Handlebars.compile(source);
    var renderedTemplate = template(model);

    $('#loginContainer').html(renderedTemplate);
  }

  function renderCategories() {
    var source = $('#category-template').html();
    var template = Handlebars.compile(source);
    var renderedTemplate = template(model);

    $('#categories').html(renderedTemplate);
  }

  function renderArticles() {
    var source = $('#article-template').html();
    var template = Handlebars.compile(source);
    var renderedTemplate = template(model);

    $('#main').html(renderedTemplate);
  }

  function setup() {
    renderLogin();

    $('#loginContainer').on('click', '#loginSubmit', handleLogin);
    $('#categories').on('click', '.label', handleToggleCategory);
    $('#main').on('click', 'article', handleToggleBookmark);
  }

  function handleLogin() {
    var username = $('#username').val();
    $.post('/login', { username: username }, function (data) {
      model.loggedIn = true;
      model.userId = data.userId;
      model.username = username;

      loadCategories();
      loadArticles();
      renderLogin();
    });
  }

  function loadCategories() {
    $.get('/categories?userId=' + model.userId, function (data) {
      model.categories = data;

      renderCategories();
    });
  }

  function loadArticles() {
    $.get('/feed?userId=' + model.userId, function (data) {
      model.articles = data;

      renderArticles();
    });
  }

  function handleToggleCategory() {
    var category = $(this).text();
    if ($(this).hasClass('label-default')) {
      $.post('/interests/' + category + '?userId=' + model.userId, function (data) {
        loadCategories();
        loadArticles();
      });
    } else {
      $.ajax({
        type: 'DELETE',
        url: '/interests/' + category + '?userId=' + model.userId,
        success: function (data) {
          loadCategories();
          loadArticles();
        }
      });
    }
  }

  function handleToggleBookmark() {
    var articleIndex = $(this).index();
    var article = model.articles[articleIndex];
    var articleId = article.id;
    var bookmarked = article.bookmarked;

    if (!bookmarked) {
      $.post('/bookmarks/' + articleId + '?userId=' + model.userId, function (data) {
        loadArticles();
      });
    } else {
      $.ajax({
        type: 'DELETE',
        url: '/bookmarks/' + articleId + '?userId=' + model.userId,
        success: function (data) {
          loadArticles();
        }
      });
    }
  }

  setup();
});
