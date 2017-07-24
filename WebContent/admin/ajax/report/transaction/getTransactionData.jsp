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
		int year = MyRequestUtil.getInt(request, "year", 0);
		int month = MyRequestUtil.getInt(request, "month", 0);
		int date = MyRequestUtil.getInt(request, "date", 0);

		String startUTCDateTime = MyRequestUtil.getString(request, "startUTCDateTime", null);
		String endUTCDateTime = MyRequestUtil.getString(request, "endUTCDateTime", null);

		int dataType = MyRequestUtil.getInt(request, "dataType", 1);
		
		// dataType
		// 0: hour
        // 1: date
        // 2: month

        int dateTime = 0;

        Calendar c = Calendar.getInstance();

		int i, count;
		// 자바스크립트에서 UTC Timezone offset을 출력할때 기호가 반대로 출력됨
		// 예를 들어, +09:00인 서울 시각이 자바스크립트에서는 -540(분단위)로 출력되기 때문에 스크립트에서나 서버에서 기호를 변경해주어야함.
		// 이 시스템에서는 서버에서 기호를 변경하는것으로 정의함.
		timeDifWithUTC = -timeDifWithUTC;
		if (timeDifWithUTC > 12) timeDifWithUTC /= 60;

		try {
		    if (storeId == null || user_sid == null || db_name == null) {
		        throw new Exception();
		    }


			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();
			
		    switch (dataType) {
		    case 0:
		        dateTime = 0;
		        for(i = 0; i < 24; i++) {
		            if (i > 0) {
		                query.append(" UNION ");
		            }
		            query.append(String.format("(SELECT DATE_FORMAT(DATE_ADD(STR_TO_DATE('%d-%d-%d 00','%%Y-%%m-%%d %%H'), INTERVAL %d HOUR), '%%H') AS `date_time`,IF (`transaction_type` IS NOT NULL, `transaction_type`, -100) AS `transaction_type`, `sid`", year, month, date, i));
                    query.append(String.format(" FROM `%s`.`tb_invoice_items_%s`", db_name, storeId));
                    query.append(String.format(" WHERE ("));
                    query.append(String.format(" (`item_type` IN (0) AND `transaction_type` IN (0,2,3,14) AND `inventory_sid` IN (SELECT `sid` FROM `%s`.`tb_inventory_%s` WHERE `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_type` IN (0))))", db_name, storeId, db_name, storeId));
                    query.append(String.format(" OR (`item_type` IN (0) AND `transaction_type` IN (4,6,7))"));
                    query.append(String.format(" OR (`transaction_type` IN (-1))"));
                    query.append(String.format(" ) AND `invoice_no` IN (SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE DATE_FORMAT(CONVERT_TZ(`date`, '+0:00', '%s:00' ), '%%Y-%%m-%%d %%H')=DATE_ADD(STR_TO_DATE('%d-%d-%d 00','%%Y-%%m-%%d %%H'), INTERVAL %d HOUR))", db_name, storeId, timeDifWithUTC, year, month, date, i));
                    query.append(String.format(" ORDER BY `transaction_type`)"));
		        }
		        break;
		    case 1:
		        dateTime = 1;
		        c.set(year, month, 0);
		        for(i = 0; i < c.get(Calendar.DATE); i++) {
		            if (i > 0) {
		                query.append(" UNION ");
		            }
		            query.append(String.format("(SELECT DATE_FORMAT(DATE_ADD(STR_TO_DATE('%d-%d-01','%%Y-%%m-%%d'), INTERVAL %d DAY), '%%d') AS `date_time`,IF (`transaction_type` IS NOT NULL, `transaction_type`, -100) AS `transaction_type`, `sid`", year, month, i));
                    query.append(String.format(" FROM `%s`.`tb_invoice_items_%s`", db_name, storeId));
                    query.append(String.format(" WHERE ("));
                    query.append(String.format(" (`item_type` IN (0) AND `transaction_type` IN (0,2,3,14) AND `inventory_sid` IN (SELECT `sid` FROM `%s`.`tb_inventory_%s` WHERE `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_type` IN (0))))", db_name, storeId, db_name, storeId));
                    query.append(String.format(" OR (`item_type` IN (0) AND `transaction_type` IN (4,6,7))"));
                    query.append(String.format(" OR (`transaction_type` IN (-1))"));
                    query.append(String.format(" ) AND `invoice_no` IN (SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE DATE_FORMAT(CONVERT_TZ(`date`, '+0:00', '%s:00' ), '%%Y-%%m-%%d')=DATE_ADD(STR_TO_DATE('%d-%d-01','%%Y-%%m-%%d'), INTERVAL %d DAY))", db_name, storeId, timeDifWithUTC, year, month, i));
                    query.append(String.format(" ORDER BY `transaction_type`)"));
		        }
		        break;
		    case 2:
		        dateTime = 1;
		        for(i = 0; i < 12; i++) {
		            if (i > 0) {
		                query.append(" UNION ");
		            }
		            query.append(String.format("(SELECT DATE_FORMAT(DATE_ADD(STR_TO_DATE('%d-01-01','%%Y-%%m-%%d'), INTERVAL %d MONTH), '%%m') AS `date_time`,IF (`transaction_type` IS NOT NULL, `transaction_type`, -100) AS `transaction_type`, `sid`", year, i));
                    query.append(String.format(" FROM `%s`.`tb_invoice_items_%s`", db_name, storeId));
                    query.append(String.format(" WHERE ("));
                    query.append(String.format(" (`item_type` IN (0) AND `transaction_type` IN (0,2,3,14) AND `inventory_sid` IN (SELECT `sid` FROM `%s`.`tb_inventory_%s` WHERE `item_sid` IN (SELECT `sid` FROM `%s`.`tb_item_dict_%s` WHERE `item_type` IN (0))))", db_name, storeId, db_name, storeId));
                    query.append(String.format(" OR (`item_type` IN (0) AND `transaction_type` IN (4,6,7))"));
                    query.append(String.format(" OR (`transaction_type` IN (-1))"));
                    query.append(String.format(" ) AND `invoice_no` IN (SELECT `invoice_no` FROM `%s`.`tb_invoice_%s` WHERE DATE_FORMAT(CONVERT_TZ(`date`, '+0:00', '%s:00' ), '%%Y-%%m')=DATE_FORMAT(DATE_ADD(STR_TO_DATE('%d-01-01','%%Y-%%m-%%d'), INTERVAL %d MONTH), '%%Y-%%m'))", db_name, storeId, timeDifWithUTC, year, i));
                    query.append(String.format(" ORDER BY `transaction_type`)"));
		        }
		        query.append(" ORDER BY `date_time`, `transaction_type`,`sid`");
		        break;
		    }

			rs = stmt.executeQuery(query.toString());

            query.delete(0, query.length());

			i = -1; // transaction type
			count = 0;

            sb.append("{\"data\":[{");
            sb.append(String.format("\"dateTime\":%d,", dateTime));

			while(rs.next()) {
                if (dateTime != rs.getInt("date_time")) {
                    i = dateTime + 1;
                    dateTime = rs.getInt("date_time");

                    if (sb.length() > 0) {
                        if (sb.length() > 0 && sb.lastIndexOf("[") < sb.length() -1 ) {
                            if (sb.length() > 0 && sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length() -1);
                            sb.append("},");
                        }
                    }

                    for (; i < dateTime; i++) {
                        sb.append(String.format("{\"dateTime\":%d},", i));
                    }
                    sb.append("{");
                    sb.append(String.format("\"dateTime\":%d,", dateTime));
                    i = rs.getInt("transaction_type");
                    count = 0;
                }

                if (i != rs.getInt("transaction_type")) {
                    switch(i) {
                        case -1:
                            sb.append(String.format("\"PAYMENT\":%d,", count));
                            break;
                        case 0:
                            sb.append(String.format("\"NEW ACTIVATION(NEW)\":%d,", count));
                            break;
                        case 2:
                            sb.append(String.format("\"UPGRADE(NEW)\":%d,", count));
                            break;
                        case 3:
                            sb.append(String.format("\"PORT-IN(NEW)\":%d,", count));
                            break;
                        case 4:
                            sb.append(String.format("\"NEW ACTIVATION(BYOD)\":%d,", count));
                            break;
                        case 6:
                            sb.append(String.format("\"UPGRADE(BYOD)\":%d,", count));
                            break;
                        case 7:
                            sb.append(String.format("\"PORT-IN(BYOD)\":%d,", count));
                            break;
                        case 14:
                            sb.append(String.format("\"SOR\":%d,", count));
                            break;
                    }
                    i = rs.getInt("transaction_type");
                    count = 1;
                } else {
                    count++;
                }
			}

            switch(i) {
                case -1:
                    sb.append(String.format("\"PAYMENT\":%d,", count));
                    break;
                case 0:
                    sb.append(String.format("\"NEW ACTIVATION(NEW)\":%d,", count));
                    break;
                case 2:
                    sb.append(String.format("\"UPGRADE(NEW)\":%d,", count));
                    break;
                case 3:
                    sb.append(String.format("\"PORT-IN(NEW)\":%d,", count));
                    break;
                case 4:
                    sb.append(String.format("\"NEW ACTIVATION(BYOD)\":%d,", count));
                    break;
                case 6:
                    sb.append(String.format("\"UPGRADE(BYOD)\":%d,", count));
                    break;
                case 7:
                    sb.append(String.format("\"PORT-IN(BYOD)\":%d,", count));
                    break;
                case 14:
                    sb.append(String.format("\"SOR\":%d,", count));
                    break;
            }
               // delete ,{
			if (sb.length() > 0 && sb.lastIndexOf(",{") == sb.length() -2 ) sb.delete((sb.length() -2), sb.length());
			if (sb.length() > 0 && sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length() -1);
			if (sb.length() > 0 && sb.lastIndexOf("}") < sb.length() -1 ) sb.append("}");

            switch (dataType) {
            case 0:
                if (dateTime < 23) {

                    for (;++dateTime < 24;) {
                        sb.append(String.format(",{\"dateTime\":%d}", dateTime));
                    }
                }
                break;
            case 1:
                if (dateTime < c.get(Calendar.DATE)) {
                    for (;++dateTime <= c.get(Calendar.DATE);) {
                        sb.append(String.format(",{\"dateTime\":%d}", dateTime));
                    }
                }
                break;
            case 2:
                if (dateTime < 12) {

                    for (;++dateTime < 13;) {
                        sb.append(String.format(",{\"dateTime\":%d}", dateTime));
                    }
                }
                break;
            }

            sb.append("],");

            sb.append(String.format("\"year\":%d,\"month\":%d,\"date\":%d", year, month, date));

            sb.append("}");

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