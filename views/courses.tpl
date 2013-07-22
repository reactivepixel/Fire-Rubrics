<form ng-submit="addCourse()">
	<fieldset class="span12">
		<legend>Select a Course or Rubric</legend>
	
	
		<input type="text" ng-model="input" placeholder="Filter"/>
		<p class="success newRubric">
			Add <a href="#/addCourse/{{input}}">{{ input }}</a> to the Course List!
		</p>
	
	</fieldset>
</form>

<article class="span6" ng-repeat="course in courses | filter:input" ng-model="FilteredList">
	<div class="itemBox">
		<a href="#/course/{{course.courseCode}}" class="info">			
			<h3>
				{{course.courseCode}} <small>{{course.title}}</small>
			</h3>
		</a>

		<p ng-show="rubrics">Rubrics</p>
		<a href="#/course/{{course.courseCode}}/rubric/{{rubric.title}}" ng-repeat="rubric in course.rubrics" class="btn btn-info">
			{{rubric.title}}
		</a>
	</div>
</article>