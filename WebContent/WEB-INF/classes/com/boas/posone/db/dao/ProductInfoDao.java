package com.boas.posone.db.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Vector;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import com.boas.posone.db.dto.ProductInfoDto;
import com.boas.posone.db.vo.ProductInfoCategoryInventoryVo;
import com.boas.posone.db.vo.ProductInfoPromotionVo;

public class ProductInfoDao {
	private static ProductInfoDao instance;
	public static ProductInfoDao getInstance() {
		if (instance == null) instance = new ProductInfoDao();
		return instance;
	}
	
	public Vector<ProductInfoCategoryInventoryVo> getProductList(String sessionUserInfo, int pageNo, int countPerPage) {
		Vector<ProductInfoCategoryInventoryVo> list = new Vector<ProductInfoCategoryInventoryVo>();
		
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		
		int storeNo = 0;
		
		if (sessionUserInfo == null) return null;
		
		if (pageNo < 1) pageNo = 1;
		if (countPerPage < 1) countPerPage = 10;
		
		storeNo = StoreInfoDao.getInstance().getStoreNoBySessionUserData(sessionUserInfo);
		
		if (storeNo == 0) return null;
		
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			stmt = conn.createStatement();
			
			rs = stmt.executeQuery(String.format("SELECT `abc`.*, `d`.`qty` FROM (SELECT `ab`.*, `c`.`sub_category` FROM (SELECT `a`.*, `b`.`category` FROM (SELECT `item_number`,`category_no`,`sub_category_no`,`description`,`serial_number`,`srp` from `product_info`) AS `a` LEFT JOIN `product_category_info` AS `b` ON `a`.`category_no`=`b`.`no`) as `ab` left join `product_sub_category_info` as `c` on `ab`.`sub_category_no`=`c`.`no`) as `abc` left join (SELECT * FROM `store_inventory_info` WHERE `store_no`='%d') as `d` on `abc`.`item_number`=`d`.`product_item_number` LIMIT %d,%d", storeNo, (pageNo-1), countPerPage));
			
			while(rs.next()) {
				list.add(
					new ProductInfoCategoryInventoryVo(
						rs.getInt("item_number"),
						rs.getInt("category_no"),
						rs.getInt("sub_category_no"),
						rs.getString("description"),
						rs.getString("serial_number"),
						rs.getFloat("srp"),
						rs.getString("category"),
						rs.getString("sub_category"),
						rs.getInt("qty")
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
	
	public ProductInfoDto getProductInfo(int itemNumber) {
		ProductInfoDto obj = null;
		
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
			
			rs = stmt.executeQuery(String.format("SELECT * FROM `product_info` WHERE `item_number`='%d'", itemNumber));
			
			if(rs.next()) {
				obj = new ProductInfoDto(
					rs.getInt("item_number"),
					rs.getInt("category_no"),
					rs.getInt("sub_category_no"),
					rs.getString("description"),
					rs.getString("serial_number"),
					rs.getFloat("srp"),
					rs.getString("manufacturer"),
					rs.getString("spec"),
					rs.getString("img_path")
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
	
	public ProductInfoCategoryInventoryVo getSelectedItem(int itemNumber) {
		
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		
		ProductInfoCategoryInventoryVo obj = null;
		
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			stmt = conn.createStatement();
			
			rs = stmt.executeQuery(String.format("SELECT `abc`.* FROM (SELECT `ab`.*, `c`.`sub_category` FROM (SELECT `a`.*, `b`.`category` FROM (SELECT `item_number`,`category_no`,`sub_category_no`,`description`,`serial_number`,`srp` from `product_info` WHERE `item_number`='%d') AS `a` LEFT JOIN `product_category_info` AS `b` ON `a`.`category_no`=`b`.`no`) as `ab` left join `product_sub_category_info` as `c` on `ab`.`sub_category_no`=`c`.`no`) as `abc`", itemNumber));
			
			if(rs.next()) {
				obj = new ProductInfoCategoryInventoryVo(
					rs.getInt("item_number"),
					rs.getInt("category_no"),
					rs.getInt("sub_category_no"),
					rs.getString("description"),
					rs.getString("serial_number"),
					rs.getFloat("srp"),
					rs.getString("category"),
					rs.getString("sub_category"),
					1
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
	
	public Vector<ProductInfoCategoryInventoryVo> getPhoneList(String sessionUserInfo, int pageNo, int countPerPage) {
		Vector<ProductInfoCategoryInventoryVo> list = new Vector<ProductInfoCategoryInventoryVo>();
		
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		
		int storeNo = 0;
		
		if (sessionUserInfo == null) return null;
		
		if (pageNo < 1) pageNo = 1;
		if (countPerPage < 1) countPerPage = 10;
		
		storeNo = StoreInfoDao.getInstance().getStoreNoBySessionUserData(sessionUserInfo);
		
		if (storeNo == 0) return null;
		
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			stmt = conn.createStatement();
			
			rs = stmt.executeQuery(String.format("SELECT `abc`.*, `d`.`qty` FROM (SELECT `ab`.*, `c`.`sub_category` FROM (SELECT `a`.*, `b`.`category` FROM (SELECT `item_number`,`category_no`,`sub_category_no`,`description`,`serial_number`,`srp` from `product_info` WHERE `category_no`='1' AND `sub_category_no`='1') AS `a` LEFT JOIN `product_category_info` AS `b` ON `a`.`category_no`=`b`.`no`) as `ab` left join `product_sub_category_info` as `c` on `ab`.`sub_category_no`=`c`.`no`) as `abc` left join (SELECT * FROM `store_inventory_info` WHERE `store_no`='%d') as `d` on `abc`.`item_number`=`d`.`product_item_number` LIMIT %d,%d", storeNo, (pageNo-1), countPerPage));
			
			while(rs.next()) {
				list.add(
					new ProductInfoCategoryInventoryVo(
						rs.getInt("item_number"),
						rs.getInt("category_no"),
						rs.getInt("sub_category_no"),
						rs.getString("description"),
						rs.getString("serial_number"),
						rs.getFloat("srp"),
						rs.getString("category"),
						rs.getString("sub_category"),
						rs.getInt("qty")
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
	
	public ProductInfoPromotionVo getSelectedItemByItemNumber(int itemNumber) {
		ProductInfoPromotionVo obj = null;
		
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
			
			rs = stmt.executeQuery(String.format("SELECT `a`.*,`b`.`promotion_no`,`b`.`start_date`,`b`.`end_date`,`b`.`promotion_type`,`b`.`promotion_value` FROM (SELECT `item_number`,`description`,`serial_number`,`srp` FROM `product_info` WHERE `item_number`='%d') as `a` LEFT JOIN (SELECT `promotion_no`,`product_item_number`,DATE_FORMAT(`promotion_start_date`,'%%Y-%%m-%%d') AS `start_date`,DATE_FORMAT(`promotion_end_date`,'%%Y-%%m-%%d') AS `end_date`,`promotion_type`,`promotion_value` FROM `promotion_info` WHERE `promotion_type`='1') as `b` ON `a`.`item_number`=`b`.`product_item_number`", itemNumber));
			
			if(rs.next()) {
				obj = new ProductInfoPromotionVo(
					rs.getInt("item_number"),
					rs.getString("description"),
					rs.getString("serial_number"),
					rs.getFloat("srp"),
					rs.getInt("promotion_no"),
					rs.getString("start_date"),
					rs.getString("end_date"),
					rs.getInt("promotion_type"),
					rs.getFloat("promotion_value"),
					1
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
