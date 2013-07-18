<article class="span3">

	<hgroup>
		<h3>{{course.courseCode}} <small>{{course.title}}</small> </h3>
		<p ng-show="course.rubrics">{{course.rubrics.length}} Rubrics</p>
	</hgroup>
	
	<p>
		<a href="#/course/{{course.courseCode}}/rubric/{{rubric.title}}" ng-repeat="rubric in course.rubrics" class="btn btn-info">{{rubric.title}}</a>
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

				<label>Grade Options</label>
				<input type="text" ng-model="GradeOptions" placeholder="100,75,40,0">
				<span class="help-block">Comma-seperated list of the % options for each line item.</span>
				
				<button type="submit" class="btn">Save</button>
			</fieldset>
		</form>

	</aside>

</article>