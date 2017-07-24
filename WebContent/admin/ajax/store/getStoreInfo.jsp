<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer();
		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
		StringBuffer query = new StringBuffer();

		int storeSid = MyRequestUtil.getInt(request, "storeSid", 0);

		String storeId = MyRequestUtil.getString(request, "storeId", null);

		
		try {
		    if (storeSid < 1 || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			query.append(String.format("SELECT `a`.*, `b`.`user_id` AS `manager`,`d`.`user_id` AS `owner_id`,(SELECT count(`sid`) FROM `%s`.`tb_cash_register_%s`) AS `pos_cnt` FROM (SELECT * FROM `%s`.`tb_stores` WHERE `sid`='%d') AS `a` LEFT JOIN `%s`.`tb_user_store_access` AS `b` ON `a`.`store_id`=`b`.`store_id`", db_name, storeId, db_name, storeSid, db_name));
			query.append(String.format(" LEFT JOIN `wrp`.`tb_user` AS `d` ON `a`.`owner_sid`=`d`.`sid`"));

			rs = stmt.executeQuery(query.toString());
			
			sb.append("{\"data\":{");

			if(rs.next()) {
                sb.append(String.format("\"sid\":%d,", rs.getInt("sid")));
                sb.append(String.format("\"active\":%d,", rs.getInt("active")));
                if (rs.getString("store_id") != null) sb.append(String.format("\"storeId\":\"%s\",", rs.getString("store_id")));
                if (rs.getString("name") != null) sb.append(String.format("\"name\":\"%s\",", rs.getString("name")));
                if (rs.getString("address1") != null) sb.append(String.format("\"address1\":\"%s\",", rs.getString("address1")));
                if (rs.getString("address2") != null) sb.append(String.format("\"address2\":\"%s\",", rs.getString("address2")));
                if (rs.getString("city") != null) sb.append(String.format("\"city\":\"%s\",", rs.getString("city")));
                if (rs.getString("state") != null) sb.append(String.format("\"state\":\"%s\",", rs.getString("state")));
                if (rs.getString("zipcode") != null) sb.append(String.format("\"zipcode\":\"%s\",", rs.getString("zipcode")));
                sb.append(String.format("\"poscnt\":%d,", rs.getInt("pos_cnt")));
                if (rs.getString("tel") != null) sb.append(String.format("\"tel\":\"%s\",", rs.getString("tel")));
                if (rs.getString("fax") != null) sb.append(String.format("\"fax\":\"%s\",", rs.getString("fax")));
                if (rs.getString("owner") != null) sb.append(String.format("\"owner\":\"%s\",", rs.getString("owner")));
                if (rs.getString("owner_id") != null) sb.append(String.format("\"ownerId\":\"%s\",", rs.getString("owner_id")));
                if (rs.getTimestamp("open_date") != null) sb.append(String.format("\"openDate\":\"%s\",", sdf.format(rs.getTimestamp("open_date"))));
                sb.append(String.format("\"status\":%d,", rs.getInt("status")));
                if (rs.getString("market_code") != null) sb.append(String.format("\"marketCode\":\"%s\",", rs.getString("market_code")));
                if (rs.getString("district_code") != null) sb.append(String.format("\"districtCode\":\"%s\",", rs.getString("district_code")));
                if (rs.getString("carrier_market_id") != null) sb.append(String.format("\"carrierMarketId\":\"%s\",", rs.getString("carrier_market_id")));
                if (rs.getString("door_code") != null) sb.append(String.format("\"door_code\":\"%s\",", rs.getString("door_code")));
                sb.append(String.format("\"taxRate\":%.4f,", rs.getFloat("tax_rate")));
                if (rs.getString("manager") != null) sb.append(String.format("\"manager\":\"%s\",", rs.getString("manager")));
                if (rs.getString("asap_id") != null) sb.append(String.format("\"asapId\":\"%s\",", rs.getString("asap_id")));
                if (rs.getString("asap_password") != null) sb.append(String.format("\"asapPassword\":\"%s\",", rs.getString("asap_password")));
                if (rs.getString("qpay_id") != null) sb.append(String.format("\"qpayId\":\"%s\",", rs.getString("qpay_id")));
                if (rs.getString("qpay_password") != null) sb.append(String.format("\"qpayPassword\":\"%s\",", rs.getString("qpay_password")));
                if (rs.getString("qpay_inven_id") != null) sb.append(String.format("\"qpayInvenId\":\"%s\",", rs.getString("qpay_inven_id")));
                if (rs.getString("qpay_inven_password") != null) sb.append(String.format("\"qpayInvenPassword\":\"%s\",", rs.getString("qpay_inven_password")));
                if (rs.getString("qpay_inven_branch_id") != null) sb.append(String.format("\"qpayInvenBranchId\":\"%s\",", rs.getString("qpay_inven_branch_id")));
                if (rs.getString("qpay_api_id") != null) sb.append(String.format("\"qpayApiId\":\"%s\",", rs.getString("qpay_api_id")));
                if (rs.getString("qpay_api_password") != null) sb.append(String.format("\"qpayApiPassword\":\"%s\",", rs.getString("qpay_api_password")));
                if (rs.getString("qpay_api_key") != null) sb.append(String.format("\"qpayApiKey\":\"%s\",", rs.getString("qpay_api_key")));
                if (rs.getString("xbm_id") != null) sb.append(String.format("\"xbmId\":\"%s\",", rs.getString("xbm_id")));
                if (rs.getString("xbm_password") != null) sb.append(String.format("\"xbmPassword\":\"%s\",", rs.getString("xbm_password")));
                if (rs.getString("daily_work_hour") != null) sb.append(String.format("\"daily_work_hour\":\"%s\",", rs.getString("daily_work_hour")));
                if (rs.getString("weekly_work_hour") != null) sb.append(String.format("\"weekly_work_hour\":\"%s\",", rs.getString("weekly_work_hour")));
                if (rs.getString("open_time") != null) sb.append(String.format("\"open_time\":\"%s\",", rs.getString("open_time")));
                if (rs.getString("close_time") != null) sb.append(String.format("\"close_time\":\"%s\",", rs.getString("close_time")));
                sb.append(String.format("\"transaction_protection\":%d,", rs.getInt("transaction_protection")));
                sb.append(String.format("\"clock_in_sales_only\":%d,", rs.getInt("clock_in_sales_only")));
                sb.append(String.format("\"all_permissions_allow\":%d,", rs.getInt("all_permissions_allow")));
                sb.append(String.format("\"return_only_store_credit\":%d,", rs.getInt("return_only_store_credit")));
                sb.append(String.format("\"external_clockio\":%d,", rs.getInt("external_clockio")));
                if (rs.getString("external_clockio_url") != null) sb.append(String.format("\"external_clockio_url\":\"%s\",", rs.getString("external_clockio_url")));
                if (rs.getString("keycode") != null) sb.append(String.format("\"keycode\":\"%s\",", rs.getString("keycode")));
			}

			if (sb.length() > 0 && sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length() -1);

			sb.append("}}");

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

            out.print(sb.toString());

		} catch (Exception e) {

            if (e.getMessage().length() > 0) {
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
		}

		context = null;
		dataSource = null;
		conn = null;
		stmt = null;
		rs = null;
		sb = null;
%>