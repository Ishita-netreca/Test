<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../../common.jsp" %>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer(), query = new StringBuffer();

		String storeId = MyRequestUtil.getString(request, "storeId", null);
		int timeDifWithUTC = MyRequestUtil.getInt(request, "timeDifWithUTC", 0);
		String startUTCDateTime = MyRequestUtil.getString(request, "startUTCDateTime", null);
		String endUTCDateTime = MyRequestUtil.getString(request, "endUTCDateTime", null);
		
		int hour = 0, i;

		// 자바스크립트에서 UTC Timezone offset을 출력할때 기호가 반대로 출력됨
		// 예를 들어, +09:00인 서울 시각이 자바스크립트에서는 -540(분단위)로 출력되기 때문에 스크립트에서나 서버에서 기호를 변경해주어야함.
		// 이 시스템에서는 서버에서 기호를 변경하는것으로 정의함.
		timeDifWithUTC = -timeDifWithUTC;
		if (timeDifWithUTC > 12) timeDifWithUTC /= 60;

		try {
		    if (storeId == null || user_sid == null || startUTCDateTime == null || endUTCDateTime == null || db_name == null) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    // BYOD의 경우 inventory sid column을 사용하지 않기 때문에 transaction_type을 따로 필터링함
			query.append(String.format("(SELECT DATE_FORMAT(CONVERT_TZ(`b`.`date`, '+0:00', '%s:00' ), '%%H') AS `hour`, `transaction_type`, COUNT(`sid`) AS `count` FROM (SELECT `sid`,`invoice_no`,`transaction_type` FROM `%s`.`tb_invoice_items_%s` WHERE `item_type` IN (0) AND ((`transaction_type` IN (0,2,3,14) AND `inventory_sid` IN (SELECT `sid` FROM `%s`.`tb_inventory_%s` WHERE `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_type` IN (0)))) OR `transaction_type`='4' OR `transaction_type`='6' OR `transaction_type`='7' ) AND `invoice_no` IN (SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE `date` BETWEEN '%s' AND '%s')) AS `a` LEFT JOIN (SELECT `invoice_no`, `date` FROM `%s`.`tb_invoice_%s` WHERE `date` BETWEEN '%s' AND '%s') AS `b` ON `a`.`invoice_no`=`b`.`invoice_no` GROUP BY `transaction_type`,`hour`)",
			                                                                                    timeDifWithUTC                                                                                                                                                             ,db_name, storeId                                                                                                                                         ,db_name, storeId                                                            ,db_name, storeId                                                                                                                                                                                             ,db_name, storeId              ,startUTCDateTime,endUTCDateTime                                                                    ,db_name, storeId               ,startUTCDateTime, endUTCDateTime
			));
			query.append(String.format(" UNION "));
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    // BYOD의 경우 inventory sid column을 사용하지 않기 때문에 transaction_type을 따로 필터링함
			query.append(String.format("(SELECT DATE_FORMAT(CONVERT_TZ(`b`.`date`, '+0:00', '%s:00' ), '%%H') AS `hour`, `transaction_type`, COUNT(`sid`) AS `count` FROM (SELECT `sid`,`invoice_no`,'-1' AS `transaction_type` FROM `%s`.`tb_invoice_items_%s` WHERE `item_type` IN (3) AND `invoice_no` IN (SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE `date` BETWEEN '%s' AND '%s')) AS `a` LEFT JOIN (SELECT `invoice_no`, `date` FROM `%s`.`tb_invoice_%s` WHERE `date` BETWEEN '%s' AND '%s') AS `b` ON `a`.`invoice_no`=`b`.`invoice_no` GROUP BY `transaction_type`,`hour`)",
			                                                                                    timeDifWithUTC                                                                                                                                                                        ,db_name, storeId                                                                                             ,db_name, storeId                ,startUTCDateTime, endUTCDateTime                                                                  ,db_name, storeId              ,startUTCDateTime,endUTCDateTime
			));
			query.append(String.format(" ORDER BY `hour`,`transaction_type` "));

			rs = stmt.executeQuery(query.toString());

            query.delete(0, query.length());

            sb.append("{\"data\":[{");
            sb.append(String.format("\"hour\":0,"));

			while(rs.next()) {
                if (hour != rs.getInt("hour")) {
                    i = hour + 1;
                    hour = rs.getInt("hour");

                    if (sb.length() > 0) {
                        if (sb.length() > 0 && sb.lastIndexOf("[") < sb.length() -1 ) {
                            if (sb.length() > 0 && sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length() -1);
                            sb.append("},");
                        }
                    }

                    for (; i < hour; i++) {
                        sb.append(String.format("{\"hour\":%d},", i));
                    }
                    sb.append("{");
                    sb.append(String.format("\"hour\":%d,", hour));
                }

                switch(rs.getInt("transaction_type")) {
                    case -1:
                        sb.append(String.format("\"PAYMENT\":%d,", rs.getInt("count")));
                        break;
                    case 0:
                        sb.append(String.format("\"NEW ACTIVATION(NEW)\":%d,", rs.getInt("count")));
                        break;
                    case 2:
                        sb.append(String.format("\"UPGRADE(NEW)\":%d,", rs.getInt("count")));
                        break;
                    case 3:
                        sb.append(String.format("\"PORT-IN(NEW)\":%d,", rs.getInt("count")));
                        break;
                    case 4:
                        sb.append(String.format("\"NEW ACTIVATION(BYOD)\":%d,", rs.getInt("count")));
                        break;
                    case 6:
                        sb.append(String.format("\"UPGRADE(BYOD)\":%d,", rs.getInt("count")));
                        break;
                    case 7:
                        sb.append(String.format("\"PORT-IN(BYOD)\":%d,", rs.getInt("count")));
                        break;
                    case 14:
                        sb.append(String.format("\"SOR\":%d,", rs.getInt("count")));
                        break;
                }
			}
               // delete ,{
			if (sb.length() > 0 && sb.lastIndexOf(",{") == sb.length() -2 ) sb.delete((sb.length() -2), sb.length());
			if (sb.length() > 0 && sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length() -1);
			if (sb.length() > 0 && sb.lastIndexOf("}") < sb.length() -1 ) sb.append("}");

			if (hour < 23) {

			    for (;++hour < 24;) {
                    sb.append(String.format(",{\"hour\":%d}", hour));
			    }
			}

            sb.append("]}");

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
		}

		context = null;
		dataSource = null;
		conn = null;
		stmt = null;
		rs = null;
		sb = null;
%>