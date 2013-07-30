<form ng-submit="newCourse()" class="form-search focus ">
	<p>Select a Course or Rubric</p>
	<div class="input-append">
		<input type="text" class="span2 search-query" ng-model="input" placeholder="Filter" />
		<button type="submit" class="btn"><span class="fui-search"></span></button>
	</div>

	<a ng-show="input" href="#/addCourse/{{input}}" class="btn btn-small btn-primary btn-block btn-inverse">
		Add <strong>{{input}}</strong> to the Course List
		<i class="fui-arrow-right pull-right"></i>
	</a>
</form>