package com.boas.posone.db.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Vector;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import com.boas.posone.db.dto.CustomerInfoDto;

public class CustomerInfoDao {
	private static CustomerInfoDao instance;
	
	public static CustomerInfoDao getInstance() {
		if (instance == null) instance = new CustomerInfoDao();
		return instance;
	}
	
	public Vector<CustomerInfoDto> getCustomerList(String sessionUserInfo, int pageNo, int countPerPage) {
		Vector<CustomerInfoDto> list = new Vector<CustomerInfoDto>();
		
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		
		if (pageNo < 1) pageNo = 1;
		if (countPerPage < 10) countPerPage = 10;
		
		int storeNo = 0;		
		
		storeNo = StoreInfoDao.getInstance().getStoreNoBySessionUserData(sessionUserInfo);
		
		if (storeNo == 0) return null;
		
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			stmt = conn.createStatement();
			
			rs = stmt.executeQuery(String.format("SELECT * FROM `customer_info` WHERE `store_no`='%d' LIMIT %d,%d", storeNo, (pageNo-1)*countPerPage, countPerPage));
			
			while (rs.next()) {
				list.add(new CustomerInfoDto(
					rs.getInt("account_no"),
					rs.getInt("store_no"),
					rs.getString("customer_name"),
					rs.getString("address"),
					rs.getString("phone"),
					rs.getString("company")
				));
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
		
		return list;
	}
	
	public CustomerInfoDto getCustomerInfo(String sessionUserInfo, int accountNo) {
		CustomerInfoDto obj = null;
		
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		
		int storeNo = 0;		
		
		if (accountNo == 0) return null;
		
		storeNo = StoreInfoDao.getInstance().getStoreNoBySessionUserData(sessionUserInfo);
		
		if (storeNo == 0) return null;
		
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			stmt = conn.createStatement();
			
			rs = stmt.executeQuery(String.format("SELECT * FROM `customer_info` WHERE `store_no`='%d' AND `account_no`='%d'", storeNo, accountNo));
			
			while (rs.next()) {
				obj = new CustomerInfoDto(
					rs.getInt("account_no"),
					rs.getInt("store_no"),
					rs.getString("customer_name"),
					rs.getString("address"),
					rs.getString("phone"),
					rs.getString("company")
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
