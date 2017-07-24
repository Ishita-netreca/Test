package com.boas.posone.db.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Vector;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;

import com.boas.posone.db.dao.StoreInfoDao;
import com.boas.posone.db.vo.UserInfoEmpListVo;
import com.boas.posone.db.dto.UserInfoDto;

public class UserInfoDao {
	private static UserInfoDao instance;
	public static UserInfoDao getInstance() {
		if (instance == null) instance = new UserInfoDao();
		return instance;
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
	
	public UserInfoDto getUserInfo(int userNo) {
		UserInfoDto mUserInfoDto = null;
		
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
			
			rs = stmt.executeQuery(String.format("SELECT * FROM `user_info` WHERE `user_no`='%d'", userNo));
			
			if(rs.next()) {
				mUserInfoDto = new UserInfoDto(
					rs.getInt("user_no"),
					rs.getString("user_name"),
					rs.getInt("store_no"),
					rs.getString("user_id"),
					rs.getString("phone"),
					rs.getString("email"),
					rs.getInt("position"),
					rs.getInt("disable")
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
		
		return mUserInfoDto;
	}

	public UserInfoDto getUserInfoBySessionUserData(String sessionUserInfo) {
		UserInfoDto mUserInfoDto = null;

		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;

		int userNo = 0;

		if (sessionUserInfo == null) return null;
		String arr[] = sessionUserInfo.split("_");

		if (arr.length != 3) return null;

		try {
			userNo = Integer.parseInt(arr[0]);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();

			stmt = conn.createStatement();

			rs = stmt.executeQuery(String.format("SELECT * FROM `user_info` WHERE `user_no`='%d'", userNo));

			if(rs.next()) {
				mUserInfoDto = new UserInfoDto(
						rs.getInt("user_no"),
						rs.getString("user_name"),
						rs.getInt("store_no"),
						rs.getString("user_id"),
						rs.getString("phone"),
						rs.getString("email"),
						rs.getInt("position"),
						rs.getInt("disable")
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

		return mUserInfoDto;
	}

	public UserInfoDto getUserInfoById(String userId) {
		UserInfoDto mUserInfoDto = null;
		
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
			
			rs = stmt.executeQuery(String.format("SELECT * FROM `user_info` WHERE `user_id`='%s'", userId));
			
			if(rs.next()) {
				mUserInfoDto = new UserInfoDto(
					rs.getInt("user_no"),
					rs.getString("user_name"),
					rs.getInt("store_no"),
					rs.getString("user_id"),
					rs.getString("phone"),
					rs.getString("email"),
					rs.getInt("position"),
					rs.getInt("disable")
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
		
		return mUserInfoDto;
	}

	
	public HashMap<Integer,String> getUserNameList(String userList) {
		HashMap<Integer,String> list = new HashMap<Integer,String>();
		
		if (userList.lastIndexOf("'") < userList.length()-1) userList += "'";	
		if (userList.indexOf("'") != 0) userList = "'" + userList;
		
		userList = userList.replaceAll(",", "','");
		
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
			
			rs = stmt.executeQuery(String.format("SELECT `user_no`, `user_name` FROM `user_info` WHERE `user_no` IN (%s)", userList));
			
			while(rs.next()) {
				if (list.get(rs.getInt("user_no")) == null) {
					list.put(rs.getInt("user_no"), rs.getString("user_name"));
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
	
	public Vector<UserInfoEmpListVo> getStoreEmpListInPopupEmp(String sessionUserInfo, int pageNo, int countPerPage) {
		Vector<UserInfoEmpListVo> list = new Vector<UserInfoEmpListVo>();
				
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
			
			rs = stmt.executeQuery(String.format("SELECT `a`.*, `b`.`position_name` FROM (SELECT `user_no`,`user_id`,`user_name`,`email`,`phone`,`position` FROM `user_info` WHERE `store_no`='%d' LIMIT %d,%d) AS `a` LEFT JOIN `position_info` AS `b` ON `a`.`position`=`b`.`position_no`", storeNo, (pageNo-1)*countPerPage, countPerPage));
			
			while(rs.next()) {
				list.add(new UserInfoEmpListVo(
					rs.getInt("user_no"),
					rs.getString("user_id"),
					rs.getString("user_name"),
					rs.getString("email"),
					rs.getString("phone"),
					rs.getInt("position"),
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
	
	public Vector<UserInfoEmpListVo> searchStoreEmpListInPopupEmp(String sessionUserInfo, int searchType, String keyword, int pageNo, int countPerPage) {
		Vector<UserInfoEmpListVo> list = new Vector<UserInfoEmpListVo>();
				
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
			
			switch (searchType) {
			case 1:
				rs = stmt.executeQuery(String.format("SELECT `a`.*, `b`.`position_name` FROM (SELECT `user_no`,`user_id`,`user_name`,`email`,`phone`,`position` FROM `user_info` WHERE `store_no`='%d' AND (`user_id` LIKE '%%%s%%') LIMIT %d,%d) AS `a` LEFT JOIN `position_info` AS `b` ON `a`.`position`=`b`.`position_no`", storeNo, keyword, (pageNo-1)*countPerPage, countPerPage));
				break;
			case 2:
				rs = stmt.executeQuery(String.format("SELECT `a`.*, `b`.`position_name` FROM (SELECT `user_no`,`user_id`,`user_name`,`email`,`phone`,`position` FROM `user_info` WHERE `store_no`='%d' AND (`user_name` LIKE '%%%s%%') LIMIT %d,%d) AS `a` LEFT JOIN `position_info` AS `b` ON `a`.`position`=`b`.`position_no`", storeNo, keyword, (pageNo-1)*countPerPage, countPerPage));
				break;
			case 3:
				rs = stmt.executeQuery(String.format("SELECT `a`.*, `b`.`position_name` FROM (SELECT `user_no`,`user_id`,`user_name`,`email`,`phone`,`position` FROM `user_info` WHERE `store_no`='%d' AND (`email` LIKE '%%%s%%') LIMIT %d,%d) AS `a` LEFT JOIN `position_info` AS `b` ON `a`.`position`=`b`.`position_no`", storeNo, keyword, (pageNo-1)*countPerPage, countPerPage));
				break;
			case 4:
				rs = stmt.executeQuery(String.format("SELECT `a`.*, `b`.`position_name` FROM (SELECT `user_no`,`user_id`,`user_name`,`email`,`phone`,`position` FROM `user_info` WHERE `store_no`='%d' LIMIT %d,%d) AS `a` LEFT JOIN `position_info` AS `b` ON `a`.`position`=`b`.`position_no` WHERE `position_name` LIKE '%%%s%%'", storeNo, (pageNo-1)*countPerPage, countPerPage, keyword));
				break;
			default:
				rs = stmt.executeQuery(String.format("SELECT `a`.*, `b`.`position_name` FROM (SELECT `user_no`,`user_id`,`user_name`,`email`,`phone`,`position` FROM `user_info` WHERE `store_no`='%d' AND (`user_id` LIKE '%%%s%%' OR `user_name` LIKE '%%%s%%' OR `email` LIKE '%%%s%%') LIMIT %d,%d) AS `a` LEFT JOIN `position_info` AS `b` ON `a`.`position`=`b`.`position_no`", storeNo, keyword, keyword, keyword, (pageNo-1)*countPerPage, countPerPage));
				break;
			}
			
			while(rs.next()) {
				list.add(new UserInfoEmpListVo(
					rs.getInt("user_no"),
					rs.getString("user_id"),
					rs.getString("user_name"),
					rs.getString("email"),
					rs.getString("phone"),
					rs.getInt("position"),
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
	
	public int updateUserInfo(UserInfoDto mUserInfoDto) {
		
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		
		if (mUserInfoDto == null) {
			return -1;
		}
		
		UserInfoDto existsUser = this.getUserInfoById(mUserInfoDto.getUserId());
		
		if (existsUser != null) {
			return 1;
		}

		try {
			
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			stmt = conn.createStatement();
			
			if (mUserInfoDto.getUserNo() == 0) {
				stmt.execute(String.format("INSERT INTO `user_info`(`user_name`,`store_no`,`user_id`,`password`,`phone`,`email`,`position`) VALUES('%s','%d','%s',PASSWORD('%s'),'%s','%s','%d')",
						mUserInfoDto.getUserName(), mUserInfoDto.getStoreNo(), mUserInfoDto.getUserId(),
						mUserInfoDto.getPassword(), mUserInfoDto.getPhone(), mUserInfoDto.getEmail() ,mUserInfoDto.getPosition() ));
			} else {
				stmt.execute(String.format("UPDATE `user_info` SET `user_name`='%s',`password`=PASSWORD('%s'),`phone`='%s',`email`='%s',`position`='%d' WHERE `user_no`='%d'",
						mUserInfoDto.getUserName(), mUserInfoDto.getPassword(), mUserInfoDto.getPhone(), 
						mUserInfoDto.getEmail(), mUserInfoDto.getPosition(), mUserInfoDto.getUserNo() ));
			}			
						
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

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
			
			return -2;
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
}
