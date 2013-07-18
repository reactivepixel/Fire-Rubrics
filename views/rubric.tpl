<h2>{{rubric.title}}</h2>
<section ng-repeat="section in rubric.sections">
	<h3>{{section.title}} <small>{{Math.round(section.secWeight * 100)}}%</small></h3>
	<!-- Line Items -->
	<article id="item4" data-itemid="4" ng-repeat="item in section.items">
		<div class="row-fluid line-item">
			<div class="span8">
				<h3>{{item.title}}						<small ng-show="item.url" class="non-essential"><a href="{{item.url}}">more info</a></small>
									</h3>
				<div class="span12 non-essential">{{item.content}}</div>
			</div>

			<!-- Grading Btns -->
			<aside class="span4 item-grade-wrapper non-essential">
				<div class="btn-toolbar">
					<div class="btn-group" data-itemid="4" data-itemtitle="Branding">
						<a ng-repeat="gradeOption in rubric.gradeOptions" class="btn btn-info" data-baseclass="btn-info" data-score="{{gradeOption}}" href="#">{{gradeOption}}</a>
					</div>
				</div>
				<p><a href="#" class="addComment" data-itemid="4">Add Comment?</a></p>
			</aside> <!-- /Grading Btns -->

			<textarea id="comment4" name="comment4" class="span12" style="display: none;"></textarea>
			
		</div>
	</article>
	<p><a href="#/course/{{course.courseCode}}/rubric/{{rubric.title}}/section/{{$index}}/addItem">Add Item to {{section.title}}</a></p>
</section>



