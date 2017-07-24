package com.boas.posone.db.dao;

import com.boas.posone.db.dto.TbCategoriesDictDto;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Vector;

/**
 * Created by Researcher01 on 2016-09-28.
 */
public class TbCategoriesDictDao {
    private static TbCategoriesDictDao instance;
    public static TbCategoriesDictDao getInstance() {
        if (instance == null) instance = new TbCategoriesDictDao();
        return instance;
    }

    public HashMap<Integer,String> getCategoriesDictList() {
        HashMap<Integer,String> map = new HashMap<Integer,String>();

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

            rs = stmt.executeQuery(String.format("SELECT * FROM `tb_categories_dict`"));

            while(rs.next()) {
                if (map.get(rs.getInt("sid")) == null) {
                    map.put(rs.getInt("sid"), rs.getString("category_name"));
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

        return map;
    }


    public Vector<TbCategoriesDictDto> getCategoriesByParentSID(int parentSid) {
        Vector<TbCategoriesDictDto> list = new Vector<TbCategoriesDictDto>();

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

            rs = stmt.executeQuery(String.format("SELECT * FROM `tb_categories_dict` WHERE parent_sid='%d'", parentSid));

            while(rs.next()) {
                list.add(new TbCategoriesDictDto(
                   rs.getInt("sid"),
                   rs.getString("category_name"),
                   rs.getInt("parent_sid")
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
