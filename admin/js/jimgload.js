/** 
 *------------------------------------------------------------------------------
 * @package       CANVAS Framework for Joomla!
 *------------------------------------------------------------------------------
 * @copyright     Copyright (C) 2004-2013 ThemezArt.com. All Rights Reserved.
 * @license       GNU General Public License version 2 or later; see LICENSE.txt
 * @authors       ThemezArt
 *                & t3-framework.org as base version
 * @Link:         http://themezart.com/canvas-framework 
 *------------------------------------------------------------------------------
 */

;(function($, undefined) {
	'use strict';
	
	// blank image data-uri bypasses webkit log warning (thx doug jones)
	var blank = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

	$.fn.canvasimgload = function(option){
		var opts = $.extend({onload: false}, $.isFunction(option) ? {onload: option} : option),
			jimgs = this.find('img').add(this.filter('img')),
			total = jimgs.length,
			loaded = [],
			onload = function(){
				if(this.src === blank || $.inArray(this, loaded) !== -1){
					return;
				}

				loaded.push(this);

				$.data(this, 'canvasiload', {src: this.src});
				if (total === loaded.length){
					$.isFunction(opts.onload) && setTimeout(opts.onload);
					jimgs.unbind('.canvasiload');
				}
			};

		if (!total){
			$.isFunction(opts.onload) && opts.onload();
		} else {
			jimgs.on('load.canvasiload error.canvasiload', onload).each(function(i, el){
				var src = el.src,
					cached = $.data(el, 'canvasiload');

				if(cached && cached.src === src){
					onload.call(el);
					return;
				}

				if(el.complete && el.naturalWidth !== undefined){
					onload.call(el);
					return;
				}

				if(el.readyState || el.complete){
					el.src = blank;
					el.src = src;
				}
			});
		}

		return this;
	};
})(jQuery);