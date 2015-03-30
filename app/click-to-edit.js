angular.module('tkw', []);

angular.module('tkw').directive('clickToEdit', function ($compile) {
	var editing = false;

	function viewTemplate() {
		return '<p>{{ data }}</p>';
	}

	function editTemplate(height) {
		return '<textarea ng-blur="finishEditing()" style="height:' + height + 'px" ng-model="data"></textarea>';
	}

	var linker = function (scope, elem, attrs) {
		elem.addClass('tw click-to-edit');

		elem.on('click', function () {
			if (!editing) {
				var height = elem[0].offsetHeight;
				elem.html(editTemplate(height));
				$compile(elem.contents())(scope);
				elem[0].focus();
				editing = true;
			}
		});	

		scope.finishEditing = function () {
			console.log('fired');
			elem.html(viewTemplate());
			$compile(elem.contents())(scope);
			editing = false;
			scope.onComplete()(scope.data);
		};

		elem.html(viewTemplate());
		$compile(elem.contents())(scope);
	};

	return {
		restrict: 'A',
		scope: {
			data: '=',
			onComplete: '&'
		},
		replace: false,
		link: linker
	};
});