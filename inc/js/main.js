// Define Angular Module
angular.module('proRubrics', ['firebase'])

// Router
.config(['$routeProvider',function(r){
	r

	// Index
	.when('/',{
		templateUrl : 'views/courses.tpl',
		controller	: 'Courses'
	})

	// Admin Course
	.when('/course/:courseCode/', {
		templateUrl : 'views/adminCourse.tpl',
		controller	: 'Course'
	})

	// Add Course
	.when('/course/:courseCode/:addNew', {
		templateUrl : 'views/adminCourse.tpl',
		controller	: 'Course'
	})

	// Admin Rubric
	.when('/admin/course/:courseCode/rubric/:rubricTitle', {
		templateUrl : 'views/adminRubric.tpl',
		controller	: 'AdminRubric'
	})

	// Rubric in Course
	.when('/course/:courseCode/rubric/:rubricTitle', {
		templateUrl : 'views/rubric.tpl',
		controller	: 'Rubric'
	})

	// Add Item to Rubric
	.when('/course/:courseCode/rubric/:rubricTitle/section/:sectionIndex/addItem', {
		templateUrl : 'views/addItem.tpl',
		controller	: 'AddItem'
	})

	// Add New Course
	.when('/addCourse/:courseCode',{
		templateUrl : 'views/addCourse.tpl',
		controller	: 'AddCourse'
	})

	// todo: Refine - This likely fires on the Add course method of the core? Is this in use?
	.when('/addSection/:courseCode/:rubricTitle/:gradeOptions',{
		templateUrl : 'views/adminCourse.tpl',
	})

}])


// Core Controller. Scope of all sub Controllers
.controller('Core', ['$scope', 'angularFireCollection', function myCtrl(s,angularFireCollection){
	
	// todo: unify all URLs through a BaseURL defined here
	var url = 'https://prorubrics.firebaseio.com/courses';

	// Grab the Courses from the DB
	s.courses = angularFireCollection(url, s, 'courses', []);

	// Progress Bar Controlls
	s.progress = { 
		complete:0,
		captureDisp:false,
		active:false
	};
}])

// Add New Course Controller
.controller('AddCourse', ['$scope','$routeParams', 'angularFireCollection', function(s,params,angularFireCollection){
	
	// todo: Change to BaseURL
	var url = 'https://prorubrics.firebaseio.com/courses';

	// todo: Isolate the DB calls to one
	s.courses = angularFireCollection(url, s, 'courses', []);

	// Save the currently selected CourseCode to the baseScope
	s.courseCode = params.courseCode;

	// ToDO: isolate FB to use only FB or Angelfire Attact a course to the DB
	s.addCourse = function() {
		var res = s.courses.add({
        		courseCode		: s.courseCode,
        		title			: s.title,
        	});
		s.ID = res.path.m[1];
		window.location = '#/course/' + s.courseCode + '/addNew';
	}
}])

// Course Controller
.controller('Course', ['$scope','$timeout', '$routeParams', 'angularFireCollection',  function(s,$timeout,params,angularFireCollection){
	
	// Look for addNew Param, this will auto Disp the form to add a Rubric	
	if(params.addNew){
		s.addNew = true;
	}

	// Listen for changes to s.courses
	s.$watch('courses.length', function(){
		$timeout(function(){
			for(key in s.courses){
				if(s.courses[key].courseCode == params.courseCode){
					
					//Isolate currently selected course into s.course
					s.course = s.courses[key];
					break;
				}
			}
		});
	});	

	// Adding a Rubric on user trigger
	s.addRubric = function() {

		// Target in the Firebase System of the parent data to build upon
		var url = 'https://prorubrics.firebaseio.com/courses/' + s.course.$id + '/rubrics';
		s.course.rubrics = angularFireCollection(url, s, 'rubrics', []);
		
		// Users provide csv for Section titles... split those up into something usable
		arySections = s.SectionTitles.split(',');
		
		// Create a blank object we are going to turn into a more complex array of objs
		objSections = {};
		for(key in arySections){
			objSections[key] = {
				title 		: arySections[key],
				secWeight 	: Math.round((1 / arySections.length) * 100) /100,
			};
		}

		// Now that we have that complex object created, shove it into the Firebase Database
		s.course.rubrics.add({
			title 			: s.RubricTitle,
			sections 		: objSections,
			gradeOptions	: s.GradeOptions.split(','),
		})
		
		// todo: relying on Title without filter for url friendlyness - needs enhanced
		window.location = '#/admin/course/' + s.course.courseCode + '/rubric/' + s.RubricTitle;
	}

	// Update existing Course Title and Course Code
	s.updateCourse = function(data){
		var url = 'https://prorubrics.firebaseio.com/courses/' + data.$id;
		var firebase = new Firebase(url);
		firebase.update({ courseCode: data.courseCode, title: data.title });
		console.log(url);
	}

	// remove Course
	s.deleteCourse = function(){
		var url = 'https://prorubrics.firebaseio.com/courses/' + s.course.$id ;
		var firebase = new Firebase(url);
		firebase.remove();

		// clear the client's model to remove it from display.
		s.course = {};
		window.location = '#/';
	}
}])


// Admin Rubric Controller
.controller('AdminRubric', ['$scope','$timeout', '$routeParams', 'angularFireCollection',  function(s,$timeout,params,angularFireCollection){
	
	// Initially Hide Alert window. When set to true, display Alert
	s.sumError = false;
	
	//Add Math obj to the View for formatting
	s.Math = window.Math;

	// Establish Selected Course
	s.$watch('courses', function(){
		$timeout(function(){

			//direct nav to this controller does not load in courses... so force it.
			if(!s.courses[0]) refreshCourses(s,angularFireCollection);
				for(key in s.courses){
					if(s.courses[key].courseCode == params.courseCode){

					//Isolate currently selected course into s.course
					s.course = s.courses[key];
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

					// Initialize for Calculating what the user thinks the sum of all sections value should be.
					var sum = 0;

					// Markdown Formatting Converter
					var converter = new Showdown.converter();

					// loop all sections
					for(sectionKey in s.rubric.sections){
						
						// inject id's into sections
						s.rubric.sections[sectionKey].$id = sectionKey;

						// Tally each Section's weight, this should come out to 1.00 if correct
						sum += s.rubric.sections[sectionKey].secWeight * 1;

						// loop Items in section
						for(itemKey in s.rubric.sections[sectionKey].items){
							// isolate item
							var thisItem = s.rubric.sections[sectionKey].items[itemKey];

							// append the converted markdown to the item for use in the display
							thisItem.markdown = converter.makeHtml( thisItem.content );

							// inject ID into the item
							s.rubric.sections[sectionKey].items[itemKey].$id = itemKey;	
						}
					}

					// test sum of all section weights
					if(sum != 1){
						// display static error msg
						s.sumError = true;
					}
				}
			}
		})
	});

	// Update a section's weight with DB
	s.updateWeight = function(sectionIndex, newWeight){		
		var url = 'https://prorubrics.firebaseio.com/courses/' + s.course.$id + '/rubrics/' + s.rubric.$id + '/sections/' + sectionIndex + '/secWeight/';
		var firebase = new Firebase(url);
		firebase.set(newWeight);
	}

	// update rubric title with DB
	s.updateRubric = function(data){
		var url = 'https://prorubrics.firebaseio.com/courses/' + s.course.$id + '/rubrics/' + s.rubric.$id;
		var firebase = new Firebase(url);
		firebase.update({ title: s.rubric.title });
	}

	// update Section title in DB
	s.updateSection = function(data){
		var url = 'https://prorubrics.firebaseio.com/courses/' + s.course.$id + '/rubrics/' + s.rubric.$id + '/sections/' + data.index;
		var firebase = new Firebase(url);
		firebase.update({ title: data.title });
	}

	// Remove section from DB
	s.deleteSection = function(data){
		var url = 'https://prorubrics.firebaseio.com/courses/' + s.course.$id + '/rubrics/' + s.rubric.$id + '/sections/' + data.index;
		var firebase = new Firebase(url);
		firebase.remove();
		delete s.rubric.sections[data.index];
	}

	// Update Grade Options for the Rubric
	s.updateGradeOptions = function(){
		var url = 'https://prorubrics.firebaseio.com/courses/' + s.course.$id + '/rubrics/' + s.rubric.$id;
		var firebase = new Firebase(url);
		firebase.update({ gradeOptions: s.NewGradeOptions.split(',') });

	}

	// Update an existing item
	s.updateItem = function(data){
		var url = 'https://prorubrics.firebaseio.com/courses/' + s.course.$id + '/rubrics/' + s.rubric.$id + '/sections/' + data.section.$id + '/items/' + data.item.$id;
		var firebase = new Firebase(url);
		firebase.update({ title: data.item.title, content: data.item.content, url: data.item.url });

	}

	// Remove Item
	s.deleteItem = function(data){
		var url = 'https://prorubrics.firebaseio.com/courses/' + s.course.$id + '/rubrics/' + s.rubric.$id + '/sections/' + data.section.$id + '/items/' + data.item.$id;
		var firebase = new Firebase(url);
		firebase.remove();
		delete s.rubric.sections[data.section.$id].items[data.item.$id];
	}

	// Remove Rubric
	s.deleteRubric = function(data){
		var url = 'https://prorubrics.firebaseio.com/courses/' + s.course.$id + '/rubrics/' + s.rubric.$id;
		var firebase = new Firebase(url);
		firebase.remove();
		s.rubric = {};
		window.location = '#/course/' + s.course.courseCode;
	}
}])

// Rubric Controller
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

	// On Grade option selected
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