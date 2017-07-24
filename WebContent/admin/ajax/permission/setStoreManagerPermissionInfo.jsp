<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="java.io.*"%>
<%
		String userId = MyRequestUtil.getString(request, "userId", null);
		String permissionInfoString = MyRequestUtil.getString(request, "permissionInfoString", null);
		String filePath = null;
		File file = null;
		FileWriter fw = null;
		BufferedWriter bw = null;

        try {
            if (userId == null || permissionInfoString == null) {
                throw new Exception();
            }

            filePath = String.format("%s/admin/permission/%s.json", application.getRealPath("/"), userId.toLowerCase());

            file = new File(filePath);
            if (!file.exists()) {
                file.createNewFile();
            }

            fw = new FileWriter(file);
            bw = new BufferedWriter(fw);

            bw.write(permissionInfoString);

            bw.close();
            fw.close();

            out.print(0);
        } catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
                e.printStackTrace();
            }

            out.print(-1);
        }
%>