<!-- User Mode -->
<div class="itemBox">
	<a href="#/course/{{course.courseCode}}" class="info">			
		<hgroup>
			<h3>{{course.courseCode}}</h3>
			<h4>{{course.title}}</h4>
		</hgroup>
	</a>

	<a ng-click="rubricActivate({ course: course, rubric:rubric })" ng-repeat="rubric in course.rubrics" class="btn btn-info">
		{{rubric.title}}
	</a>
	<a class="btn btn-standard btn-primary" ng-click="newRubric({ course: course })">
		<span class="fui-plus"></span>
	</a>
</div><!-- // User Mode -->