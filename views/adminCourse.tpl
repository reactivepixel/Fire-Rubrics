<div class="alert alert-warning" ng-hide="closeAlert" ng-click="closeAlert=true">
  <button type="button" class="close">&times;</button>
  <strong>Caution!</strong> Changes you make go live instantly!
</div>

<ng-include src="partials.courseRubricAdmin" onload="admin=true"></ng-include>

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