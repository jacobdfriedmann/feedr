// model

var article = {
	imageURL:'http://i.amz.mshcdn.com/wB2HLbw1XpLwzQBnaQivWm-KD_4=/950x534/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fstory%2Fthumbnail%2F15170%2Fsddefault.jpg',
	articleHeading:'',
	articleParagraph:'',
	contentCategory:'',
	sourceName:''
};

var categories = {
	categoryLabel:''
}

var login = {
	username:'Val'
}

//view

var articleTemplate;
$(document).ready(function(){
 var source = $('#articleContent').html();
 template = Handlebars.compile(source);
});

function renderArticles(){
	$('#main').html('');
	var renderedTemplate = articleTemplate(article);
	$('#main').html(renderedTemplate);
}
 renderArticles();

 var categoriesTemplate;
 $(document).ready(function(){
 	var source = $('')
 });
 function renderCategories(){
 	$('#categories').html('');
 	var renderedCategories = categoriesTemplate(categories);
 	$('#categories').html(renderedCategories);
 }
renderCategories();

var loginTemplate
function renderlogin(){
	$('#loginContainer').html('');
	var renderedUsername = loginTemplate(login);
	$('#loginContainer').html(renderedUsername);
}
renderlogin();
});