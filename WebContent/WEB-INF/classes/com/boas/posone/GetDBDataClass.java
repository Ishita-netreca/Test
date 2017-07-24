package com.boas.posone;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Vector;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;

import com.boas.posone.db.dao.*;
import com.boas.posone.db.dto.IssueTbDto;
import com.boas.posone.db.vo.IssueTrackingVo;
import com.boas.posone.db.vo.SalesTbStaffActRankVo;

public class GetDBDataClass {
	private static GetDBDataClass singleton;

	private SalesTbDao salesTbDao = new SalesTbDao();
	private ServiceManualCategoryDao serviceManualCategoryDao = new ServiceManualCategoryDao();
	private StoreCouponTbDao storeCouponTbDao = new StoreCouponTbDao();
	
	public static GetDBDataClass getSingleton() {
		if (singleton == null) singleton = new GetDBDataClass();
		return singleton;
	}
	/*
	public String sample() {
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
	*/
	
	public String getAchievementRate(int userNo) {
		return this.salesTbDao.getAchievementRate(userNo);
	}
	
	public String getAllServiceManualCategoryList() {
		return this.serviceManualCategoryDao.getAllServiceManualCategoryList();
	}
	
	public String getIssueAnswerList(int issueNo) {
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
			rs = stmt.executeQuery(String.format("SELECT `answer`.*, `user`.`user_name` FROM (SELECT `a`.*,`c`.`count` FROM `legato_issue_answer_tb` AS `a` LEFT JOIN (SELECT `issue_answer_no`,COUNT(`issue_answer_no`) AS `count` FROM `legato_issue_ans_comment_tb` GROUP BY `issue_answer_no`) AS `c` ON `a`.`no`=`c`.`issue_answer_no`) AS `answer` LEFT JOIN (SELECT `user_no`,`user_name` FROM `user_info`) AS `user` ON `answer`.`user_no`=`user`.`user_no` WHERE `issue_no`='%d'", issueNo));
			
			resultText = new StringBuffer();
			
			resultText.append("{\"data\":[");
			while(rs.next()) {
				resultText.append(
					String.format(
						"{\"no\":%d,\"issue_no\":%d,\"user_no\":%d,\"comment_count\":%d,\"user_name\":%s,\"datetime\":%s,\"title\":%s,\"content\":%s},",
						rs.getInt("no"),rs.getInt("issue_no"),rs.getInt("user_no"),rs.getInt("count"),
						((rs.getString("user_name") != null)? String.format("\"%s\"", this.convertPlainTextToHtmlText(rs.getString("user_name"))) : "null"),
						((rs.getString("datetime") != null)? String.format("\"%s\"", this.convertPlainTextToHtmlText(rs.getString("datetime"))) : "null"),
						((rs.getString("title") != null)? String.format("\"%s\"", this.convertPlainTextToHtmlText(rs.getString("title"))) : "null"),
						((rs.getString("content") != null)? String.format("\"%s\"", this.convertPlainTextToHtmlText(rs.getString("content"))) : "null")
					)
				);
			}
			if (resultText.lastIndexOf(",") == resultText.length() -1) resultText.deleteCharAt(resultText.length()-1);
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
	
	public String getIssueTrackingList(int userNo, int pageNo, int countPerPage) {
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer resultText = null;
		
		int storeNo = 0;
		int maxPageNo = 0;
		
		Vector<IssueTrackingVo> list = new Vector<IssueTrackingVo>();
		
		HashMap<Integer, String> categoryList = new HashMap<Integer, String>();
		HashMap<Integer, String> targetUserList = new HashMap<Integer, String>();
		
		StringBuffer categoryIdxListStr = new StringBuffer();
		StringBuffer targetUserIdxListStr = new StringBuffer();
		
		IssueTrackingVo obj = null;
		
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
				conn.close();
				return "{\"error\":-2}";
			}
			
			stmt = conn.createStatement();
			rs = stmt.executeQuery(String.format("SELECT `issue`.`no`,`issue`.`status`,`issue`.`category_no`,`issue`.`target`,`issue`.`priority`,`issue`.`last_updated_date`,`issue`.`title`,`issue`.`content`,`issue`.`ans_count`,`user`.`user_no`, `user`.`user_name` FROM (SELECT * FROM `legato_issue_tb` as `tb_a` LEFT JOIN (select `issue_no`, count(`issue_no`) as `ans_count` from `legato_issue_answer_tb` group by `issue_no`) as `tb_b` ON `tb_a`.`no` = `tb_b`.`issue_no`WHERE `store_no`='%d') as `issue` LEFT JOIN (select `user_no`, `user_name` FROM `user_info`) as `user` on `issue`.`user_no`=`user`.`user_no` order by `last_updated_date` desc limit %d, %d", storeNo, (pageNo-1), countPerPage));
			
			while(rs.next()) {
				list.add(
					new IssueTrackingVo(
						rs.getInt("no"),
						rs.getInt("status"),
						rs.getInt("category_no"),
						rs.getInt("target"),
						rs.getInt("priority"),
						rs.getString("last_updated_date"),
						rs.getString("title"),
						rs.getString("content"),
						rs.getInt("ans_count"),
						rs.getInt("user_no"),
						rs.getString("user_name")
					)
				);
				
				categoryIdxListStr.append(String.format("'%d',", rs.getInt("category_no")));
				targetUserIdxListStr.append(String.format("'%d',", rs.getInt("target")));
			}
			
			rs.close();
			stmt.close();
			
			if (categoryIdxListStr.length() > 0 && categoryIdxListStr.lastIndexOf(",") == categoryIdxListStr.length()-1) categoryIdxListStr.deleteCharAt(categoryIdxListStr.length()-1);
			if (targetUserIdxListStr.length() > 0 && targetUserIdxListStr.lastIndexOf(",") == targetUserIdxListStr.length()-1) targetUserIdxListStr.deleteCharAt(targetUserIdxListStr.length()-1);
			

			stmt = conn.createStatement();
			rs = stmt.executeQuery(String.format("SELECT COUNT(`issue`.`no`) AS `count` FROM (SELECT * FROM `legato_issue_tb` as `tb_a` LEFT JOIN (select `issue_no`, count(`issue_no`) as `ans_count` from `legato_issue_answer_tb` group by `issue_no`) as `tb_b` ON `tb_a`.`no` = `tb_b`.`issue_no`WHERE `store_no`='%d') as `issue` LEFT JOIN (select `user_no`, `user_name` FROM `user_info`) as `user` on `issue`.`user_no`=`user`.`user_no` order by `last_updated_date` desc limit %d, %d", storeNo, (pageNo-1), countPerPage));
			
			if(rs.next()) {
				if (rs.getInt("count") > 0) maxPageNo = (rs.getInt("count") / countPerPage);
				if (rs.getInt("count") % countPerPage > 0) maxPageNo = maxPageNo + 1;
			}
			
			rs.close();
			stmt.close();
			
			if (categoryIdxListStr.length() > 0) {
				stmt = conn.createStatement();
				rs = stmt.executeQuery(String.format("SELECT * FROM `legato_issue_category_tb` WHERE `no` IN (%s)", categoryIdxListStr.toString()));
				
				while(rs.next()) {
					categoryList.put(rs.getInt("no"), rs.getString("category"));
				}
				
				rs.close();
				stmt.close();
			}
			
			if (targetUserIdxListStr.length() > 0) {
				stmt = conn.createStatement();
				rs = stmt.executeQuery(String.format("SELECT `user_no`,`user_name` FROM `user_info` WHERE `user_no` IN (%s)", targetUserIdxListStr.toString()));
				
				while(rs.next()) {
					targetUserList.put(rs.getInt("user_no"), rs.getString("user_name"));
				}
				
				rs.close();
				stmt.close();
			}
			
			resultText = new StringBuffer();
			resultText.append("{\"data\":[");
			
			for (int i = 0; i < list.size(); i++) {
				obj = list.get(i);
		
				obj.category = categoryList.get(obj.categoryNo);
				obj.target = targetUserList.get(obj.targetNo);
				
				if (obj.content.length() > 100) obj.content = obj.content.substring(0, 100) + "...";
				
				resultText.append(
					String.format(
						"{\"no\":%d,\"status\":%d,\"category\":%s,\"target\":%s,\"priority\":%d,\"last_updated_date\":%s,\"title\":%s,\"content\":%s,\"ans_count\":%d,\"user_no\":%d,\"user_name\":%s},", 
						obj.no, 
						obj.status, 
						((obj.category != null)? String.format("\"%s\"", obj.category) : null), 
						((obj.target != null)? String.format("\"%s\"", obj.target) : null), 
						obj.priority, 
						((obj.lastUpdatedDate != null)? String.format("\"%s\"", obj.lastUpdatedDate) : null), 
						((obj.title != null)? String.format("\"%s\"", convertPlainTextToHtmlText(obj.title)) : null), 
						((obj.content != null)? String.format("\"%s\"", convertPlainTextToHtmlText(obj.content)) : null), 
						obj.ansCount, 
						obj.userNo, 
						((obj.userName != null)? String.format("\"%s\"", obj.userName) : null) 
					)
				);
			}
			
			if (resultText.lastIndexOf(",") == resultText.length()-1) resultText.deleteCharAt(resultText.length()-1);
			resultText.append(String.format("],\"max_page_no\":%d}",maxPageNo));
			
			
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
	
	public String getIssueTrackingInfo(int no) {
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		StringBuffer resultText = null;
		IssueTbDto issue = null;
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			stmt = conn.createStatement();
			rs = stmt.executeQuery(String.format("SELECT * FROM `legato_issue_tb` WHERE no='%d'", no));
			
			if (rs.next()) {
				issue = new IssueTbDto(
					rs.getInt("no"),
					rs.getInt("user_no"),
					rs.getInt("store_no"),
					rs.getInt("status"),
					rs.getInt("category_no"),
					rs.getInt("target"),
					rs.getInt("priority"),
					rs.getString("created_date"),
					rs.getString("last_updated_date"),
					rs.getString("title"),
					rs.getString("content")
				);
			}
			
			rs.close();
			stmt.close();
			
			if (issue == null) {
				return "{\"data\":null}";
			}
			
			if (issue.getCategoryNo() > 0) {
				stmt = conn.createStatement();
				rs = stmt.executeQuery(String.format("SELECT * FROM `legato_issue_category_tb` WHERE no='%d'", issue.getCategoryNo()));
				
				if (rs.next()) {
					issue.setCategoryName(rs.getString("category"));
				}
				
				rs.close();
				stmt.close();
			}
			
			if (issue.getUserNo() > 0) {
				stmt = conn.createStatement();
				
				if (issue.getTarget() > 0) {
					rs = stmt.executeQuery(String.format("SELECT `user_no`,`user_name` FROM `user_info` WHERE `user_no`='%d'", issue.getUserNo()));
				} else {
					if (!rs.isClosed()) rs.close();
					rs = stmt.executeQuery(String.format("SELECT `user_no`,`user_name` FROM `user_info` WHERE `user_no` IN ('%d','%d')", issue.getUserNo(), issue.getTarget()));
				}
				
				while (rs.next()) {
					if (rs.getInt("user_no") == issue.getUserNo()){
						issue.setUserName(rs.getString("user_name"));
					} else if (rs.getInt("user_no") == issue.getTarget()) {
						issue.setTargetUserName(rs.getString("user_name"));
					}
				}
				
				rs.close();
				stmt.close();
			}
			
			resultText = new StringBuffer();
			resultText.append("{\"data\":{");
			resultText.append(
				String.format(
					"\"no\":%d,\"user_no\":%d,\"store_no\":%d,\"status\":%d,\"category_no\":%d,\"target\":%d,\"priority\":%d,",
					issue.getNo(), issue.getUserNo(), issue.getStoreNo(), issue.getStatus(), issue.getCategoryNo(), issue.getTarget(), issue.getPriority()
			));
			if (issue.getCreatedDate() != null) {
				resultText.append(String.format("\"created_date\":\"%s\",",issue.getCreatedDate()));				
			} else {
				resultText.append("\"created_date\":null,");		
			}
			if (issue.getLastUpdatedDate() != null) {
				resultText.append(String.format("\"last_updated_date\":\"%s\",",issue.getLastUpdatedDate()));				
			} else {
				resultText.append("\"last_updated_date\":null,");		
			}
			if (issue.getTitle() != null) {
				resultText.append(String.format("\"title\":\"%s\",",convertPlainTextToHtmlText(issue.getTitle())));				
			} else {
				resultText.append("\"title\":null,");		
			}
			if (issue.getContent() != null) {
				resultText.append(String.format("\"content\":\"%s\",",convertPlainTextToHtmlText(issue.getContent())));				
			} else {
				resultText.append("\"content\":null,");		
			}
			if (issue.getUserName() != null) {
				resultText.append(String.format("\"user_name\":\"%s\",",issue.getUserName()));				
			} else {
				resultText.append("\"user_name\":null,");		
			}
			if (issue.getTargetUserName() != null) {
				resultText.append(String.format("\"target_user_name\":\"%s\",",issue.getTargetUserName()));				
			} else {
				resultText.append("\"target_user_name\":null,");		
			}
			if (issue.getCategoryName() != null) {
				resultText.append(String.format("\"category_name\":\"%s\"",issue.getCategoryName()));				
			} else {
				resultText.append("\"category_name\":null");		
			}
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
	
	public String getItemList() {
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
			rs = stmt.executeQuery(String.format("SELECT * FROM `legato_item_tb`"));
			
			resultText = new StringBuffer();
			resultText.append("[");
			while (rs.next()) {
				resultText.append(
					String.format("{\"item_no\":%d,\"description\":\"%s\",\"serial_no\":\"%s\",\"price\":%f,\"tax\":%f},",
						rs.getInt("item_no"), rs.getString("description"), rs.getString("serial_no"), rs.getDouble("price"), rs.getDouble("tax")	
					)
				);
			}
			if (resultText.lastIndexOf(",") == resultText.length() - 1) resultText.deleteCharAt( resultText.length() -1 );
			resultText.append("]");
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();

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
	
	public String getMacroData(int userNo) {
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
			rs = stmt.executeQuery(String.format("SELECT * FROM `legato_macro_tb` WHERE `user_no`='%d'", userNo));
			
			resultText = new StringBuffer();
			resultText.append("{");
			if (rs.next()) {
				resultText.append( String.format("\"name_macro_text\":\"%s\",", rs.getString("name_macro_text") ) );
				resultText.append( String.format("\"id_macro_text\":\"%s\",", rs.getString("id_macro_text") ) );
				resultText.append( String.format("\"id_no_macro_text\":\"%s\",", rs.getString("id_no_macro_text") ) );
			}
			if (resultText.lastIndexOf(",") == resultText.length() - 1) resultText.deleteCharAt( resultText.length() -1 );
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
	
	public String getPromotionData() {
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
			rs = stmt.executeQuery(String.format("SELECT `promotion_no`,`description`,`image_path`,`spec`,`original_price`,`rebates`, CONCAT(DATE_FORMAT(`promotion_start_date`, '%%m-%%d'), ' ~ ', DATE_FORMAT(`promotion_end_date`, '%%m-%%d')) AS `promotion_date` FROM `legato_promotion_tb`"));
			
			resultText = new StringBuffer();
			resultText.append("[");
			while (rs.next()) {
				resultText.append(
					String.format("{\"promotion_no\":%d,\"description\":\"%s\",\"image_path\":\"%s\",\"spec\":\"%s\",\"original_price\":%f,\"rebates\":\"%s\",\"promotion_date\":\"%s\"},",
						rs.getInt("promotion_no"), rs.getString("description"), rs.getString("image_path"), rs.getString("spec").replaceAll("\"","\\\\\""), rs.getDouble("original_price"), rs.getString("rebates"), rs.getString("promotion_date")	
					)
				);
			}
			if (resultText.lastIndexOf(",") == resultText.length() - 1) resultText.deleteCharAt( resultText.length() -1 );
			resultText.append("]");
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

	public String getSelectedItem(int itemNo) {
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
			rs = stmt.executeQuery(String.format("SELECT * FROM `legato_item_tb` WHERE `item_no`='%d'",itemNo));
			
			resultText = new StringBuffer();
			resultText.append("{");
			if (rs.next()) {
				resultText.append(
					String.format("\"item_no\":%d,\"description\":\"%s\",\"serial_no\":\"%s\",\"price\":%f,\"tax\":%f",
						rs.getInt("item_no"), rs.getString("description"), rs.getString("serial_no"), rs.getDouble("price"), rs.getDouble("tax")	
					)
				);
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
	
	public String getStaffActRank() {
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		String sql = null;
		StringBuffer resultText = null, strTmp = null;
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			HashMap<Integer, SalesTbStaffActRankVo> rankList = new HashMap<Integer, SalesTbStaffActRankVo>();
			SalesTbStaffActRankVo obj = null;
			int i = 0;
					
	
			stmt = conn.createStatement();
			sql = "SELECT `tb1`.`user_no`,`tb1`.`activation_count`, `tb2`.`user_name`, `tb2`.`user_id` FROM (SELECT `user_no`, COUNT(`sales_no`) AS `activation_count` FROM `legato_sales_tb` WHERE `type`='1' GROUP BY `user_no` ORDER BY `activation_count` DESC LIMIT 0, 5) AS `tb1` LEFT JOIN (SELECT `user_no`,`user_name`,`user_id` FROM `user_info`) AS `tb2` ON `tb1`.`user_no`=`tb2`.`user_no`";				
			rs = stmt.executeQuery(sql);
									
			strTmp = new StringBuffer();
			while (rs.next()) {
				strTmp.append( String.format( ",'%d'",rs.getInt("user_no") ) );
				rankList.put( rs.getInt("user_no"), new SalesTbStaffActRankVo( rs.getInt("user_no"), rs.getInt("activation_count"), rs.getString("user_name"), rs.getString("user_id") ) );
			}
			if (strTmp.length() > 0) strTmp.deleteCharAt(0);
			rs.close();	

			// get type 2, 3		
			for (i = 2; i < 4; i++) {
				stmt = conn.createStatement();
				sql = String.format("SELECT `user_no`, COUNT(`sales_no`) AS `value` FROM `legato_sales_tb` WHERE `type`='%d' AND user_no IN (%s) GROUP BY `user_no`", i, strTmp.toString());
				rs = stmt.executeQuery(sql);
									
					while(rs.next()) {
						obj = rankList.get(rs.getInt("user_no"));
						if (obj != null) {						
							switch(i) {
								case 2:
									obj.accCount = rs.getInt("value");
									break;
								case 3:
									obj.paymentCount = rs.getInt("value");
									break;
							}
							obj = null;
						}
					}
				rs.close();
				stmt.close();
			}
			
			resultText = new StringBuffer();
			resultText.append("[");
			i = 0;
			String strArrTmp[] = strTmp.toString().replaceAll("'","").split(",");
			for (i = 0; i < strArrTmp.length; i++) {						
				try {
					obj = rankList.get(Integer.parseInt( strArrTmp[i] )  );
					if (obj != null) {
						resultText.append(
							String.format(
								"{\"user_no\":%d,\"user_info\":\"%s / %s\",\"activation_count\":%d,\"acc_count\":%d,\"payment_count\":%d},",
								obj.userNo, obj.userName, obj.userId, obj.activationCount, obj.accCount, obj.paymentCount
							)
						);
					}
					obj.removeAllMember();
					obj = null;
				} catch (Exception e) {
					e.printStackTrace();
				}
				strArrTmp[i] = null;
			}
			if (resultText.lastIndexOf(",") == resultText.length() -1) resultText.deleteCharAt(resultText.length() -1);
			resultText.append("]");
			
		} catch (Exception e1) {
			e1.printStackTrace();
			
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
	
	public String getStoreCouponList(int userNo) {
		return this.storeCouponTbDao.getStoreCouponList(userNo);
	}
	
	public String getStoreCouponById(int userNo, String couponId) {
		return this.storeCouponTbDao.getStoreCouponById(userNo, couponId);
	}
	
	public String getStoreRank(int userNo) {
		return this.salesTbDao.getStoreRank(userNo);
	}
	
	public String getUserInfo(int userNo, boolean isNameOnly) {		
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		String sql = null;
		StringBuffer resultStr = null;
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			stmt = conn.createStatement();
			try {
				if (isNameOnly) {
					sql = String.format("SELECT `user`.`user_name`, `user`.`position`, `store`.`store_name` FROM (SELECT `user_name`,`store_no`,`position` FROM `user_info` WHERE `user_no`='%s') AS `user` LEFT JOIN (SELECT `store_no`,`store_name` FROM `store_info`) AS `store` ON `user`.`store_no` = `store`.`store_no`", userNo);
					
				} else {
					sql = String.format("SELECT `user`.*, `store`.`store_name` FROM (SELECT `user_no`,`user_name`,`store_no`,`phone`,`email`,`position` FROM `user_info` WHERE `user_no`='%s') AS `user` LEFT JOIN (SELECT `store_no`,`store_name` FROM `store_info`) AS `store` ON `user`.`store_no` = `store`.`store_no`", userNo);
				}
			} catch (Exception e) {
				sql = String.format("SELECT `user`.*, `store`.`store_name` FROM (SELECT `user_no`,`user_name`,`store_no`,`phone`,`email`,`position` FROM `user_info` WHERE `user_no`='%s') AS `user` LEFT JOIN (SELECT `store_no`,`store_name` FROM `store_info`) AS `store` ON `user`.`store_no` = `store`.`store_no`", userNo);
			}
			rs = stmt.executeQuery(sql);
			resultStr = new StringBuffer();
			resultStr.append("{");
			if (rs.next()) {
				if (!isNameOnly) {
					resultStr.append( String.format( "\"user_no\":%d,",rs.getInt("user_no") ) );
					resultStr.append( String.format( "\"store_no\":%d,",rs.getInt("store_no") ) );
				}
				resultStr.append( String.format( "\"user_name\":\"%s\",",rs.getString("user_name") ) );
				resultStr.append( String.format( "\"store_name\":\"%s\",",rs.getString("store_name") ) );
				if (!isNameOnly) {
					resultStr.append( String.format( "\"phone\":\"%s\",",rs.getString("phone") ) );
					resultStr.append( String.format( "\"email\":\"%s\",",rs.getString("email") ) );
				}
				resultStr.append( String.format( "\"position\":%d,",rs.getInt("position") ) );
			}
			if (resultStr.lastIndexOf(",") == resultStr.length() -1) resultStr.deleteCharAt(resultStr.length() -1);
			resultStr.append("}");
			rs.close();
			
		} catch (Exception e1) {
			e1.printStackTrace();
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
		
		return resultStr.toString();
	}

	public String getStoreMessage(int userNo) {
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
			rs = stmt.executeQuery(String.format("SELECT `store`.`message` AS `message` FROM `store_info` AS `store` RIGHT JOIN (SELECT `store_no` FROM `user_info` WHERE `user_no`='%s') AS `user` ON `store`.`store_no` = `user`.`store_no`", userNo));
			
			resultText = new StringBuffer();
			if (rs.next()) {
				resultText.append( rs.getString("message") );
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
		
		return resultText.toString();
	}

	public String getTodaySalesData(int userNo) {
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		String sql = "", strTmp = null;
		StringBuffer resultText = null;
		SimpleDateFormat sdf;
		Calendar c;
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			sdf = new SimpleDateFormat("yyyy-MM-dd");
			c = Calendar.getInstance();
						
			stmt = conn.createStatement();
			strTmp = sdf.format(c.getTime());
			sql = String.format("SELECT * FROM (SELECT COUNT(`sales_no`) as `activation_count`, SUM(`payment`) AS `total_activation_pay` FROM `legato_sales_tb` WHERE `user_no`='%s' AND `type`='1' AND (`sales_datetime` BETWEEN '%s 00:00:00' AND '%s 23:59:59')) AS `tb1`, (SELECT COUNT(`sales_no`) AS `acc_count`, SUM(`payment`) AS `total_acc_pay` FROM `legato_sales_tb` WHERE `user_no`='%s' AND `type`='2' AND (`sales_datetime` BETWEEN '%s 00:00:00' AND '%s 23:59:59')) AS `tb2`, (SELECT COUNT(`sales_no`) AS `payment_count`, SUM(`payment`) `total_payment_pay` FROM `legato_sales_tb` WHERE `user_no`='%s' AND `type`='3' AND (`sales_datetime` BETWEEN '%s 00:00:00' AND '%s 23:59:59')) AS `tb3`", 
				userNo, strTmp, strTmp,
				userNo, strTmp, strTmp,
				userNo, strTmp, strTmp
			);
			
			rs = stmt.executeQuery(sql);	

			resultText = new StringBuffer();
			resultText.append("{");
			if (rs.next()) {
				resultText.append( String.format( "\"activation_count\":%d,",rs.getInt("activation_count") ) );
				resultText.append( String.format( "\"total_activation_pay\":%.2f,",rs.getDouble("total_activation_pay") ) );
				resultText.append( String.format( "\"acc_count\":%d,",rs.getInt("acc_count") ) );
				resultText.append( String.format( "\"total_acc_pay\":%.2f,",rs.getDouble("total_acc_pay") ) );
				resultText.append( String.format( "\"payment_count\":%d,",rs.getInt("payment_count") ) );
				resultText.append( String.format( "\"total_payment_pay\":%.2f,",rs.getDouble("total_payment_pay") ) );
			}
			if (resultText.lastIndexOf(",") == resultText.length() -1) resultText.deleteCharAt(resultText.length() -1);
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

	public int authAdmin(String adminId, String adminPasswd) {
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		int loginResult = 0;
		
		
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			stmt = conn.createStatement();
			rs = stmt.executeQuery(
					String.format("SELECT `user`.`user_no` as `user_no`,`user`.`user_id` as `user_id`,`user`.`position` as `position` FROM `user_info` AS `user` WHERE `user`.`user_id`='%s' AND `password`=PASSWORD('%s') AND `position`='0'", adminId, adminPasswd)
				);
	
			if (rs.next()) {
				try {
					loginResult = 1;
				} catch (Exception e) {
					loginResult = -3;
				}
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
			
			return -1;
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
		
		return loginResult;
	}
	
	public int loginSystem(HttpSession session, String storeId, String userId, String password) {
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		int loginResult = 0;
		
		
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			stmt = conn.createStatement();
			rs = stmt.executeQuery(
					String.format("SELECT `user`.`user_no` as `user_no`,`user`.`user_id` as `user_id`,`user`.`position` as `position` FROM `user_info` AS `user` LEFT JOIN (SELECT `store_no`,`store_id` FROM `store_info` WHERE `store_id`='%s') AS `store` ON `user`.`store_no` = `store`.`store_no` WHERE `user`.`user_id`='%s' AND `password`=PASSWORD('%s');", storeId, userId, password)
				);
	
			if (rs.next()) {
				try {
					loginResult = 1;
					session.setAttribute("posone_user_info",String.format("%d_%s_%d",rs.getInt("user_no"),rs.getString("user_id"),rs.getInt("position")));
				} catch (Exception e) {
					loginResult = -3;
				}
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
			
			return -1;
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
		
		return loginResult;
	}
	
	public int setStoreMessage(int userNo, String message) {
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		int storeNo = 0;
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			stmt = conn.createStatement();
			rs = stmt.executeQuery(String.format("SELECT `user`.`store_no` AS `store_no` FROM `user_info` AS `user` WHERE `user`.`user_no`='%s' AND `position`='1'", userNo));
				

			if (rs.next()) {
				storeNo = rs.getInt("store_no");
			}
			rs.close();
				
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
				
				return 0;
			}
			
			stmt = conn.createStatement();
			stmt.execute(String.format("UPDATE `store_info` SET `message`='%s' WHERE `store_no`='%d'", message, storeNo));				
			
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
			
			return -1;
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
		
		return 1;
	}
	
	private String convertPlainTextToHtmlText(String str) {
		return str.replaceAll("\r\n", "<br/>").replaceAll("\"", "\\\\\"");
	}
}
