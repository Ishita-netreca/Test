package com.boas.posone.db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Vector;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import com.boas.posone.db.dto.PromotionInfoDto;
import com.boas.posone.db.vo.PromotionInfoListVo;

public class PromotionInfoDao {
	
	private static PromotionInfoDao instance;
	
	public static PromotionInfoDao getInstance() {
		if (instance == null) instance = new PromotionInfoDao();
		return instance;
	}
	
	public Vector<PromotionInfoListVo> getPromotionList(int pageNo, int countPerPage) {
		Vector<PromotionInfoListVo> list = new Vector<PromotionInfoListVo>();
		
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
			
			rs = stmt.executeQuery(String.format("SELECT `a`.`promotion_no`,DATE_FORMAT(`a`.`promotion_start_date`,'%%m-%%d') AS `start_date`,DATE_FORMAT(`a`.`promotion_end_date`,'%%m-%%d') AS `end_date`,`a`.`promotion_type`,`promotion_value`,`b`.* FROM (SELECT * FROM `promotion_info` LIMIT %d,%d) AS `a` LEFT JOIN (SELECT `item_number`,`description`,`srp`,`spec`,`img_path` FROM `product_info`) AS `b` ON `a`.`product_item_number`=`b`.`item_number`", (pageNo-1), countPerPage));
			
			while(rs.next()) {
				list.add(
					new PromotionInfoListVo(
						rs.getInt("promotion_no"),
						rs.getString("start_date"),
						rs.getString("end_date"),
						rs.getInt("promotion_type"),
						rs.getFloat("promotion_value"),
						rs.getInt("item_number"),
						rs.getString("description"),
						rs.getFloat("srp"),
						rs.getString("spec"),
						rs.getString("img_path")
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
	
	public PromotionInfoDto getPromotionInfoByPromotionNo(int promotionNo) {
		PromotionInfoDto obj = null;
		
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
			
			rs = stmt.executeQuery(String.format("SELECT `promotion_no`,`product_item_number`,DATE_FORMAT(`promotion_start_date`,'%%Y-%%m-%%d') AS `start_date`,DATE_FORMAT(`promotion_end_date`,'%%Y-%%m-%%d') AS `end_date`,`promotion_type`,`promotion_value` FROM `promotion_info` WHERE `promotion_no`='%d'", promotionNo));
			
			if(rs.next()) {
				obj = new PromotionInfoDto(
					rs.getInt("promotion_no"),
					rs.getInt("product_item_number"),
					rs.getString("start_date"),
					rs.getString("end_date"),
					rs.getInt("promotion_type"),
					rs.getFloat("promotion_value")
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
	
	public Vector<PromotionInfoDto> getPromotionInfoByItemNumber(int itemNumber) {
		Vector<PromotionInfoDto> list = new Vector<PromotionInfoDto>();
		
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
			
			rs = stmt.executeQuery(String.format("SELECT `promotion_no`,`product_item_number`,DATE_FORMAT(`promotion_start_date`,'%%Y-%%m-%%d') AS `start_date`,DATE_FORMAT(`promotion_end_date`,'%%Y-%%m-%%d') AS `end_date`,`promotion_type`,`promotion_value` FROM `promotion_info` WHERE `product_item_number`='%d'", itemNumber));
			
			while(rs.next()) {
				list.add(
					new PromotionInfoDto(
						rs.getInt("promotion_no"),
						rs.getInt("product_item_number"),
						rs.getString("start_date"),
						rs.getString("end_date"),
						rs.getInt("promotion_type"),
						rs.getFloat("promotion_value")
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
	
	public int saveNewPromotionData(PromotionInfoDto obj) {

		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		PreparedStatement pstmt = null;
		
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			pstmt = conn.prepareStatement("INSERT INTO `promotion_info`(`product_item_number`,`promotion_start_date`,`promotion_end_date`,`promotion_type`,`promotion_value`) VALUES(?,?,?,?,?)");
			pstmt.setInt(1, obj.getProductItemNumber());
			pstmt.setString(2, obj.getStartDate());		
			pstmt.setString(3, obj.getEndDate());			
			pstmt.setInt(4, obj.getPromotionType());		
			pstmt.setFloat(5, obj.getPromotionValue());
						
			pstmt.execute();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

			try {
				if (pstmt != null && !pstmt.isClosed()) {
					pstmt.close();
				}
			} catch (Exception e2) {
				
			}
			try {
				if (conn != null && !conn.isClosed()) {
					conn.close();
				}
			} catch (Exception e2) {
				
			}
			
			return -1;
		}
		
		try {
			if (pstmt != null && !pstmt.isClosed()) {
				pstmt.close();
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
}
