package com.boas.posone.db.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Vector;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import com.boas.posone.db.vo.IssueTrackingListVo;

public class IssueTrackingDao {
	private static IssueTrackingDao instance;
	public static IssueTrackingDao getInstance() {
		if (instance == null) instance = new IssueTrackingDao();
		return instance;
	}
	
	public Vector<IssueTrackingListVo> getIssueTrackingList(String sessionUserInfo, int pageNo, int countPerPage) {
		Vector<IssueTrackingListVo> list = new Vector<IssueTrackingListVo>();
		
		Context context = null;
		DataSource dataSource = null;
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		
		StringBuffer sb = new StringBuffer();
		
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
			
			rs = stmt.executeQuery(String.format("SELECT `ab`.*, `c`.`ans_count` FROM ( SELECT `a`.*,`b`.`ctgr_name` FROM (SELECT `no`,`user_no`,`store_no`,`status`,`ctgr_no`,`target`,`priority`,DATE_FORMAT(`last_updated_date`,'%%Y-%%m-%%d %%H:%%i:%%s') as `last_updated_date`,`title`,`content` FROM `issue_tracking` WHERE `store_no`='%d' LIMIT %d,%d) AS `a` LEFT JOIN `issue_tracking_ctgr` as `b` on `a`.`ctgr_no`=`b`.`no`) as `ab` LEFT JOIN (SELECT `issue_no`, COUNT(`issue_no`) AS `ans_count` FROM `issue_tracking_ans` GROUP BY `issue_no`) as `c` on `ab`.`no`=`c`.`issue_no` ORDER BY `last_updated_date` desc",storeNo, (pageNo-1), countPerPage));
			
			while(rs.next()) {
				list.add(new IssueTrackingListVo(
					rs.getInt("no"),
					rs.getInt("user_no"),
					rs.getInt("store_no"),
					rs.getInt("status"),
					rs.getInt("ctgr_no"),
					rs.getInt("target"),
					rs.getInt("priority"),
					rs.getString("last_updated_date"),
					rs.getString("title"),
					rs.getString("content"),
					rs.getString("ctgr_name"),
					rs.getInt("ans_count")
				));
				
				sb.append(String.format("%d,%d,", rs.getInt("user_no"),rs.getInt("target")));
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
		
		try {
			HashMap<Integer,String> userList = UserInfoDao.getInstance().getUserNameList(sb.toString());
			
			for(int i = 0, len = list.size(); i < len; i++) {
				IssueTrackingListVo mIssueTrackingListVo = list.get(i);
				if (userList.get(mIssueTrackingListVo.getUserNo()) != null) {
					mIssueTrackingListVo.setUserName(userList.get(mIssueTrackingListVo.getUserNo()));
				}
				if (userList.get(mIssueTrackingListVo.getTarget()) != null) {
					mIssueTrackingListVo.setTargetName(userList.get(mIssueTrackingListVo.getTarget()));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
		return list;
	}
}
