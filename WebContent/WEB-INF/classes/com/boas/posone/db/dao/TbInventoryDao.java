package com.boas.posone.db.dao;

import com.boas.posone.db.vo.TbInventoryItemDictVo;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Vector;

/**
 * Created by Researcher01 on 2016-09-29.
 */
public class TbInventoryDao {
    private static TbInventoryDao instance;
    public static TbInventoryDao getInstance() {
        if (instance == null) instance = new TbInventoryDao();
        return instance;
    }

    public TbInventoryItemDictVo getItemInInventoryBySerialNo(String storeId, String serialNo) {
        TbInventoryItemDictVo obj = null;

        Context context = null;
        DataSource dataSource = null;
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        if (storeId == null || serialNo == null) {
            return null;
        }

        try {
            context = new InitialContext();
            dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
            conn = dataSource.getConnection();

            stmt = conn.createStatement();

            rs = stmt.executeQuery(String.format("SELECT * FROM (SELECT * FROM `tb_inventory_%s` WHERE `serial_no`='%s') AS `a` LEFT JOIN (SELECT * FROM `tb_item_dict_%s` WHERE `disable`='0') AS `b` ON `a`.`item_sid`=`b`.`sid`", storeId, serialNo, storeId));

            if(rs.next()) {
                obj = new TbInventoryItemDictVo(
                        rs.getInt("sid"),
                        rs.getInt("item_sid"),
                        rs.getString("serial_no"),
                        rs.getInt("qty"),
                        rs.getString("item_code"),
                        rs.getString("name"),
                        rs.getString("description"),
                        rs.getString("distributor"),
                        rs.getInt("category"),
                        rs.getInt("sub_category"),
                        rs.getString("manufacturer"),
                        rs.getString("color"),
                        rs.getString("condition"),
                        rs.getString("sku"),
                        rs.getFloat("item_cost"),
                        0,
                        0,
                        0,
                        rs.getFloat("retail_price"),
                        rs.getFloat("wholesale_price"),
                        rs.getString("image")
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


    public TbInventoryItemDictVo getItemInInventoryBySKU(String storeId, String sku) {
        TbInventoryItemDictVo obj = null;

        Context context = null;
        DataSource dataSource = null;
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        if (storeId == null || sku == null) {
            return null;
        }

        try {
            context = new InitialContext();
            dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
            conn = dataSource.getConnection();

            stmt = conn.createStatement();

            rs = stmt.executeQuery(String.format("SELECT * FROM (SELECT * FROM `tb_inventory_%s`) AS `a` RIGHT JOIN (SELECT * FROM `tb_item_dict_%s` WHERE `disable`='0' AND `sku`='%s') AS `b` ON `a`.`item_sid`=`b`.`sid`", storeId, storeId, sku));

            if(rs.next()) {
                obj = new TbInventoryItemDictVo(
                        rs.getInt("sid"),
                        rs.getInt("item_sid"),
                        rs.getString("serial_no"),
                        rs.getInt("qty"),
                        rs.getString("item_code"),
                        rs.getString("model"),
                        rs.getString("description"),
                        rs.getString("distributor"),
                        rs.getInt("category"),
                        rs.getInt("sub_category"),
                        rs.getString("manufacturer"),
                        rs.getString("color"),
                        rs.getString("condition"),
                        rs.getString("sku"),
                        rs.getFloat("item_cost"),
                        0,
                        0,
                        0,
                        rs.getFloat("retail_price"),
                        rs.getFloat("wholesale_price"),
                        rs.getString("image")
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

    public Vector<TbInventoryItemDictVo> getItemDicInInventoryList(String storeId) {
        Vector<TbInventoryItemDictVo> list = new Vector<TbInventoryItemDictVo>();


        Context context = null;
        DataSource dataSource = null;
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        if (storeId == null) {
            return null;
        }

        TbInventoryItemDictVo obj = null;

        HashMap<Integer, String> categories = TbCategoriesDictDao.getInstance().getCategoriesDictList();

        try {
            context = new InitialContext();
            dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
            conn = dataSource.getConnection();

            stmt = conn.createStatement();

            rs = stmt.executeQuery(String.format("SELECT * FROM (SELECT `sid`,`item_sid`,`serial_no`,`qty` FROM `tb_inventory_%s`) AS `a` RIGHT JOIN (SELECT `sid`,`item_code`,`model`,`description`,`distributor`,`manufacturer`,`color`,`condition`,`sku`,`item_cost`,`retail_price`,`wholesale_price` FROM `tb_item_dict_%s`) AS `b` ON `a`.`item_sid`=`b`.`sid`", storeId, storeId));

            while(rs.next()) {
                obj = new TbInventoryItemDictVo(
                        rs.getInt("sid"),
                        rs.getInt("item_sid"),
                        rs.getString("serial_no"),
                        rs.getInt("qty"),
                        rs.getString("item_code"),
                        rs.getString("model"),
                        rs.getString("description"),
                        rs.getString("distributor"),
                        rs.getInt("category"),
                        rs.getInt("sub_category"),
                        rs.getString("manufacturer"),
                        rs.getString("color"),
                        rs.getString("condition"),
                        rs.getString("sku"),
                        rs.getFloat("item_cost"),
                        0,
                        0,
                        0,
                        rs.getFloat("retail_price"),
                        rs.getFloat("wholesale_price"),
                        rs.getString("image")
                );

                if (categories.get(obj.getCategorySid()) != null) {
                    obj.setCategory(categories.get(obj.getCategorySid()));
                }

                if (categories.get(obj.getSubCategorySid()) != null) {
                    obj.setSubCategory(categories.get(obj.getSubCategorySid()));
                }

                list.add(obj);
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

    public Vector<TbInventoryItemDictVo> getItemDicInInventoryListByCategorySid(String storeId, int categorySid) {
        Vector<TbInventoryItemDictVo> list = new Vector<TbInventoryItemDictVo>();


        Context context = null;
        DataSource dataSource = null;
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        if (storeId == null) {
            return null;
        }

        TbInventoryItemDictVo obj = null;

        HashMap<Integer, String> categories = TbCategoriesDictDao.getInstance().getCategoriesDictList();

        try {
            context = new InitialContext();
            dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
            conn = dataSource.getConnection();

            stmt = conn.createStatement();

            rs = stmt.executeQuery(String.format("SELECT * FROM (SELECT `sid`,`item_sid`,`serial_no`,`qty` FROM `tb_inventory_%s`) AS `a` RIGHT JOIN (SELECT `sid`,`item_code`,`model`,`description`,`distributor`,`category`,`sub_category`,`manufacturer`,`color`,`condition`,`sku`,`item_cost`,`retail_price`,`wholesale_price` FROM `tb_item_dict_%s` WHERE `category`='%d') AS `b` ON `a`.`item_sid`=`b`.`sid`", storeId, storeId, categorySid));

            while(rs.next()) {
                obj = new TbInventoryItemDictVo(
                        rs.getInt("sid"),
                        rs.getInt("item_sid"),
                        rs.getString("serial_no"),
                        rs.getInt("qty"),
                        rs.getString("item_code"),
                        rs.getString("model"),
                        rs.getString("description"),
                        rs.getString("distributor"),
                        rs.getInt("category"),
                        rs.getInt("sub_category"),
                        rs.getString("manufacturer"),
                        rs.getString("color"),
                        rs.getString("condition"),
                        rs.getString("sku"),
                        rs.getFloat("item_cost"),
                        0,
                        0,
                        0,
                        rs.getFloat("retail_price"),
                        rs.getFloat("wholesale_price"),
                        null
                );

                if (categories.get(obj.getCategorySid()) != null) {
                    obj.setCategory(categories.get(obj.getCategorySid()));
                }

                if (categories.get(obj.getSubCategorySid()) != null) {
                    obj.setSubCategory(categories.get(obj.getSubCategorySid()));
                }

                list.add(obj);
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
