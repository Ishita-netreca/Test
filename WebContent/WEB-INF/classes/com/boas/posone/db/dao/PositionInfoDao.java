package com.boas.posone.db.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Vector;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import com.boas.posone.db.dto.PositionInfoDto;

public class PositionInfoDao {
	private static PositionInfoDao instance;
	public static PositionInfoDao getInstance() {
		if (instance == null) instance = new PositionInfoDao();
		return instance;
	}
	
	public Vector<PositionInfoDto> getAllPositionList() {
		Vector<PositionInfoDto> list = new Vector<PositionInfoDto>();
		
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
			
			rs = stmt.executeQuery(String.format("SELECT * FROM `position_info`"));
			
			while(rs.next()) {
				list.add(new PositionInfoDto(
					rs.getInt("position_no"),
					rs.getString("position_name")
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
