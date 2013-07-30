<!-- Admin Mode -->
<article>
	<div class="itemBox">

		<div class="editor">
			<div ng-hide="courseEditor">
				<hgroup ng-click="courseEditor=!courseEditor" class="warning">
					<h3>{{course.courseCode}}</h3>
					<h4>{{course.title}}</h4>
				</hgroup>
			</div>
			
			<div ng-show="courseEditor">
				<input ng-model="course.courseCode">
				<input ng-model="course.title">

					<a class="btn btn-success btn-mini" ng-click="courseEditor=!courseEditor; updateCourse(course)"><span class="fui-check"></span>&nbsp;&nbsp;Done Editing?</a>
					<a class="btn btn-danger btn-mini" ng-click="deleteCourse()"><span class="fui-trash fui-trash"></span></a>
				
			</div>
		</div>


		<a href="#/admin/course/{{course.courseCode}}/rubric/{{rubric.title}}" class="btn btn-warning btn-standard" ng-repeat="rubric in course.rubrics" class="btn btn-info">
			<span class="fui-new"></span>&nbsp;&nbsp;
			{{rubric.title}}
		</a>
		<aside ng-hide="addNew">
			<a class="btn btn-primary btn-small" ng-click="$parent.addNew=true"><span class="fui-plus"></span>&nbsp;&nbsp;Rubric</a>
		</aside>
	</div><!-- // Admin Mode -->
</article>