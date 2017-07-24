package com.boas.posone.db.dao;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;

public class SalesTbDao {
	
	public String getStoreRank(int userNo) {
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer resultText = null;
		
		String regionCode = null;
		int storeNo = 0;
		int regionRank = 0;
		int companyWideRank = 0;
		
		boolean isExists = false;
		
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			stmt = conn.createStatement();
			rs = stmt.executeQuery(String.format("SELECT `user`.`store_no`,`store`.`region_code` FROM (SELECT `store_no` FROM `user_info` WHERE `user_no`='%d') AS `user` LEFT JOIN (SELECT `store_no`,`region_code` FROM `store_info`) AS `store` ON `user`.`store_no`=`store`.`store_no`", userNo));
		
			if (rs.next()) {
				storeNo = rs.getInt("store_no");
				regionCode = rs.getString("region_code");
			}
			
			rs.close();
			stmt.close();
			
			if (storeNo == 0) {
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
			
			stmt = conn.createStatement();
			rs = stmt.executeQuery(String.format("SELECT `sales`.`store_no`,`sales`.`count` FROM (SELECT `store_no`,count(`store_no`) as `count` FROM `legato_sales_tb` WHERE `type`='1' GROUP BY `store_no` ORDER BY `count` DESC) AS `sales` RIGHT JOIN (SELECT `store_no` FROM `store_info` WHERE `region_code`='%s') as `store` on `sales`.`store_no`=`store`.`store_no`", regionCode));
			
			isExists = false;
			while(rs.next()) {
				regionRank = regionRank + 1;
				if (rs.getInt("store_no") == storeNo) {
					isExists = true;
					break;
				}
			}
			
			rs.close();
			stmt.close();
			
			if (!isExists) regionRank = -1;
			
			stmt = conn.createStatement();
			rs = stmt.executeQuery(String.format("select `store_no`,count(`store_no`) as `count` FROM `legato_sales_tb` WHERE `type`='1' group by `store_no` order BY `count` DESC"));
			
			isExists = false;
			while(rs.next()) {
				companyWideRank = companyWideRank + 1;
				if (rs.getInt("store_no") == storeNo) {
					isExists = true;
					break;
				}
			}
			
			if (!isExists) companyWideRank = -1;
			
			rs.close();
			stmt.close();
			
			resultText = new StringBuffer();
			
			resultText.append(
				String.format(
					"{\"data\":{\"region_code\":%s,\"region_rank\":%d,\"company_wide_rank\":%d}}",
					((regionCode != null)? String.format("\"%s\"", regionCode) : "null"),
					regionRank,
					companyWideRank
			));
			
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
	
	public String getAchievementRate(int userNo) {
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer resultText = null;
		
		int storeNo = 0;
		
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			stmt = conn.createStatement();
			rs = stmt.executeQuery(String.format("SELECT `user`.`store_no` FROM (SELECT `store_no` FROM `user_info` WHERE `user_no`='%d') AS `user` LEFT JOIN (SELECT `store_no`,`region_code` FROM `store_info`) AS `store` ON `user`.`store_no`=`store`.`store_no`", userNo));
		
			if (rs.next()) {
				storeNo = rs.getInt("store_no");
			}
			
			rs.close();
			stmt.close();
			
			if (storeNo == 0) {
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
			
			resultText = new StringBuffer();
			
			stmt = conn.createStatement();
			rs = stmt.executeQuery(String.format("SELECT * from `legato_store_goal_tb` WHERE `store_no`='%d' ORDER BY `year`, `month` DESC LIMIT 0,1", storeNo));
			
			resultText.append("{\"data\":{");
			if (rs.next()){
				resultText.append(
					String.format("\"box_sales_goal\":%d,\"accessory_goal\":%d,\"_50dollar_mrc_goal\":%d,", rs.getInt("box_sales_goal"), rs.getInt("accessory_goal"), rs.getInt("50dollar_mrc_goal"))	
				);
			}
			
			rs.close();
			stmt.close();
			
			stmt = conn.createStatement();
			rs = stmt.executeQuery(String.format("SELECT * FROM (SELECT count(*) as `count1` from `legato_sales_tb` where `type`='1' and `store_no`='%d') as `type1`, (SELECT COUNT(*) AS `count2` FROM `legato_sales_tb` WHERE `type`='2' AND `store_no`='%d') AS `type2`, (SELECT COUNT(`tb1`.`sales_no`) AS `count3` FROM (SELECT `sales_no`,`mrc` FROM `legato_sales_tb` WHERE `type`='1' and `store_no`='%d') AS `tb1` LEFT JOIN (SELECT `no` FROM `legato_mrc_tb` WHERE `price` > 49.99) as `tb2` on `tb1`.`MRC`=`tb2`.`no` WHERE `tb2`.`no` IS NOT NULL) AS `type3`", storeNo, storeNo, storeNo));
			
			if (rs.next()){
				resultText.append(
					String.format("\"box_sales_value\":%d,\"accessory_value\":%d,\"_50dollar_mrc_value\":%d", rs.getInt("count1"), rs.getInt("count2"), rs.getInt("count3"))	
				);
			}
			
			rs.close();
			stmt.close();
			
			resultText.append("}}");
			
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
