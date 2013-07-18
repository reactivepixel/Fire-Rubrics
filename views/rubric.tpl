<h1>{{rubric.title}}</h1>
<section ng-repeat="section in rubric.sections">
	<h3>{{section.title}} 
		<small ng-click="editorEnabled=!editorEnabled">{{Math.round(section.secWeight * 100)}}%</small>
	</h3>

	<!-- Line Items -->
	<article data-itemKey="$index" data-sectionKey="$parent.$index" ng-repeat="item in section.items">
		<div class="itemBox">
			<div class="row-fluid line-item">
				<div class="span8">
					<h3>{{item.title}}
						<small ng-show="item.url" class="non-essential">
							<a href="{{item.url}}">more info</a>
						</small>
					</h3>
					<div class="span12 non-essential">{{item.content}}</div>
				</div>		
					<!-- Grading Btns -->
			<aside class="span4 item-grade-wrapper non-essential">
				<div class="btn-toolbar">
					<div class="btn-group" data-itemid="4" data-itemtitle="Branding">
						

						<a ng-repeat="gradeOption in rubric.gradeOptions" class="btn btn-info" data-baseclass="btn-info" data-score="{{gradeOption}}" href="#">{{gradeOption}}</a>


						<!-- <a class="btn btn-info" data-baseclass="btn-info" data-score="75" href="#">75</a>
						<a class="btn btn-warning" data-baseclass="btn-warning" data-score="40" href="#">40</a>
						<a class="btn btn-danger" data-baseclass="btn-danger" data-score="0" href="#">0</a> -->
					</div>
				</div>
				<p><a href="#" class="addComment" data-itemid="4">Add Comment?</a></p>
			</aside> <!-- /Grading Btns -->

			
			<textarea id="comment4" name="comment4" class="span12" style="display: none;"></textarea>
			
			</div>
		</div>
	</article>
</section>