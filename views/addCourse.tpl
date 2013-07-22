<form ng-submit="addCourse()">
	<fieldset>
		<legend>Add Course</legend>
		<label>Course Code</label>
		<input type="text" ng-model="courseCode" placeholder="MDD, MDD-O, etc...">
		
		<label>Course Title</label>
		<input type="text" ng-model="title" placeholder="Mobile Device Deployment">
		
		<div>
		<button type="submit" class="btn">Add</button>
		</div>
	</fieldset>
</form>