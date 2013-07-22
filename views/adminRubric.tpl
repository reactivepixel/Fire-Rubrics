<div ng-show="sumError" class="alert alert-error">
  <button type="button" class="close" data-dismiss="alert">&times;</button>
  <strong>Warning!</strong> Sum of all Sections needs to be 100%.
</div>

<div ng-hide="titleEditor">
	<h4 ng-click="titleEditor=!titleEditor" class="editor">{{rubric.title}}</h4>
</div>

<div ng-show="titleEditor">
	<input ng-model="rubric.title">
	<small ng-click="titleEditor=!titleEditor; updateRubric({ rubric: rubric, course:course })">Done editing?</small>
	<a ng-click="deleteRubric(rubric)">[delete]</a>
</div>

<section>
	<div ng-hide="gradeOptionsEditor">
		<h3 ng-click="gradeOptionsEditor=!gradeOptionsEditor" class="editor">Grade Options</h3>
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
	<h3> </h3>

	<div ng-hide="section.Editor">
		<h3 ng-click="section.Editor=!section.Editor" class="editor">{{section.title}}</h3>
	</div>
	<div ng-show="section.Editor">
		<input ng-model="section.title">
		<small ng-click="section.Editor=!section.Editor; updateSection({index: $index, title:section.title})">Done editing?</small>
		<a ng-click="section.Editor=!section.Editor; deleteSection({ index: $index })">[delete]</a>
	</div>

		<div ng-hide="editorEnabled">
			<small ng-click="editorEnabled=!editorEnabled" class="editor">{{Math.round(section.secWeight * 100)}}%</small>
		</div>
		<div ng-show="editorEnabled">
			<input ng-model="section.secWeight">
			<small ng-click="editorEnabled=!editorEnabled; updateWeight($index,section.secWeight)">Done editing?</small>
		</div>



	
	
	<p><a href="#/course/{{course.courseCode}}/rubric/{{rubric.title}}/section/{{$index}}/addItem">Add Item to {{section.title}}</a></p>

	<!-- Line Items -->
	<article id="item4" data-itemid="4" ng-repeat="item in section.items">
		<div class="itemBox">
			<div class="row-fluid line-item">
				<div class="span8">
					

		<div ng-hide="item.Editor">
			<h3 ng-click="item.Editor=!item.Editor" class="editor">
						{{item.title}}
						<small ng-show="item.url" class="non-essential">
							<a href="{{item.url}}">more info</a>
						</small>
					</h3>
					<div class="span12 non-essential" ng-bind-html-unsafe="item.markdown"></div>
		</div>
		<div ng-show="item.Editor">
			<label>Title</label>
			<input type="text" ng-model="item.title" placeholder="Design Principals" />
			
			<label>Wiki Link</label>
			<input type="text" ng-model="item.url" placeholder="http://wddbs.com/wiki/Rubric#Design_Principles" />
			
			<label>Description</label>
			<textarea class="span6" rows="9" ng-model="item.content" placeholder="50 to 75 Words"></textarea>
			<small ng-click="item.Editor=!item.Editor; updateItem({item:item, section:section})">Done editing?</small>
			<a ng-click="item.Editor=!item.Editor; deleteItem({item:item, section:section})">[delete]</a>
		</div>


				</div>		
			</div>
		</div>
	</article>
</section>