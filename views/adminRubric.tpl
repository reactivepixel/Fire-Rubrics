<div class="admin">
	<div ng-show="sumError" class="alert alert-error">
	  <button type="button" class="close" data-dismiss="alert">&times;</button>
	  <strong>Warning!</strong> Sum of all Sections needs to be 100%.
	</div>


	<!-- Inline Editor: Rubric Title -->
	<section class="editor">
		<div ng-hide="titleEditor">
			<h4 ng-click="titleEditor=!titleEditor">Title: {{rubric.title}}</h4>
		</div>

		<div ng-show="titleEditor">
			<input ng-model="rubric.title" />
			
			<a ng-click="titleEditor=!titleEditor; updateRubric({ rubric: rubric, course:course })" class="btn btn-success btn-mini" ><span class="fui-check"></span>&nbsp;&nbsp;Done Editing?</a>
			<a ng-click="deleteRubric(rubric)" class="btn btn-danger btn-mini"><span class="fui-trash fui-trash"></span></a>
		</div>
	</section><!-- // Inline Editor: Rubric Title -->


	<!-- Inline Editor: Grade Options -->
	<section class="editor grade-options-wrapper">
		<div ng-hide="gradeOptionsEditor">
			<h5 ng-click="gradeOptionsEditor=!gradeOptionsEditor">Grade Options</h5>
		</div>
		<div ng-show="gradeOptionsEditor">
			<input ng-model="NewGradeOptions" />
			
			<a ng-click="gradeOptionsEditor=!gradeOptionsEditor; updateGradeOptions()" class="btn btn-success btn-mini" ><span class="fui-check"></span>&nbsp;&nbsp;Done Editing?</a>
			
		</div>

		<div class="btn-group">
			<a ng-repeat="gradeOption in rubric.gradeOptions" class="btn" >{{gradeOption}}</a>
		</div>
	</section>
	<!-- // Inline Editor: Grade Options -->

	<div class="row">
	<section ng-repeat="section in rubric.sections" class="span4">
		<div ng-hide="section.Editor">
			<h4 ng-click="section.Editor=!section.Editor" class="editor">Section: {{section.title}}</h4>
		</div>
		<div ng-show="section.Editor">
			<input ng-model="section.title">
			<a ng-click="section.Editor=!section.Editor; updateSection({index: $index, title:section.title})" class="btn btn-success btn-mini" ><span class="fui-check"></span>&nbsp;&nbsp;Done Editing?</a>
			<a ng-click="section.Editor=!section.Editor; deleteSection({ index: $index })" class="btn btn-danger btn-mini"><span class="fui-trash fui-trash"></span></a>
		</div>
		
		<div class="">
			<div ng-hide="editorEnabled" class="">
				<p ng-click="editorEnabled=!editorEnabled" class="editor">Section Weight: {{Math.round(section.secWeight * 100)}}%</p>
			</div>
			<div ng-show="editorEnabled">
				<input ng-model="section.secWeight">
				<small ng-click="editorEnabled=!editorEnabled; updateWeight($index,section.secWeight)">Done editing?</small>
			</div>

			
			<div class=""><a href="#/course/{{course.courseCode}}/rubric/{{rubric.title}}/section/{{$index}}/addItem">Add Item to {{section.title}}</a></div>
		</div>
		<!-- Line Items -->
		<article ng-repeat="item in section.items" ng-click="item.Editor=!item.Editor" class="editor">
			<div class="itemBox">
				<div class="row-fluid line-item">
					<div class="span8">
						

			<div ng-hide="item.Editor">
				<h3 >
							{{item.title}}
							<small ng-show="item.url" class="non-essential">
								<a>{{item.url}}</a>
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
	</div>
</div>