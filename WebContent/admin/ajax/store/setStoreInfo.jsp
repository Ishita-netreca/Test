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
		Statement stmt = null;
		ResultSet rs = null;
		int act = 0;
		StringBuffer query = new StringBuffer(), query2 = new StringBuffer();

		int protection = MyRequestUtil.getInt(request, "protection", 1);
		int storeSid = MyRequestUtil.getInt(request, "storeSid", 0);
		int active = MyRequestUtil.getInt(request, "active", 0);
		String storeId = MyRequestUtil.getString(request, "storeId", "");
		String name = MyRequestUtil.getString(request, "name", "");
		String address1 = MyRequestUtil.getString(request, "address1", "");
		String address2 = MyRequestUtil.getString(request, "address2", "");
		String city = MyRequestUtil.getString(request, "city", "");
		String state = MyRequestUtil.getString(request, "state", "");
		String zipcode = MyRequestUtil.getString(request, "zipcode", "");
		int poscnt = MyRequestUtil.getInt(request, "poscnt", 0);
		String tel = MyRequestUtil.getString(request, "tel", "");
		String fax = MyRequestUtil.getString(request, "fax", "");
		float taxRate = MyRequestUtil.getFloat(request, "taxRate", (float)0.4);
		String doorCode = MyRequestUtil.getString(request, "doorCode", "");
		String marketCode = MyRequestUtil.getString(request, "marketCode", "");
		String districtCode = MyRequestUtil.getString(request, "districtCode", "");
		//String owner = MyRequestUtil.getString(request, "owner", null);
		int status = MyRequestUtil.getInt(request, "status", 0);
		String asapId = MyRequestUtil.getString(request, "asapId", "");
		String asapPassword = MyRequestUtil.getString(request, "asapPassword", "");
		String qpayId = MyRequestUtil.getString(request, "qpayId", "");
		String qpayPassword = MyRequestUtil.getString(request, "qpayPassword", "");
		String qpayInvenId = MyRequestUtil.getString(request, "qpayInvenId", "");
		String qpayInvenPassword = MyRequestUtil.getString(request, "qpayInvenPassword", "");
		String qpayInvenBranchId = MyRequestUtil.getString(request, "qpayInvenBranchId", "");
		String qpayApiId = MyRequestUtil.getString(request, "qpayApiId", "");
		String qpayApiPassword = MyRequestUtil.getString(request, "qpayApiPassword", "");
		String qpayApiKey = MyRequestUtil.getString(request, "qpayApiKey", null);
		String xbmId = MyRequestUtil.getString(request, "xbmId", "");
		String xbmPassword = MyRequestUtil.getString(request, "xbmPassword", "");
		String open_time = MyRequestUtil.getString(request, "open_time", "");
		String close_time = MyRequestUtil.getString(request, "close_time", "");
		String daily_work_hour = MyRequestUtil.getString(request, "daily_work_hour", "");
		String weekly_work_hour = MyRequestUtil.getString(request, "weekly_work_hour", "");
		int clock_in_sales_only = MyRequestUtil.getInt(request, "clock_in_sales_only", 0);
		int all_permissions_allow = MyRequestUtil.getInt(request, "all_permissions_allow", 0);
		int return_only_store_credit = MyRequestUtil.getInt(request, "return_only_store_credit", 0);
		int external_clockio = MyRequestUtil.getInt(request, "external_clockio", 0);
		String external_clockio_url = MyRequestUtil.getString(request, "external_clockio_url", "");
		String keyCode = MyRequestUtil.getString(request, "keyCode", "");
		
		int result = 0;

		try {
		    if (user_sid == null || storeId == null || db_name == null) {
		        throw new Exception();
		    }

		context = new InitialContext();
		dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
		conn = dataSource.getConnection();
	
		stmt = conn.createStatement();
	
		rs = stmt.executeQuery(String.format("SELECT `sid`, `active` FROM `%s`.`tb_stores` WHERE `store_id`='%s'", db_name, storeId));
		if (rs.next()) {
		    if (storeSid != rs.getInt("sid")) result = 1;
		    act = rs.getInt("active");
		}
	
		int st = MyDBUtil.getInstance().getInt(String.format("SELECT c.*, d.c_store FROM (SELECT b.*, a.`license` FROM `wrp`.`tb_owner_info` AS a, `wrp`.`tb_user` AS b WHERE a.user_id = b.user_id AND a.user_id='%s') AS c LEFT JOIN (SELECT COUNT(*) AS c_store, owner_sid FROM wrp.tb_stores WHERE active = 1 GROUP BY owner_sid) AS d ON c.sid = d.owner_sid;",db_name), "c_store");
		if(active != 0){
			int li = MyDBUtil.getInstance().getInt(String.format("SELECT c.*, d.c_store FROM (SELECT b.*, a.`license` FROM `wrp`.`tb_owner_info` AS a, `wrp`.`tb_user` AS b WHERE a.user_id = b.user_id AND a.user_id='%s') AS c LEFT JOIN (SELECT COUNT(*) AS c_store, owner_sid FROM wrp.tb_stores WHERE active = 1 GROUP BY owner_sid) AS d ON c.sid = d.owner_sid;",db_name), "license");
			
			if (st >= li && act == 0){ // license 0
				out.print("5"); 
				return;
			}
		}
            try {
                if (rs != null && !rs.isClosed()) {
                    rs.close();
                }
            } catch (Exception e2) {

            }
            try {
                if (stmt != null && !stmt.isClosed()) {
                    stmt.close();
                }
            } catch (Exception e2) {

            }

            if (result == 0) {
                stmt = conn.createStatement();

                if (storeSid > 0) {
/*
                    query.append(String.format("UPDATE `%s`.`tb_stores` SET", db_name));
            //        query.append(String.format(" `store_id`='%s',", storeId));
                    if (name != null) query.append(String.format(" `name`='%s',", name));
                    if (address1 != null) query.append(String.format(" `address1`='%s',", address1));
                    if (address2 != null) query.append(String.format(" `address2`='%s',", address2));
                    if (city != null) query.append(String.format(" `city`='%s',", city));
                    if (state != null) query.append(String.format(" `state`='%s',", state));
                    if (zipcode != null) query.append(String.format(" `zipcode`='%s',", zipcode));
                    if (tel != null) query.append(String.format(" `tel`='%s',", tel));
                    if (fax != null) query.append(String.format(" `fax`='%s',", fax));
                    if (open_time != null) {
						query.append(String.format(" `open_time`='%s',", open_time));
					}
					if (close_time != null) {
						query.append(String.format(" `close_time`='%s',", close_time));
					}
					if (daily_work_hour != null) {
						query.append(String.format(" `daily_work_hour`='%s',", daily_work_hour));
					}
					if (weekly_work_hour != null) {
						query.append(String.format(" `weekly_work_hour`='%s',", weekly_work_hour));
					}
                    query.append(String.format(" `tax_rate`='%.4f',", taxRate));
                    query.append(String.format(" `status`='%d',", status));
                    query.append(String.format(" `active`='%d',", active));
                    query.append(String.format(" `transaction_protection`='%d',", protection));
                    if (doorCode != null) query.append(String.format(" `door_code`='%s',", doorCode));
                    if (marketCode != null) query.append(String.format(" `market_code`='%s',", marketCode));
                    if (districtCode != null) query.append(String.format(" `district_code`='%s',", districtCode));
                    if (asapId != null) query.append(String.format(" `asap_id`='%s',", asapId));
                    if (asapPassword != null) query.append(String.format(" `asap_password`='%s',", asapPassword));
                    if (qpayId != null) query.append(String.format(" `qpay_id`='%s',", qpayId));
                    if (qpayPassword != null) query.append(String.format(" `qpay_password`='%s',", qpayPassword));
                    if (qpayInvenId != null) query.append(String.format(" `qpay_inven_id`='%s',", qpayInvenId));
                    if (qpayInvenPassword != null) query.append(String.format(" `qpay_inven_password`='%s',", qpayInvenPassword));
                    if (qpayInvenBranchId != null) query.append(String.format(" `qpay_inven_branch_id`='%s',", qpayInvenBranchId));
                    if (qpayApiId != null) query.append(String.format(" `qpay_api_id`='%s',", qpayApiId));
                    if (qpayApiPassword != null) query.append(String.format(" `qpay_api_password`='%s',", qpayApiPassword));
                    if (qpayApiKey != null) query.append(String.format(" `qpay_api_key`='%s',", qpayApiKey));
                    if (xbmId != null) query.append(String.format(" `xbm_id`='%s',", xbmId));
                    if (xbmPassword != null) query.append(String.format(" `xbm_password`='%s',", xbmPassword));
                    if (query.lastIndexOf(",") == query.length() -1) query.deleteCharAt(query.length() -1);
                    query.append(String.format(" WHERE `sid`='%d';", storeSid));
*/                  
					query.append(String.format("UPDATE `wrp`.`tb_stores` SET"));
					//        query.append(String.format(" `store_id`='%s',", storeId));
					if (name != null)
						query.append(String.format(" `name`='%s',", name));
					if (address1 != null)
						query.append(String.format(" `address1`='%s',", address1));
					if (address2 != null)
						query.append(String.format(" `address2`='%s',", address2));
					if (city != null)
						query.append(String.format(" `city`='%s',", city));
					if (state != null)
						query.append(String.format(" `state`='%s',", state));
					if (zipcode != null)
						query.append(String.format(" `zipcode`='%s',", zipcode));
					if (tel != null)
						query.append(String.format(" `tel`='%s',", tel));
					if (fax != null)
						query.append(String.format(" `fax`='%s',", fax));
					if (open_time != null) {
						query.append(String.format(" `open_time`='%s',", open_time));
					}
					if (close_time != null) {
						query.append(String.format(" `close_time`='%s',", close_time));
					}
					if (daily_work_hour != null) {
						query.append(String.format(" `daily_work_hour`='%s',", daily_work_hour));
					}
					if (weekly_work_hour != null) {
						query.append(String.format(" `weekly_work_hour`='%s',", weekly_work_hour));
					}
					if (keyCode != null){
						query.append(String.format(" `keycode`='%s',", keyCode));
					}
					query.append(String.format(" `tax_rate`='%.4f',", taxRate));
					query.append(String.format(" `status`='%d',", status));
					query.append(String.format(" `active`='%d',", active));
					query.append(String.format(" `transaction_protection`=%d,", protection));
					query.append(String.format(" `clock_in_sales_only`='%d',", clock_in_sales_only));
					query.append(String.format(" `all_permissions_allow`='%d',", all_permissions_allow));
					query.append(String.format(" `return_only_store_credit`='%d',", return_only_store_credit));
					query.append(String.format(" `external_clockio`='%d',", external_clockio));
					if (external_clockio_url != null) {
						query.append(String.format(" `external_clockio_url`='%s',", external_clockio_url));
					}
					if (doorCode != null)
						query.append(String.format(" `door_code`='%s',", doorCode));
					if (marketCode != null)
						query.append(String.format(" `market_code`='%s',", marketCode));
					if (districtCode != null)
						query.append(String.format(" `district_code`='%s',", districtCode));
					if (asapId != null)
						query.append(String.format(" `asap_id`='%s',", asapId));
					if (asapPassword != null)
						query.append(String.format(" `asap_password`='%s',", asapPassword));
					if (qpayId != null) {
						query.append(String.format(" `qpay_id`='%s',", qpayId));
						query.append(String.format(" `qpay_api_id`='%s',", qpayId));
						query.append(String.format(" `qpay_inven_id`='%s',", qpayId));
					}
					if (qpayPassword != null) {
						query.append(String.format(" `qpay_password`='%s',", qpayPassword));	
						query.append(String.format(" `qpay_inven_password`='%s',", qpayPassword));			
						query.append(String.format(" `qpay_api_password`='%s',", qpayPassword));		
					}
					/*
					if (qpayInvenId != null)
						query.append(String.format(" `qpay_inven_id`='%s',", qpayInvenId));
					if (qpayInvenPassword != null)
						query.append(String.format(" `qpay_inven_password`='%s',", qpayInvenPassword));
					*/
					if (qpayInvenBranchId != null)
						query.append(String.format(" `qpay_inven_branch_id`='%s',", qpayInvenBranchId));
					/*
					if (qpayApiId != null)
						query.append(String.format(" `qpay_api_id`='%s',", qpayApiId));
					if (qpayApiPassword != null)
						query.append(String.format(" `qpay_api_password`='%s',", qpayApiPassword));
					if (qpayApiKey != null)
						query.append(String.format(" `qpay_api_key`='%s',", qpayApiKey));
					*/
					if (xbmId != null)
						query.append(String.format(" `xbm_id`='%s',", xbmId));
					if (xbmPassword != null)
						query.append(String.format(" `xbm_password`='%s',", xbmPassword));
					if (query.lastIndexOf(",") == query.length() - 1)
						query.deleteCharAt(query.length() - 1);
					query.append(String.format(" WHERE `store_id`='%s';",  storeId));


					query.append(String.format("UPDATE `%s`.`tb_stores` SET", db_name));
					//        query.append(String.format(" `store_id`='%s',", storeId));
					if (name != null)
						query.append(String.format(" `name`='%s',", name));
					if (address1 != null)
						query.append(String.format(" `address1`='%s',", address1));
					if (address2 != null)
						query.append(String.format(" `address2`='%s',", address2));
					if (city != null)
						query.append(String.format(" `city`='%s',", city));
					if (state != null)
						query.append(String.format(" `state`='%s',", state));
					if (zipcode != null)
						query.append(String.format(" `zipcode`='%s',", zipcode));
					if (tel != null)
						query.append(String.format(" `tel`='%s',", tel));
					if (fax != null)
						query.append(String.format(" `fax`='%s',", fax));
					if (open_time != null) {
						query.append(String.format(" `open_time`='%s',", open_time));
					}
					if (close_time != null) {
						query.append(String.format(" `close_time`='%s',", close_time));
					}
					if (daily_work_hour != null) {
						query.append(String.format(" `daily_work_hour`='%s',", daily_work_hour));
					}
					if (weekly_work_hour != null) {
						query.append(String.format(" `weekly_work_hour`='%s',", weekly_work_hour));
					}
					if (keyCode != null){
						query.append(String.format(" `keycode`='%s',", keyCode));
					}
					query.append(String.format(" `tax_rate`='%.4f',", taxRate));
					query.append(String.format(" `status`='%d',", status));
					query.append(String.format(" `active`='%d',", active));
					query.append(String.format(" `transaction_protection`=%d,", protection));
					query.append(String.format(" `clock_in_sales_only`='%d',", clock_in_sales_only));
					query.append(String.format(" `all_permissions_allow`='%d',", all_permissions_allow));
					query.append(String.format(" `return_only_store_credit`='%d',", return_only_store_credit));
					query.append(String.format(" `external_clockio`='%d',", external_clockio));
					if (external_clockio_url != null) {
						query.append(String.format(" `external_clockio_url`='%s',", external_clockio_url));
					}
					if (doorCode != null)
						query.append(String.format(" `door_code`='%s',", doorCode));
					if (marketCode != null)
						query.append(String.format(" `market_code`='%s',", marketCode));
					if (districtCode != null)
						query.append(String.format(" `district_code`='%s',", districtCode));
					if (asapId != null)
						query.append(String.format(" `asap_id`='%s',", asapId));
					if (asapPassword != null)
						query.append(String.format(" `asap_password`='%s',", asapPassword));
					if (qpayId != null) {
						query.append(String.format(" `qpay_id`='%s',", qpayId));
						query.append(String.format(" `qpay_api_id`='%s',", qpayId));
						query.append(String.format(" `qpay_inven_id`='%s',", qpayId));
						query.append(String.format(" `qpay_api_token`='',"));
					}
					if (qpayPassword != null) {
						query.append(String.format(" `qpay_password`='%s',", qpayPassword));	
						query.append(String.format(" `qpay_inven_password`='%s',", qpayPassword));			
						query.append(String.format(" `qpay_api_password`='%s',", qpayPassword));		
					}
					/*
					if (qpayInvenId != null)
						query.append(String.format(" `qpay_inven_id`='%s',", qpayInvenId));
					if (qpayInvenPassword != null)
						query.append(String.format(" `qpay_inven_password`='%s',", qpayInvenPassword));
					*/
					if (qpayInvenBranchId != null)
						query.append(String.format(" `qpay_inven_branch_id`='%s',", qpayInvenBranchId));
					/*
					if (qpayApiId != null)
						query.append(String.format(" `qpay_api_id`='%s',", qpayApiId));
					if (qpayApiPassword != null)
						query.append(String.format(" `qpay_api_password`='%s',", qpayApiPassword));
					if (qpayApiKey != null)
						query.append(String.format(" `qpay_api_key`='%s',", qpayApiKey));
					*/
					if (xbmId != null)
						query.append(String.format(" `xbm_id`='%s',", xbmId));
					if (xbmPassword != null)
						query.append(String.format(" `xbm_password`='%s',", xbmPassword));
					if (query.lastIndexOf(",") == query.length() - 1)
						query.deleteCharAt(query.length() - 1);
					query.append(String.format(" WHERE `store_id`='%s';",  storeId));
			}
                

			stmt.execute(query.toString());
		}

		try {
			if (rs != null && !rs.isClosed()) {
				rs.close();
			}
		} catch (Exception e2) {

		}
		try {
			if (stmt != null && !stmt.isClosed()) {
				stmt.close();
			}
		} catch (Exception e2) {

		}
		try {
			if (conn != null && !conn.isClosed()) {
				conn.close();
			}
		} catch (Exception e2) {

		}

		out.print(result);

	} catch (Exception e) {
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}

		try {
			if (rs != null && !rs.isClosed()) {
				rs.close();
			}
		} catch (Exception e2) {

		}
		try {
			if (stmt != null && !stmt.isClosed()) {
				stmt.close();
			}
		} catch (Exception e2) {

		}
		try {
			if (conn != null && !conn.isClosed()) {
				conn.close();
			}
		} catch (Exception e2) {

		}
		out.print("-1");
	}

	context = null;
	dataSource = null;
	conn = null;
	stmt = null;
	rs = null;
%>