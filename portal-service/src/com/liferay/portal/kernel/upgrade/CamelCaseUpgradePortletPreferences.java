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

package com.liferay.portal.kernel.upgrade;

import com.liferay.portal.kernel.util.TextFormatter;
import com.liferay.portlet.PortletPreferencesFactoryUtil;

import java.util.Map;

import javax.portlet.PortletPreferences;

/**
 * @author Julio Camarero
 */
public class CamelCaseUpgradePortletPreferences
	extends BaseUpgradePortletPreferences {

	@Override
	protected String upgradePreferences(
			long companyId, long ownerId, int ownerType, long plid,
			String portletId, String xml)
		throws Exception {

		PortletPreferences portletPreferences =
			PortletPreferencesFactoryUtil.fromXML(
				companyId, ownerId, ownerType, plid, portletId, xml);

		Map<String, String[]> preferencesMap = portletPreferences.getMap();

		for (String oldName : preferencesMap.keySet()) {
			String[] values = preferencesMap.get(oldName);

			String newName = TextFormatter.format(oldName, TextFormatter.M);

			portletPreferences.reset(oldName);

			portletPreferences.setValues(newName, values);
		}

		return PortletPreferencesFactoryUtil.toXML(portletPreferences);
	}

}