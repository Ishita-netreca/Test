package com.boas.posone.db.dao;

import com.boas.posone.db.dto.ItemCtgrInfoDto;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Vector;

/**
 * Created by Researcher01 on 2016-09-26.
 */
public class ItemCtgrInfoDao {
    private static ItemCtgrInfoDao instance;
    public static ItemCtgrInfoDao getInstance() {
        if (instance == null) instance = new ItemCtgrInfoDao();
        return instance;
    }

    public Vector<ItemCtgrInfoDto> getItemCtgrInfoList() {
        Vector<ItemCtgrInfoDto> list = new Vector<ItemCtgrInfoDto>();

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

            rs = stmt.executeQuery(String.format("SELECT * FROM `item_ctgr_info`"));

            while(rs.next()) {
                list.add(new ItemCtgrInfoDto(
                        rs.getInt("ctgr_no"),
                        rs.getString("ctgr_name")
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
