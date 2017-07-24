package com.boas.posone.db.dao;

import com.boas.posone.db.dto.TbUserDto;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;

/**
 * Created by Researcher01 on 2016-09-28.
 */
public class TbUserDao {
    private static TbUserDao instance;
    public static TbUserDao getInstance() {
        if (instance == null) instance = new TbUserDao();
        return instance;
    }

    /*
    return
        0: success
        under -1: error code
        1: user id or password incorrect
        2: store access denied or no exist store
     */
    public int loginThisSystem(HttpSession session, String storeId, String userId, String password) {
        int result = -1;

        TbUserDto obj = null;

        Context context = null;
        DataSource dataSource = null;
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        if (session == null || storeId == null || userId == null || password == null) {
            return -1;
        }

        try {
            context = new InitialContext();
            dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
            conn = dataSource.getConnection();

            stmt = conn.createStatement();

            rs = stmt.executeQuery(String.format("SELECT `ab`.*, `c`.`store_sid` FROM (SELECT `a`.`sid` AS `user_sid`, `a`.`user_id`, `a`.`user_type`, `b`.`store_id` FROM (SELECT * FROM `tb_user` WHERE `user_id`='%s' AND `password`=PASSWORD('%s')) AS `a` RIGHT JOIN (SELECT * FROM `tb_user_store_access` WHERE `store_id`='%s' AND `user_id`='%s') AS `b` ON `a`.`user_id`=`b`.`user_id`) AS `ab` LEFT JOIN (SELECT `sid` AS `store_sid`, `store_id` FROM `tb_stores` WHERE `store_id`='%s') AS `c` ON `ab`.`store_id`=`c`.`store_id`", userId, password, storeId, userId, storeId));

            if(rs.next()) {
                if (rs.getInt("user_sid") == 0 || rs.getString("user_id") == null) {
                    result = 1;
                } else if (rs.getInt("store_sid") == 0 || rs.getString("store_id") == null) {
                    result = 2;
                } else {
                    session.setAttribute("posone_login_user_type", rs.getInt("user_type"));
                    session.setAttribute("posone_login_user_sid", rs.getInt("user_sid"));
                    session.setAttribute("posone_login_user_id", rs.getString("user_id"));
                    session.setAttribute("posone_login_store_sid", rs.getInt("store_sid"));
                    session.setAttribute("posone_login_store_id", rs.getString("store_id"));

                    result = 0;
                }
            } else {
                result = 2;
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

            return -2;
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
                    String.format("SELECT `sid`,`user_id`,`user_type` FROM `tb_user` WHERE `user_id`='%s' AND `password`=PASSWORD('%s') AND `user_type`='0'", adminId, adminPasswd)
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
}
