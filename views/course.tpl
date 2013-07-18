<div class="alert alert-warning">
  <button type="button" class="close" data-dismiss="alert">&times;</button>
  <strong>Caution!</strong> Changes you make go live instantly!
</div>

<article class="itemBox">

	<hgroup>
		<h3>{{course.courseCode}} <small>{{course.title}}</small> </h3>
		<p ng-show="course.rubrics">Edit Rubrics</p>
	</hgroup>
	
	<p>
		<a href="#/admin/course/{{course.courseCode}}/rubric/{{rubric.title}}" ng-repeat="rubric in course.rubrics" class="btn btn-warning">{{rubric.title}}</a>
	</p>
</article>

	<aside>

		<form ng-submit="addRubric()">
			<fieldset>
				<legend>Add New Rubric</legend>
				<label>Rubric Name</label>
				<input type="text" ng-model="RubricTitle" placeholder="Main Project">
				
				<label>Section Titles</label>
				<input type="text" ng-model="SectionTitles" placeholder="Design,Branding,Other">
				<span class="help-block">Comma-seperated list.</span>

				<label>Grade Options</label>
				<input type="text" ng-model="GradeOptions" placeholder="100,75,40,0">
				<span class="help-block">Comma-seperated list of the % options for each line item.</span>
				
				<button type="submit" class="btn">Add</button>
			</fieldset>
		</form>

	</aside>

</article>