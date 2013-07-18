<form ng-submit="addCourse()">
	<input type="text" ng-model="input" />
	<p class="success newRubric" ng-show="input">
		Add <a href="#/addCourse/{{input}}">{{ input }}</a> to the Course List!
	</p>
</form>
		
<article class="span3" ng-repeat="course in courses | filter:input">

	<h3>
	<a href="#/course/{{course.courseCode}}" class="info">{{course.courseCode}}</a>
	</h3>

	<!-- <p>Rubrics:</p>

	<a ng-repeat="rubric in course.rubrics" class="btn btn-info">{{rubric.title}}</a> -->

</article>