package com.boas.posone.db.dao;

import com.boas.posone.db.dto.StoreInfoDto;
import com.boas.posone.db.dto.TbItemDictDto;
import com.boas.posone.db.dto.UserInfoDto;
import com.boas.posone.db.vo.TbItemDictListVo;

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
public class TbItemDictDao {
    private static TbItemDictDao instance;
    public static TbItemDictDao getInstance() {
        if (instance == null) instance = new TbItemDictDao();
        return instance;
    }

    public Vector<TbItemDictListVo> getItemList(String storeId) {
        Vector<TbItemDictListVo> list = new Vector<TbItemDictListVo>();

        Context context = null;
        DataSource dataSource = null;
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        if (storeId == null) {
            return null;
        }

        HashMap<Integer, String> categories = TbCategoriesDictDao.getInstance().getCategoriesDictList();

        TbItemDictListVo obj = null;

        try {
            context = new InitialContext();
            dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
            conn = dataSource.getConnection();

            stmt = conn.createStatement();

            rs = stmt.executeQuery(String.format("SELECT * FROM `tb_categories_dict`; SELECT * FROM (SELECT `sid`,`item_code`,`model`,`description`,`distributor`,`category`,`sub_category`,`manufacturer`,`color`,`condition`,`item_cost`,`item_type`,`update_date`,`updater`,`user_id` FROM (SELECT * FROM `tb_item_dict_%s`) AS `a` LEFT JOIN (SELECT `user_no`, `user_id` FROM `user_info` ) AS `b` ON `a`.`updater`=`b`.`user_no` ) AS `ab` LEFT JOIN (SELECT `item_sid`,SUM(`qty`) AS `qty` FROM `tb_inventory_%s` GROUP BY `item_sid`) AS `c` ON `ab`.`sid`=`c`.`item_sid`", storeId, storeId));

            while(rs.next()) {
                obj = new TbItemDictListVo(
                        rs.getInt("sid"),
                        rs.getString("item_code"),
                        rs.getString("model"),
                        rs.getString("description"),
                        rs.getString("distributor"),
                        rs.getInt("category"),
                        rs.getInt("sub_category"),
                        rs.getString("manufacturer"),
                        rs.getString("color"),
                        rs.getString("condition"),
                        rs.getFloat("item_cost"),
                        rs.getInt("item_type"),
                        rs.getDate("update_date"),
                        rs.getInt("updater"),
                        rs.getString("user_id"),
                        rs.getInt("qty")
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

    public TbItemDictDto getItemInfoBySID(String storeId, int sid) {
        TbItemDictDto obj = null;

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

            rs = stmt.executeQuery(String.format("SELECT * FROM (SELECT * FROM `tb_item_dict_%s` WHERE `sid`='%d') AS `a` LEFT JOIN (SELECT `item_sid`,SUM(`qty`) AS `qty`, IF(MAX(serial_no) IS NOT NULL, 1, 0) AS `serializable` FROM `tb_inventory_%s` WHERE `item_sid`='%d' GROUP BY `item_sid`) AS `b` ON `a`.`sid`=`b`.`item_sid`", storeId, sid, storeId, sid));

            if(rs.next()) {
                obj = new TbItemDictDto(
                        rs.getInt("sid"),
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
                        rs.getInt("item_type"),
                        rs.getDate("update_date"),
                        rs.getInt("updater"),
                        rs.getInt("disable")
                );

                obj.setQty(rs.getInt("qty"));
                obj.setSerializable(rs.getInt("serializable"));
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

    public int updateItemDictInfo(int userSid, String storeId, TbItemDictDto mTbItemDicDto) {
        Context context = null;
        DataSource dataSource = null;
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        if (userSid == 0 || storeId == null) {
            return -1;
        }

        switch (mTbItemDicDto.getItemType()) {
            case 0: // Phone
            case 1: // Sim Card
                mTbItemDicDto.setRetailPrice(0);
                mTbItemDicDto.setWholesalePrice(0);
                break;
            case 2: // Accessory
                mTbItemDicDto.setNewPrice(0);
                mTbItemDicDto.setUpgradePrice(0);
                mTbItemDicDto.setSorPrice(0);
                break;
        }

        try {
            context = new InitialContext();
            dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
            conn = dataSource.getConnection();

            stmt = conn.createStatement();

            if (mTbItemDicDto.getSid() == 0) {
                stmt.execute(
                        String.format(
                                "INSERT INTO `tb_item_dict_%s`(`item_code`,`name`,`description`,`distributor`,`category`,`sub_category`,`manufacturer`,`color`,`condition`,`sku`,`item_cost`,`retail_price`,`wholesale_price`,`item_type`,`update_date`,`updater`,`disable`) VALUES('%s','%s','%s','%s','%d','%d','%s','%s','%s','%s','%f','%f','%f','%d',NOW(),'%d','%d')",
                                storeId,
                                mTbItemDicDto.getItemCode(), mTbItemDicDto.getName(), mTbItemDicDto.getDescription(), mTbItemDicDto.getDistributor(),
                                mTbItemDicDto.getCategorySid(), mTbItemDicDto.getSubCategorySid(), mTbItemDicDto.getManufacturer(), mTbItemDicDto.getColor(), mTbItemDicDto.getCondition(),
                                mTbItemDicDto.getSku(), mTbItemDicDto.getItemCost(),
                                mTbItemDicDto.getRetailPrice(), mTbItemDicDto.getWholesalePrice(), mTbItemDicDto.getItemType(),
                                userSid, mTbItemDicDto.getDisable()
                        ));

                try {
                    if (stmt != null && !stmt.isClosed()) {
                        stmt.close();
                    }
                } catch (Exception e2) {

                }

                if (mTbItemDicDto.getItemType() == 3) {
                    stmt = conn.createStatement();
                    rs = stmt.executeQuery(String.format("SELECT `sid` FROM `tb_item_dict_%s` WHERE `item_code`='%s' AND `name`='%s'", storeId, mTbItemDicDto.getItemCode(), mTbItemDicDto.getName()));
                    if (rs.next()) {
                        mTbItemDicDto.setSid(rs.getInt("sid"));
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

                    stmt = conn.createStatement();
                    stmt.execute(String.format("INSERT INTO `tb_inventory_%s`(`item_sid`,`qty`,`update_date`,`updater`) VALUES('%d','%d',NOW(),'%d')", storeId, mTbItemDicDto.getSid(), mTbItemDicDto.getQty(), userSid));
                }
            } else {
                stmt.execute(
                        String.format(
                                "UPDATE `tb_item_dict_%s` SET `item_code`='%s',`name`='%s',`description`='%s',`distributor`='%s',`category`='%d',`sub_category`='%d',`manufacturer`='%s',`color`='%s',`condition`='%s',`sku`='%s',`item_cost`='%f',`retail_price`='%f',`wholesale_price`='%f',`item_type`='%d',`update_date`=NOW(),`updater`='%d',`disable`='%d' WHERE `sid`='%d'",
                                storeId,
                                mTbItemDicDto.getItemCode(), mTbItemDicDto.getName(), mTbItemDicDto.getDescription(), mTbItemDicDto.getDistributor(),
                                mTbItemDicDto.getCategorySid(), mTbItemDicDto.getSubCategorySid(), mTbItemDicDto.getManufacturer(), mTbItemDicDto.getColor(),
                                mTbItemDicDto.getCondition(), mTbItemDicDto.getSku(), mTbItemDicDto.getItemCost(),
                                mTbItemDicDto.getRetailPrice(), mTbItemDicDto.getWholesalePrice(), mTbItemDicDto.getItemType(),
                                userSid, mTbItemDicDto.getDisable(), mTbItemDicDto.getSid()
                        ));

                try {
                    if (stmt != null && !stmt.isClosed()) {
                        stmt.close();
                    }
                } catch (Exception e2) {

                }

                if (mTbItemDicDto.getItemType() == 3 && mTbItemDicDto.getQty() != -999) {
                    stmt = conn.createStatement();
                    stmt.execute(String.format("UPDATE `tb_inventory_%s` SET`qty`='%d',`update_date`=NOW(),`updater`='%d' WHERE `item_sid`='%d'", storeId, mTbItemDicDto.getQty(), userSid, mTbItemDicDto.getSid()));
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
