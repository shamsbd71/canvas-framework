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

 !function($){

 	$(document).ready(function(){

		if ($.support.canvastransform !== false) {

			var $btn = $('.btn-navbar[data-toggle="collapse"]'),
				$nav = null,
				$fixeditems = null;

			if (!$btn.length){
				return;
			}

			//mark that we have off-canvas menu
			$(document.documentElement).addClass('off-canvas-ready');

			$nav = $('<div class="canvas-mainnav" />').appendTo($('<div id="off-canvas-nav"></div>').appendTo(document.body));

			//not all btn-navbar is used for off-canvas
			var $navcollapse = $btn.parent().find($btn.data('target') + ':first');
			if(!$navcollapse.length){
				$navcollapse = $($btn.data('target') + ':first');
			}
			$navcollapse.clone().appendTo($nav);
			
			$btn.click (function(e){
				if ($(this).data('off-canvas') == 'show') {
					hideNav();
				} else {
					showNav();
				}

				return false;
			});

			var posNav = function () {
				var t = $(window).scrollTop();
				if (t < $nav.position().top) $nav.css('top', t);
			},

			bdHideNav = function (e) {
				e.preventDefault();
				hideNav();
				return false;
			},

			showNav = function () {
				$('html').addClass ('off-canvas');

				$nav.css('top', $(window).scrollTop());
				wpfix(1);
				
				setTimeout (function(){
					$btn.data('off-canvas', 'show');
					$('html').addClass ('off-canvas-enabled');
					$(window).on('scroll touchmove', posNav);

					// hide when click on off-canvas-nav
					$('#off-canvas-nav').on ('click', function (e) {
						e.stopPropagation();
					});
					
					//$('#off-canvas-nav a').on ('click', hideNav);
					$('body').on ('click', bdHideNav);
				}, 50);

				setTimeout (function(){
					wpfix(2);
				}, 1000);
			},

			hideNav = function (e) {

				//prevent close on the first click of parent item
				if(e && e.type == 'click' 
					&& e.target.tagName.toUpperCase() == 'A' 
					&& $(e.target).parent('li').data('noclick')){
					return true;
				}

				$(window).off('scroll touchmove', posNav);
				$('#off-canvas-nav').off ('click');
				//$('#off-canvas-nav a').off ('click', hideNav);
				$('body').off ('click', bdHideNav);
				
				$('html').removeClass ('off-canvas-enabled');
				$btn.data('off-canvas', 'hide');

				setTimeout (function(){
					$('html').removeClass ('off-canvas');
				}, 600);
			},

			wpfix = function (step) {
				// check if need fixed
				if ($fixeditems == -1){
					return;// no need to fix
				}

				if (!$fixeditems) {
					$fixeditems = $('body').children().filter(function(){ return $(this).css('position') === 'fixed' });
					if (!$fixeditems.length) {
						$fixeditems = -1;
						return;
					}
				}

				if (step==1) {
					$fixeditems.each (function () {
						var $this = $(this);
						var style = $this.attr('style'),
						opos = style && style.match('position') ? $this.css('position'):'',
						otop = style && style.match('top') ? $this.css('top'):'';

						$this.data('opos', opos).data('otop', otop);
						$this.css({'position': 'absolute', 'top': ($(window).scrollTop() + parseInt($this.css('top'))) });
					});

				} else {
					$fixeditems.each (function () {
						$this = $(this);
						$this.css({'position': $this.data('opos'), 'top': $this.data('otop')});
					});
				}
			};
		}
	});

}(jQuery);