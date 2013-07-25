<hgroup>
	<h1>{{rubric.title}}</h1>
	<h2>{{course.courseCode}} - {{course.title}}</h2>	
</hgroup>

<aside>
	You scored <strong>{{Audit.totalScore}}</strong> out of 100 pts. possible.
</aside>

<section>
	<h3>Assessment Breakdown</h3>
	<p>Aesthetics</p>
	
	<div ng-repeat="section in rubric.sections">
		
		<h5>{{section.title}}</h5>
		<article ng-repeat="item in section.items">
			<header>
				<strong><a href="{{item.url}}">{{item.title}}</a></strong>
				- {{item.capture.gradeOption}}%
			</header>
			<p ng-show="item.Comment">Comments: {{item.Comment}}</p>
		</article>
	</div>
</section>