<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer query = new StringBuffer();

		try {
			
		    if (db_name == null) {
		        throw new Exception();
		    }
				query.append(String.format("SELECT DATE_FORMAT(a.update_date, '%%m/%%d/%%Y %%H:%%i:%%s') as update_date, a.* FROM `wrp`.`tb_sys_category` as a;"));     
                
    			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
                out.print(MyDBUtil.getInstance().getJSONString(query.toString(), true));
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		query = null;
%>