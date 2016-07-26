var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var jsonfile = require('jsonfile');
var schedule = require('node-schedule');
var FB = require('fb');
var app = express();
var port = 3010;

String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

// Models
var users = {};
var interests = {};
var bookmarks = {};
var articleCache = [];

var sources = [
  {
    url: 'http://mashable.com/stories.json',
    transform: transformMashable
  },
  {
    url: 'http://digg.com/api/news/popular.json',
    transform: transformDigg
  },
  {
    url: 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=0d8ad7103b64e4aff56f7927fe2e56f5:14:74987722',
    transform: transformNYT
  }
];

var categoryMap = {
  watercooler: 'entertainment',
  longreads: 'long-form',
  'late-night': 'entertainment',
  election2016: 'politics',
  warfare: 'world',
  technology: 'tech',
  'nyt now': 'world',
  'n.y. / region': 'world',
  'u.s.': 'politics',
  'business day': 'business'
};

function loadArticles(url, transform) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      articleCache = articleCache.concat(transform(JSON.parse(body)));
    }
  });
}

function refreshCache() {
  console.log('refreshing cache...');
  articleCache = [];
  sources.forEach(function(source) {
    loadArticles(source.url, source.transform);
  });
  articleCache.sort(function (a, b) {
    return a.date > b.date;
  });
}

function transformMashable(body) {
  return body.new.map(function (article) {
    return {
      id: article.link.hashCode(),
      title: article.title,
      url: article.link,
      imageUrl: article.image,
      description: article.excerpt,
      category: categoryMap[article.channel.toLowerCase()] ?
        categoryMap[article.channel.toLowerCase()] :
        article.channel.toLowerCase(),
      date: new Date(article.post_date),
      source: 'Mashable'
    };
  });
}

function transformDigg(body) {
  return body.data.feed.map(function (article) {
    return {
      id: article.content.url.hashCode(),
      title: article.content.title,
      url: article.content.url,
      imageUrl: article.content.media.images[0].url,
      description: article.content.description,
      category: categoryMap[article.content.tags[0].name] ?
        categoryMap[article.content.tags[0].name] :
        article.content.tags[0].name,
      date: new Date(article.date * 1000),
      source: 'Digg'
    };
  });
}

function transformNYT(body) {
  return body.results.map(function (article) {
    return {
      id: article.url.hashCode(),
      title: article.title,
      url: article.url,
      imageUrl: article.multimedia[0] && article.multimedia[0].url ?
        article.multimedia[0].url : null,
      description: article.abstract,
      category: categoryMap[article.section.toLowerCase()] ?
        categoryMap[article.section.toLowerCase()] :
        article.section.toLowerCase(),
      date: new Date(article.published_date),
      source: 'New York Times'
    };
  });
}

function writeToFile() {
  jsonfile.writeFile('users.json', users, function (err) {
    jsonfile.writeFile('interests.json', interests, function (err) {
      jsonfile.writeFile('bookmarks.json', bookmarks, function (err) {
        process.exit(0);
      });
    });
  });
}

function readFromFile() {
  jsonfile.readFile('users.json', function (err, obj) {
    users = obj ? obj : users;
  });
  jsonfile.readFile('interests.json', function (err, obj) {
    interests = obj ? obj : interests;
  });
  jsonfile.readFile('bookmarks.json', function (err, obj) {
    bookmarks = obj ? obj : bookmarks;
  });
}

readFromFile();
refreshCache();

var j = schedule.scheduleJob('*/2 * * * *', refreshCache);

process.on('SIGINT', writeToFile);

// Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE, OPTIONS, HEAD, PATCH');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Endpoints

app.post('/login', function (request, response) {
  var username = request.body.username;

  // If no username provided, give a 400 response
  if (!username) {
    return response.sendStatus(400);
  }

  // Look up or create user
  var userId = users[username];
  if (!userId) {
    users[username] = Date.now().toString().substr(-4);
    userId = users[username];
  }

  // Send response
  response.json({
    userId: userId
  });
});

app.post('/login-facebook', function (request, response) {
  var access_token = request.body.access_token;

  // If no username provided, give a 400 response
  if (!access_token) {
    return response.sendStatus(400);
  }

  FB.api('me', { fields: ['id', 'name'], access_token: access_token }, function (res) {
    console.log(res);
    // Look up or create user
    var userId = users[res.id];
    if (!userId) {
      users[res.id] = Date.now().toString().substr(-4);
      userId = users[res.id];
    }

    // Send response
    response.json({
      userId: userId,
      username: res.name
    });
  });
});

app.get('/interests', function (request, response) {
  var userId = request.query.userId;

  if (!userId) {
    return response.sendStatus(400);
  }

  var userInterests = interests[userId];
  if (!userInterests) {
    interests[userId] = [];
    userInterests = interests[userId];
  }

  response.json(userInterests);
});

app.post('/interests/:interest', function (request, response) {
  var userId = request.query.userId;
  var interest = request.params.interest;

  if (!userId || !interest) {
    return response.sendStatus(400);
  }

  if (!interests[userId]) {
    interests[userId] = [];
  }
  if (interests[userId].indexOf(interest) < 0) {
    interests[userId].push(interest);
  }

  response.json(interests[userId]);
});

app.put('/interests', function (request, response) {
  var userId = request.query.userId;
  var newInterests = request.body;

  if (!userId || !newInterests) {
    return response.sendStatus(400);
  }

  interests[userId] = newInterests;

  response.json(newInterests);
});

app.delete('/interests/:interest', function (request, response) {
  var userId = request.query.userId;
  var interest = request.params.interest;

  if (!userId || !interest) {
    return response.sendStatus(400);
  }

  if (!interests[userId]) {
    interests[userId] = [];
  }
  interests[userId] = interests[userId].filter(function (b) {
    return b !== interest;
  });

  response.json(interests[userId]);
});

app.get('/bookmarks', function (request, response) {
  var userId = request.query.userId;

  if (!userId) {
    return response.sendStatus(400);
  }

  var userBookmarks = bookmarks[userId];
  if (!userBookmarks) {
    bookmarks[userId] = [];
    userBookmarks = bookmarks[userId];
  }

  response.json(userBookmarks);
});

app.post('/bookmarks/:bookmark', function (request, response) {
  var userId = request.query.userId;
  var bookmark = parseInt(request.params.bookmark);

  if (!userId || !bookmark) {
    return response.sendStatus(400);
  }

  if (!bookmarks[userId]) {
    bookmarks[userId] = [];
  }
  if (bookmarks[userId].indexOf(bookmark) < 0) {
    bookmarks[userId].push(bookmark);
  }

  response.json(bookmarks[userId]);
});

app.put('/bookmarks', function (request, response) {
  var userId = request.query.userId;
  var newBookmarks = request.body;

  if (!userId || !newBookmarks) {
    return response.sendStatus(400);
  }

  bookmarks[userId] = newBookmarks;

  response.json(newBookmarks);
});

app.delete('/bookmarks/:bookmark', function (request, response) {
  var userId = request.query.userId;
  var bookmark = parseInt(request.params.bookmark);

  if (!userId || !bookmark) {
    return response.sendStatus(400);
  }

  if (!bookmarks[userId]) {
    bookmarks[userId] = [];
  }
  bookmarks[userId] = bookmarks[userId].filter(function (b) {
    return b !== bookmark;
  });

  response.json(bookmarks[userId]);
});

app.get('/categories', function(request, response) {
  var userId = request.query.userId;

  if (!userId) {
    return response.sendStatus(400);
  }

  var categories = [];

  articleCache.forEach(function (article) {
    if (categories.indexOf(article.category) < 0) {
      categories.push(article.category);
    }
  });

  var userInterests = interests[userId] || [];

  response.json(categories.map(function (category) {
    return {
      name: category,
      selected: userInterests.indexOf(category) >= 0
    }
  }));
});

app.get('/feed', function (request, response) {
  var userId = request.query.userId;

  if (!userId) {
    return response.sendStatus(400);
  }

  var userInterests = interests[userId] || [];
  var userArticles = articleCache.filter(function(article) {
    return userInterests.indexOf(article.category) >= 0;
  }).map(function (article) {
    return Object.assign(article, {
      bookmarked: bookmarks[userId] ? bookmarks[userId].indexOf(article.id) >= 0 : false
    });
  });

  response.json(userArticles);
});

app.use('/', express.static(__dirname));

// Start the server!

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
});
