<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.*"%>
<%@ page import="com.oreilly.servlet.MultipartRequest"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.util.Calendar"%>
<%@ include file="../common.jsp" %>
<%
    // 16.10.19
    // Item 수정시 기존에 업로드 된 Item 이미지 파일을 지우는 작업이 필요함.
	try {
	    if (user_id == null || user_id.length() == 0  || db_name == null) {
	        throw new Exception("Cannot find user id");
	    }
		String realPath = String.format("%s/../wrp_uploads/%s", application.getRealPath("/"), user_id.toLowerCase());
		int maxSize = 1024 * 1024 * 10; // 10 MB
		File f = new File (realPath);
		if (!f.isFile()) {
			if (!f.isDirectory()) {
				f.mkdirs();
			}
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");

		MultipartRequest mRequest = new MultipartRequest(request, realPath, maxSize, "UTF-8");
		f = mRequest.getFile("itemImageFile");
		File newFile = null;
		if (f.getName().lastIndexOf(".") > -1) newFile = new File(String.format("%s/%s%s",f.getParent(), sdf.format(Calendar.getInstance().getTime()), f.getName().substring(f.getName().lastIndexOf("."))));
		else  newFile = new File(String.format("%s/%s",f.getParent(), sdf.format(Calendar.getInstance().getTime())));
		f.renameTo(newFile);
		out.print(newFile.getAbsolutePath().replace(application.getRealPath("/"), "").replaceAll("\\\\","/"));
	} catch (Exception e) {
		e.printStackTrace();
	}
%>