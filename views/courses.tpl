<form ng-submit="newCourse()" class="form-search focus ">
	
	<p>Select a Course or Rubric</p>

        <div class="input-append">
          <input type="text" class="span2 search-query" ng-model="input" placeholder="Filter" />
          <button type="submit" class="btn"><span class="fui-search"></span></button>
        </div>
      </form>
 <!--      <p class="success newRubric">
		Add <a href="#/addCourse/{{input}}">{{ input }}</a> to the Course List!
	</p> -->
	
		<a ng-show="input" href="#/addCourse/{{input}}" class="btn btn-small btn-primary btn-block btn-inverse">
        	Add <strong>{{input}}</strong> to the Course List
			<i class="fui-arrow-right pull-right"></i>
		</a>

</form>
<div class="row">
	<article class="span6" ng-repeat="course in courses | filter:input" ng-model="FilteredList">
		<div class="itemBox">
			<a href="#/course/{{course.courseCode}}" class="info">			
				<h3>
					{{course.courseCode}} <small>{{course.title}}</small>
				</h3>
			</a>

			<p ng-show="rubrics">Rubrics</p>
			<a href="#/course/{{course.courseCode}}/rubric/{{rubric.title}}" ng-repeat="rubric in course.rubrics" class="btn btn-standard btn-info">
				<i class="fui-list-numbered"></i>
				{{rubric.title}}
			</a>
		</div>
	</article>
</div>