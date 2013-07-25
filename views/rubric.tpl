<div class="rubric">
	<hgroup>
		<h2 class="label label-success label-large">
			
		
					{{Math.round(Audit.totalScore)}} pts.
				

		</h2>
		<h3>{{rubric.title}}</h3>
		<h4>{{course.courseCode}} - {{course.title}}</h4>

	</hgroup>
</div>
<div ng-repeat="item in section.items">
	<p ng-show="item.capture">{{item.title}} [ {{item.capture.gradeOption}} ]</p>
</div>

<div id="storage" class="palette-clouds">
	
<section ng-repeat="section in rubric.sections" ng-show="progress.captureDisp">
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
					<div class="span12 non-essential" ng-bind-html-unsafe="item.markdown"></div>
				</div>		
					<!-- Grading Btns -->
			<aside class="span4 item-grade-wrapper non-essential">
				<div class="btn-toolbar">
					<div class="btn-group">
						

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

<div class="alert alert-info" ng-show="Audit.complete">
	<h3>Audit Completed!</h3>
	<p>
		It's not too late to <a href="#fakelink">review the audit</a> and make changes if needed.
		<br /><br />
		Otherwise, copy the content below and paste it as the comment in FSO to give the student your detailed audit of their project.
		
	</p><div class="demo-content ptl">
            <textarea rows="3" class="span12"><hgroup>
	<h1>{{rubric.title}}</h1>
	<h2>{{course.courseCode}} - {{course.title}}</h2>	
</hgroup>

<aside>
	You scored <strong>{{Math.round(Audit.totalScore * 100)}}</strong> out of 100 pts. possible.
</aside>

<section>
	<h3>Assessment Breakdown</h3>
	<p>Aesthetics</p>
	
	<div ng-repeat="section in course.sections">
		
		<h5>{{section.title}}</h5>
		<article ng-repeat="item in section.items">
			<header>
				<strong><a href="{{item.url}}">{{item.title}}</a></strong>
				- {{Math.round(item.capture.gradeOption) * 100}}%
			</header>
			<p>{{item.content}}</p>
		</article>
	</div>
</section>



</textarea>
          </div>
	<a class="btn btn-info btn-wide">Copy to Clipbard</a>
</div>


<section ng-repeat="section in rubric.sections">
	<div class="sectionTitle">
	
			<p span="brand">
				{{section.title}} 
				<small ng-show="section.score">
					{{Math.round(section.score)}}
					 of 
					{{Math.round(section.secWeight * 100)}} pts.
				</small>
			</p>
	</div>

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
					<div class="span12 non-essential" ng-bind-html-unsafe="item.markdown"></div>
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