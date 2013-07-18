<h2>{{rubric.title}}</h2>
<section ng-repeat="section in rubric.sections">
	<h3>{{section.title}} <small>{{Math.round(section.secWeight * 100)}}%</small></h3>
	
	<p><a href="#/course/{{course.courseCode}}/rubric/{{rubric.title}}/section/{{$index}}/addItem">Add Item to {{section.title}}</a></p>

	<!-- Line Items -->
	<article id="item4" data-itemid="4" ng-repeat="item in section.items">
		<div class="row-fluid line-item">
			<div class="span8">
				<h3>{{item.title}}
					<small ng-show="item.url" class="non-essential">
						<a href="{{item.url}}">more info</a>
					</small>
				</h3>
				<div class="span12 non-essential">{{item.content}}</div>
			</div>		
		</div>
	</article>
</section>