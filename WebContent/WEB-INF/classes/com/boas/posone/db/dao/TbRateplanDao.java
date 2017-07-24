package com.boas.posone.db.dao;

import com.boas.posone.db.dto.TbRateplanDto;
import com.boas.posone.db.vo.TbRateplanListVo;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Vector;

/**
 * Created by Researcher01 on 2016-09-29.
 */
public class TbRateplanDao {
    private static TbRateplanDao instance;
    public static TbRateplanDao getInstance() {
        if (instance == null) instance = new TbRateplanDao();
        return instance;
    }

    public Vector<TbRateplanListVo> getRateplanList(boolean dateLimited, boolean isContainsDisabled, int planType, int groupType) {
        Vector<TbRateplanListVo> list = new Vector<TbRateplanListVo>();

        Context context = null;
        DataSource dataSource = null;
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        StringBuffer query = new StringBuffer();

        String andStr = " AND";
        String whereStr = " WHERE";

        int num = 0;

        try {
            context = new InitialContext();
            dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
            conn = dataSource.getConnection();

            stmt = conn.createStatement();

            query.append("SELECT `a`.*, `b`.`user_id` FROM (");

            query.append("SELECT * FROM `tb_rateplan`");

            query.append(whereStr);

            if (dateLimited) {
                Calendar c = Calendar.getInstance();
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
                query.append(String.format(" (`start_date` <= '%s' AND `end_date` >= '%s') AND", sdf.format(c.getTime())));
            }

            if (isContainsDisabled) {
                query.append(" `disable`='1' AND");
            }

            if (planType > -1) {
                query.append(String.format(" `plan_type`='%d' AND", planType));
            }

            if (groupType > -1) {
                query.append(String.format(" `group_type`='%d' AND", groupType));
            }

            num = query.lastIndexOf(whereStr);
            if (num == query.length() - whereStr.length()) {
                query.delete(num, num + whereStr.length());
            }

            num = query.lastIndexOf(andStr);
            if (num == query.length() - andStr.length()) {
                query.delete(num, num + andStr.length());
            }

            query.append(") AS `a` LEFT JOIN (SELECT `sid`, `user_id` FROM `tb_user`) as `b` ON `a`.`updater`=`b`.`sid`");

            rs = stmt.executeQuery(query.toString());

            while(rs.next()) {
                list.add(new TbRateplanListVo(
                    rs.getInt("sid"),
                    rs.getString("rateplan_code"),
                    rs.getString("carrier"),
                    rs.getString("description"),
                    rs.getInt("plan_type"),
                    rs.getInt("group_type"),
                    rs.getFloat("mrc"),
                    rs.getInt("react_plan_flag"),
                    rs.getDate("start_date"),
                    rs.getDate("end_date"),
                    rs.getInt("updater"),
                    rs.getDate("update_date"),
                    rs.getInt("disable"),
                    rs.getString("user_id")
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

    public TbRateplanDto getRateplanByRateplanCode(String rateplanCode) {
        TbRateplanDto obj = null;

        Context context = null;
        DataSource dataSource = null;
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        if (rateplanCode == null) {
            return null;
        }

        try {
            context = new InitialContext();
            dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
            conn = dataSource.getConnection();

            rs = stmt.executeQuery(String.format("SELECT * FROM `tb_rateplan` WHERE `rateplan_code`='%s'", rateplanCode));

            if(rs.next()) {
                obj = new TbRateplanDto(
                        rs.getInt("sid"),
                        rs.getString("rateplan_code"),
                        rs.getString("carrier"),
                        rs.getString("description"),
                        rs.getInt("plan_type"),
                        rs.getInt("group_type"),
                        rs.getFloat("mrc"),
                        rs.getInt("react_plan_flag"),
                        rs.getDate("start_date"),
                        rs.getDate("end_date"),
                        rs.getInt("updater"),
                        rs.getDate("update_date"),
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
}
