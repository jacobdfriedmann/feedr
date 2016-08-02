// Model

$(document).ready(function() {

var model = {
      loggedIn: false,
      userId: '',
      username: '',
      category: [],
      articles: []
  };

// View

function renderUser() {
  var templateSource = $('#user-template').html();
  var template = Handlebars.compile(templateSource);
  var templateRender = template(model);
  $('#loginContainer').html(templateRender);
};

renderUser();

// Controller
// event listners and ajax

$('#loginSubmit').on('click', addUser);

function addUser() {
  var user = $('#username').val();
  $.ajax {
    url: '/login',
    type: POST,
    data: { username: username },
  }
}

function renderArticles() {
  var templateSource = $('#article-template').html();
  var template = Handlebars.compile(templateSource);
  var templateRender = template(model);
  $('#main').html(templateRender);
};

renderArticles();

function getArticles() {

  $.get('/feed', function(data) {  
    model.article.id = data.id; 
    model.article.title = data.title; 
    model.article.url = data.url; 
    model.article.label = data.label;
    model.article.body = data.body;
    model.article.imageUrl = data.imageUrl;
    model.article.description = data.description;
    model.article.category = data.category;
    model.article.date = data.date;
    model.article.source = data.source;
    model.article.bookedmarked = data.bookedmarked

  renderView(); 
  });

}

});

// Setup Listeners 

// function renderView() {
//   var templateSource = $('#article-template').html();
//   var template = Handlebars.compile(templateSource);
//   var templateRender = template(articles[0]);
//   $('#main').html(templateRender);

//   //   for (var i = 0; i < articles.length; i++) {
//   //   $('#main').append()
//   // }
// };
