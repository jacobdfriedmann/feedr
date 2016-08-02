// Your code here
//++++++++++++++++++++++++++++++++++++++++++ MODEL ++++++++++++++++++++++++++++++++ 
var Model = {
  statuses:{
  		longer: false,
  		entertainment:true,
  		world:false,
  		politics:false,
  		science:false,
  		sports:false,
  		tech:false,
  		food:false,
  		drugs:false,
  		music:false,
  		lifestyle:false

  },	
  articles: [
    {
      image: "http://i.amz.mshcdn.com/RQLZgtl_P4d7B3UGkEHSETM_AK8=/950x534/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F151985%2Fhttps-_2F_2Fblueprint-api-production.s3.amazonaws.com_2Fuploads_2Fcard_2Fimage_2F32034_2FNEtr5EjnjOXdwA_1_a.jpg",
      link: "http://mashable.com/2016/07/21/lionsgate-divergent-series-final-movie-tv-series/",
      title: "Final 'Divergent' movie may skip the big screen",
      type: "entertainment",
      summary:"The studio wants to wrap up the film series on the small screen, reports say.",
      mashable: "Mashable",
      bookmarked: true
    },
    {
      image: "http://i.amz.mshcdn.com/L_9u_4ZUmVyyh4UmK7mdFUCRxRc=/950x534/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fstory%2Fthumbnail%2F15058%2Fe082211bc6dd4805955737eb42cb3037.png",
      link: "http://mashable.com/2016/07/20/tiffany-trump-pop-song/",
      title: "Anyway, here's Tiffany Trump's pop song",
      type: "politics",
      summary:"Back in 2011, when a Donald Trump presidency was just just a daydream in his head, daughter Tiffany Trump had a different dream: To make pop music.",
      mashable: "Mashable",
      bookmarked: true
    },
    {
      image: "http://i.amz.mshcdn.com/qSwzoAgsMSJbfaSuY5dj_JKaLAM=/950x534/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F150784%2Flisten-to-me.jpg",
      link: "http://mashable.com/2016/07/20/listen-to-me-mashreads-podcast/",
      title: "MashReads Podcast: 'Listen to Me' takes you on the road trip from your nightmares",
      type: "music",
      summary:"Buckle up!",
      mashable: "Mashable",
      bookmarked: true
    }
  ],
  // Building the filter functions
  getEntertainment: function(){
  	return this.articles.filter(function(task){
  		return task.type==="entertainment";
  	});
  },
  getAll: function(){
  	return [
  		this.getEntertainment()
  	];
  }
  
};


//++++++++++++++++++++++++++++++++++++++++++ VIEW ++++++++++++++++++++++++++++++++
var View = {
  template: undefined,
// Initialize handlebars app 
  init: function() {
    var source = $('#article-template').html();
    this.template = Handlebars.compile(source);
  },
// This shows the articles 
  renderArticle: function() {
    
    // $('#todoInput').val('');
    $('#main').html(this.template(Model));

  },
  // Change Colors on the pills 
  colorEntertainment: function(){
  	if(Model.statuses.entertainment===false){
  		// $('#entertainment').removeClass("class","label","label-primary");
		$( "#entertainment" ).removeClass( "label label-primary" ).addClass( "label label-default" );
  		}
  	else{
  		$( "#entertainment" ).removeClass( "label label-default" ).addClass( "label label-primary" );
  	}
  }
}

//++++++++++++++++++++++++++++++++++++++++++ CONTROLLER ++++++++++++++++++++++++++++++++
var Controller = {
  init: function() {
    View.renderArticle();

    // Main Controller
    // These are the event listeners on the subject pills
    $('#long-form').on('click', this.handleLong);
    $('#entertainment').on('click', this.handleEntertainment);
    $('#world').on('click', this.handleWorld);
    $('#politics').on('click', this.handlePolitics);
    $('#science').on('click', this.handleScience);
    $('#sports').on('click', this.handleSports);
    $('#tech').on('click', this.handleTech);
    $('#food').on('click', this.handleFood);
    $('#drugs').on('click', this.handleDrugs);
    $('#music').on('click', this.handleMusic);
    $('#lifestyle').on('click', this.handleLifestyle);
  },
  // These functions toggle the pill status and toggle color 
  	handleEntertainment: function(event){
  		event.preventDefault();
  		Model.statuses.entertainment=!Model.statuses.entertainment;
  		View.colorEntertainment();
  		View.renderArticle();
  	}
};

// ++++++++++++++++++++++++++++++  Document Ready: Load MVC+++++++++++++++++++++++++++++

function setup() {
  View.init();
  Controller.init();
}

$(document).ready(setup);