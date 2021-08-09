/**
 * @package   	JCE
 * @copyright 	Copyright (c) 2009-2021 Ryan Demmer. All rights reserved.
 * @license   	GNU/GPL 2 or later - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * JCE is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */
(function () {
	var each = tinymce.each, Entities = tinymce.html.Entities, DOM = tinymce.DOM;

	function getDefaultMap() {
		return [
			['593', 'open back unrounded'],
			['592', 'open-mid schwa'],
			['594', 'open back rounded'],
			['230', 'raised open front unrounded'],
			['595', 'vd bilabial implosive'],
			['665', 'vd bilabial trill'],
			['946', 'vd bilabial fricative'],
			['596', 'open-mid back rounded'],
			['597', 'vl alveolopalatal fricative'],
			['231', 'vl palatal fricative'],
			['599', 'vd alveolar implosive'],
			['598', 'vd retroflex plosive'],
			['240', 'vd dental fricative'],
			['676', 'vd postalveolar affricate'],
			['601', 'schwa'],
			['600', 'close-mid schwa'],
			['602', 'rhotacized schwa'],
			['603', 'open-mid front unrounded'],
			['604', 'open-mid central'],
			['605', 'rhotacized open-mid central'],
			['606', 'open-mid central rounded'],
			['607', 'vd palatal plosive'],
			['644', 'vd palatal implosive'],
			['609', 'vd velar plosive'],
			['608', 'vd velar implosive'],
			['610', 'vd uvular plosive'],
			['667', 'vd uvular implosive'],
			['614', 'vd glottal fricative'],
			['615', 'vl multiple-place fricative'],
			['295', 'vl pharyngeal fricative'],
			['613', 'labial-palatal approximant'],
			['668', 'vl epiglottal fricative'],
			['616', 'close central unrounded'],
			['618', 'lax close front unrounded'],
			['669', 'vd palatal fricative'],
			['621', 'vd retroflex lateral'],
			['620', 'vl alveolar lateral fricative'],
			['619', 'velarized vd alveolar lateral'],
			['622', 'vd alveolar lateral fricative'],
			['671', 'vd velar lateral'],
			['625', 'vd labiodental nasal'],
			['623', 'close back unrounded'],
			['624', 'velar approximant'],
			['331', 'vd velar nasal'],
			['627', 'vd retroflex nasal'],
			['626', 'vd palatal nasal'],
			['628', 'vd uvular nasal'],
			['248', 'front close-mid rounded'],
			['629', 'rounded schwa'],
			['632', 'vl bilabial fricative'],
			['952', 'vl dental fricative'],
			['339', 'front open-mid rounded'],
			['630', 'front open rounded'],
			['664', 'bilabial click'],
			['633', 'vd (post)alveolar approximant'],
			['634', 'vd alveolar lateral flap'],
			['638', 'vd alveolar tap'],
			['635', 'vd retroflex approximant'],
			['640', 'vd uvular trill'],
			['641', 'vd uvular fricative'],
			['637', 'vd retroflex flap'],
			['642', 'vl retroflex fricative'],
			['643', 'vl postalveolar fricative'],
			['648', 'vl retroflex plosive'],
			['679', 'vl postalveolar affricate'],
			['649', 'close central rounded'],
			['650', 'lax close back rounded'],
			['651', 'vd labiodental approximant'],
			['11377', 'voiced labiodental flap'],
			['652', 'open-mid back unrounded'],
			['611', 'vd velar fricative'],
			['612', 'close-mid back unrounded'],
			['653', 'vl labial-velar fricative'],
			['967', 'vl uvular fricative'],
			['654', 'vd palatal lateral'],
			['655', 'lax close front rounded'],
			['657', 'vd alveolopalatal fricative'],
			['656', 'vd retroflex fricative'],
			['658', 'vd postalveolar fricative'],
			['660', 'glottal plosive'],
			['673', 'vd epiglottal plosive'],
			['661', 'vd pharyngeal fricative'],
			['674', 'vd epiglottal fricative'],
			['448', 'dental click'],
			['449', 'alveolar lateral click'],
			['450', 'alveolar click'],
			['451', 'retroflex click'],
			['712', '(primary) stress mark'],
			['716', 'secondary stress'],
			['720', 'length mark'],
			['721', 'half-length'],
			['700', 'ejective'],
			['692', 'rhotacized'],
			['688', 'aspirated'],
			['689', 'breathy-voice-aspirated'],
			['690', 'palatalized'],
			['695', 'labialized'],
			['736', 'velarized'],
			['740', 'pharyngealized'],
			['734', 'rhotacized'],
			['805', 'voiceless'],
			['778', 'voiceless (use if character has descender)'],
			['804', 'breathy voiced'],
			['810', 'dental'],
			['812', 'voiced'],
			['816', 'creaky voiced'],
			['826', 'apical'],
			['828', 'linguolabial'],
			['827', 'laminal'],
			['794', 'not audibly released'],
			['825', 'more rounded'],
			['771', 'nasalized'],
			['796', 'less rounded'],
			['799', 'advanced'],
			['800', 'retracted'],
			['776', 'centralized'],
			['820', 'velarized or pharyngealized'],
			['619', '(ready-made combination, dark l)'],
			['829', 'mid-centralized'],
			['797', 'raised'],
			['809', 'syllabic'],
			['798', 'lowered'],
			['815', 'non-syllabic'],
			['792', 'advanced tongue root'],
			['793', 'retracted tongue root'],
			['774', 'extra-short'],
			['779', 'extra high tone'],
			['769', 'high tone'],
			['772', 'mid tone'],
			['768', 'low tone'],
			['783', 'extra low tone'],
			['860', 'tie bar below'],
			['865', 'tie bar above'],
			['8595', 'downstep'],
			['8593', 'upstep'],
			['8594', 'becomes'],
			['8599', 'global rise'],
			['8600', 'global fall']
		];
	}

	tinymce.create('tinymce.plugins.IpaMap', {
		init: function (ed, url) {
			this.editor = ed;

			function renderHTML() {
				var i;

				var html = '';

				var map = getDefaultMap();

				for (i = 0; i < map.length; i++) {
					if (i < map.length) {
						var chr = map[i], chrText = chr ? String.fromCharCode(parseInt(chr[0], 10)) : '&nbsp;';
						var named = Entities.encodeNamed(chrText), named = named.substring(1);

						html += (
							'<button title="' + chr[1] + '" data-numeric="' + chr[0] + '" data-named="' + named + '">' +
							chrText +
							'</button>'
						);
					} else {
						html += '';
					}
				}

				html += '';

				return html;
			}

			function previewChar(codeA, codeB, codeN) {
				var elmA = DOM.get(ed.id + '_charmapCodeA');
				var elmB = DOM.get(ed.id + '_charmapCodeB');
				var elmV = DOM.get(ed.id + '_charmapCodeV');
				var elmN = DOM.get(ed.id + '_charmapCodeN');

				if (codeA == '#160;') {
					elmV.innerHTML = '__';
				} else {
					elmV.innerHTML = '&' + codeA;
				}

				elmB.innerHTML = '&amp;' + codeA;
				elmA.innerHTML = '&amp;' + codeB;
				elmN.innerHTML = codeN;
			}

			var html = '' +
				'<div role="presentation" class="mceCharacterMap mceModalRow">' +
				'	<div id="' + ed.id + '_charmapView" role="group"></div>' +
				'	<div class="mceCharacterMapDescription">' +
				'		<h1 id="' + ed.id + '_charmapCodeV"></h1>' +
				'		<h4 id="' + ed.id + '_charmapCodeN"></h4>' +
				'		<h3 id="' + ed.id + '_charmapCodeA"></h3>' +
				'		<h3 id="' + ed.id + '_charmapCodeB"></h3>' +
				'	</div>' +
				'</div>';

			ed.addCommand('mceIpaCharacterMap', function (v) {
				ed.windowManager.open({
					title: ed.getLang('ipa_title', 'International Phonetic Alphabet'),
					content: html,
					size: 'mce-modal-landscape-medium',
					open: function () {
						var win = this, elm = DOM.get(ed.id + '_charmapView');

						DOM.setHTML(elm, renderHTML());

						DOM.bind(elm, 'mouseover', function (e) {
							var node = e.target;

							if (node.nodeName !== "BUTTON") {
								return;
							}

							var chr = node.getAttribute('data-numeric'), chrA = '#' + chr + ';', chrB = node.getAttribute('data-named'), chrN = node.getAttribute('title');

							previewChar(chrA, chrB, chrN);
						});

						DOM.bind(elm, 'click', function (e) {
							var node = e.target;

							e.preventDefault();

							if (node.nodeName !== "BUTTON") {
								return;
							}

							var chr = node.getAttribute('data-numeric');
							ed.execCommand('mceInsertContent', false, '&#' + chr + ';');

							win.close();
						});

						new tinymce.ui.KeyboardNavigation({
							root: elm,
							items: DOM.select('button', elm),
							excludeFromTabOrder: false,
							onCancel: function () {
								ed.focus();
							}
						}, DOM);
					}
				});
			});

			// Register buttons
			ed.addButton('ipa', {
				title: 'International Phonetic Alphabet',
				cmd: 'mceIpaCharacterMap',
				image: url + '/img/ipa.svg'
			});
		}
	});
	// Register plugin
	tinymce.PluginManager.add('ipa', tinymce.plugins.IpaMap);
})();
