<div class="alert alert-warning" ng-hide="closeAlert" ng-click="closeAlert=true">
  <button type="button" class="close" data-dismiss="alert">&times;</button>
  <strong>Caution!</strong> Changes you make go live instantly!
</div>

<article>
	<div class="itemBox">
		<hgroup>
			
				<div ng-hide="courseEditor" class="editor">
					<h3 ng-click="courseEditor=!courseEditor" class="warning">{{course.courseCode}} <small>{{course.title}}</small></h3>
				</div>
				<div ng-show="courseEditor">
					<input ng-model="course.courseCode"> <input ng-model="course.title">
					<div>
						<a class="btn btn-success btn-mini" ng-click="courseEditor=!courseEditor; updateCourse(course)">Done editing?</a>
						<a class="btn btn-danger btn-mini" ng-click="deleteCourse()"><span class="fui-trash fui-trash"></span></a>
					</div>
				</div>

		</hgroup>
			<div class="tagsinput  tagsinput-warning" style="height: 100%;">
		<a href="#/admin/course/{{course.courseCode}}/rubric/{{rubric.title}}" ng-repeat="rubric in course.rubrics" class="btn btn-warning btn-standard"><span class="fui-new"></span>&nbsp;&nbsp;{{rubric.title}}</a>
		</div>
	</div>
</article>

<aside ng-hide="addNew">
	<a class="btn btn-primary btn-small" ng-click="addNew=true"><span class="fui-plus"></span>&nbsp;&nbsp;Rubric</a>
</aside>

<aside ng-show="addNew">

	<form ng-submit="addRubric()">
		<fieldset>
			<legend>Adding New Rubric</legend>
			<label>Rubric Name</label>
			<input type="text" ng-model="RubricTitle" placeholder="Main Project">
			
			<label>Section Titles</label>
			<input type="text" ng-model="SectionTitles" placeholder="Design,Branding,Other">
			

			<label>Grade Options</label>
			<input type="text" ng-model="GradeOptions" placeholder="100,75,40,0">
			
			<button type="submit" class="btn btn-standard btn-success"><span class="fui-plus"></span>&nbsp;&nbsp;Add</button>
		</fieldset>
	</form>

</aside>