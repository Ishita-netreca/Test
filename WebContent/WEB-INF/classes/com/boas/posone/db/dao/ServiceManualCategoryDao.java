package com.boas.posone.db.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import com.boas.posone.util.UtilMethodClass;

public class ServiceManualCategoryDao {
	
	private UtilMethodClass utilMethodClass = UtilMethodClass.getSingleton();
	
	public String getAllServiceManualCategoryList() {
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer resultText = null;
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery("SELECT * FROM `legato_service_manual_category_tb`");
			resultText = new StringBuffer();
			
			resultText.append("{\"data\":[");
			while (rs.next()) {
				resultText.append(
					String.format(
						"{\"no\":%d,\"category\":%s,\"comment\":%s},",
						rs.getInt("no"),
						((rs.getString("category") != null)? String.format("\"%s\"", utilMethodClass.convertPlainTextToHtmlText(rs.getString("category"))) : "null"),
						((rs.getString("category") != null)? String.format("\"%s\"", utilMethodClass.convertPlainTextToHtmlText(rs.getString("comment"))) : "null")
				));
			}
			if (resultText.lastIndexOf(",") == resultText.length() -1) resultText.deleteCharAt(resultText.length() -1);
			resultText.append("]}");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

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
			
			return null;
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
		
		return resultText.toString();
	}
}
