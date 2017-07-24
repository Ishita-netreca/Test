package com.boas.posone.db.dao;

import com.boas.posone.db.dto.StoreInfoDto;
import com.boas.posone.db.dto.StoreInvenInfoDto;
import com.boas.posone.db.vo.StoreInvenInfoListVo;

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
public class StoreInvenInfoDao {

    private static StoreInvenInfoDao instance;

    public static StoreInvenInfoDao getInstance() {
        if (instance == null) instance = new StoreInvenInfoDao();
        return instance;
    }

    public Vector<StoreInvenInfoListVo> getStoreInvenList(String sessionUserInfo) {
        Vector<StoreInvenInfoListVo> list = new Vector<StoreInvenInfoListVo>();


        Context context = null;
        DataSource dataSource = null;
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        int storeNo = StoreInfoDao.getInstance().getStoreNoBySessionUserData(sessionUserInfo);
        if (storeNo == 0) {
            return null;
        }

        try {
            context = new InitialContext();
            dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
            conn = dataSource.getConnection();

            stmt = conn.createStatement();

            rs = stmt.executeQuery(String.format("SELECT `ab`.*, `c`.`sub_ctgr_name` FROM ( SELECT `a`.*, `b`.`ctgr_name` FROM ( SELECT *, SUM(`qty`) AS `_qty` FROM `store_inven_info` WHERE `store_no`='%d' GROUP BY `item_no` ) AS `a` LEFT JOIN `item_ctgr_info` `b` ON `a`.`ctgr_no`=`b`.`ctgr_no` ) AS `ab` LEFT JOIN `item_sub_ctgr_info` AS `c` ON `ab`.`sub_ctgr_no`=`c`.`sub_ctgr_no`", storeNo));

            while(rs.next()) {
                list.add(new StoreInvenInfoListVo(
                        rs.getInt("inven_no"),
                        rs.getInt("store_no"),
                        rs.getString("item_no"),
                        rs.getString("desc"),
                        rs.getString("company"),
                        rs.getInt("ctgr_no"),
                        rs.getInt("sub_ctgr_no"),
                        rs.getString("manufacturer"),
                        rs.getString("color"),
                        rs.getFloat("srp"),
                        rs.getInt("_qty"),
                        rs.getInt("disable"),
                        rs.getString("ctgr_name"),
                        rs.getString("sub_ctgr_name")
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


    public Vector<StoreInvenInfoListVo> searchStoreInvenList(String sessionUserInfo, String keyword, int type) {
        Vector<StoreInvenInfoListVo> list = new Vector<StoreInvenInfoListVo>();

        Context context = null;
        DataSource dataSource = null;
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        if (keyword == null) return null;

        StringBuffer query = new StringBuffer();

        int storeNo = StoreInfoDao.getInstance().getStoreNoBySessionUserData(sessionUserInfo);
        if (storeNo == 0) {
            return null;
        }

        try {
            context = new InitialContext();
            dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
            conn = dataSource.getConnection();

            stmt = conn.createStatement();

            query.append(String.format("SELECT `ab`.*, `c`.`sub_ctgr_name` FROM ( SELECT `a`.*, `b`.`ctgr_name` FROM ( SELECT *, SUM(`qty`) AS `_qty` FROM `store_inven_info` WHERE `store_no`='%d' GROUP BY `item_no` ) AS `a` LEFT JOIN `item_ctgr_info` `b` ON `a`.`ctgr_no`=`b`.`ctgr_no` ) AS `ab` LEFT JOIN `item_sub_ctgr_info` AS `c` ON `ab`.`sub_ctgr_no`=`c`.`sub_ctgr_no`", storeNo));

            switch(type) {
                case 1:
                    query.append(String.format(" `company` LIKE '%%%s%%'", keyword));
                    break;
                case 2:
                    query.append(String.format(" WHERE `ctgr_name` LIKE '%%%s%%'", keyword));
                    break;
                case 3:
                    query.append(String.format(" WHERE `sub_ctgr_name` LIKE '%%%s%%'", keyword));
                    break;
                case 4:
                    query.append(String.format(" WHERE `manufacturer` LIKE '%%%s%%'", keyword));
                    break;
                default:
                    query.append(String.format(" WHERE `company` LIKE '%%%s%%' OR `manufacturer` LIKE '%%%s%%' OR `ctgr_name` LIKE '%%%s%%' OR `sub_ctgr_name` LIKE '%%%s%%'", keyword, keyword, keyword, keyword));
                    break;
            }

            rs = stmt.executeQuery(query.toString());

            while(rs.next()) {
                list.add(new StoreInvenInfoListVo(
                        rs.getInt("inven_no"),
                        rs.getInt("store_no"),
                        rs.getString("item_no"),
                        rs.getString("desc"),
                        rs.getString("company"),
                        rs.getInt("ctgr_no"),
                        rs.getInt("sub_ctgr_no"),
                        rs.getString("manufacturer"),
                        rs.getString("color"),
                        rs.getFloat("srp"),
                        rs.getInt("_qty"),
                        rs.getInt("disable"),
                        rs.getString("ctgr_name"),
                        rs.getString("sub_ctgr_name")
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

    public StoreInvenInfoDto getStoreInvenInfo(String sessionUserInfo, String itemNo) {
        StoreInvenInfoDto obj = null;


        Context context = null;
        DataSource dataSource = null;
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        int storeNo = StoreInfoDao.getInstance().getStoreNoBySessionUserData(sessionUserInfo);
        if (storeNo == 0) {
            return null;
        }

        try {
            context = new InitialContext();
            dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
            conn = dataSource.getConnection();

            stmt = conn.createStatement();

            rs = stmt.executeQuery(String.format("SELECT *, SUM(`qty`) AS `_qty` FROM `store_inven_info` WHERE `store_no`='%d' AND `item_no`='%s' GROUP BY `item_no`", storeNo, itemNo));

            while(rs.next()) {
                obj = new StoreInvenInfoDto(
                        rs.getInt("inven_no"),
                        rs.getInt("store_no"),
                        rs.getString("item_no"),
                        rs.getString("desc"),
                        rs.getString("serial_no"),
                        rs.getString("company"),
                        rs.getInt("ctgr_no"),
                        rs.getInt("sub_ctgr_no"),
                        rs.getString("manufacturer"),
                        rs.getString("color"),
                        rs.getFloat("srp"),
                        rs.getInt("_qty"),
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

        return obj;
    }

    public int updateItemInfoinInven(String sessionUserInfo, StoreInvenInfoDto mStoreInvenInfoDto, String oldItemNo) {
        Context context = null;
        DataSource dataSource = null;
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        int storeNo = StoreInfoDao.getInstance().getStoreNoBySessionUserData(sessionUserInfo);
        if (storeNo == 0) {
            return -1;
        }

        try {
            context = new InitialContext();
            dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
            conn = dataSource.getConnection();

            stmt = conn.createStatement();

            if (oldItemNo == null) {
                stmt.execute(
                    String.format(
                        "INSERT INTO `store_inven_info`(`store_no`,`item_no`,`desc`,`company`,`ctgr_no`,`sub_ctgr_no`,`manufacturer`,`color`,`srp`,`qty`,`disable`) VALUES('%d','%s','%s','%s','%d','%d','%s','%s','%f','%d','%d')",
                        storeNo, mStoreInvenInfoDto.getItemNo(), mStoreInvenInfoDto.getDesc(), mStoreInvenInfoDto.getCompany(), mStoreInvenInfoDto.getCtgr(), mStoreInvenInfoDto.getSubCtgr(),
                            mStoreInvenInfoDto.getManufacturer(), mStoreInvenInfoDto.getColor(), mStoreInvenInfoDto.getSrp(), mStoreInvenInfoDto.getQty(), mStoreInvenInfoDto.getDisable()
                ));
            } else {
                stmt.execute(
                    String.format(
                            "UPDATE `store_inven_info` SET `item_no`='%s',`desc`='%s',`company`='%s',`ctgr_no`='%d',`sub_ctgr_no`='%d',`manufacturer`='%s',`color`='%s',`srp`='%f',`qty`='%d',`disable`='%d' WHERE `item_no`='%s' AND `store_no`='%d'",
                            mStoreInvenInfoDto.getItemNo(), mStoreInvenInfoDto.getDesc(), mStoreInvenInfoDto.getCompany(), mStoreInvenInfoDto.getCtgr(), mStoreInvenInfoDto.getSubCtgr(),
                            mStoreInvenInfoDto.getManufacturer(), mStoreInvenInfoDto.getColor(), mStoreInvenInfoDto.getSrp(), mStoreInvenInfoDto.getQty(), mStoreInvenInfoDto.getDisable(), oldItemNo, storeNo
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

        return 0;
    }
}
