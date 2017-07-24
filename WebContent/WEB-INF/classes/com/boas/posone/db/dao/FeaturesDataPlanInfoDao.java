package com.boas.posone.db.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Vector;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import com.boas.posone.db.dto.FeaturesDataPlanInfoDto;

public class FeaturesDataPlanInfoDao {
	private static FeaturesDataPlanInfoDao instance;
	
	public static FeaturesDataPlanInfoDao getInstance() {
		if (instance == null) instance = new FeaturesDataPlanInfoDao();
		return instance;
	}
	
	public Vector<FeaturesDataPlanInfoDto> getList() {
		Vector<FeaturesDataPlanInfoDto> list = new Vector<FeaturesDataPlanInfoDto>();
		
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			stmt = conn.createStatement();
			
			rs = stmt.executeQuery(String.format("SELECT `no`,`plan_code`,`plan_description`,`plan_type`,`mrc` FROM `features_data_plan_info`"));
			
			while(rs.next()) {
				list.add(
					new FeaturesDataPlanInfoDto(
						rs.getInt("no"),
						rs.getString("plan_code"),
						rs.getString("plan_description"),
						rs.getString("plan_type"),
						rs.getFloat("mrc")
					)
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
		
		return list;
	}
	
	public Vector<FeaturesDataPlanInfoDto> getFeaturesDataPlanInfoByPlanCode(String planCode) {
		Vector<FeaturesDataPlanInfoDto> list = new Vector<FeaturesDataPlanInfoDto>();
		
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			stmt = conn.createStatement();

			planCode = planCode.replaceAll(",","','");
			planCode = String.format("'%s'", planCode);
			
			rs = stmt.executeQuery(String.format("SELECT `no`,`plan_code`,`plan_description`,`plan_type`,`mrc` FROM `features_data_plan_info` WHERE `plan_code` IN (%s)", planCode));
			
			while (rs.next()) {
				list.add(new FeaturesDataPlanInfoDto(
					rs.getInt("no"),
					rs.getString("plan_code"),
					rs.getString("plan_description"),
					rs.getString("plan_type"),
					rs.getFloat("mrc")
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
}
