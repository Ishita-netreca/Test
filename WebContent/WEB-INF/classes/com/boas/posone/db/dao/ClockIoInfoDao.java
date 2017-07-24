package com.boas.posone.db.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Vector;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import com.boas.posone.db.dto.ClockIoInfoDto;
import com.boas.posone.db.dto.UserInfoDto;
import com.boas.posone.db.vo.ClockIoInfoListVo;
import com.boas.posone.db.vo.ClockIoInfoUserVo;

public class ClockIoInfoDao {
	private static ClockIoInfoDao instance;
	
	public static ClockIoInfoDao getInstance() {
		if (instance == null) instance = new ClockIoInfoDao();
		return instance;
	}
	
	public ClockIoInfoDto getClockIoInfo(String sessionUserInfo) {
		ClockIoInfoDto mClockIoInfoDto = new ClockIoInfoDto();		
		
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		
		int userNo = 0;
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		
		if (sessionUserInfo == null) {
			return null;
		}
		
		try {
			userNo = Integer.parseInt(sessionUserInfo.substring(0, sessionUserInfo.indexOf("_")));
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
		if (userNo == 0) return null;
		
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			stmt = conn.createStatement();
			
			rs = stmt.executeQuery(String.format("SELECT * FROM `clock_io_info` WHERE `user_no`='%d' AND `clock_in_date` LIKE '%s%%'", userNo, sdf.format(Calendar.getInstance().getTime())));
			
			if (rs.next()) {
				mClockIoInfoDto = new ClockIoInfoDto(
					rs.getInt("clock_io_no"),
					rs.getInt("user_no"),
					rs.getInt("store_no"),
					rs.getString("clock_in_ip"),
					rs.getString("clock_in_date"),
					rs.getString("clock_in_memo"),
					rs.getString("clock_out_ip"),
					rs.getString("clock_out_date"),
					rs.getString("clock_out_memo")
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
		
		return mClockIoInfoDto;
	}

	public ClockIoInfoUserVo getClockIoInfoInPopup(String sessionUserInfo) {
		ClockIoInfoUserVo mClockIoInfoDto = null;		
		
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		
		int userNo = 0;
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		
		if (sessionUserInfo == null) {
			return null;
		}
		
		try {
			userNo = Integer.parseInt(sessionUserInfo.substring(0, sessionUserInfo.indexOf("_")));
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
		if (userNo == 0) return null;
		
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			stmt = conn.createStatement();
			
			rs = stmt.executeQuery(String.format("select `a`.*,`b`.* FROM (SELECT * FROM `clock_io_info` WHERE `user_no`='%d' AND `clock_in_date` LIKE '%s%%') as `a` right join (SELECT `user_no`,`user_name`,`user_id` FROM `user_info` WHERE `user_no`='%d') as `b` on `a`.`user_no`=`b`.`user_no`", userNo, sdf.format(Calendar.getInstance().getTime()), userNo));
			
			if (rs.next()) {
				mClockIoInfoDto = new ClockIoInfoUserVo(
					rs.getInt("clock_io_no"),
					rs.getInt("b.user_no"),
					rs.getInt("store_no"),
					rs.getString("clock_in_ip"),
					rs.getString("clock_in_date"),
					rs.getString("clock_in_memo"),
					rs.getString("clock_out_ip"),
					rs.getString("clock_out_date"),
					rs.getString("clock_out_memo"),
					rs.getString("user_name"),
					rs.getString("user_id")
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
		
		return mClockIoInfoDto;
	}
	
	// return value
	// less than 0 : error
	// 0 : Clock in
	// 1 : Clock out
	// 2 : already inserted both clock in and clock out 
	public int updateClockIo(String sessionUserInfo, String ip, String memo) {
		
		int result = -100;
		
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		
		int userNo = 0;
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		
		if (sessionUserInfo == null) {
			return -1;
		}
		
		try {
			userNo = Integer.parseInt(sessionUserInfo.substring(0, sessionUserInfo.indexOf("_")));
		} catch (Exception e) {
			e.printStackTrace();
			return -2;
		}
		
		if (userNo == 0) return -3;
		
		UserInfoDto mUserInfoDto = UserInfoDao.getInstance().getUserInfo(userNo);
		ClockIoInfoDto mClockIoInfoDto = null;		
		
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			stmt = conn.createStatement();
			
			rs = stmt.executeQuery(String.format("select * FROM `clock_io_info` WHERE `user_no`='%d' AND `clock_in_date` LIKE '%s%%'", userNo, sdf.format(Calendar.getInstance().getTime())));
			
			if (rs.next()) {
				mClockIoInfoDto = new ClockIoInfoDto(
					rs.getInt("clock_io_no"),
					rs.getInt("user_no"),
					rs.getInt("store_no"),
					rs.getString("clock_in_ip"),
					rs.getString("clock_in_date"),
					rs.getString("clock_in_memo"),
					rs.getString("clock_out_ip"),
					rs.getString("clock_out_date"),
					rs.getString("clock_out_memo")
				);
			}
			
			rs.close();
			stmt.close();
			
			stmt = conn.createStatement();
			
			if (mClockIoInfoDto != null) {
				if (mClockIoInfoDto.getClockOutDate() == null || mClockIoInfoDto.getClockOutIp() == null) {
					stmt.execute(String.format("UPDATE `clock_io_info` SET `clock_out_ip`='%s',`clock_out_date`=NOW(),`clock_out_memo`='%s' WHERE `clock_io_no`='%d'",ip,memo,mClockIoInfoDto.getClockIoNo()));
					result = 1;
				} else {
					result = 2;
				}
			} else {
				stmt.execute(String.format("INSERT INTO `clock_io_info`(`user_no`,`store_no`,`clock_in_ip`,`clock_in_date`,`clock_in_memo`) VALUES('%d','%d','%s',NOW(),'%s')",mUserInfoDto.getUserNo(),mUserInfoDto.getStoreNo(),ip,memo));
				result = 0;
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
			
			return -4;
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
		
		return result;
	}
	
	public Vector<ClockIoInfoListVo> getClockIoInfoList(String sessionUserInfo, int pageNo, int countPerPage) {
		Vector<ClockIoInfoListVo> list = new Vector<ClockIoInfoListVo>();
	
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		int storeNo = 0;
		
		if (sessionUserInfo == null) {
			return null;
		}
		
		try {
			storeNo = StoreInfoDao.getInstance().getStoreNoBySessionUserData(sessionUserInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
		if (storeNo == 0) return null;
		
		if (pageNo < 1) pageNo = 1;
		if (countPerPage < 1) countPerPage = 10;
		
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			stmt = conn.createStatement();
			
			rs = stmt.executeQuery(String.format("SELECT `a`.*, `b`.`user_id`, `b`.`user_name` FROM (SELECT `clock_io_no`, `user_no`, `clock_in_date`, DATE_FORMAT(`clock_in_date`,'%%d.%%m.%%Y') as `clock_io_date`, DATE_FORMAT(`clock_in_date`,'%%H:%%i:%%s') as `clock_in_time`, DATE_FORMAT(`clock_out_date`,'%%H:%%i:%%s') AS `clock_out_time`, `clock_in_memo` FROM `clock_io_info` WHERE `store_no`='%d' ORDER BY `clock_in_date` LIMIT %d, %d) as `a` LEFT JOIN (SELECT `user_no`, `user_id`, `user_name` FROM `user_info` WHERE `store_no`='%d') as `b` on `a`.`user_no`=`b`.`user_no`", storeNo, (pageNo-1) * countPerPage, countPerPage, storeNo));
			
			while (rs.next()) {
				list.add(new ClockIoInfoListVo(
					rs.getInt("clock_io_no"),
					rs.getInt("user_no"),
					rs.getString("clock_io_date"),
					rs.getString("clock_in_time"),
					rs.getString("clock_out_time"),
					rs.getString("clock_in_memo"),
					rs.getString("user_id"),
					rs.getString("user_name")
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
	
	public int deleteClockIoInfo(String sessionUserInfo, String clockIoInfoIdxStr) {
		int result = -100;
		
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		
		int userNo = 0;
		
		if (sessionUserInfo == null) {
			return -1;
		}
		
		if (clockIoInfoIdxStr == null) {
			return -1;
		}
		
		try {
			userNo = Integer.parseInt(sessionUserInfo.substring(0, sessionUserInfo.indexOf("_")));
		} catch (Exception e) {
			e.printStackTrace();
			return -2;
		}
		
		if (userNo == 0) return -3;
		
		clockIoInfoIdxStr = clockIoInfoIdxStr.replaceAll(",", "','");
		if (clockIoInfoIdxStr.lastIndexOf("'") < clockIoInfoIdxStr.length()) clockIoInfoIdxStr += "'";
		if (clockIoInfoIdxStr.indexOf("'") > 0) clockIoInfoIdxStr = "'" + clockIoInfoIdxStr;
		
		// UserInfoDto mUserInfoDto = UserInfoDao.getInstance().getUserInfo(userNo);
		// You must add modules check if this user is manager
		
		try {
			context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
			conn = dataSource.getConnection();
			
			stmt = conn.createStatement();
			
			stmt.execute(String.format("DELETE FROM `clock_io_info` WHERE `clock_io_no` IN (%s)", clockIoInfoIdxStr));
					
			result = 0;
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
			
			return -4;
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
		
		return result;
	}
}
