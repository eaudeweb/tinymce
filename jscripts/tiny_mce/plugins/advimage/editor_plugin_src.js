/**
 * editor_plugin_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */

(function() {
	tinymce.create('tinymce.plugins.AdvancedImagePlugin', {
		init : function(ed, url) {
			// Register commands
			ed.addCommand('mceAdvImage', function() {
				// Internal image object like a flash placeholder
				if (ed.dom.getAttrib(ed.selection.getNode(), 'class', '').indexOf('mceItem') != -1)
					return;
				var real_url = ed.settings.select_image_url;
				var node = ed.selection.getNode();
				dom = ed.dom
				if (node && node.nodeName == 'IMG') {
					real_url = ed.settings.edit_image_url + '&url=' + dom.getAttrib(node, 'src');
				  var title = dom.getAttrib(node, 'title');
					real_url += title != '' ? '&title=' + title : '';
					var alignment = jQuery.support.cssFloat ? node.style.cssFloat : node.style.styleFloat;
					real_url += alignment != '' ? '&alignment=' + alignment : '';
					if(alignment == '') {
						alignment = node.style.verticalAlign;
						real_url += alignment != '' ? '&alignment=' + alignment : '';
					}
					var border = node.style.border;
					real_url += border != '' ? '&border=' + border : '';
					var margin = node.style.margin;
					real_url += margin != '' ? '&margin=' + margin : '';
					var width = node.style.width;
					if (width == '') width = node.width;
					real_url += width != '' ? '&width=' + width : '';
					var height = node.style.height;
					if (height == '') height = node.height;
					real_url += height != '' ? '&height=' + height : '';
				}
				ed.windowManager.open({
					file : real_url,
					width : parseInt(ed.settings.img_popup_w),
					height : parseInt(ed.settings.img_popup_h),
					inline : 1
				}, {
					plugin_url : url
				});
			});

			// Register buttons
			ed.addButton('image', {
				title : 'advimage.image_desc',
				cmd : 'mceAdvImage'
			});
		},

		getInfo : function() {
			return {
				longname : 'Advanced image',
				author : 'Moxiecode Systems AB',
				authorurl : 'http://tinymce.moxiecode.com',
				infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/advimage',
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('advimage', tinymce.plugins.AdvancedImagePlugin);
})();
