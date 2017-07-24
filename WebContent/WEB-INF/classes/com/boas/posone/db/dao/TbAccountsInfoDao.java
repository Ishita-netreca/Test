package com.boas.posone.db.dao;

import com.boas.posone.db.dto.TbAccountsInfoDto;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

/**
 * Created by Researcher01 on 2016-09-30.
 */
public class TbAccountsInfoDao {
    private static TbAccountsInfoDao instance;
    public static TbAccountsInfoDao getInstance() {
        if (instance == null) instance = new TbAccountsInfoDao();
        return instance;
    }

    public TbAccountsInfoDto getAccountAsapInfo(String storeId) {
        TbAccountsInfoDto obj = null;


        Context context = null;
        DataSource dataSource = null;
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        if (storeId == null) {
            return null;
        }

        try {
            context = new InitialContext();
            dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
            conn = dataSource.getConnection();

            stmt = conn.createStatement();

            rs = stmt.executeQuery(String.format("SELECT * FROM `tb_accounts_info` WHERE `store_id`='%s'", storeId));

            if(rs.next()) {
                obj = new TbAccountsInfoDto(
                        rs.getInt("sid"),
                        rs.getString("store_id"),
                        rs.getString("asap_id"),
                        rs.getString("asap_password"),
                        null,
                        null
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

    public TbAccountsInfoDto getAccountQpayInfo(String storeId) {
        TbAccountsInfoDto obj = null;


        Context context = null;
        DataSource dataSource = null;
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        if (storeId == null) {
            return null;
        }

        try {
            context = new InitialContext();
            dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
            conn = dataSource.getConnection();

            stmt = conn.createStatement();

            rs = stmt.executeQuery(String.format("SELECT * FROM `tb_accounts_info` WHERE `store_id`='%s'", storeId));

            if(rs.next()) {
                obj = new TbAccountsInfoDto(
                        rs.getInt("sid"),
                        rs.getString("store_id"),
                        null,
                        null,
                        rs.getString("qpay_id"),
                        rs.getString("qpay_password")
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

    public TbAccountsInfoDto getAccountAsapQpayInfo(String storeId) {
        TbAccountsInfoDto obj = null;


        Context context = null;
        DataSource dataSource = null;
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        if (storeId == null) {
            return null;
        }

        try {
            context = new InitialContext();
            dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
            conn = dataSource.getConnection();

            stmt = conn.createStatement();

            rs = stmt.executeQuery(String.format("SELECT * FROM `tb_accounts_info` WHERE `store_id`='%s'", storeId));

            if(rs.next()) {
                obj = new TbAccountsInfoDto(
                        rs.getInt("sid"),
                        rs.getString("store_id"),
                        rs.getString("asap_id"),
                        rs.getString("asap_password"),
                        rs.getString("qpay_id"),
                        rs.getString("qpay_password")
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
