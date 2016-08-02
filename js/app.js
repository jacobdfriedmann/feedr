//Model
var urlRoot = 'http://localhost:3010';

var user = {
	userId: "",
	username: ""
};

var categories = [
	"long-form",
	"entertainment",
	"world",
	"politics",
	"science",
	"sports",
	"tech",
	"food",
	"drugs",
	"music",
	"lifestyle"
];
/*
[
	{ category: "long-form", isSelected: false },
	{ category: "entertainment", isSelected: true },
	{ category: "world", isSelected: true },
	{ category: "politics", isSelected: false },
	{ category: "science", isSelected: false },
	{ category: "sports", isSelected: false },
	{ category: "tech", isSelected: true },
	{ category: "food", isSelected: false },
	{ category: "drugs", isSelected: false },
	{ category: "music", isSelected: false },
	{ category: "lifestyle", isSelected: false }
];
*/

var interests = [
	"entertainment",
	"world",
	"tech"
];

var articles = [
	{
		id: "article-0",
		imageUrl: "http://i.amz.mshcdn.com/wB2HLbw1XpLwzQBnaQivWm-KD_4=/950x534/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fstory%2Fthumbnail%2F15170%2Fsddefault.jpg",
		url: "http://mashable.com/2016/07/21/cheap-thrills-veena-cover/",
		title: "Indian musician sisters give Sia's 'Cheap Thrills' a soulful instrumental remix",
		category: "entertainment",
		description: "\"Cheap Thrills\" like you've never heard before.",
		source: "Mashable",
		bookmarked: true
	},
	{
		id: "article-1",
		imageUrl: "http://i.amz.mshcdn.com/oQhKgVnMa2N21c9_kiNC7j4mOeQ=/950x534/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fstory%2Fthumbnail%2F15172%2Fdefault.jpg",
		url: "http://mashable.com/2016/07/21/paul-mccartney-concert-in-360-degrees/",
		title: "Watch Paul McCartney rock out to 'Live and Let Die' — in 360 degrees",
		category: "entertainment",
		description: "Couldn't make the show? Now, you can.",
		source: "Mashable",
		bookmarked: false
	},
	{
		id: "article-2",
		imageUrl: "http://i.amz.mshcdn.com/TWroWKGSsxWu7jC7syIixxtKD30=/950x534/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F151790%2F32b6b16a25574f72b434ed0422057ff4.png",
		url: "http://mashable.com/2016/07/20/ww1-chatbot-australia/",
		title: "Interactive chatbot lets you speak in real-time with a World War I soldier",
		category: "tech",
		description: "Chat with Archie Barwick as he fights in World War I.",
		source: "Mashable",
		bookmarked: false
	},
	{
		id: "article-3",
		imageUrl: "http://i.amz.mshcdn.com/RQLZgtl_P4d7B3UGkEHSETM_AK8=/950x534/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F151985%2Fhttps-_2F_2Fblueprint-api-production.s3.amazonaws.com_2Fuploads_2Fcard_2Fimage_2F32034_2FNEtr5EjnjOXdwA_1_a.jpg",
		url: "http://mashable.com/2016/07/21/lionsgate-divergent-series-final-movie-tv-series/",
		title: "Final 'Divergent' movie may skip the big screen",
		category: "entertainment",
		description: "The studio wants to wrap up the film series on the small screen, reports say.",
		source: "Mashable",
		bookmarked: true
	},
	{
		id: "article-4",
		imageUrl: "http://i.amz.mshcdn.com/qSwzoAgsMSJbfaSuY5dj_JKaLAM=/950x534/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F150784%2Flisten-to-me.jpg",
		url: "http://mashable.com/2016/07/20/listen-to-me-mashreads-podcast/",
		title: "MashReads Podcast: 'Listen to Me' takes you on the road trip from your nightmares",
		category: "entertainment",
		description: "Buckle up!",
		source: "Mashable",
		bookmarked: false
	},
	{
		id: "article-5",
		imageUrl: "http://i.amz.mshcdn.com/L_9u_4ZUmVyyh4UmK7mdFUCRxRc=/950x534/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fstory%2Fthumbnail%2F15058%2Fe082211bc6dd4805955737eb42cb3037.png",
		url: "http://mashable.com/2016/07/20/tiffany-trump-pop-song/",
		title: "Anyway, here's Tiffany Trump's pop song",
		category: "entertainment",
		description: "Back in 2011, when a Donald Trump presidency was just just a daydream in his head, daughter Tiffany Trump had a different dream: To make pop music.",
		source: "Mashable",
		bookmarked: false
	}
];

var bookmarks = ["article-0", "article-3"];

//View
var loginSource = $('#login-template').html();
var loginTemplate = Handlebars.compile(loginSource);

var categorySource = $('#categories-template').html();
var categoryTemplate = Handlebars.compile(categorySource);

var articleSource = $('#articles-template').html();
var articleTemplate = Handlebars.compile(articleSource);

function renderLogin() {
//	$('#loginContainer').html('');
	var loginInfo = {
		isLoggedIn: function () {
			return !!(user.userId.length);
		},
		username: user.username
	};
	$('#loginContainer').html(loginTemplate(loginInfo));
}

function renderCategories() {
	$('#categories').html('');
	$.ajax({
		type: 'GET',
		url: urlRoot + '/categories?userId=' + user.userId,
		success: function (data) {
			categories = data; //can probably remove this, right?
			for (var i = 0; i < data.length; i++) {
				$('#categories').append(categoryTemplate(data[i]));
			}
		}
	});
}

function renderArticles() {
	$('#main').html('');
	$.ajax({
		type: 'GET',
		url: urlRoot + '/feed?userId=' + user.userId,
		success: function(data) {
			articles = data; //can probably remove this, right?
			for (var i = 0; i < data.length; i++) {
				var articleToAdd = articleTemplate(data[i]);
				console.log(data[i]);
				$('#main').append(articleToAdd);
			}
		}
	});
}

function renderContent() {
	renderCategories();
	renderArticles();
}

//Controller
function setup() {
	renderLogin();
	$('#loginContainer').on('click','#loginSubmit',loadUser);
	$('#categories').on('click','.label', toggleInterest);
	$('#main').on('click','article',toggleBookmark);
}

function loadUser(event) {
	event.preventDefault();
	user.username = $('#username').val();
	if (user.username != '') {
		$.ajax({
			type: 'POST',
			url: urlRoot + '/login',
			data: {
  				"username": user.username
				},
			success: function (data) {
				user.userId = data.userId;
				renderLogin();
				renderContent();
			}
		});
	}
}

/*
function loadInterests() {
	$.ajax({
		type: 'GET',
		url: urlRoot + '/interests?userId=' + user.userId,
		success: function(data) {
			interests = data; //can probably remove this, right?
			renderContent();
		}
	});
}
*/

function toggleInterest() {
	var catName = $(this).html();
	var catIndex = interests.indexOf(catName); //if we get rid of the "local" copy, we have to do a 'GET' to compare
	var method = (catIndex >= 0) ? 'DELETE' : 'POST';
	$.ajax({
		type: method,
		url: urlRoot + '/interests/' + catName + '?userId=' + user.userId,
		success: function(data) {
			interests = data;
			renderContent();
		}
	})
}

function toggleBookmark() {
	var articleID = $(this).attr("id");
	var method;
	//is there a more elegant way to do this? Traverse the HTML to look for the "bookmark" span?
	for (var i = 0; i < articles.length; i++) { //if we get rid of articles, we'll have to do a 'get' beforehand
		if (articles[i].id == articleID) { //not strictly equal, comparing string to int
			method = (articles[i].bookmarked) ? 'DELETE' : 'POST';
			break;
		}
	}
	$.ajax({
		type: method,
		url: urlRoot + '/bookmarks/' + articleID + '?userId=' + user.userId,
		success: function (data) {
			bookmarks = data; //can probably remove this, right?
			renderArticles();
		}
	});
}

$(document).ready(setup);