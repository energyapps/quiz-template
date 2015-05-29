
$(document).ready(function(){    //moved to /server/fetcher-archiver.js 
  $.ajax({
    url: "js/data/data.json",
    success: function(data){
    	builditall(data)
    },
    dataType: "json",
    error: function(){console.log('error in data.json')}
  }); 


	$.ajax({
    url: "js/data/header.json",
    success:function(header){
  	  buildheader(header)
	  },
	  dataType: "json",
	  error: function(){console.log('error in header.json')}	    
	})

	$.ajax({
    url: "js/data/footer.json",
    success: function(footer){
    	buildfooter(footer)
    },
    dataType: "json",
    error: function(){console.log('error in footer.json')}
  }); 

});

// populate the title and subtitle 
function buildheader (header) {

		var headercontent = '<div class="large-12 columnsDOE headline"><center><h2>' + header[0].title + 
		'</h2></center></div><div class="large-12 columnsDOE header-color"><h3>' + header[0].subtitle + '</h3></div>'

    $( "#header-container" ).append( $(headercontent) );
}

// populate options for the bottom
function buildfooter (footer) {
	for (var i = 0; i < footer.length; i++) {

		var footercontent = '<div class="large-12 columnsDOE header-color result-text" endpoint="' + footer[i].endrange + '" id="a' + (i + 1) + '">'+
      '<h3>' + footer[i].scoretext + '</h3></div>'         

    $( "#footer-container" ).append( $(footercontent) );
	};
}


function builditall (data){
	// some variables
	var NumOfQuestions = data.length;
	var QuestionIndex = []; // array of 0's and iteratate through based on order of questions in the dom.....
	var TotalAnswered = 0; //begin with 0 answered questions
	var TotalCorrect = 0;

	// Shuffle Function
	function shuffle(o){ //v1.0
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};

	// define how many characters = a line break!!! so that side by side columns have the same size
	var size = [30,65,95,125];

	// loop through the questions
	for (var i = 0; i < data.length; i++) {
		var raw = [
			{'ans':data[i].ans1,'correct':'correct','lgth':data[i].ans1.length},
			{'ans':data[i].ans2,'correct':'','lgth':data[i].ans2.length},
			{'ans':data[i].ans3,'correct':'','lgth':data[i].ans3.length},
			{'ans':data[i].ans4,'correct':'','lgth':data[i].ans4.length}
		];
		
		// scramble the answers
		shuffle(raw)

	// Add in classes to define the heights of the questions, one to its random neighbor.
		if (raw[0].lgth > size[3] || raw[1].lgth > size[3]) {
			var hgtclass1 = "xxlarge-a";	
		} else if (raw[0].lgth > size[2] || raw[1].lgth > size[2]) {
			var hgtclass1 = "xlarge-a";
		} else if (raw[0].lgth > size[1] || raw[1].lgth > size[1]) {
			var hgtclass1 = "large-a";
		} else if (raw[0].lgth > size[0] || raw[1].lgth > size[0]) { 
			var hgtclass1 = "medium-a";
		} else {
			var hgtclass1 = "small-a";
		}

		if (raw[2].lgth > size[3] || raw[3].lgth > size[3]) {
			var hgtclass2 = "xxlarge-a";	
		} else if (raw[2].lgth > size[2] || raw[3].lgth > size[2]) {
			var hgtclass2 = "xlarge-a";
		} else if (raw[2].lgth > size[1] || raw[3].lgth > size[1]) {
			var hgtclass2 = "large-a";
		} else if (raw[2].lgth > size[0] || raw[3].lgth > size[0]) { 
			var hgtclass2 = "medium-a";
		} else {
			var hgtclass2 = "small-a";
		}

		// set content to have answers in them		
			// header image conditional
			if (data[i].img === "") {
				var headImg =  "";
			} else {
				// var headImg =  '<img src="http://energy.gov/sites/prod/files/' + data[i].img + '.jpg">'		
				var headImg =  '<img src="' + data[i].img + '">'		
				// var headImg =  '<img src="http:energy.gov/sites/prod/files/' + data[i].img + '.jpg">'		
			};

			// context info conditional
			if (data[i].cont === "") {
				var contInfo = "";
			} else {
				var contInfo = '<div id="c' + i + '" class="rowDOE context-container"><div class="context-info"><p>' +
				data[i].cont +
				'</p></div></div>';
			};
		
		var content2 = '<div data-id="' + i + '" id="question' + (i+1) + '" class="question-individual"><div class="question subheadline"><p>' +
		(i + 1) +
		'. ' +
		data[i].question +
		'</p></div><div class="rowDOE full-size-blocks"><div class="large-12 columnsDOE map-image">' +
		headImg +
		'</div></div><div class="answers"><div class="large-12 columnsDOE halves"><div class="medium-6 small-12 columnsDOE a-options first-c"><div class="large-12 medium-12 small-12 small-centered a-bg ' + hgtclass1 + ' q' + (i+1) + ' ' + raw[0].correct + '" data-id=' + i + '><p>' +
		raw[0].ans + 
		'</p></div></div><div class="medium-6 small-12 columnsDOE a-options"><div class="large-12 medium-12 small-12 small-centered a-bg ' + hgtclass1 + ' q' + (i+1) + ' ' + raw[1].correct + '" data-id=' + i + '><p>' +
		raw[1].ans +
		'</p></div></div></div><div class="large-12 columnsDOE halves"><div class="medium-6 small-12 columnsDOE a-options"><div class="large-12 medium-12 small-12 small-centered a-bg ' + hgtclass2 + ' q' + (i+1) + ' ' + raw[2].correct + '" data-id=' + i + '><p>' +
		raw[2].ans +
		'</p></div></div><div class="medium-6 small-12 columnsDOE a-options last-c"><div class="large-12 medium-12 small-12 small-centered a-bg ' + hgtclass2 + ' q' + (i+1) + ' ' + raw[3].correct + '" data-id=' + i + '><p>' +
		raw[3].ans +
		'</p></div></div></div></div>' +
		contInfo +
		'<div class="rowDOE"><div class="large-12 tweener"></div></div></div>';

		//add content with shuffled answers to the DOM
				// Can also change image, bind addtiontal context here.
		$( "#questions-container" ).append( $(content2) );
	};

	//////-----------------////////
	// Colors based on correct incorrect clicks. Only allow one click per question
	// on click do the following
	// index += 1 so that after 1 click, no more clicks
	// if index == 0 change color else do nothing
	// if index == 0 change the final number
	// when index of all indexes equals total number of questions  

	for (var k = 0; k < NumOfQuestions; k++) {
		QuestionIndex.push(0);
	};

	(function ($) { 
	//clicking the first time per question causes a question to be answered. after that it does nothing. (see if statement inside)
	$('.a-bg').click(function (e) {
		e.preventDefault();
		var current_q = $(this).attr("data-id")

		var qn = (parseInt(current_q)  + 1);

		if (QuestionIndex[current_q] === 0) {
			//should be first click
			$(this).addClass('active');
			QuestionIndex[current_q]+=1;

			if ($(this).hasClass('correct')) {
				TotalCorrect+=1;
			} else {
				$(".correct.q" + qn).addClass('inactive');
			};
			
			// Results go up one number
			$('#results').html("<h1>" + TotalCorrect + "/" + NumOfQuestions + "</h1>")

			var cntx = '#c' + current_q;

			$(cntx).addClass('active');

			//Do something when it gets to N questions
			TotalAnswered +=1;
			if (TotalAnswered === NumOfQuestions) {
				var facelink = "";
				var twitterlink = "http://twitter.com/home?status=";
				var message = "I got " + TotalCorrect + "/" + NumOfQuestions +" questions right on @energy's power plant quiz. Test your knowledge and see how you stack up http://bit.ly/PowerPlantsQuiz"
				var uri = encodeURI(message);
				// console.log(uri)
				// console.log(twitterlink + uri)

				// add in social buttons and scores text
				$('#social-buttons').addClass('active')
				$("#facebook-quiz a").attr("href", facelink)
				$("#twitter-quiz a").attr("href", twitterlink + uri)

// Loop through each correct answer bucket and create the if statemet to attach correct classes 
				
				$( "#footer-container" ).children('div').each(function(){
				// $(".result-text").get().each(function(){
					var endpoint = parseInt($(this).attr("endpoint"))
					var endclass = this.id

					if (TotalCorrect < endpoint) {

					// $('#a1').addClass('active');		
						$('#' + endclass).addClass('active');	
						
						// if satisfied break out of each loop.
						return false
					} 
				})
			};
		};
	});
	}(jQuery));  


	// on each click of button, change total correct/incorrect number....use that as a trigger

	(function ($) { 
		$(document).ready(function() { 

			// on load, display 0 out of N
			$('#results').html("<h1>" + TotalCorrect + "/" + NumOfQuestions + "</h1>")
		});

		fart = $("#master_container").html()
		console.log(fart)
	}(jQuery));  

}
