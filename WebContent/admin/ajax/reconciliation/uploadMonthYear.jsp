<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ include file="../common.jsp" %>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null, stmt2 = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer(), query = null;

		String storeId = MyRequestUtil.getString(request, "storeId", null);

		String door_code, total_primary_rate_plan_amount, transaction_date, esn, transaction_type, qualification_status, rate_plan_amount, bolt_on_amount, transaction_amount, total_features_data_plan_amount, rebate, total, posted_date;
		
		String fileName = MyRequestUtil.getString(request, "file", null);
		String year = MyRequestUtil.getString(request, "year", null);
		String month = MyRequestUtil.getString(request, "month", null);
		String dbName = "";
		int type = MyRequestUtil.getInt(request, "type", 0);
		try {
		    if (db_name == null || type == 0) {
		        throw new Exception("no input parameters");
		    }
		    
		    if(type == 0){
				//dbName = "reconciliation";
				dbName = "reconciliation_qualified";
			}else if(type == 1){
				//dbName = "reconciliation";
				dbName = "reconciliation_qualified";
			}else if(type == 2){
				//dbName = "reconciliation_disqualified";
				dbName = "reconciliation_disqualified";
			}else if(type == 3){
				//dbName = "reconciliation_rebate";
				dbName = "reconciliation_rebate";
			}else if(type == 4){
				//dbName = "reconciliation_spiff";
				dbName = "reconciliation_spiff";
			}else if(type == 5){
				//dbName = "reconciliation_bill";
				dbName = "reconciliation_bill";
			}else if(type == 6){
				//dbName = "reconciliation_qpay";
				dbName = "reconciliation_qpay";
			}
		    
		  //query.append(String.format("UPDATE %s.`tb_%s`", db_name, dbName));
		    //System.out.println(String.format("UPDATE %s.`tb_%s`", db_name, dbName));
		    //query.append(String.format("SET update_sid = (SELECT MAX(sid) AS sid FROM `%s`.`tb_reconciliation_update_%s` WHERE  TYPE='%d' AND YEAR='%s' AND MONTH='%s' ORDER BY `sid`)", db_name, db_name, type, year, month));
		    //System.out.println(String.format(" SET update_sid = (SELECT MAX(sid) AS sid FROM `%s`.`tb_reconciliation_update_%s` WHERE  TYPE='%d' AND YEAR='%s' AND MONTH='%s' ORDER BY `sid`)", db_name, db_name, type, year, month));
		    //query.append("WHERE update_sid = -1;");
		    //System.out.println("WHERE update_sid = -1;");
		    //MyDBUtil.execute(String.format("DELETE FROM `%s`.`tb_%s` WHERE update_sid='%d';", db_name, dbName, sid));
		    		    //int sid = MyDBUtil.getInt(String.format("SELECT MAX(sid) as sid FROM `%s`.`tb_reconciliation_update_%s` WHERE  TYPE='%d' AND YEAR='%s' AND MONTH='%s' ORDER BY `sid`;", db_name, db_name, type, year, month), "sid");
		    //MyDBUtil.execute(String.format("DELETE FROM `%s`.`tb_reconciliation_update_%s` WHERE sid='%d';", db_name, db_name, sid));
		    //MyDBUtil.execute(String.format("INSERT INTO `%s`.`tb_reconciliation_update_%s` SET `update_date`=now(), `file`='%s', `user_id`='%s', `type`='%d', `year`='%s', `month`='%s'", db_name, db_name, fileName, userSid, type, year, month));
		    //int sid = MyDBUtil.getInt(String.format("SELECT MAX(sid) as sid FROM `%s`.`tb_reconciliation_update_%s` WHERE  TYPE='%d' AND YEAR='%s' AND MONTH='%s' ORDER BY `sid`;", db_name, db_name, type, year, month), "sid");
		    //System.out.println(String.format("SELECT MAX(sid) as sid FROM `%s`.`tb_reconciliation_update_%s` WHERE  TYPE='%d' AND YEAR='%s' AND MONTH='%s' ORDER BY `sid`;", db_name, db_name, type, year, month));
		    //System.out.println(String.format("SELECT MAX(sid) as sid FROM `%s`.`tb_reconciliation_update_%s` WHERE  TYPE='%d' AND YEAR='%s' AND MONTH='%s' ORDER BY `sid`;", db_name, db_name, type, year, month));
		    //query.append(String.format("INSERT INTO `%s`.`tb_reconciliation_update_%s` SET `update_date`=now(), `file`='%s', `user_id`='%s', `type`='%d', `year`='%s', `month`='%s';", db_name, db_name, fileName, userSid, type, year, month));
		    
		    MyDBUtil.getInstance().execute(String.format("DELETE FROM  %s.`tb_%s` WHERE update_sid != '-1' AND update_sid = (SELECT MAX(sid) AS sid FROM `%s`.`tb_reconciliation_update_%s` WHERE  TYPE='%d' AND YEAR='%s' AND MONTH='%s' ORDER BY `sid`);", db_name, dbName, db_name, db_name, type, year, month));

		    MyDBUtil.getInstance().execute(String.format("INSERT INTO `%s`.`tb_reconciliation_update_%s` SET `update_date`=now(), `file`='%s', `user_id`='%s', `type`='%d', `year`='%s', `month`='%s';", db_name, db_name, fileName, user_sid, type, year, month));
		    
            MyDBUtil.getInstance().execute(String.format("UPDATE %s.`tb_%s` SET update_sid = (SELECT MAX(sid) AS sid FROM `%s`.`tb_reconciliation_update_%s` WHERE  TYPE='%d' AND YEAR='%s' AND MONTH='%s' ORDER BY `sid`) WHERE update_sid = -1;", db_name, dbName, db_name, db_name, type, year, month));
		    sb.append("0");
		} catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
			out.print("-1");
		}
%>