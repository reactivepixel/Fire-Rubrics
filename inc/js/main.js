angular.module('wallpaper', ['firebase'])
.config(['$routeProvider',function(r){
	r
	.when('/',{
		templateUrl : 'views/courses.tpl',
	})
	.when('/course/:courseCode', {
		templateUrl : 'views/course.tpl',
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
		templateUrl : 'views/formCourse.tpl',
		controller	: 'AddCourse'
	})
	.when('/addSection/:courseCode/:rubricTitle/:gradeOptions',{
		templateUrl : 'views/course.tpl',
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
		window.location = '#/course/' + s.courseCode;
	}
}])


.controller('Course', ['$scope','$timeout', '$routeParams', 'angularFireCollection',  function(s,$timeout,params,angularFireCollection){
	//s.course = { courseCode: params.courseCode };
	
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
		window.location = '#/course/' + s.course.courseCode + '/rubric/' + s.RubricTitle;
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
					s.course.$id 	= key;
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

					var sum = 0;
					for(sectionKey in s.rubric.sections){
						sum += s.rubric.sections[sectionKey].secWeight * 1;
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
		console.log(url);
	}

}])

.controller('Rubric', ['$scope','$timeout', '$routeParams', 'angularFireCollection',  function(s,$timeout,params,angularFireCollection){
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
					s.course.$id 	= key;
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

					// inject id's into sections
					for(sectionKey in s.rubric.sections){
						s.rubric.sections[sectionKey].$id = sectionKey;
					}

					var sum = 0;
					for(sectionKey in s.rubric.sections){
						sum += s.rubric.sections[sectionKey].secWeight * 1;
					}
					if(sum != 1){
						s.sumError = true;
					}
				}
			}
		})
	});
	s.onGrade = function(){

		var audit = {
				totalItems 		: 0,
				completedItems 	: 0,
			}
		for(sectionKey in s.rubric.sections){
			var section = s.rubric.sections[sectionKey];
			for(itemKey in section.items){
				var item = section.items[itemKey];
				audit.totalItems++;
				
				// Check if item was captured
				if(item.capture){
					audit.completedItems++;
				}
			}
		}

		s.progress.complete = Math.round(audit.completedItems / audit.totalItems * 100);

		console.log('Here we go', s.progress.complete);
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
					s.course.$id 	= key;
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
.controller('Detail', ['$scope', function(s){
	s.name = 'Time to show a detail Page Derp derp';
}]);


var refreshCourses = function(scope,angularFireCollection){
	var url = 'https://prorubrics.firebaseio.com/courses';
	scope.courses = angularFireCollection(url, scope, 'courses', []);
}