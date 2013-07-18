<form ng-submit="addCourse()">
	<div class="span12">
		<input type="text" ng-model="input" />
		<p class="success newRubric" ng-show="input">
			Add <a href="#/addCourse/{{input}}">{{ input }}</a> to the Course List!
		</p>
	</div>
</form>


<article class="span6" ng-repeat="course in courses | filter:input">
	<div class="itemBox">
		<a href="#/course/{{course.courseCode}}" class="info">			
			<h3>
				{{course.courseCode}} <small>{{course.title}}</small>
			</h3>
		</a>

		<p>Rubrics:</p>
		<a href="#/course/{{course.courseCode}}/rubric/{{rubric.title}}" ng-repeat="rubric in course.rubrics" class="btn btn-info">{{rubric.title}}</a>
	</div>
</article>