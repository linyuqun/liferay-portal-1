AUI().add(
	'liferay-social-activity-admin',
	function(A) {
		var Lang = A.Lang;

		var Node = A.Node;

		var Widget = A.Widget;

		var CSS_SETTINGS_ICON_CLOSE = 'settings-icon-close';

		var CSS_SETTINGS_ICON_EXPANDED = 'settings-icon-expanded';

		var CSS_TOKEN = 'lfr-token';

		var COL_LIMIT_TYPE = [Liferay.Language.get('times-a-day'), Liferay.Language.get('times'), Liferay.Language.get('times-per-period')];

		var STR_ACTION_FIELD = 'action-field';

		var STR_ACTIVE = 'active';

		var STR_ACTIVITY_TYPE = 'activityType';

		var STR_BLANK = '';

		var STR_BOUNDING_BOX = 'boundingBox';

		var STR_COLLAPSE = Liferay.Language.get('collapse');

		var STR_CONJUNCTION = 'actions-conjunction';

		var STR_CONTENT_BOX = 'contentBox';

		var STR_CONTENT_FIELD = 'content-field';

		var STR_CONTRIBUTION_INCREMENT = 'contributionIncrement';

		var STR_CONTRIBUTION_LIMIT_PERIOD = 'contributionLimitPeriod';

		var STR_CONTRIBUTION_LIMIT_VALUE = 'contributionLimitValue';

		var STR_DATA_MODEL_NAME = 'data-modelName';

		var STR_DOT = '.';

		var STR_EVENT_SUBMIT = 'submit';

		var STR_EXPAND = Liferay.Language.get('expand');

		var STR_LANGUAGE_KEY = 'languageKey';

		var STR_LOCALIZED_NAME = 'localizedName';

		var STR_PARTICIPATION_INCREMENT = 'participationIncrement';

		var STR_PARTICIPATION_LIMIT_PERIOD = 'participationLimitPeriod';

		var STR_PARTICIPATION_LIMIT_VALUE = 'participationLimitValue';

		var STR_SAVE = Liferay.Language.get('save');

		var STR_SELECTED = 'selected';

		var STR_SETTINGS = 'settings';

		var STR_SETTINGS_BUTTON_HOLDER = 'settings-button-holder';

		var STR_SETTINGS_DISPLAY = 'settings-display';

		var STR_SETTINGS_FIELD = 'settings-field';

		var STR_SETTINGS_JSON = 'settingsJSON';

		var STR_SETTINGS_LIMIT = 'settings-limit';

		var STR_SPACE = ' ';

		var STR_UI = 'ui';

		var SELECTOR_CONJUNCTION = STR_DOT + STR_CONJUNCTION;

		var SELECTOR_FIELD_INPUT_CHOICE = '.aui-field-input-choice';

		var SELECTOR_SETTINGS_DISPLAY = STR_DOT + A.getClassName(STR_SETTINGS_DISPLAY);

		var SELECTOR_SETTINGS_FIELD = STR_DOT + A.getClassName(STR_SETTINGS_FIELD);

		var SELECTOR_SETTINGS_ICON_CLOSE = STR_DOT + CSS_SETTINGS_ICON_CLOSE;

		var SELECTOR_SETTINGS_ICON_TOGGLE = '.settings-icon-toggle';

		var SELECTOR_SETTINGS_LIMIT = STR_DOT + STR_SETTINGS_LIMIT;

		var SELECTOR_SOCIAL_ACTIVITY_ITEM = '.social-activity-item';

		var SELECTOR_SOCIAL_ACTIVITY_CONTENT = '.social-activity-details';

		var SELECTOR_UPDATE_SOCIAL_ACTIVITY_FORM = 'form.update-socialactivity-form';

		var SRC_UI = {
			src: STR_UI
		};

		var TPL_BUTTON_HOLDER = '<div class="' + [STR_SETTINGS_BUTTON_HOLDER].join(STR_SPACE) + ' aui-button aui-button-submit">' +
				'<span class="aui-button-content">' +
					'<input class="aui-button-input aui-button-input-submit" type="submit" value="' + STR_SAVE + '" />' +
				'</span>' +
			'</div>';

		var TPL_BOUNDING_BOX_SETTINGS_FIELD = '<li class="' + [CSS_TOKEN, STR_SETTINGS_FIELD, STR_ACTION_FIELD].join(STR_SPACE) + '"></li>';

		var TPL_CONTRIBUTION_INCREMENT = '<span class="contribution-increment"></span>';

		var TPL_FIELD = new A.Template(
			'<span class="settings-label">{labelText}</span>',
			'<div class="settings-controls">',
				'<div class="field-values">',
					'<span class="field field-text">{firstText}</span>',

					'<select id="{languageKey}_participationIncrement" class="settings-field-node">',
						'<tpl for="participationIncrements">',
							'<option {[ (values == parent.participationIncrement) ? "selected" : "" ]} title="{.}" value="{.}">{.}</option>',
						'</tpl>',
					'</select>',

					'<span class="field field-text">{secondText}</span>',

					'<select id="{languageKey}_contributionIncrement" class="settings-field-node">',
						'<tpl for="contributionIncrements">',
							'<option {[ (values == parent.contributionIncrement) ? "selected" : "" ]} title="{.}" value="{.}">{.}</option>',
						'</tpl>',
					'</select>',

					'<span class="field field-text">{thirdText}</span> <span class="field field-text field-contribution-text">{fourthText}</span>',
				'</div>',

				'<div class="settings-field-buttons">',
					'<tpl for="buttons">',
						'<a class="settings-button settings-button-{type}" href="javascript:;" title="{title}">',
							'<span class="settings-icon settings-icon-{type} {cssClass}">{text}</span>',
						'</a>',
					'</tpl>',
				'</div>',

				'<div class="aui-helper-hidden settings-limit">',
					'<tpl for="rows">',
						'<div class="settings-limit-row">',
							'<span class="field field-text">{text}</span>',
							'<select id="{parent.languageKey}_{type}LimitValue" class="settings-field-node">',
								'<tpl for="limitValues">',
									'<option {[ (values == parent.limitValue) ? "selected" : "" ]} title="{.}" value="{.}">{.}</option>',
								'</tpl>',
							'</select>',
							'<select id="{parent.languageKey}_{type}LimitPeriod" class="settings-field-node">',
								'<tpl for="limitPeriods">',
									'<option {[ ($index == parent.limitPeriod) ? "selected" : "" ]} title="{.}" value="{$index}">{.}</option>',
								'</tpl>',
							'</select>',
							'<span class="field field-text">.</span>',
						'</div>',
					'</tpl>',
				'</div>',
			'</div>'
		);

		var TPL_SETTINGS_DISPLAY = new A.Template(
			'<div class="settings-header yui3-widget-hd">',
				'<div class="settings-header-label">{headerText}</div>',
				'<ul class="settings-actions">',
					'<li class="actions-conjunction aui-helper-hidden">{conjunctionText}</li>',
				'</ul>',
			'</div>',
			'<ul class="container-drop-box yui3-widget-bd"></ul>',
			'<div class="aui-button-row yui3-widget-ft">',
				'<span class="aui-button aui-button-submit">',
					'<span class="aui-button-content">',
						'<input class="aui-button-input aui-button-input-submit" value="{saveText}" type="submit">',
					'</span>',
				'</span>',
			'</div>'
		);

		var SocialActivityAdmin = A.Component.create(
			{
				AUGMENTS: [Liferay.PortletBase],

				EXTENDS: A.Base,

				NAME: 'socialactivityadmin',

				prototype: {
					initializer: function(config) {
						var instance = this;

						instance._originalConfig = config;

						instance._contentBox = A.one(SELECTOR_SOCIAL_ACTIVITY_CONTENT);

						var socialActivityForm = A.one(SELECTOR_UPDATE_SOCIAL_ACTIVITY_FORM);

						var settingsInput = instance._getItemByName(socialActivityForm, STR_SETTINGS_JSON);

						var settings = instance.byId(STR_SETTINGS);

						var socialActivityItems = A.all(SELECTOR_SOCIAL_ACTIVITY_ITEM);

						socialActivityForm.detach(STR_EVENT_SUBMIT);

						socialActivityForm.on(STR_EVENT_SUBMIT, instance._onSocialActivityFormSubmit, instance);

						instance._socialActivityForm = socialActivityForm;

						instance._settingsInput = settingsInput;

						var getSocialActivitySettingMappingCallback = function(result, modelName) {
							if (result.length > 0) {
								config.dataSet = result;
								config.modelName = modelName;

								instance._addSettingsDisplay(config);
							}
						};

						settings.delegate(
							'click',
							function(event) {
								var currentTarget = event.currentTarget;

								if (currentTarget.test(SELECTOR_SOCIAL_ACTIVITY_ITEM) && !event.target.test('input')) {
									instance._revealSection(currentTarget, getSocialActivitySettingMappingCallback);
								}
								else if (currentTarget.test(SELECTOR_FIELD_INPUT_CHOICE)) {
									instance._updateCheckboxStatus(event);
								}
							},
							[SELECTOR_SOCIAL_ACTIVITY_ITEM, SELECTOR_FIELD_INPUT_CHOICE].join()
						);

						var lastIndex = socialActivityItems.size() - 1;

						A.some(
							socialActivityItems,
							function(item, index, collection) {
								var checked = item.one(SELECTOR_FIELD_INPUT_CHOICE).attr('checked');
								var node = item;

								if (!checked && index == lastIndex) {
									checked = true;

									node = collection.item(0);
								}

								var modelName = node.attr(STR_DATA_MODEL_NAME);

								if (checked) {
									instance._getSocialActivitySettingMapping(
										themeDisplay.getScopeGroupId(),
										modelName,
										function(result) {
											getSocialActivitySettingMappingCallback(result, modelName);
										}
									);

									node.addClass(STR_SELECTED);
								}

								return checked;
							}
						);
					},

					_revealSection: function(menuItem, getSocialActivitySettingMappingCallback) {
						var instance = this;

						var settingsDisplay = instance._contentBox.one(SELECTOR_SETTINGS_DISPLAY);

						var modelName = menuItem.attr(STR_DATA_MODEL_NAME);

						if (settingsDisplay) {
							settingsDisplay.remove();
						}

						menuItem.radioClass(STR_SELECTED);

						instance._getSocialActivitySettingMapping(
							themeDisplay.getScopeGroupId(),
							modelName,
							function(result) {
								getSocialActivitySettingMappingCallback(result, modelName);
							}
						);
					},

					_addSettingsDisplay: function(config) {
						var instance = this;

						instance.settingsDisplay = new SettingsDisplay(config).render(instance._contentBox);
					},

					_getItemByName: function(currentForm, name, ignoreNamespace) {
						var instance = this;

						var inputName = name;

						if (!ignoreNamespace) {
							inputName = instance.NS + name;
						}

						return currentForm.one('[name=' + inputName + ']');
					},

					_getJsonSettings: function(settingsDisplay) {
						var instance = this;

						return {
							actions: settingsDisplay.getSettingsJSON(),
							modelName: instance._originalConfig.modelName
						};
					},

					_getSocialActivitySettingMapping: function(groupId, modelName, callback) {
						var instance = this;

						Liferay.Service.Social.SocialActivitySetting.getJSONActivityDefinitions(
							{
								groupId: groupId,
								modelName: modelName
							},
							callback
						);
					},

					_onSocialActivityFormSubmit: function(event) {
						var instance = this;

						var form = event.currentTarget;

						event.halt();

						instance._updateSocialActivitySettings(form);

						submitForm(form);
					},

					_updateCheckboxStatus: function(event) {
						var instance = this;

						var currentTarget = event.currentTarget;

						var modelName = currentTarget.ancestor(SELECTOR_SOCIAL_ACTIVITY_ITEM).attr(STR_DATA_MODEL_NAME);

						Liferay.Service.Social.SocialActivitySetting.updateActivitySetting(
								{
									groupId: themeDisplay.getScopeGroupId(),
									modelName: modelName,
									value: currentTarget.attr('checked')
								}
							);
					},

					_updateSocialActivitySettings: function(form) {
						var instance = this;

						instance._settingsInput.val(A.JSON.stringify(instance._getJsonSettings(instance.settingsDisplay)));
					}
				}
			}
		);

		var SettingsDisplay = A.Component.create(
			{
				ATTRS: {

					buttonsNode: {
						valueFn: function() {
							return Node.create(TPL_BUTTON_HOLDER);
						}
					},

					id: {
						value: STR_BLANK
					},

					modelName: {
						value: STR_BLANK
					}
				},

				NAME: STR_SETTINGS_DISPLAY,

				prototype: {
					initializer: function(config) {
						var instance = this;

						instance._settingsFields = {};
					},

					renderUI: function() {
						var instance = this;

						var contentBox = instance.get(STR_CONTENT_BOX);

						var originalConfig = instance._originalConfig;

						var activityDefinitionLanguageKeys = originalConfig.activityDefinitionLanguageKeys;

						var settingsNode = TPL_SETTINGS_DISPLAY.render(
							{
								conjunctionText: Liferay.Language.get('or').toLowerCase(),
								headerText: Liferay.Language.get('social-activity-setting-header-label'),
								saveText: STR_SAVE
							}
						);

						var bodyNode = settingsNode.one('.container-drop-box');
						var headerNode = settingsNode.one('.settings-header');

						var actionsNode = headerNode.one('.settings-actions');

						A.each(
							originalConfig.dataSet,
							function(item, index, collection) {
								item.localizedName = activityDefinitionLanguageKeys[item.modelName + '.' + item.languageKey];

								item.settingsDisplay = instance;
								item.counterSettings = originalConfig.counterSettings;

								var settingsField = new SettingsField(item);

								settingsField.addTarget(instance);

								var renderNode = actionsNode;

								if (settingsField.get(STR_ACTIVE)) {
									renderNode = bodyNode;
								}

								settingsField.render(renderNode);

								instance._settingsFields[settingsField.get(STR_LANGUAGE_KEY)] = settingsField;
							}
						);

						instance.actionsNode = actionsNode;
						instance.bodyNode = bodyNode;
						instance.headerNode = headerNode;

						instance._handleConjunction();

						contentBox.append(settingsNode);
					},

					bindUI: function() {
						var instance = this;

						instance.actionsNode.delegate('click', A.rbind(instance._toggleField, instance, false), SELECTOR_SETTINGS_FIELD, instance);

						instance.bodyNode.delegate('click', instance._onBodyNodeClick, [SELECTOR_SETTINGS_ICON_CLOSE, SELECTOR_SETTINGS_ICON_TOGGLE].join(), instance);

						instance.after('settings-field:collapsedChange', instance._afterSettingsFieldCollapsed);
					},

					getSettingsJSON: function() {
						var instance = this;

						var settingsJSON = [];

						var settingsFields = instance._settingsFields;

						for (var i in settingsFields) {
							settingsJSON.push(settingsFields[i].getSettingsJSON());
						}

						return settingsJSON;
					},

					_afterSettingsFieldCollapsed: function(event) {
						var instance = this;

						var collapsed = event.newVal;

						var item = event.target.get(STR_BOUNDING_BOX);

						var node = instance.actionsNode;

						if (!collapsed) {
							node = instance.bodyNode;
						}
						else {
							instance._toggleLimitFields(item, false);
						}

						node.append(item);
					},

					_handleConjunction: function() {
						var instance = this;

						var actionsNode = instance.actionsNode;

						var actionsConjunction = instance._actionsConjunction;

						if (!actionsConjunction) {
							actionsConjunction = actionsNode.one(SELECTOR_CONJUNCTION);

							instance._actionsConjunction = actionsConjunction;
						}

						var children = actionsNode.all(SELECTOR_SETTINGS_FIELD);

						var childrenSize = children.size();

						if (childrenSize > 1) {
							actionsNode.insert(actionsConjunction, children.last());

							actionsConjunction.show();
						}
						else {
							actionsConjunction.hide();

							instance.headerNode.toggle(childrenSize == 1);
						}
					},

					_onBodyNodeClick: function(event) {
						var instance = this;

						var currentTarget = event.currentTarget;

						if (currentTarget.test(SELECTOR_SETTINGS_ICON_CLOSE)) {
							instance._toggleField(event, true);
						}
						else {
							var collapsed = !(currentTarget.hasClass(CSS_SETTINGS_ICON_EXPANDED));

							instance._toggleLimitFields(currentTarget.ancestor(SELECTOR_SETTINGS_FIELD), collapsed);
						}
					},

					_toggleField: function(event, collapsed) {
						var instance = this;

						var field = Widget.getByNode(event.currentTarget);

						field.set('collapsed', collapsed, SRC_UI);

						instance._handleConjunction();
					},

					_toggleLimitFields: function(item, collapsed) {
						var instance = this;

						item.one(SELECTOR_SETTINGS_LIMIT).toggle(collapsed);

						var toggleIcon = item.one(SELECTOR_SETTINGS_ICON_TOGGLE);

						var title = STR_EXPAND;

						if (collapsed) {
							title = STR_COLLAPSE;
						}

						toggleIcon.toggleClass(CSS_SETTINGS_ICON_EXPANDED, collapsed);

						toggleIcon.attr('title', title);
					}
				}
			}
		);

		var SettingsField = A.Component.create(
			{
				ATTRS: {
					active: {
						getter: '_getActive',
						setter: A.DataType.Boolean.parse,
						value: false
					},

					activityType: {
						value: 0
					},

					collapsed: {
						value: false
					},

					contributionIncrement: {
						value: 0
					},

					contributionLimitPeriod: {
						value: 1
					},

					contributionLimitValue: {
						value: 0
					},

					languageKey: {
						value: STR_BLANK
					},

					localizedName: {
						value: STR_BLANK
					},

					participationIncrement: {
						value: 0
					},

					participationLimitPeriod: {
						value: 1
					},

					participationLimitValue: {
						value: 0
					},

					selected: {
						setter: A.DataType.Boolean.parse,
						value: false
					}
				},

				NAME: STR_SETTINGS_FIELD,

				UI_ATTRS: ['collapsed', 'contributionIncrement'],

				prototype: {
					BOUNDING_TEMPLATE: TPL_BOUNDING_BOX_SETTINGS_FIELD,

					initializer: function(config) {
						var instance = this;

						var counters = config.counters;

						instance._counterSettings = config.counterSettings;
						instance._settingsDisplay = config.settingsDisplay;

						var incrementKey = STR_BLANK;
						var limitValueKey = STR_BLANK;
						var limitPeriodKey = STR_BLANK;

						var attrs = {};

						for (var i = 0; i < counters.length; i++) {
							var action = counters[i];

							incrementKey = STR_CONTRIBUTION_INCREMENT;
							limitValueKey = STR_CONTRIBUTION_LIMIT_VALUE;
							limitPeriodKey = STR_CONTRIBUTION_LIMIT_PERIOD;

							if (action.name == 'participation') {
								incrementKey = STR_PARTICIPATION_INCREMENT;
								limitValueKey = STR_PARTICIPATION_LIMIT_VALUE;
								limitPeriodKey = STR_PARTICIPATION_LIMIT_PERIOD;
							}
							else if (action.name != 'contribution') {
								continue;
							}

							attrs[incrementKey] = action.increment;
							attrs[limitValueKey] = action.limitValue;
							attrs[limitPeriodKey] = action.limitPeriod;
						}

						instance.setAttrs(attrs);
					},

					renderUI: function() {
						var instance = this;

						var contentBox = instance.get(STR_CONTENT_BOX);

						instance.get(STR_BOUNDING_BOX).attr(STR_LANGUAGE_KEY, instance.get(STR_LANGUAGE_KEY));

						var counterSettings = instance._counterSettings;

						var limitNode = TPL_FIELD.render(
							{
								buttons: [
									{
										text: Liferay.Language.get('limit'),
										title: STR_EXPAND,
										type: 'toggle'
									},
									{
										title: Liferay.Language.get('close'),
										type: 'close'
									}
								],
								contributionIncrement: instance.get(STR_CONTRIBUTION_INCREMENT),
								contributionIncrements: counterSettings.contributionIncrements,
								firstText: Liferay.Language.get('social-activity-setting-first-text'),
								labelText: instance.get(STR_LOCALIZED_NAME),
								languageKey: instance.get(STR_LANGUAGE_KEY),
								participationIncrement: instance.get(STR_PARTICIPATION_INCREMENT),
								participationIncrements: counterSettings.participationIncrements,
								rows: [
									{
										limitPeriod: instance.get(STR_CONTRIBUTION_LIMIT_PERIOD),
										limitPeriods: COL_LIMIT_TYPE,
										limitValue: instance.get(STR_CONTRIBUTION_LIMIT_VALUE),
										limitValues: counterSettings.contributionLimitValues,
										text: Liferay.Language.get('social-activity-setting-contribution-limit-first-text'),
										type: 'contribution'
									},
									{
										limitPeriod: instance.get(STR_PARTICIPATION_LIMIT_PERIOD),
										limitPeriods: COL_LIMIT_TYPE,
										limitValue: instance.get(STR_PARTICIPATION_LIMIT_VALUE),
										limitValues: counterSettings.participationLimitValues,
										text: Liferay.Language.get('social-activity-setting-participation-limit-first-text'),
										type: 'participation'
									}
								],
								secondText: Liferay.Language.get('social-activity-setting-second-text'),
								thirdText: Liferay.Language.get('social-activity-setting-third-text'),
								fourthText: Lang.sub(Liferay.Language.get('social-activity-setting-fourth-text'), [TPL_CONTRIBUTION_INCREMENT])
							}
						);

						limitNode.all('select').on('change', instance._selectOnChange, instance);

						contentBox.append(limitNode);
					},

					bindUI: function() {
						var instance = this;

						instance.after('collapsedChange', instance._afterCollapsedChange);
					},

					syncUI: function() {
						var instance = this;

						instance.set('collapsed', !instance.get(STR_ACTIVE));
					},

					getSettingsJSON: function() {
						var instance = this;

						return instance.getAttrs(
							[
								STR_ACTIVITY_TYPE,
								STR_CONTRIBUTION_INCREMENT,
								STR_CONTRIBUTION_LIMIT_PERIOD,
								STR_CONTRIBUTION_LIMIT_VALUE,
								STR_LANGUAGE_KEY,
								STR_PARTICIPATION_INCREMENT,
								STR_PARTICIPATION_LIMIT_PERIOD,
								STR_PARTICIPATION_LIMIT_VALUE
							]
						);
					},

					_afterCollapsedChange: function(event) {
						var instance = this;

						if (event.newVal && event.src == STR_UI) {
							instance._setToDefaultValue();
						}
					},

					_getActive: function() {
						var instance = this;

						return (instance.get(STR_CONTRIBUTION_INCREMENT) > 0 || instance.get(STR_PARTICIPATION_INCREMENT) > 0);
					},

					_selectOnChange: function(event) {
						var instance = this;

						var selectId = event.currentTarget.attr('id');

						var languageKey = instance.get(STR_LANGUAGE_KEY);

						selectId = selectId.replace(languageKey + '_', STR_BLANK);

						instance.set(selectId, event.currentTarget.val(), SRC_UI);
					},

					_setToDefaultValue: function() {
						var instance = this;

						instance.reset(STR_CONTRIBUTION_INCREMENT);
						instance.reset(STR_CONTRIBUTION_LIMIT_PERIOD);
						instance.reset(STR_CONTRIBUTION_LIMIT_VALUE);
						instance.reset(STR_PARTICIPATION_INCREMENT);
						instance.reset(STR_PARTICIPATION_LIMIT_PERIOD);
						instance.reset(STR_PARTICIPATION_LIMIT_VALUE);
					},

					_uiSetCollapsed: function(value) {
						var instance = this;

						var boundingBox = instance.get(STR_BOUNDING_BOX);

						boundingBox.toggleClass(STR_CONTENT_FIELD, !value);
						boundingBox.toggleClass(CSS_TOKEN, value);
					},

					_uiSetContributionIncrement: function(value, src) {
						var instance = this;

						var contributionIncrementNode = instance.get(STR_CONTENT_BOX).one('.contribution-increment');

						if (contributionIncrementNode) {
							contributionIncrementNode.html(value);

							if (src == STR_UI) {
								var parent = contributionIncrementNode.ancestor();

								parent.setStyle('backgroundColor', SocialActivity.FADE_COLOR_START);

								parent.transition(
									{
										backgroundColor: SocialActivity.FADE_COLOR_END,
										duration: 1.5
									}
								);
							}
						}
					}
				}
			}
		);

		var SocialActivity = Liferay.namespace('Portlet.SocialActivity');

		SocialActivity.Admin = SocialActivityAdmin;
		SocialActivity.SettingsDisplay = SettingsDisplay;
		SocialActivity.SettingsField = SettingsField;

		SocialActivity.FADE_COLOR_END = 'transparent';
		SocialActivity.FADE_COLOR_START = '#F7F082';
	},
	'',
	{
		requires: ['aui-base', 'aui-datatype', 'aui-template', 'liferay-portlet-base', 'transition']
	}
);