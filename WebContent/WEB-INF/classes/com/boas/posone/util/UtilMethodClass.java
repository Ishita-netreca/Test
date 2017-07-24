package com.boas.posone.util;

import java.io.*;
import java.net.URL;
import org.json.simple.*;
import org.json.simple.parser.*;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;
import java.sql.*;
import java.util.Iterator;
import java.util.Set;

public class UtilMethodClass {
	private static UtilMethodClass singleton;
	
	private String imeiInfoURL = "http://www.imei.info/?imei=";
	
	public static UtilMethodClass getSingleton() {
		if (singleton == null) singleton = new UtilMethodClass();
		return singleton;
	}
	
	public String convertPlainTextToHtmlText(String str) {
		return str.replaceAll("\r\n", "<br/>").replaceAll("\"", "\\\\\\\\\\\\\"");
	}

	public Object getSalesPermissionData(String storeId, String userId) {
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer();
		JSONObject obj = null;

		if (storeId == null || userId == null) {
			return null;
		}

		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			rs = stmt.executeQuery(String.format("SELECT `a`.*,`b`.`user_type` FROM (SELECT * FROM `tb_user_permission_%s` WHERE `user_id`='%s') AS `a` LEFT JOIN (SELECT `user_id`,`user_type` FROM `tb_user` WHERE `user_id`='%s') AS `b` ON `a`.`user_id`=`b`.`user_id`", storeId, userId, userId));

			if(rs.next()) {
				sb.append(rs.getString("sales_permission"));
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

			obj = (JSONObject)(new JSONParser()).parse(sb.toString());
			sb.delete(0, sb.length());

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

		return obj;
	}

	public Object getPermissionData(String storeId, String userId) {
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer();
		JSONObject obj = null;

		if (storeId == null || userId == null) {
			return null;
		}

		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			rs = stmt.executeQuery(String.format("SELECT `a`.*,`b`.`user_type` FROM (SELECT * FROM `tb_user_permission_%s` WHERE `user_id`='%s') AS `a` LEFT JOIN (SELECT `user_id`,`user_type` FROM `tb_user` WHERE `user_id`='%s') AS `b` ON `a`.`user_id`=`b`.`user_id`", storeId, userId, userId));

			if(rs.next()) {
				if (rs.getInt("user_type") < 4) {
					sb.append(rs.getString("backend_permission"));
				} else {
					sb.append(rs.getString("sales_permission"));
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
			try {
				if (conn != null && !conn.isClosed()) {
					conn.close();
				}
			} catch (Exception e2) {

			}

			obj = (JSONObject)(new JSONParser()).parse(sb.toString());
			sb.delete(0, sb.length());

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


		return obj;
	}


	public Object getPermissionData(String ownerId, String storeId, String userId, boolean salesFlag) {
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer sb = new StringBuffer();
		JSONObject obj = null;

		if (storeId == ownerId || storeId == null || userId == null) {
			return null;
		}

		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			sb.append(String.format("SELECT `a`.`user_id`,`a`.`group_sid`,`a`.`group_permission_flag`,`b`.`user_sales_permission`,`b`.`user_backend_permission`,`c`.`group_sales_permission`,`c`.`group_backend_permission` FROM ("));
			sb.append(String.format("SELECT `user_id`,`group_sid`,`group_permission_flag` FROM `tb_user` WHERE `user_id`='%s'", userId));
			sb.append(String.format(") AS `a`"));
			sb.append(String.format("LEFT JOIN (SELECT `user_id`,`sales_permission` AS `user_sales_permission`,`backend_permission` AS `user_backend_permission` FROM `tb_user_permission_%s`) AS `b` ON `a`.`user_id`=`b`.`user_id`", storeId));
			sb.append(String.format("LEFT JOIN (SELECT `sid`,`sales_permission` AS `group_sales_permission`,`backend_permission` AS `group_backend_permission` FROM `tb_permission_group_%s`) AS `c` ON `a`.`group_sid`=`c`.`sid`;", ownerId));

			rs = stmt.executeQuery(sb.toString());

			sb.delete(0, sb.length());

			if(rs.next()) {
				if (salesFlag) {
					switch (rs.getInt("group_permission_flag")) {
						case 1:
							if (rs.getString("group_sales_permission") != null) {
								sb.append(rs.getString("group_sales_permission"));
							} else {
								sb.append(rs.getString("user_sales_permission"));
							}
							break;
						default:
							sb.append(rs.getString("user_sales_permission"));
							break;
					}
				} else {
					switch (rs.getInt("group_permission_flag")) {
						case 1:
							if (rs.getString("group_backend_permission") != null) {
								sb.append(rs.getString("group_backend_permission"));
							} else {
								sb.append(rs.getString("user_backend_permission"));
							}
							break;
						default:
							sb.append(rs.getString("user_backend_permission"));
							break;
					}
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
			try {
				if (conn != null && !conn.isClosed()) {
					conn.close();
				}
			} catch (Exception e2) {

			}

			obj = (JSONObject)(new JSONParser()).parse(sb.toString());
			sb.delete(0, sb.length());

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


		return obj;
	}

	public Object getPermissionDataByName(JSONObject parent, String name) {
		if (parent == null || name == null) return null;
		Set<String> keys = parent.keySet();
		Iterator<String> iterator = keys.iterator();
		while(iterator.hasNext()) {
			String key = iterator.next();
			if (key.equals(name)) {
				return (JSONObject)parent.get(key);
			} else if (key.equals("children")) {
				return this.getPermissionDataByName((JSONObject)parent.get("children"), name);
			}
		}

		return null;
	}
	
	public String getIMEIInfo(String imei) {
		int idx, len, closingIdx, stackCount = 0;
		char ch;
		String str, nodeName;
		StringBuffer pageContent, returnBuffer;
		String urlStr = String.format("%s%s",this.imeiInfoURL, imei);
		boolean captureStarted = false;
		try {
			URL url = new URL(urlStr);
			
			BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream()));
			
			pageContent = new StringBuffer();
			
			while((str = reader.readLine()) != null) {
				pageContent.append(str);
			}
			
			returnBuffer = new StringBuffer();
			
			for (idx = 0, len = pageContent.length(); idx < len; idx++) {
				ch = pageContent.charAt(idx);
				if (ch == '<') {
					closingIdx = pageContent.indexOf(">", idx);
					str = pageContent.substring(idx, closingIdx+1);
					if (str.charAt(1) == '/') {
						if (captureStarted) {
							if (str.indexOf(" ") > -1) {
								nodeName = str.substring(1, str.indexOf(" ")).toUpperCase();
							} else {
								nodeName = str.substring(1, closingIdx).toUpperCase();
							}	
							
							if (nodeName.equals("DIV")) {
								if (stackCount == 0) {
									break;
								} else {
									stackCount--;									
								}
							}
						}
					} else {
						if (str.indexOf("div") == 1) System.out.println(str);
						if (str.indexOf(" ") > -1) {
							nodeName = str.substring(1, str.indexOf(" ")).toUpperCase();
						} else {
							idx = closingIdx;
							continue;
						}					
						if (!captureStarted) {							
							if (nodeName.equals("DIV")) {
								if (str.indexOf("id=\"dane\"") > -1) {
									captureStarted = true;
									stackCount = 0;
								} else {
									idx = closingIdx;
									continue;
								}
							} else {
								idx = closingIdx;
								continue;
							}
						} else {
							if (nodeName.equals("DIV")) {
								stackCount++;
							}
						}
					}
				}
				
				if (captureStarted) {
					returnBuffer.append(ch);
				}
			}
			
			return returnBuffer.toString();
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
