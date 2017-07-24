package com.boas.posone.db.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;

public class StoreCouponTbDao {
	public String getStoreCouponList(int userNo) {
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer resultText = null;
		int storeNo = 0;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			
			stmt = conn.createStatement();
			rs = stmt.executeQuery(String.format("SELECT `store_no` FROM `user_info` WHERE `user_no`='%d'", userNo));
			
			if (rs.next()) {
				storeNo = rs.getInt("store_no");
			}
			rs.close();
			stmt.close();
			
			if (storeNo == 0) {
				try {
					if (conn != null && !conn.isClosed()) {
						conn.close();
					}
				} catch (Exception e2) {
					
				}
				
				return null;
			}
			
			stmt = conn.createStatement();
			rs = stmt.executeQuery(String.format("SELECT * FROM `legato_store_coupon_tb` WHERE `store_no`='%d'", storeNo));
			
			resultText = new StringBuffer();

			resultText.append("{\"data\":[");
			while(rs.next()) {
				resultText.append(
					String.format(
						"{\"no\":%d,\"store_no\":%d,\"coupon_id\":%s,\"func\":%d,\"value\":%f,\"expiration_date\":%s,\"used\":%d},",
						rs.getInt("no"),
						rs.getInt("store_no"),
						((rs.getString("coupon_id") != null)? String.format("\"%s\"",rs.getString("coupon_id")) : "null" ),
						rs.getInt("func"),
						rs.getDouble("value"),
						((rs.getTimestamp("expiration_date") != null)? String.format("\"%s\"",sdf.format(rs.getTimestamp("expiration_date"))) : "null" ),
						rs.getInt("used")
					)
				);
			}			
			if (resultText.lastIndexOf(",") == resultText.length() - 1) resultText.deleteCharAt(resultText.length() -1);
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
	
	public String getStoreCouponById(int userNo, String couponId) {
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer resultText = null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		int storeNo = 0;
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			stmt = conn.createStatement();
			rs = stmt.executeQuery(String.format("SELECT `store_no` FROM `user_info` WHERE `user_no`='%d'", userNo));
			
			if (rs.next()) {
				storeNo = rs.getInt("store_no");
			}
			rs.close();
			stmt.close();
			
			if (storeNo == 0) {
				try {
					if (conn != null && !conn.isClosed()) {
						conn.close();
					}
				} catch (Exception e2) {
					
				}
				
				return null;
			}
			
			stmt = conn.createStatement();
			rs = stmt.executeQuery(String.format("SELECT * FROM `legato_store_coupon_tb` WHERE `coupon_id`='%s' AND `store_no`='%d'", couponId, storeNo));
			
			resultText = new StringBuffer();
			
			resultText.append("{\"data\":");
			if (rs.next()) {
				resultText.append(
					String.format(
						"{\"no\":%d,\"store_no\":%d,\"coupon_id\":%s,\"func\":%d,\"value\":%f,\"expiration_date\":%s,\"used\":%d}",
						rs.getInt("no"),
						rs.getInt("store_no"),
						((rs.getString("coupon_id") != null)? String.format("\"%s\"",rs.getString("coupon_id")) : "null" ),
						rs.getInt("func"),
						rs.getDouble("value"),
						((rs.getTimestamp("expiration_date") != null)? String.format("\"%s\"",sdf.format(rs.getTimestamp("expiration_date"))) : "null" ),
						rs.getInt("used")
					)
				);
			} else {
				resultText.append("null");
			}
			resultText.append("}");
			
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
