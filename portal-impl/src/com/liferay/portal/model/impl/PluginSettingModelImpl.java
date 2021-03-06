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

package com.liferay.portal.model.impl;

import com.liferay.portal.kernel.bean.AutoEscapeBeanHandler;
import com.liferay.portal.kernel.json.JSON;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.ProxyUtil;
import com.liferay.portal.kernel.util.StringBundler;
import com.liferay.portal.kernel.util.StringPool;
import com.liferay.portal.model.CacheModel;
import com.liferay.portal.model.PluginSetting;
import com.liferay.portal.model.PluginSettingModel;
import com.liferay.portal.model.PluginSettingSoap;
import com.liferay.portal.service.ServiceContext;

import com.liferay.portlet.expando.model.ExpandoBridge;
import com.liferay.portlet.expando.util.ExpandoBridgeFactoryUtil;

import java.io.Serializable;

import java.sql.Types;

import java.util.ArrayList;
import java.util.List;

/**
 * The base model implementation for the PluginSetting service. Represents a row in the &quot;PluginSetting&quot; database table, with each column mapped to a property of this class.
 *
 * <p>
 * This implementation and its corresponding interface {@link com.liferay.portal.model.PluginSettingModel} exist only as a container for the default property accessors generated by ServiceBuilder. Helper methods and all application logic should be put in {@link PluginSettingImpl}.
 * </p>
 *
 * @author Brian Wing Shun Chan
 * @see PluginSettingImpl
 * @see com.liferay.portal.model.PluginSetting
 * @see com.liferay.portal.model.PluginSettingModel
 * @generated
 */
@JSON(strict = true)
public class PluginSettingModelImpl extends BaseModelImpl<PluginSetting>
	implements PluginSettingModel {
	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never modify or reference this class directly. All methods that expect a plugin setting model instance should use the {@link com.liferay.portal.model.PluginSetting} interface instead.
	 */
	public static final String TABLE_NAME = "PluginSetting";
	public static final Object[][] TABLE_COLUMNS = {
			{ "pluginSettingId", Types.BIGINT },
			{ "companyId", Types.BIGINT },
			{ "pluginId", Types.VARCHAR },
			{ "pluginType", Types.VARCHAR },
			{ "roles", Types.VARCHAR },
			{ "active_", Types.BOOLEAN }
		};
	public static final String TABLE_SQL_CREATE = "create table PluginSetting (pluginSettingId LONG not null primary key,companyId LONG,pluginId VARCHAR(75) null,pluginType VARCHAR(75) null,roles STRING null,active_ BOOLEAN)";
	public static final String TABLE_SQL_DROP = "drop table PluginSetting";
	public static final String DATA_SOURCE = "liferayDataSource";
	public static final String SESSION_FACTORY = "liferaySessionFactory";
	public static final String TX_MANAGER = "liferayTransactionManager";
	public static final boolean ENTITY_CACHE_ENABLED = GetterUtil.getBoolean(com.liferay.portal.util.PropsUtil.get(
				"value.object.entity.cache.enabled.com.liferay.portal.model.PluginSetting"),
			true);
	public static final boolean FINDER_CACHE_ENABLED = GetterUtil.getBoolean(com.liferay.portal.util.PropsUtil.get(
				"value.object.finder.cache.enabled.com.liferay.portal.model.PluginSetting"),
			true);
	public static final boolean COLUMN_BITMASK_ENABLED = GetterUtil.getBoolean(com.liferay.portal.util.PropsUtil.get(
				"value.object.column.bitmask.enabled.com.liferay.portal.model.PluginSetting"),
			true);
	public static long COMPANYID_COLUMN_BITMASK = 1L;
	public static long PLUGINID_COLUMN_BITMASK = 2L;
	public static long PLUGINTYPE_COLUMN_BITMASK = 4L;

	/**
	 * Converts the soap model instance into a normal model instance.
	 *
	 * @param soapModel the soap model instance to convert
	 * @return the normal model instance
	 */
	public static PluginSetting toModel(PluginSettingSoap soapModel) {
		PluginSetting model = new PluginSettingImpl();

		model.setPluginSettingId(soapModel.getPluginSettingId());
		model.setCompanyId(soapModel.getCompanyId());
		model.setPluginId(soapModel.getPluginId());
		model.setPluginType(soapModel.getPluginType());
		model.setRoles(soapModel.getRoles());
		model.setActive(soapModel.getActive());

		return model;
	}

	/**
	 * Converts the soap model instances into normal model instances.
	 *
	 * @param soapModels the soap model instances to convert
	 * @return the normal model instances
	 */
	public static List<PluginSetting> toModels(PluginSettingSoap[] soapModels) {
		List<PluginSetting> models = new ArrayList<PluginSetting>(soapModels.length);

		for (PluginSettingSoap soapModel : soapModels) {
			models.add(toModel(soapModel));
		}

		return models;
	}

	public static final long LOCK_EXPIRATION_TIME = GetterUtil.getLong(com.liferay.portal.util.PropsUtil.get(
				"lock.expiration.time.com.liferay.portal.model.PluginSetting"));

	public PluginSettingModelImpl() {
	}

	public long getPrimaryKey() {
		return _pluginSettingId;
	}

	public void setPrimaryKey(long primaryKey) {
		setPluginSettingId(primaryKey);
	}

	public Serializable getPrimaryKeyObj() {
		return new Long(_pluginSettingId);
	}

	public void setPrimaryKeyObj(Serializable primaryKeyObj) {
		setPrimaryKey(((Long)primaryKeyObj).longValue());
	}

	public Class<?> getModelClass() {
		return PluginSetting.class;
	}

	public String getModelClassName() {
		return PluginSetting.class.getName();
	}

	@JSON
	public long getPluginSettingId() {
		return _pluginSettingId;
	}

	public void setPluginSettingId(long pluginSettingId) {
		_pluginSettingId = pluginSettingId;
	}

	@JSON
	public long getCompanyId() {
		return _companyId;
	}

	public void setCompanyId(long companyId) {
		_columnBitmask |= COMPANYID_COLUMN_BITMASK;

		if (!_setOriginalCompanyId) {
			_setOriginalCompanyId = true;

			_originalCompanyId = _companyId;
		}

		_companyId = companyId;
	}

	public long getOriginalCompanyId() {
		return _originalCompanyId;
	}

	@JSON
	public String getPluginId() {
		if (_pluginId == null) {
			return StringPool.BLANK;
		}
		else {
			return _pluginId;
		}
	}

	public void setPluginId(String pluginId) {
		_columnBitmask |= PLUGINID_COLUMN_BITMASK;

		if (_originalPluginId == null) {
			_originalPluginId = _pluginId;
		}

		_pluginId = pluginId;
	}

	public String getOriginalPluginId() {
		return GetterUtil.getString(_originalPluginId);
	}

	@JSON
	public String getPluginType() {
		if (_pluginType == null) {
			return StringPool.BLANK;
		}
		else {
			return _pluginType;
		}
	}

	public void setPluginType(String pluginType) {
		_columnBitmask |= PLUGINTYPE_COLUMN_BITMASK;

		if (_originalPluginType == null) {
			_originalPluginType = _pluginType;
		}

		_pluginType = pluginType;
	}

	public String getOriginalPluginType() {
		return GetterUtil.getString(_originalPluginType);
	}

	@JSON
	public String getRoles() {
		if (_roles == null) {
			return StringPool.BLANK;
		}
		else {
			return _roles;
		}
	}

	public void setRoles(String roles) {
		_roles = roles;
	}

	@JSON
	public boolean getActive() {
		return _active;
	}

	public boolean isActive() {
		return _active;
	}

	public void setActive(boolean active) {
		_active = active;
	}

	public long getColumnBitmask() {
		return _columnBitmask;
	}

	@Override
	public PluginSetting toEscapedModel() {
		if (_escapedModelProxy == null) {
			_escapedModelProxy = (PluginSetting)ProxyUtil.newProxyInstance(_classLoader,
					_escapedModelProxyInterfaces,
					new AutoEscapeBeanHandler(this));
		}

		return _escapedModelProxy;
	}

	@Override
	public ExpandoBridge getExpandoBridge() {
		if (_expandoBridge == null) {
			_expandoBridge = ExpandoBridgeFactoryUtil.getExpandoBridge(getCompanyId(),
					PluginSetting.class.getName(), getPrimaryKey());
		}

		return _expandoBridge;
	}

	@Override
	public void setExpandoBridgeAttributes(ServiceContext serviceContext) {
		getExpandoBridge().setAttributes(serviceContext);
	}

	@Override
	public Object clone() {
		PluginSettingImpl pluginSettingImpl = new PluginSettingImpl();

		pluginSettingImpl.setPluginSettingId(getPluginSettingId());
		pluginSettingImpl.setCompanyId(getCompanyId());
		pluginSettingImpl.setPluginId(getPluginId());
		pluginSettingImpl.setPluginType(getPluginType());
		pluginSettingImpl.setRoles(getRoles());
		pluginSettingImpl.setActive(getActive());

		pluginSettingImpl.resetOriginalValues();

		return pluginSettingImpl;
	}

	public int compareTo(PluginSetting pluginSetting) {
		long primaryKey = pluginSetting.getPrimaryKey();

		if (getPrimaryKey() < primaryKey) {
			return -1;
		}
		else if (getPrimaryKey() > primaryKey) {
			return 1;
		}
		else {
			return 0;
		}
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}

		PluginSetting pluginSetting = null;

		try {
			pluginSetting = (PluginSetting)obj;
		}
		catch (ClassCastException cce) {
			return false;
		}

		long primaryKey = pluginSetting.getPrimaryKey();

		if (getPrimaryKey() == primaryKey) {
			return true;
		}
		else {
			return false;
		}
	}

	@Override
	public int hashCode() {
		return (int)getPrimaryKey();
	}

	@Override
	public void resetOriginalValues() {
		PluginSettingModelImpl pluginSettingModelImpl = this;

		pluginSettingModelImpl._originalCompanyId = pluginSettingModelImpl._companyId;

		pluginSettingModelImpl._setOriginalCompanyId = false;

		pluginSettingModelImpl._originalPluginId = pluginSettingModelImpl._pluginId;

		pluginSettingModelImpl._originalPluginType = pluginSettingModelImpl._pluginType;

		pluginSettingModelImpl._columnBitmask = 0;
	}

	@Override
	public CacheModel<PluginSetting> toCacheModel() {
		PluginSettingCacheModel pluginSettingCacheModel = new PluginSettingCacheModel();

		pluginSettingCacheModel.pluginSettingId = getPluginSettingId();

		pluginSettingCacheModel.companyId = getCompanyId();

		pluginSettingCacheModel.pluginId = getPluginId();

		String pluginId = pluginSettingCacheModel.pluginId;

		if ((pluginId != null) && (pluginId.length() == 0)) {
			pluginSettingCacheModel.pluginId = null;
		}

		pluginSettingCacheModel.pluginType = getPluginType();

		String pluginType = pluginSettingCacheModel.pluginType;

		if ((pluginType != null) && (pluginType.length() == 0)) {
			pluginSettingCacheModel.pluginType = null;
		}

		pluginSettingCacheModel.roles = getRoles();

		String roles = pluginSettingCacheModel.roles;

		if ((roles != null) && (roles.length() == 0)) {
			pluginSettingCacheModel.roles = null;
		}

		pluginSettingCacheModel.active = getActive();

		return pluginSettingCacheModel;
	}

	@Override
	public String toString() {
		StringBundler sb = new StringBundler(13);

		sb.append("{pluginSettingId=");
		sb.append(getPluginSettingId());
		sb.append(", companyId=");
		sb.append(getCompanyId());
		sb.append(", pluginId=");
		sb.append(getPluginId());
		sb.append(", pluginType=");
		sb.append(getPluginType());
		sb.append(", roles=");
		sb.append(getRoles());
		sb.append(", active=");
		sb.append(getActive());
		sb.append("}");

		return sb.toString();
	}

	public String toXmlString() {
		StringBundler sb = new StringBundler(22);

		sb.append("<model><model-name>");
		sb.append("com.liferay.portal.model.PluginSetting");
		sb.append("</model-name>");

		sb.append(
			"<column><column-name>pluginSettingId</column-name><column-value><![CDATA[");
		sb.append(getPluginSettingId());
		sb.append("]]></column-value></column>");
		sb.append(
			"<column><column-name>companyId</column-name><column-value><![CDATA[");
		sb.append(getCompanyId());
		sb.append("]]></column-value></column>");
		sb.append(
			"<column><column-name>pluginId</column-name><column-value><![CDATA[");
		sb.append(getPluginId());
		sb.append("]]></column-value></column>");
		sb.append(
			"<column><column-name>pluginType</column-name><column-value><![CDATA[");
		sb.append(getPluginType());
		sb.append("]]></column-value></column>");
		sb.append(
			"<column><column-name>roles</column-name><column-value><![CDATA[");
		sb.append(getRoles());
		sb.append("]]></column-value></column>");
		sb.append(
			"<column><column-name>active</column-name><column-value><![CDATA[");
		sb.append(getActive());
		sb.append("]]></column-value></column>");

		sb.append("</model>");

		return sb.toString();
	}

	private static ClassLoader _classLoader = PluginSetting.class.getClassLoader();
	private static Class<?>[] _escapedModelProxyInterfaces = new Class[] {
			PluginSetting.class
		};
	private long _pluginSettingId;
	private long _companyId;
	private long _originalCompanyId;
	private boolean _setOriginalCompanyId;
	private String _pluginId;
	private String _originalPluginId;
	private String _pluginType;
	private String _originalPluginType;
	private String _roles;
	private boolean _active;
	private transient ExpandoBridge _expandoBridge;
	private long _columnBitmask;
	private PluginSetting _escapedModelProxy;
}