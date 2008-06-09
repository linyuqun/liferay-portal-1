/**
 * Copyright (c) 2000-2008 Liferay, Inc. All rights reserved.
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

package com.liferay.portlet.enterpriseadmin.action;

import com.liferay.portal.NoSuchUserException;
import com.liferay.portal.UserPortraitException;
import com.liferay.portal.kernel.servlet.SessionErrors;
import com.liferay.portal.kernel.upload.UploadPortletRequest;
import com.liferay.portal.kernel.util.ByteArrayMaker;
import com.liferay.portal.kernel.util.FileUtil;
import com.liferay.portal.model.User;
import com.liferay.portal.security.auth.PrincipalException;
import com.liferay.portal.service.UserServiceUtil;
import com.liferay.portal.struts.PortletAction;
import com.liferay.portal.util.PortalUtil;
import com.liferay.util.servlet.UploadException;

import java.io.InputStream;

import java.util.List;

import javax.portlet.ActionRequest;
import javax.portlet.ActionResponse;
import javax.portlet.PortletConfig;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;

import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.portlet.PortletFileUpload;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

/**
 * <a href="EditUserPortraitAction.java.html"><b><i>View Source</i></b></a>
 *
 * @author Brian Wing Shun Chan
 *
 */
public class EditUserPortraitAction extends PortletAction {

	public void processAction(
			ActionMapping mapping, ActionForm form, PortletConfig config,
			ActionRequest req, ActionResponse res)
		throws Exception {

		try {
			updatePortrait(req);

			sendRedirect(req, res);
		}
		catch (Exception e) {
			if (e instanceof NoSuchUserException ||
				e instanceof PrincipalException) {

				SessionErrors.add(req, e.getClass().getName());

				setForward(req, "portlet.enterprise_admin.error");
			}
			else if (e instanceof UploadException ||
					 e instanceof UserPortraitException) {

				SessionErrors.add(req, e.getClass().getName());
			}
			else {
				throw e;
			}
		}
	}

	public ActionForward render(
			ActionMapping mapping, ActionForm form, PortletConfig config,
			RenderRequest req, RenderResponse res)
		throws Exception {

		return mapping.findForward(
			getForward(req, "portlet.enterprise_admin.edit_user_portrait"));
	}

	protected void testRequest(ActionRequest req) throws Exception {

		// Check if the given request is a multipart request

		boolean isMultiPartContent = PortletFileUpload.isMultipartContent(req);

		if (_log.isInfoEnabled()) {
			if (isMultiPartContent) {
				_log.info("The given request is a multipart request");
			}
			else {
				_log.info("The given request is NOT a multipart request");
			}
		}

		// Check for the number of file items

		DiskFileItemFactory factory = new DiskFileItemFactory();

		PortletFileUpload upload = new PortletFileUpload(factory);

		List<DiskFileItem> fileItems = upload.parseRequest(req);

		if (_log.isInfoEnabled()) {
			_log.info(
				"Apache commons upload was able to parse " + fileItems.size() +
					" items");
		}

		for (int i = 0; i < fileItems.size(); i++) {
			DiskFileItem fileItem = fileItems.get(i);

			if (_log.isInfoEnabled()) {
				_log.info("Item " + i + " " + fileItem);
			}
		}

		// Read directly from the portlet input stream

		InputStream is = req.getPortletInputStream();

		if (is != null) {
			ByteArrayMaker bam = new ByteArrayMaker();

			int c = -1;

			try {
				while ((c = is.read()) != -1) {
					bam.write(c);
				}
			}
			finally {
				is.close();
			}

			byte[] bytes = bam.toByteArray();

			if (_log.isInfoEnabled()) {
				_log.info(
					"Byte array size from the raw input stream is " +
						bytes.length);
			}
		}
	}

	protected void updatePortrait(ActionRequest req) throws Exception {

		//_testRequest(req);

		UploadPortletRequest uploadReq = PortalUtil.getUploadPortletRequest(
			req);

		User user = PortalUtil.getSelectedUser(uploadReq);

		byte[] bytes = FileUtil.getBytes(uploadReq.getFile("fileName"));

		if ((bytes == null) || (bytes.length == 0)) {
			throw new UploadException();
		}

		UserServiceUtil.updatePortrait(user.getUserId(), bytes);
	}

	private static Log _log = LogFactory.getLog(EditUserPortraitAction.class);

}