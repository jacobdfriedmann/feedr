// Model
var model = {
    loggedIn: false,
    username: '',
    userId: 0,
    button: undefined,
    myArticles: []
};


// View

var template1;
var template2;
var template3;
$(document).ready(function() {
    var articleSource = $('#article-template').html();
    template1 = Handlebars.compile(articleSource);

    var loginSource = $('#login-template').html();
    template2 = Handlebars.compile(loginSource);

    var buttonSource = $('#button-template').html();
    template3 = Handlebars.compile(buttonSource);    
});

function renderLogin() {
    var loginHtml = template2(model);
    $('#loginContainer').html(loginHtml);
}

function renderButtons() {
    $('#categories').html('');
    var buttonHtml = template3(model);
    $('#categories').html(buttonHtml);
}

function renderArticles() {
    $('#main').html('');
    var articleHtml = template1(model);
    $('#main').html(articleHtml);
}

function getCategories() {
    $.get(('/categories?userId=' + model.userId), function (data) {
        model.button = data;
        renderButtons();
    });
}

function getArticles() {  
    $.get(('/feed?userId=' + model.userId), function (data) {
        model.myArticles = data;       
        renderArticles();
    });
}

// Controller

$(document).ready(function() {
    renderLogin();

    $('#loginSubmit').on('click', function(event) {
        event.preventDefault();

        var name = $('#username').val();

        $.post('/login', {'username': name}, function (data) {
            model.loggedIn = true;
            model.username = name;
            model.userId = data.userId;
            getCategories();
            getArticles();           
            renderLogin();  
        });
    });

    $('#categories').on('click', '.button', function() {
        var cat = $(this).text(); 
        for (var i = 0; i < model.button.length; i++) {
            if (model.button[i].name === cat) {
                if (model.button[i].selected === false) { 
                  //  model.button[i].selected = true;
                    $.post(('/interests/' + cat + '?userId=' + model.userId), function () {
                    getCategories();
                    getArticles();
                    });
                } else {
                    $.ajax({
                        type: 'DELETE',
                        url: '/interests/' + cat + '?userId=' + model.userId, 
                        success: function() {
                            getCategories();
                            getArticles(); 
                        }
                    });
                }
            }
        }
    }); 
        
    $('#main').on('click', '.article', function() {
        var artIndex = $(this).index();
        var artId = model.myArticles[artIndex].id;    
        if (model.myArticles[artIndex].bookmarked === false) {
            $.post(('/bookmarks/' + artId + '?userId=' + model.userId), function () {
                getArticles();
            });
        } else {
            $.ajax({
                type: 'DELETE',
                url: '/bookmarks/' + artId + '?userId=' + model.userId, 
                success: function() {
                    getArticles();
                }
            });
        }  
    });

});






