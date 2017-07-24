<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="com.boas.wrp.util.PreparedStatementParams"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
	StringBuffer query = new StringBuffer();

	String store_id = MyRequestUtil.getString(request, "store_id", "");
	String date = MyRequestUtil.getString(request, "date", "");
	String memo = MyRequestUtil.getString(request, "memo", "");
	int emp_sid = MyRequestUtil.getInt(request, "emp_sid", 0);
	
	String origin_list_str = MyRequestUtil.getString(request, "origin_list_str", null);
	String adjust_list_str = MyRequestUtil.getString(request, "adjust_list_str", null);

	JSONArray origin_list = null;
	JSONArray adjust_list = null;
	JSONObject ojsonObj = null;
	JSONObject ajsonObj = null;
	
	int i = 0;
	
	PreparedStatementParams mPreparedStatementParams = null;
	try {
	    if (store_id == null || user_sid == null || db_name == null) {
       		out.print(-1);
       		throw new Exception();
	    }
		
		// 쿼리 입력
		mPreparedStatementParams = new PreparedStatementParams();

		origin_list = (JSONArray) new JSONParser().parse(origin_list_str);
		adjust_list = (JSONArray) new JSONParser().parse(adjust_list_str);
       	
		query.append(String.format("INSERT INTO `%s`.`tb_clock_io_adj_%s`(`clock_io_sid`,`user_sid`,`time_start`,`time_end`,`clockio_status`)(SELECT `sid` AS `clock_io_sid`, `emp_sid` AS `user_sid`,`start` AS `time_start`,`end` AS `time_end`, `status` AS `clockio_status` FROM `%s`.`tb_clock_io_%s` WHERE DATE_FORMAT(`date`,'%%Y-%%m-%%d')='%s' AND `emp_sid`=%d);",db_name,store_id,db_name,store_id,date,emp_sid));
		
		if(origin_list.size() >= adjust_list.size()){
			for(i=0; i < adjust_list.size(); i++){
				ojsonObj = (JSONObject)origin_list.get(i);
				ajsonObj = (JSONObject)adjust_list.get(i);
				query.append(String.format("UPDATE `%s`.`tb_clock_io_%s` SET `update_date`=now(), `status`=%s, `start`=str_to_date('%s','%%H:%%i:%%s'), `end`=str_to_date('%s','%%H:%%i:%%s'), ",db_name,store_id,ajsonObj.get("status").toString(),ajsonObj.get("start").toString(),ajsonObj.get("end").toString()));
				query.append(String.format("`amount`=TIMEDIFF(str_to_date('%s','%%H:%%i:%%s'),str_to_date('%s','%%H:%%i:%%s')) WHERE `sid`=%s;",ajsonObj.get("end").toString(),ajsonObj.get("start").toString(),ojsonObj.get("sid").toString()));
				query.append(String.format("UPDATE `%s`.`tb_clock_io_adj_%s` SET `manager_sid`='%s',`update_date`=now(),`adj_time_start`=str_to_date('%s','%%H:%%i:%%s'),`adj_time_end`=str_to_date('%s','%%H:%%i:%%s'),`adj_status`=3,`memo`='%s',`adj_clockio_status`=%s WHERE `clock_io_sid`=%s;",db_name,store_id,user_sid,ajsonObj.get("start").toString(),ajsonObj.get("end").toString(),MyDBUtil.addSlashes(memo),ajsonObj.get("status").toString(),ojsonObj.get("sid").toString()));
			}
			
			for(int j=0; j < origin_list.size()-adjust_list.size(); j++){
				ojsonObj = (JSONObject)origin_list.get(i);
				query.append(String.format("DELETE FROM `%s`.`tb_clock_io_%s` WHERE `sid`=%s;",db_name,store_id,ojsonObj.get("sid").toString()));
				query.append(String.format("UPDATE `%s`.`tb_clock_io_adj_%s` SET `manager_sid`='%s',`update_date`=now(),`adj_status`=5,`memo`='%s' WHERE `clock_io_sid`=%s;",db_name,store_id,user_sid,MyDBUtil.addSlashes(memo),ojsonObj.get("sid").toString()));
				i++;
			}
			
			
		}else if(origin_list.size() < adjust_list.size()){
			for(i=0; i < origin_list.size(); i++){
				ojsonObj = (JSONObject)origin_list.get(i);
				ajsonObj = (JSONObject)adjust_list.get(i);
				query.append(String.format("UPDATE `%s`.`tb_clock_io_%s` SET `update_date`=now(), `status`=%s, `start`=str_to_date('%s','%%H:%%i:%%s'), `end`=str_to_date('%s','%%H:%%i:%%s'), ",db_name,store_id,ajsonObj.get("status").toString(),ajsonObj.get("start").toString(),ajsonObj.get("end").toString()));
				query.append(String.format("`amount`=TIMEDIFF(str_to_date('%s','%%H:%%i:%%s'),str_to_date('%s','%%H:%%i:%%s')) WHERE `sid`=%s;",ajsonObj.get("end").toString(),ajsonObj.get("start").toString(),ojsonObj.get("sid").toString()));
				query.append(String.format("UPDATE `%s`.`tb_clock_io_adj_%s` SET `manager_sid`='%s',`update_date`=now(),`adj_time_start`=str_to_date('%s','%%H:%%i:%%s'),`adj_time_end`=str_to_date('%s','%%H:%%i:%%s'),`adj_status`=3,`memo`='%s',`adj_clockio_status`=%s WHERE `clock_io_sid`=%s;",db_name,store_id,user_sid,ajsonObj.get("start").toString(),ajsonObj.get("end").toString(),MyDBUtil.addSlashes(memo),ajsonObj.get("status").toString(),ojsonObj.get("sid").toString()));
			}
			
			for(int j=0; j < adjust_list.size()-origin_list.size(); j++){
				ajsonObj = (JSONObject)adjust_list.get(i);
				query.append(String.format("INSERT INTO `%s`.`tb_clock_io_%s` SET `emp_sid`=%d,`update_date`=now(),`date`=str_to_date('%s','%%Y-%%m-%%d'), ",db_name,store_id,emp_sid,date));
				query.append(String.format("`status`=%s,`start`=str_to_date('%s','%%H:%%i:%%s'),`end`=str_to_date('%s','%%H:%%i:%%s'),`amount`=TIMEDIFF(str_to_date('%s','%%H:%%i:%%s'),str_to_date('%s','%%H:%%i:%%s')), ",ajsonObj.get("status").toString(),ajsonObj.get("start").toString(),ajsonObj.get("end").toString(),ajsonObj.get("end").toString(),ajsonObj.get("start").toString()));
				query.append(String.format("`timezone_offset`='%s', `io_start`=DATE_FORMAT(DATE_ADD(str_to_date('%s %s','%%Y-%%m-%%d %%H:%%i:%%s'), INTERVAL -%s HOUR), '%%Y-%%m-%%d %%H:%%i:%%s'), ",timezone_offset, date,ajsonObj.get("start").toString(),timezone_offset));
				query.append(String.format("`io_end`=DATE_FORMAT(DATE_ADD(str_to_date('%s %s','%%Y-%%m-%%d %%H:%%i:%%s'), INTERVAL -%s HOUR), '%%Y-%%m-%%d %%H:%%i:%%s');",date,ajsonObj.get("end").toString(), timezone_offset));
				
				query.append(String.format("INSERT INTO `%s`.`tb_clock_io_adj_%s`(`clock_io_sid`,`user_sid`,`manager_sid`,`update_date`,`adj_time_start`,`adj_time_end`,`adj_clockio_status`,`adj_status`,`memo`)",db_name,store_id));
				query.append(String.format("(SELECT `sid` AS `clock_io_sid`, `emp_sid` AS `user_sid`,'%s' AS `manager_sid`,now() AS `update_date`,`start` AS `adj_time_start`,`end` AS `adj_time_end`, `status` AS `adj_clockio_status`,'4' AS `adj_status`,'%s' AS `memo` FROM `%s`.`tb_clock_io_%s` ORDER BY `sid` DESC LIMIT 1);",user_sid,MyDBUtil.addSlashes(memo),db_name,store_id));
				i++;
			}
		}
		
       	if (MyDBUtil.getInstance().execute(db_name, owner_id, store_id, query.toString(), mPreparedStatementParams) != 0) {
       		out.print(-4);
       		throw new Exception();
       	}

       	out.print(0);

	} catch (Exception e) {
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
       	out.print(-1);
	}
	query = null;
%>