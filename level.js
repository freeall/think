var events = require('events');
var once = require('once');

var equalPosition = function(a,b) {
	var res = true;
	a.forEach(function(rows, y) {
		rows.forEach(function(state, x) {
			if (b[y][x] !== state) res = false;
		});
	});
	return res;
};

module.exports = function(container, data) {
	var $container = $(container);
	var that = new events.EventEmitter();
	var position;
	var current;

	var onclick = function(e) {
		e.stopPropagation();

		var $this = $(this);
		var x = parseInt($this.attr('x'));
		var y = parseInt($this.attr('y'));

		if ($this.hasClass('filled')) {
			$this.removeClass('filled');
			current[y][x] = '';
		} else {
			$this.addClass('filled');
			current[y][x] = 'x';
		}

		var next = data[position+1];

		if (current[y][x] !== next[y][x]) {
			that.emit('shouldrestart');
			return;
		}

		if (equalPosition(current, next)) {
			that.emit('correct');
			position++;
		}

		if (position === data.length-1) that.emit('complete');
	};

	that.restart = function() {
		position = 0;
		current = JSON.parse(JSON.stringify(data[0]));
		data[0].forEach(function(row, y) {
			row.forEach(function(state, x) {
				state = state === 'x' ? 'filled' : '';

				var $box = $('.box[x='+x+'][y='+y+']', $container);
				if (!state) return $box.removeClass('filled');
				$box.addClass(state);
			});
		});
	};
	that.start = function() {
		position = 0;
		current = JSON.parse(JSON.stringify(data[0]));		

		data[0].forEach(function(row, y) {
			row.forEach(function(state, x) {
				state = state === 'x' ? 'filled' : '';
				var rows = data[0].length;
				var cols = data[0][0].length;

				$container.append('<div class="box w'+cols+' h'+rows+' '+state+'" x="'+x+'" y="'+y+'"></div>');
			});
			$container.append('<div class="clear"></div>');
		});

		$('.box').on('click', onclick);
	
	};
	that.clear = function() {
		$('.box', container).remove();
	};
	return that;
};