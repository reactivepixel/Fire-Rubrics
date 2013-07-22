angular.module('wallpaper', ['firebase'])
.config(['$routeProvider',function(r){
	r
	.when('/',{
		templateUrl : 'views/courses.tpl',
		controller	: 'Courses'
	})
	.when('/course/:courseCode/', {
		templateUrl : 'views/adminCourse.tpl',
		controller	: 'Course'
	})
	.when('/course/:courseCode/:addNew', {
		templateUrl : 'views/adminCourse.tpl',
		controller	: 'Course'
	})
	.when('/admin/course/:courseCode/rubric/:rubricTitle', {
		templateUrl : 'views/adminRubric.tpl',
		controller	: 'AdminRubric'
	})
	.when('/course/:courseCode/rubric/:rubricTitle', {
		templateUrl : 'views/rubric.tpl',
		controller	: 'Rubric'
	})
	.when('/course/:courseCode/rubric/:rubricTitle/section/:sectionIndex/addItem', {
		templateUrl : 'views/addItem.tpl',
		controller	: 'AddItem'
	})
	.when('/addCourse/:courseCode',{
		templateUrl : 'views/addCourse.tpl',
		controller	: 'AddCourse'
	})
	.when('/addSection/:courseCode/:rubricTitle/:gradeOptions',{
		templateUrl : 'views/adminCourse.tpl',
	})

}])

.controller('Core', ['$scope', 'angularFireCollection', 

	function myCtrl(s,angularFireCollection){
		var url = 'https://prorubrics.firebaseio.com/courses';
		s.courses = angularFireCollection(url, s, 'courses', []);
		
		s.progress = {complete:0,captureDisp:false,active:false};
	

	}

])

.controller('AddCourse', ['$scope','$routeParams', 'angularFireCollection', function(s,params,angularFireCollection){
	var url = 'https://prorubrics.firebaseio.com/courses';

	s.courses = angularFireCollection(url, s, 'courses', []);
	s.courseCode = params.courseCode;
	s.addCourse = function() {
		var res = s.courses.add({
        		courseCode		: s.courseCode,
        		title			: s.title,
        	});
		s.ID = res.path.m[1];
		window.location = '#/course/' + s.courseCode + '/addNew';
	}
}])

.controller('Course', ['$scope','$timeout', '$routeParams', 'angularFireCollection',  function(s,$timeout,params,angularFireCollection){
	//s.course = { courseCode: params.courseCode };
	
	if(params.addNew){
		s.addNew = true;
	}

	s.$watch('courses.length', function(){
		$timeout(function(){

			for(key in s.courses){
				if(s.courses[key].courseCode == params.courseCode){
					//Match Made!
					s.course = s.courses[key];
					break;
				}
			}
		});
	});	

	s.addRubric = function() {

		var url = 'https://prorubrics.firebaseio.com/courses/' + s.course.$id + '/rubrics';
		s.course.rubrics = angularFireCollection(url, s, 'rubrics', []);
		
		arySections = s.SectionTitles.split(',');
		objSections = {};
		for(key in arySections){
			objSections[key] = {
				title 		: arySections[key],
				secWeight 	: Math.round((1 / arySections.length) * 100) /100,
			};
		}
		s.course.rubrics.add({
			title 			: s.RubricTitle,
			sections 		: objSections,
			gradeOptions	: s.GradeOptions.split(','),
		})
		
		// relying on Title without filter for url friendlyness - needs enhanced
		window.location = '#/admin/course/' + s.course.courseCode + '/rubric/' + s.RubricTitle;
	}

	s.updateCourse = function(data){

		var url = 'https://prorubrics.firebaseio.com/courses/' + data.$id;
		var firebase = new Firebase(url);
		firebase.update({ courseCode: data.courseCode, title: data.title });
		console.log(url);
	}
	s.deleteCourse = function(){

		var url = 'https://prorubrics.firebaseio.com/courses/' + s.course.$id ;
		var firebase = new Firebase(url);
		firebase.remove();
		s.course = {};
		window.location = '#/';

	}
}])

.controller('AdminRubric', ['$scope','$timeout', '$routeParams', 'angularFireCollection',  function(s,$timeout,params,angularFireCollection){
	s.sumError = false;
	//Add Math to the View
	s.Math = window.Math;
	// Establish Selected Course
	s.$watch('courses', function(){

		$timeout(function(){

			//direct nav to this controller does not load in courses... so force it.
			if(!s.courses[0]) refreshCourses(s,angularFireCollection);
				for(key in s.courses){
					if(s.courses[key].courseCode == params.courseCode){

					s.course = s.courses[key];
				//	s.course.$id 	= key;
					break;
				}
			}
			if(s.course){
				// If no Rubrics dump to Course View
				if(!s.course.rubrics){
					window.location = '#/course/' + s.course.courseCode;
				} else {

					// Establish Selected Rubric
					for(rubricKey in s.course.rubrics){
						if(s.course.rubrics[rubricKey].title == params.rubricTitle){
							s.rubric = s.course.rubrics[rubricKey];
							s.rubric.$id = rubricKey;
							break;
						}
					}

					var sum = 0;
					var converter = new Showdown.converter();
					// inject id's into sections
					for(sectionKey in s.rubric.sections){
						s.rubric.sections[sectionKey].$id = sectionKey;
						sum += s.rubric.sections[sectionKey].secWeight * 1;

						for(itemKey in s.rubric.sections[sectionKey].items){
							var thisItem = s.rubric.sections[sectionKey].items[itemKey];
							s.rubric.sections[sectionKey].items[itemKey].$id = itemKey;	
							thisItem.markdown = converter.makeHtml( thisItem.content );
						}
					}

					
					if(sum != 1){
						s.sumError = true;
					}
				}
			}
		})
	});

	s.updateWeight = function(sectionIndex, newWeight){

		
		var url = 'https://prorubrics.firebaseio.com/courses/' + s.course.$id + '/rubrics/' + s.rubric.$id + '/sections/' + sectionIndex + '/secWeight/';
		var firebase = new Firebase(url);
		firebase.set(newWeight);
	}

	s.updateRubric = function(data){

		var url = 'https://prorubrics.firebaseio.com/courses/' + s.course.$id + '/rubrics/' + s.rubric.$id;
		var firebase = new Firebase(url);
		firebase.update({ title: s.rubric.title });

	}


	s.updateSection = function(data){

		var url = 'https://prorubrics.firebaseio.com/courses/' + s.course.$id + '/rubrics/' + s.rubric.$id + '/sections/' + data.index;
		var firebase = new Firebase(url);
		firebase.update({ title: data.title });

	}

	s.deleteSection = function(data){

		var url = 'https://prorubrics.firebaseio.com/courses/' + s.course.$id + '/rubrics/' + s.rubric.$id + '/sections/' + data.index;
		var firebase = new Firebase(url);
		firebase.remove();

	}

	s.updateGradeOptions = function(){
		var url = 'https://prorubrics.firebaseio.com/courses/' + s.course.$id + '/rubrics/' + s.rubric.$id;
		var firebase = new Firebase(url);
		firebase.update({ gradeOptions: s.NewGradeOptions.split(',') });

	}

	s.updateItem = function(data){
		var url = 'https://prorubrics.firebaseio.com/courses/' + s.course.$id + '/rubrics/' + s.rubric.$id + '/sections/' + data.section.$id + '/items/' + data.item.$id;
		var firebase = new Firebase(url);
		firebase.update({ title: data.item.title, content: data.item.content, url: data.item.url });

	}

	s.deleteItem = function(data){
		var url = 'https://prorubrics.firebaseio.com/courses/' + s.course.$id + '/rubrics/' + s.rubric.$id + '/sections/' + data.section.$id + '/items/' + data.item.$id;
		var firebase = new Firebase(url);
		firebase.remove();
		delete s.rubric.sections[data.section.$id].items[data.item.$id];

	}

	s.deleteRubric = function(data){

		var url = 'https://prorubrics.firebaseio.com/courses/' + s.course.$id + '/rubrics/' + s.rubric.$id;
		var firebase = new Firebase(url);
		firebase.remove();
		s.rubric = {};
		window.location = '#/course/' + s.course.courseCode;

	}

}])

.controller('Rubric', ['$scope','$timeout', '$routeParams', 'angularFireCollection',  function(s,$timeout,params,angularFireCollection){
	
	// Audit
	s.Audit = {
				totalItems 		: 0,
				completedItems 	: 0,
				totalScore		: 0
			}

	







	s.progress.active = true;
	//Add Math to the View
	s.Math = window.Math;
	// Establish Selected Course
	s.$watch('courses', function(){

		$timeout(function(){

			//direct nav to this controller does not load in courses... so force it.
			if(!s.courses[0]) refreshCourses(s,angularFireCollection);
				for(key in s.courses){
					if(s.courses[key].courseCode == params.courseCode){

					s.course 		= s.courses[key];
					//s.course.$id 	= key;
					break;
				}
			}
			if(s.course){
				// If no Rubrics dump to Course View
				if(!s.course.rubrics){
					window.location = '#/course/' + s.course.courseCode;
				} else {

					// Establish Selected Rubric
					for(rubricKey in s.course.rubrics){
						if(s.course.rubrics[rubricKey].title == params.rubricTitle){
							s.rubric = s.course.rubrics[rubricKey];
							s.rubric.$id = rubricKey;
							break;
						}
					}

					var sum = 0;
					var converter = new Showdown.converter();
					// inject id's into sections
					for(sectionKey in s.rubric.sections){
						s.rubric.sections[sectionKey].$id = sectionKey;
						sum += s.rubric.sections[sectionKey].secWeight * 1;

						for(itemKey in s.rubric.sections[sectionKey].items){
							var thisItem = s.rubric.sections[sectionKey].items[itemKey];
							thisItem.markdown = converter.makeHtml( thisItem.content );

							// Add tally to the total # of items
							s.Audit.totalItems++;
						}
					}

					
					if(sum != 1){
						s.sumError = true;
					}
				}
			}
		})

	});
	s.onGrade = function(){

		var totalScore = 0;
		s.Audit.completedItems = 0; // Reset for tally
		for(sectionKey in s.rubric.sections){
			var section = s.rubric.sections[sectionKey];
			var secScore = 0;
			section.totalItems = 0;
			for(itemKey in section.items){
				section.totalItems++;
			}
			for(itemKey in section.items){
				var item = section.items[itemKey];
				
				// Check if item was captured
				if(item.capture){
					s.Audit.completedItems++;
					var itemValue	= (item.capture.gradeOption * 1 ) * (section.secWeight / section.totalItems);
					secScore 		+= itemValue;
					totalScore 		+= itemValue;
				}
			}
			s.rubric.sections[sectionKey].score = secScore;
		}
		s.Audit.totalScore = totalScore;
		s.progress.complete = Math.round(s.Audit.completedItems / s.Audit.totalItems * 100);

		console.log(s.Audit.totalItems, s.Audit.completedItems);
	}
}])

.controller('AddItem', ['$scope','$timeout', '$routeParams', 'angularFireCollection',  function(s,$timeout,params,angularFireCollection){
	s.alert = false;
	//Add Math to the View
	s.Math = window.Math;
	// Establish Selected Course
	s.$watch('courses', function(){

		$timeout(function(){

			//direct nav to this controller does not load in courses... so force it.
			if(!s.courses[0]) refreshCourses(s,angularFireCollection);
				for(key in s.courses){
					if(s.courses[key].courseCode == params.courseCode){

					s.course = s.courses[key];
					//s.course.$id 	= key;
					break;
				}
			}
			if(s.course){
				// If no Rubrics dump to Course View
				if(!s.course.rubrics){
					window.location = '#/course/' + s.course.courseCode;
				} else {

					// Establish Selected Rubric
					for(rubricKey in s.course.rubrics){
						if(s.course.rubrics[rubricKey].title == params.rubricTitle){
							s.rubric = s.course.rubrics[rubricKey];
							s.rubric.$id = rubricKey;
						}
					}
				}
			}
		})
	});

	s.addItem = function(){

		var url = 'https://prorubrics.firebaseio.com/courses/' + s.course.$id + '/rubrics/' + s.rubric.$id + '/sections/' + params.sectionIndex + '/items' ;
		s.items = angularFireCollection(url, s, 'items', []);
		injectItem = {
			title 			: s.ItemTitle,
			content 		: s.ItemContent,
		}
		if(s.ItemUrl){
				injectItem.url = s.ItemUrl;
		}
		s.items.add(injectItem);
		
		// relying on Title without filter for url friendlyness - needs enhanced
		//window.location = '#/course/' + s.course.courseCode + '/rubric/' + s.RubricTitle;

		s.alert			= s.ItemTitle;
		s.ItemTitle 	= '';
		s.ItemContent 	= '';
		s.ItemUrl		= '';


	}

}])

.controller('Courses', ['$scope', function(s){
	s.newCourse = function(){
		window.location = '#/addCourse/' +s.input;
	}
	s.rubricActivate = function(data){
		window.location = '#/course/' + data.course.courseCode + '/rubric/' + data.rubric.title;
	}
	s.newRubric = function(data){
		window.location = '#/course/' + data.course.courseCode + '/addNew';
	}
}])


.controller('Detail', ['$scope', function(s){
	s.name = 'Time to show a detail Page Derp derp';
}]);


var refreshCourses = function(scope,angularFireCollection){
	var url = 'https://prorubrics.firebaseio.com/courses';
	scope.courses = angularFireCollection(url, scope, 'courses', []);
}