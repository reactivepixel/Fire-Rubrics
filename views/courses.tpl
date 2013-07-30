<ng-include src="partials.intro"></ng-include>
<ng-include src="partials.courseFilter"></ng-include>

<div class="row">
	<article class="span6" ng-repeat="course in courses | filter:input | orderBy:orderCourses " ng-model="FilteredList">
	
	<ng-include src="partials.courseRubric" onload="admin=false"></ng-include>

	</article>
</div>