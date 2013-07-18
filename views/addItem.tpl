<p><a href="#/course/{{course.courseCode}}/rubric/{{rubric.title}}">Back to Rubric View</a></p>
<form ng-submit="addItem()" >
		<fieldset id="add">
			<legend>Add Item</legend>

			<label>Title</label>
			<input type="text" ng-model="ItemTitle" placeholder="Design Principals" />
			
			<label>Wiki Link</label>
			<input type="text" ng-model="ItemUrl" placeholder="http://wddbs.com/wiki/Rubric#Design_Principles" />
			
			<label>Description</label>
			<textarea class="span6" rows="9" ng-model="ItemContent" placeholder="50 to 75 Words"></textarea>


			<div>
				<button type="submit" class="btn">Add</button>
			</div>
		</fieldset>
	</form>