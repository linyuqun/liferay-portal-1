<%--
/**
 * Copyright (c) 2000-2011 Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */
--%>

<%@ include file="/html/portlet/library_admin/init.jsp" %>

<%
Folder folder = (com.liferay.portal.kernel.repository.model.Folder)request.getAttribute(WebKeys.DOCUMENT_LIBRARY_FOLDER);

long folderId = BeanParamUtil.getLong(folder, request, "folderId", DLFolderConstants.DEFAULT_PARENT_FOLDER_ID);

if ((folder == null) && (folderId != DLFolderConstants.DEFAULT_PARENT_FOLDER_ID)) {
	try {
		folder = DLAppLocalServiceUtil.getFolder(folderId);
	}
	catch (NoSuchFolderException nsfe) {
		folderId = DLFolderConstants.DEFAULT_PARENT_FOLDER_ID;
	}
}

long repositoryId = scopeGroupId;

if (folder != null) {
	repositoryId = folder.getRepositoryId();
}

request.setAttribute("view.jsp-folder", folder);

request.setAttribute("view.jsp-folderId", String.valueOf(folderId));

request.setAttribute("view.jsp-repositoryId", String.valueOf(repositoryId));

PortalPreferences portalPreferences = PortletPreferencesFactoryUtil.getPortalPreferences(renderRequest);

String displayStyle = ParamUtil.getString(request, "displayStyle");

if (Validator.isNull(displayStyle)) {
	displayStyle = portalPreferences.getValue(PortletKeys.LIBRARY_ADMIN, "display-style", "icon");
}
else {
	boolean saveDisplayStyle = ParamUtil.getBoolean(request, "saveDisplayStyle");

	if (saveDisplayStyle && ArrayUtil.contains(PropsValues.DL_DISPLAY_VIEWS, displayStyle)) {
		portalPreferences.setValue(PortletKeys.LIBRARY_ADMIN, "display-style", displayStyle);
	}
}

String orderByCol = ParamUtil.getString(request, "orderByCol");
String orderByType = ParamUtil.getString(request, "orderByType");

if (Validator.isNotNull(orderByCol) && Validator.isNotNull(orderByType)) {
	portalPreferences.setValue(PortletKeys.LIBRARY_ADMIN, "order-by-col", orderByCol);
	portalPreferences.setValue(PortletKeys.LIBRARY_ADMIN, "order-by-type", orderByType);
}
%>

<div class="portlet-msg-error yui3-aui-helper-hidden" id="<portlet:namespace />errorContainer">
	<liferay-ui:message key="your-request-failed-to-complete" />
</div>

<liferay-portlet:renderURL varImpl="deleteURL">
	<portlet:param name="struts_action" value="/document_library/edit_file_entry" />
</liferay-portlet:renderURL>

<aui:form action="<%= deleteURL.toString() %>" method="get" name="fm">
	<aui:input name="<%= Constants.CMD %>" type="hidden" />
	<aui:input name="redirect" type="hidden" value="<%= currentURL %>" />
	<aui:input name="deleteEntryIds" type="hidden" />
	<aui:input name="fileEntryIds" type="hidden" />

	<aui:layout cssClass="view">
		<aui:column columnWidth="<%= 20 %>" first="<%= true %>">
			<div class="header-row">
				<div class="header-row-content"> </div>
			</div>

			<div class="body-row">
				<div id="<portlet:namespace />folderContainer">
					<liferay-util:include page="/html/portlet/library_admin/view_folders.jsp" />
				</div>
			</div>
		</aui:column>

		<aui:column columnWidth="<%= showFolderMenu ? 80 : 100 %>" cssClass="context-pane" last="<%= true %>">
			<div class="header-row">
				<div class="header-row-content">
					<div class="toolbar">
						<liferay-util:include page="/html/portlet/library_admin/toolbar.jsp" />
					</div>

					<div class="display-style">
						<span class="toolbar" id="<portlet:namespace />displayStyleToolbar"></span>
					</div>
				</div>
			</div>

			<div class="document-container" id="<portlet:namespace />documentContainer">
				<c:if test='<%= true %>'>
					<liferay-util:include page="/html/portlet/library_admin/view_entries.jsp" />
				</c:if>
			</div>
		</aui:column>
	</aui:layout>
</aui:form>

<%
if (folder != null) {
	DLUtil.addPortletBreadcrumbEntries(folder, request, renderResponse);

	if (portletName.equals(PortletKeys.DOCUMENT_LIBRARY)) {
		PortalUtil.setPageSubtitle(folder.getName(), request);
		PortalUtil.setPageDescription(folder.getDescription(), request);
	}
}
%>

<aui:script>
	function <portlet:namespace />editFileEntry(action) {
		if (action == '<%= Constants.DELETE %>') {
			if (confirm('<%= UnicodeLanguageUtil.get(pageContext, "are-you-sure-you-want-to-delete-the-selected-entries") %>')) {
				<portlet:namespace />doFileEntryAction(action, '<portlet:actionURL><portlet:param name="struts_action" value="/document_library/edit_file_entry" /></portlet:actionURL>');
			}
		}
		else if (action == '<%= Constants.MOVE %>') {
			<portlet:namespace />doFileEntryAction(action, '<portlet:renderURL><portlet:param name="struts_action" value="/document_library/move_file_entry" /></portlet:renderURL>');
		}
		else {
			<portlet:namespace />doFileEntryAction(action, '<portlet:actionURL><portlet:param name="struts_action" value="/document_library/edit_file_entry" /></portlet:actionURL>');
		}
	}

	Liferay.provide(
		window,
		'<portlet:namespace />doFileEntryAction',
		function(action, url) {
			document.<portlet:namespace />fm.method = "post";
			document.<portlet:namespace />fm.<portlet:namespace /><%= Constants.CMD %>.value = action;
			document.<portlet:namespace />fm.<portlet:namespace />fileEntryIds.value = Liferay.Util.listCheckedExcept(document.<portlet:namespace />fm, '<portlet:namespace /><%= RowChecker.ALL_ROW_IDS %>Checkbox');

			submitForm(document.<portlet:namespace />fm, url);
		},
		['liferay-util-list-fields']
	);
</aui:script>

<aui:script use="aui-dialog,aui-dialog-iframe">
	var markSelected = function(node) {
		var documentThumbnail = node.ancestor('.document-display-style');

		documentThumbnail.toggleClass('selected');
	};

	var documentContainer = A.one('#<portlet:namespace />documentContainer');

	documentContainer.delegate(
		'change',
		function(event) {
			markSelected(event.currentTarget);

			Liferay.Util.checkAllBox(documentContainer, '<portlet:namespace /><%= RowChecker.ROW_IDS %>Checkbox', '#<portlet:namespace /><%= RowChecker.ALL_ROW_IDS %>Checkbox');
		},
		'.document-selector'
	);

	<c:if test='<%= (!displayStyle.equals("list")) %>'>
		var toggleHoverClass = function(event) {
			var documentDisplayStyle = event.currentTarget.ancestor('.document-display-style');

			if (documentDisplayStyle) {
				documentDisplayStyle.toggleClass('hover', (event.type == 'focus'));
			}
		};

		documentContainer.delegate('focus', toggleHoverClass, '*');

		documentContainer.delegate('blur', toggleHoverClass, '*');
	</c:if>

	var buttonRow = A.one('#<portlet:namespace />displayStyleToolbar');

	var displayStyleToolbar = new A.Toolbar(
		{
			activeState: true,
			boundingBox: buttonRow,
			children: [
				{

					<portlet:renderURL var="iconDisplayStyle">
						<portlet:param name="struts_action" value="/library_admin/view" />
						<portlet:param name="displayStyle" value="icon" />
						<portlet:param name="saveDisplayStyle" value="<%= Boolean.TRUE.toString() %>" />
					</portlet:renderURL>

					handler: function(event) {
						location.href = '<%= iconDisplayStyle.toString() %>';
					},
					icon: 'display-icon'
				},
				{

					<portlet:renderURL var="descriptiveDisplayStyle">
						<portlet:param name="struts_action" value="/library_admin/view" />
						<portlet:param name="displayStyle" value="descriptive" />
						<portlet:param name="saveDisplayStyle" value="<%= Boolean.TRUE.toString() %>" />
					</portlet:renderURL>

					handler: function(event) {
						location.href = '<%= descriptiveDisplayStyle.toString() %>';
					},
					icon: 'display-descriptive'
				},
				{

					<portlet:renderURL var="listDisplayStyle">
						<portlet:param name="struts_action" value="/library_admin/view" />
						<portlet:param name="displayStyle" value="list" />
						<portlet:param name="saveDisplayStyle" value="<%= Boolean.TRUE.toString() %>" />
					</portlet:renderURL>

					handler: function(event) {
						location.href = '<%= listDisplayStyle.toString() %>';
					},
					icon: 'display-list'
				}
			]
		}
	).render();

	<c:choose>
		<c:when test='<%= displayStyle.equals("icon") %>'>
			var index = 0;
		</c:when>
		<c:when test='<%= displayStyle.equals("descriptive") %>'>
			var index = 1;
		</c:when>
		<c:when test='<%= displayStyle.equals("list") %>'>
			var index = 2;
		</c:when>
	</c:choose>

	displayStyleToolbar.item(index).StateInteraction.set('active', true);

	buttonRow.setData('displayStyleToolbar', displayStyleToolbar);
</aui:script>

<aui:script use="liferay-list-view">
	var listView = new Liferay.ListView(
		{
			itemAttributes: ['data-direction-right', 'data-refresh-entries', 'data-refresh-folders', 'data-resource-url'],
			itemSelector: '.folder a',
			srcNode: '#<portlet:namespace />folderContainer'
		}
	).render();

	listView.on(
		'itemChosen',
		function(event) {
			var item = event.item;
			var attributes = event.attributes;

			var dataDirectionRight = attributes['data-direction-right'];
			var dataRefreshEntries = attributes['data-refresh-entries'];
			var dataRefreshFolders = attributes['data-refresh-folders'];
			var dataResourceUrl = attributes['data-resource-url'];

			A.io.request(
				dataResourceUrl,
				{
					after: {
						success: function(event, id, obj) {
							var selFolder = A.one('.folder.selected');

							if (selFolder) {
								selFolder.removeClass('selected');
							}

							var responseData = this.get('responseData');

							var content = A.Node.create(responseData);

							item.ancestor('.folder').addClass('selected');

							var direction = 'left';

							if (dataDirectionRight) {
								direction = 'right';
							}

							listView.set('direction', direction);

							if (dataRefreshEntries) {
								var addButtonContainer = A.one('#<portlet:namespace />addButtonContainer');
								var addButton = content.one('#<portlet:namespace />addButton')

								addButtonContainer.setContent(addButton);

								var entriesContainer = A.one('#<portlet:namespace />documentContainer');
								var entries = content.one('#<portlet:namespace />entries');

								entriesContainer.setContent(entries);
							}

							if (dataRefreshFolders) {
								var foldersContent = content.one('#<portlet:namespace />folders');

								if (foldersContent) {
									content = foldersContent;
								}

								listView.set('data', content);
							}
						}
					}
				}
			);
		}
	);

	A.one('#<portlet:namespace />documentContainer').delegate(
		'click',
		function(event) {
			event.preventDefault();

			var requestUrl = event.currentTarget.attr('data-resource-url');

			A.io.request(
				requestUrl,
				{
					after: {
						success: function(event, id, obj) {
							var selFolder = A.one('.folder.selected');

							if (selFolder) {
								selFolder.removeClass('selected');
							}

							var responseData = this.get('responseData');

							var content = A.Node.create(responseData);

							var folders = content.one('#<portlet:namespace />folders');

							listView.set('data', folders);

							var addButtonContainer = A.one('#<portlet:namespace />addButtonContainer');
							var addButton = content.one('#<portlet:namespace />addButton');

							addButtonContainer.setContent(addButton);

							var entriesContainer = A.one('#<portlet:namespace />documentContainer');
							var entries = content.one('#<portlet:namespace />entries');

							entriesContainer.setContent(entries);
						}
					}
				}
			);
		},
		'a[data-folder=true]'
	);
</aui:script>