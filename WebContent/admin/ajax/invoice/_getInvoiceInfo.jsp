<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.Context"%>
<%@ page import="javax.naming.InitialContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ page import="java.text.SimpleDateFormat" %>
<%
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer(), items = null, checkout = null, customer = null;

		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");

		String storeId = MyRequestUtil.getString(request, "storeId", null);

        int invoiceNo = MyRequestUtil.getInt(request, "invoiceNo", 0), customerSid = 0;

		try {
		    if (storeId == null || invoiceNo == 0) {
		        throw new Exception();
		    }

			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			rs = stmt.executeQuery(String.format("SELECT * FROM (SELECT `ab`.*, `c`.`item_code` FROM (SELECT `a`.*, `b`.`item_sid` FROM (SELECT * FROM `tb_invoice_items_%s` WHERE invoice_no='%d') AS `a` LEFT JOIN (SELECT `sid`,`item_sid` FROM `tb_inventory_%s`) AS `b` ON `a`.`inventory_sid`=`b`.`sid`) AS `ab` LEFT JOIN (SELECT `sid`,`item_code` FROM `tb_item_dict_%s`) AS `c` ON `ab`.`item_sid`=`c`.`sid`) AS `abc` LEFT JOIN (SELECT `sid`, `name` AS `fee_name` FROM `tb_fee_dict`) AS `d` ON `abc`.`fee_sid`=`d`.`sid`", storeId, invoiceNo, storeId, storeId));

			items = new StringBuffer();

			while(rs.next()){
			    items.append(String.format("{\"itemCode\":\"%s\",\"description\":\"%s\",\"serialNo\":\"%s\",\"qty\":%d,\"amount\":%s,\"taxRate\":%s,\"subtotal\":%s,\"mobileNo\":\"%s\",",
			    (rs.getString("item_code") != null && rs.getString("item_code").length() > 0)? rs.getString("item_code") : ((rs.getString("rateplan_code") != null && rs.getString("rateplan_code").length() > 0)? rs.getString("rateplan_code") : ((rs.getString("fee_name") != null && rs.getString("fee_name").length() > 0)? rs.getString("fee_name") : "")),
			    (rs.getString("name") != null)? rs.getString("name") : "",
			    (rs.getString("serial_no") != null)? rs.getString("serial_no") : "",
			    rs.getInt("qty"),
			    (rs.getFloat("amount") > 0)? rs.getString("amount") : "0.00",
			    (rs.getFloat("tax_rate") > 0)? rs.getString("tax_rate") : "0.00",
			    (rs.getFloat("subtotal") > 0)? rs.getString("subtotal") : "0.00",
			    (rs.getString("mobile_no") != null)? rs.getString("mobile_no") : ""
			    ));

			    if (rs.getString("rateplan_code") != null && !rs.getString("rateplan_code").equals("PAYMENT")) {
			        items.append("\"rateplanFlag\":1,");
			    } else {
			        items.append("\"rateplanFlag\":0,");
			    }

			    if (rs.getInt("fee_sid") > 0) {
			        items.append("\"feeFlag\":1,");
			    } else {
			        items.append("\"feeFlag\":0,");
			    }

			    if (rs.getInt("item_type") == 3) {
			        items.append("\"paymentFlag\":1,");
			    } else {
			        items.append("\"paymentFlag\":0,");
			    }

                if (items.length() > 0 && items.lastIndexOf(",") == items.length() -1) {
                    items.deleteCharAt(items.length() -1);
                }

			    items.append("},");
			}

			if (items.length() > 0 && items.lastIndexOf(",") == items.length() -1) {
			    items.deleteCharAt(items.length() -1);
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

            stmt = conn.createStatement();

			rs = stmt.executeQuery(String.format("SELECT * FROM(SELECT a.`invoice_no`,a.`type`,a.`amount`,a.`opt1`,a.`opt2`,b.`note`,b.`date`,c.`user_id` FROM `tb_checkout_items_%s` AS a LEFT JOIN tb_invoice_%s AS b ON a.`invoice_no`=b.`invoice_no` LEFT JOIN tb_user AS c ON b.`emp_id`=c.`sid`)AS abc WHERE invoice_no='%d'", storeId, storeId, invoiceNo));

			checkout = new StringBuffer();

			while(rs.next()){
			    checkout.append(String.format("{\"type\":%d,\"amount\":%s,\"opt1\":\"%s\",\"opt2\":\"%s\",\"note\":\"%s\",\"date\":\"%s\",\"user_id\":\"%s\"},",
			    rs.getInt("type"),
			    (rs.getString("amount") != null)? rs.getString("amount") : "0.00",
			    (rs.getString("opt1") != null)? rs.getString("opt1") : "",
			    (rs.getString("opt2") != null)? rs.getString("opt2") : "",
			    (rs.getString("note") != null)? rs.getString("note") : "",
			    (rs.getString("date") != null)? sdf.format(rs.getTimestamp("date")) : "",
			    (rs.getString("user_id") != null)? rs.getString("user_id") : ""
			    ));
			    
			}

			if (checkout.length() > 0 && checkout.lastIndexOf(",") == checkout.length() -1) {
			    checkout.deleteCharAt(checkout.length() -1);
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

			stmt = conn.createStatement();

            sb.append("{");
			rs = stmt.executeQuery(String.format("SELECT * FROM `tb_invoice_%s` WHERE `invoice_no`='%d'", storeId, invoiceNo));
			if(rs.next()){
			    customerSid = rs.getInt("customer");

			    sb.append(String.format("\"invoiceNo\":%d,\"amount\":%s,\"tax\":%s,\"date\":\"%s\",\"customer\":%d,\"emp_id\":%d,\"preInvoiceNo\":%d,\"status\":%d,\"note\":\"%s\",",
			    rs.getInt("invoice_no"),
			    (rs.getString("amount") != null)? rs.getString("amount") : "0",
			    (rs.getString("tax") != null)? rs.getString("tax") : "0",
			    sdf.format(rs.getDate("date")),
			    rs.getInt("customer"),
			    rs.getInt("emp_id"),
			    rs.getInt("pre_invoice_no"),
			    rs.getInt("status"),
			    (rs.getString("note") != null)? rs.getString("note") : ""
			    ));
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

            if (customerSid > 0) {

                stmt = conn.createStatement();

                rs = stmt.executeQuery(String.format("SELECT `sid`,`customer_id`,`first_name`,`middle_name`,`last_name`,`address1`,`address2`,`city`,`state`,`zipcode` FROM `tb_customer_%s` WHERE `sid`='%d'", storeId, customerSid));
                customer = new StringBuffer();

                if (rs.next()) {
                    customer.append("{");
                    customer.append(String.format("\"sid\":%d,", rs.getInt("sid")));
                    if (rs.getString("customer_id") != null) customer.append(String.format("\"customerId\":\"%s\",", rs.getString("customer_id")));
                    if (rs.getString("first_name") != null) customer.append(String.format("\"firstName\":\"%s\",", rs.getString("first_name")));
                    if (rs.getString("middle_name") != null) customer.append(String.format("\"middleName\":\"%s\",", rs.getString("middle_name")));
                    if (rs.getString("last_name") != null) customer.append(String.format("\"lastName\":\"%s\",", rs.getString("last_name")));
                    if (rs.getString("address1") != null) customer.append(String.format("\"address1\":\"%s\",", rs.getString("address1")));
                    if (rs.getString("address2") != null) customer.append(String.format("\"address2\":\"%s\",", rs.getString("address2")));
                    if (rs.getString("city") != null) customer.append(String.format("\"city\":\"%s\",", rs.getString("city")));
                    if (rs.getString("state") != null) customer.append(String.format("\"state\":\"%s\",", rs.getString("state")));
                    if (rs.getString("zipcode") != null) customer.append(String.format("\"zipcode\":\"%s\",", rs.getString("zipcode")));

                    if (customer.length() > 0 && customer.lastIndexOf(",") == customer.length() -1 ) customer.deleteCharAt(customer.length() -1);
                    customer.append("}");
                }
            }

			//sb = new StringBuffer();
			sb.append(String.format("\"items\":[%s],\"checkout\":[%s],\"customer\":%s", items.toString(), checkout.toString(), (customer != null && customer.length() > 0)?customer.toString(): "null"));

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