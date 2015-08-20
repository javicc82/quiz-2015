var models = require('../models/models.js');
var countQuiz = 0;
var countComments = 0;
var commentXquiz = 0;
var quizWithComments = 0;

exports.show = function(req, res) {
	
	models.Quiz.count().then(function(count) {
  		countQuiz = count;
 	});

	var options = {
		include: [{model: models.Comment, required: true}],
		distinct: 'id'
	};

 	models.Quiz.count(options).then(function(count) {
  		quizWithComments = count;
  		console.log('Quiz count: ' +  quizWithComments);
 	});

	models.Comment.count().then(function(count) {
  		countComments = count;

  		if(countQuiz > 0){
  			commentXquiz = countComments/countQuiz;
  			commentXquiz = commentXquiz.toFixed(2);
  		}

 	}).then(function(){res.render('statistics/show', { counts: [countQuiz, countComments, commentXquiz, quizWithComments, countQuiz - quizWithComments], errors: []})});
};