/**
 * jquery.auto.adjustable.panels.js
 * 
 * @author: miguel baldi (miguel DOT baldi AT 1up4dev DOT org)
 * @version: 0.1
 * 
 * Created by Miguel Aranha Baldi Horlle on 2011-03-11. Please report any bug at
 * http://www.1up4dev.org
 * 
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function($) {
	$.fn.extend({
		// pass the options variable to the function
		adjustable : function(options) {
			// Set the default values
			var defaults = {
				maxHeightElement : this,
				maxHeight : this.height(),
				offset : 0
			}
			var options = $.extend(defaults, options);
			return this.each(function() {
				var o = options;
				var parent = $(this);
				var resizables = parent.find('.adjustable');
				resizables.each(function(i) {
					var child = $(this);
					child.data('height', child.height());
					child
							.resize(function(e) {
								process($(e.target), options.maxHeight,
										options.offset);
							});
				});
			});
		}
	});

	// class attributes

	// private functions
	function process(resizable, maxHeight, offset) {
		log('resized::before::height::' + resizable.data('height')
				+ ' | resized::after::height::' + resizable.height()
				+ ' maxHeight::' + maxHeight + ' leftDiv:: '
				+ $('#leftDiv').height());
		resizable.attr('current', 'true');
		var others = $('div:not([current])[class="adjustable"]');
		var normalSize = ((maxHeight - offset) / $('[class="adjustable"]').length);
		var avgSize = ((maxHeight - offset) / others.length);
		var resizableHeight = resizable.height();
		for ( var i = 0; i < others.length; i++) {
			if (resizableHeight < 1) {
				$(others[i]).height(avgSize);
			}
		}

		resizable.data('height', resizable.height());
		resizable.removeAttr('current');
	}

	function assembleObject(str) {
		var body = str.replace(/\;$/, '');
		var tokens = body.split(';');
		body = '';
		for ( var i = 0; i < tokens.length; i++) {
			log('token::' + tokens[i]);
			var t = tokens[i].split(':');
			body = body + '"' + $.trim(t[0]) + '":"' + $.trim(t[1]) + '",';
		}
		var obj = '({' + body.replace(/\,$/, '') + '})';
		log('[object]::' + obj);
		return eval(obj);
	}

	function log(msg) {
		if (window.console && window.console.log) {
			window.console.log(msg);
		}
	}

})(jQuery);
