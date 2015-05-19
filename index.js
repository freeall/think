var level = require('./level');

var LEVELS = [
	[
		[['']],
		[['x']]
	], [
		[['', 'x']],
		[['x', '']]
	], [
		[
			['', 'x'],
			['x', '']
		],
		[
			['x', ''],
			['', 'x']
		]
	], [
		[
			['','',''],
			['','',''],
			['','','']
		],
		[
			['x','',''],
			['','x',''],
			['','','x']
		]
	], [
		[
			['','',''],
			['','',''],
			['','','']
		],
		[
			['','','x'],
			['','x',''],
			['x','','']
		]
	], [
		[
			['','',''],
			['','',''],
			['','','']
		],
		[
			['x','','x'],
			['','x',''],
			['x','','x']
		]
	], [
		[
			['', 'x'],
			['x', '']
		],
		[
			['x', 'x'],
			['x', '']
		],
		[
			['x', 'x'],
			['x', 'x']
		],
		[
			['x', ''],
			['x', 'x']
		],
		[
			['x', ''],
			['', 'x']
		]
	]
];
var current = 0;
var $container = $('#level');

var ondone = function() {
	alert('Yay! You won the game.');
};

(function next() {
	var engine = level($container, LEVELS[current]);
	engine.on('complete', function() {
		current += 1;
		if (!LEVELS[current]) return ondone();

		var $elem = $('<div class="w1 h1 next"></div>');
		setTimeout(function() {
			$container.append($elem);

			setTimeout(function() {
				$elem.addClass('fade');

				setTimeout(function() {
					engine.clear();

					next();
					$elem.removeClass('fade');
					setTimeout(function() {
						$elem.remove();
					}, 500);
				}, 500);
			}, 1);
		}, 150);
	});
	engine.on('shouldrestart', function() {
		var $elem = $('<div class="w1 h1 restart"></div>');

		setTimeout(function() {
			$container.append($elem);

			setTimeout(function() {
				$elem.addClass('fade');

				setTimeout(function() {
					engine.clear();
					engine.start();

					$elem.removeClass('fade');
					setTimeout(function() {
						$elem.remove();
					}, 500);
				}, 500);

			}, 1);
		}, 150);
	});
	engine.on('correct', function() {
		console.log('correct');
	});
	engine.start();
})();
