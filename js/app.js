// Model

var model = {
  loggedIn: true,
  userId: '1234',
  username: 'jacob',
  categories: [
    {
      name: 'science',
      selected: false
    },
    {
      name: 'politics',
      selected: true
    }
  ],
  articles: [
    {
      "id": -1738676198,
      "title": "Review: In ‘Jason Bourne,’ a Midlife Crisis for a Harried Former Assassin",
      "url": "http://www.nytimes.com/2016/07/29/movies/jason-bourne-matt-damon-review.html",
      "imageUrl": "https://static01.nyt.com/images/2016/07/29/arts/29JASONBOURNE1SUB/29JASONBOURNE1SUB-thumbStandard.jpg",
      "description": "Matt Damon returns in a film in which geopolitics and technology are scaffolding for what is essentially a story about human resources challenges in a large bureaucracy.",
      "category": "movies",
      "date": "2016-07-29T04:00:00.000Z",
      "source": "New York Times",
      "bookmarked": false
    },
    {
      "id": -2083806667,
      "title": "Google Silences Doubters With Blockbuster Quarter",
      "url": "http://www.nytimes.com/2016/07/29/technology/alphabet-google-earnings.html",
      "imageUrl": "https://static01.nyt.com/images/2016/07/29/business/29ALPHABET-1469744816857/29ALPHABET-1469744816857-thumbStandard.jpg",
      "description": "It was a major recovery from a lukewarm previous quarter, proving that the internet behemoth still has room and energy to grow.",
      "category": "tech",
      "date": "2016-07-29T04:00:00.000Z",
      "source": "New York Times",
      "bookmarked": true
    }
  ]
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
  renderArticles();
  renderCategories();
}

$(document).ready(setup);
