<h1>{{rubric.title}}</h1>
<div ng-repeat="item in section.items">
	<p ng-show="item.capture">{{item.title}} [ {{item.capture.gradeOption}} ]</p>
</div>

<div id="storage" class="palette-clouds">
	



<section ng-repeat="section in rubric.sections" ng-show="progress.captureDisp">
	<h3>{{section.title}} 
		<small ng-click="editorEnabled=!editorEnabled">{{Math.round(section.secWeight * 100)}}%</small>
	</h3>

	<!-- Line Items -->
	<article ng-repeat="item in section.items" ng-show="item.capture">
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
						

						<a 	ng-click="
								item.mainDisp 	= false;
								item.capture 	= { gradeOption : gradeOption };
								onGrade();
							"

							ng-repeat="gradeOption in rubric.gradeOptions" class="btn" ng-class="{'btn-success' : item.capture && item.capture.gradeOption == gradeOption }" >{{gradeOption}}
						</a>
					</div>
				</div>
				<p>
					<a class="addComment" ng-click="item.showComment=true" ng-hide="item.showComment">
						Add Comment?
					</a>
				</p>
			</aside> <!-- /Grading Btns -->

			
			<textarea ng-model="item.Comment" ng-show="item.showComment" class="span12"></textarea>
			
			</div>
		</div>
	</article>
</section>



</div>




<section ng-repeat="section in rubric.sections">
	<h3>{{section.title}} 
		<small ng-click="editorEnabled=!editorEnabled">{{Math.round(section.secWeight * 100)}}%</small>
	</h3>

	<!-- Line Items -->
	<article ng-repeat="item in section.items" ng-hide="item.mainDisp == false">
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
						

						<a 	ng-click="
								item.mainDisp 	= false;
								item.capture 	= { gradeOption : gradeOption };
								onGrade();
							"

							ng-repeat="gradeOption in rubric.gradeOptions" class="btn" ng-class="{'btn-success' : item.capture && item.capture.gradeOption == gradeOption }" >{{gradeOption}}
						</a>
					</div>
				</div>
				<p>
					<a class="addComment" ng-click="item.showComment=true" ng-hide="item.showComment">
						Add Comment?
					</a>
				</p>
			</aside> <!-- /Grading Btns -->

			
			<textarea ng-model="item.Comment" ng-show="item.showComment" class="span12"></textarea>
			
			</div>
		</div>
	</article>
</section>