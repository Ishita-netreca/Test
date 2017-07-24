package com.boas.posone.db.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import com.boas.posone.db.dto.StoreInfoDto;

public class StoreInfoDao {
	private static StoreInfoDao instance;
	public static StoreInfoDao getInstance() {
		if (instance == null) instance = new StoreInfoDao();
		return instance;
	}
	
	public int getStoreNoBySessionUserData(String sessionUserInfo) {
		String arr[] = null;
		int obj = 0;
		int userNo = 0;
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		
		if (sessionUserInfo == null) return 0;
		arr = sessionUserInfo.split("_");
		
		if (arr.length != 3) return 0;
		
		try {
			userNo = Integer.parseInt(arr[0]);
		} catch (Exception e) {
			return 0;
		}

		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			stmt = conn.createStatement();
			rs = stmt.executeQuery(String.format("SELECT `a`.`store_no` FROM `store_info` AS `a` RIGHT JOIN (SELECT `store_no` FROM `user_info` WHERE `user_no`='%d') AS `b` ON `a`.`store_no`=`b`.`store_no`", userNo));
			
			if (rs.next()) {
				obj = rs.getInt("store_no");
			}
			
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
			
			return 0;
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
		
		return obj;
	}
	
	public StoreInfoDto getStoreInfoBySessionUserData(String sessionUserInfo) {
		String arr[] = null;
		StoreInfoDto obj = null;
		int userNo = 0;
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		
		if (sessionUserInfo == null) return null;
		arr = sessionUserInfo.split("_");
		
		if (arr.length != 3) return null;
		
		try {
			userNo = Integer.parseInt(arr[0]);
		} catch (Exception e) {
			return null;
		}
		

		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			stmt = conn.createStatement();
			rs = stmt.executeQuery(String.format("SELECT `a`.* FROM `store_info` AS `a` RIGHT JOIN (SELECT `store_no` FROM `user_info` WHERE `user_no`='%d') AS `b` ON `a`.`store_no`=`b`.`store_no`", userNo));
			
			if (rs.next()) {
				obj = new StoreInfoDto(
					rs.getInt("store_no"),
					rs.getString("store_id"),
					rs.getString("region_code"),
					rs.getString("store_code"),
					rs.getString("store_name"),
					rs.getString("address"),
					rs.getString("phone"),
					rs.getString("fax"),
					rs.getString("manager"),
					rs.getString("manager_phone"),
					rs.getString("message")
				);
			}
			
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
		
		return obj;
	}
}
