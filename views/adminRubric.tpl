<div ng-show="sumError" class="alert alert-error">
  <button type="button" class="close" data-dismiss="alert">&times;</button>
  <strong>Warning!</strong> Sum of all Sections needs to be 100%.
</div>



<div ng-hide="titleEditor">
	<h1 ng-click="titleEditor=!titleEditor">{{rubric.title}}</h1>
</div>
<div ng-show="titleEditor">
	<input ng-model="rubric.title">
	<small ng-click="titleEditor=!titleEditor; updateRubric({ rubric: rubric, course:course })">Done editing?</small>
	<a ng-click="deleteRubric(rubric)">[delete]</a>
</div>

<section>
	

	<div ng-hide="gradeOptionsEditor">
		<h3 ng-click="gradeOptionsEditor=!gradeOptionsEditor">Grade Options</h3>
	</div>
	<div ng-show="gradeOptionsEditor">
		<input ng-model="NewGradeOptions">
		<small ng-click="gradeOptionsEditor=!gradeOptionsEditor; updateGradeOptions()">Done editing?</small>
	</div>


	<div class="btn-group">
		<a ng-repeat="gradeOption in rubric.gradeOptions" class="btn" >{{gradeOption}}</a>
	</div>
</section>

<section ng-repeat="section in rubric.sections">
	<h3>{{section.title}} 


		<div ng-hide="editorEnabled">
			<small ng-click="editorEnabled=!editorEnabled">{{Math.round(section.secWeight * 100)}}%</small>
		</div>
		<div ng-show="editorEnabled">
			<input ng-model="section.secWeight">
			<small ng-click="editorEnabled=!editorEnabled; updateWeight($index,section.secWeight)">Done editing?</small>
		</div>



	</h3>
	
	<p><a href="#/course/{{course.courseCode}}/rubric/{{rubric.title}}/section/{{$index}}/addItem">Add Item to {{section.title}}</a></p>

	<!-- Line Items -->
	<article id="item4" data-itemid="4" ng-repeat="item in section.items">
		<div class="itemBox">
			<div class="row-fluid line-item">
				<div class="span8">
					<h3>{{item.title}}
						<small ng-show="item.url" class="non-essential">
							<a href="{{item.url}}">more info</a>
						</small>
					</h3>
					<div class="span12 non-essential" ng-bind-html-unsafe="item.markdown"></div>
				</div>		
			</div>
		</div>
	</article>
</section>