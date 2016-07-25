var apiKey = 'AIzaSyDRTXMhmEXbSGuIAzWFwpP4eIQTIyNSnSc';
var clientId = '563107140751-a15af7rpl8nu88i5srh1vgcb8r54u6uh.apps.googleusercontent.com';
var scopes = 'profile';
var auth2;

function handleGoogleClientLoad() {
  gapi.load('client:auth2', function() {
    gapi.client.setApiKey(apiKey);
    gapi.auth2.init({
        client_id: clientId,
        scope: scopes
    }).then(function () {
      auth2 = gapi.auth2.getAuthInstance();
      auth2.isSignedIn.listen(handleGoogleLoginComplete);
      handleGoogleLoginComplete(auth2.isSignedIn.get())
    });
  });
}


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

  window.handleGoogleClientLoad = handleGoogleClientLoad;

  $('#loginContainer').on('click', '#loginGoogle', handleGoogleLogin);
  $('#loginContainer').on('click', '#logoutGoogle', handleGoogleLogout);
  $('#categories').on('click', '.label', handleToggleCategory);
  $('#main').on('click', 'article', handleToggleBookmark);
}

function handleGoogleLogin() {
  auth2.signIn();
}

function handleGoogleLogout() {
  auth2.signOut();
}

function handleGoogleLoginComplete(isSignedIn) {
  if (isSignedIn) {
    gapi.client.load('people', 'v1', function() {
      var request = gapi.client.people.people.get({
        resourceName: 'people/me'
      });
      request.execute(function(resp) {
        var googleId = resp.metadata.sources[0].id;
        var googleName = resp.names[0].displayName;
        handleLogin(googleId, googleName);
      });
    });
  } else {
    model = {
      loggedIn: false,
      userId: undefined,
      username: undefined,
      categories: undefined,
      articles: undefined
    };
    renderLogin();
    renderCategories();
    renderArticles();
  }
}

function handleLogin(googleId, username) {
  $.post('/login', { username: googleId }, function (data) {
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

$(document).ready(setup);
