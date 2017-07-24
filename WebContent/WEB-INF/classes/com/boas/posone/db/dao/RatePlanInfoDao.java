package com.boas.posone.db.dao;

import com.boas.posone.db.dto.RatePlanInfoDto;
import com.boas.posone.db.dto.UserInfoDto;
import com.boas.posone.db.vo.RatePlanInfoListVo;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Vector;

/**
 * Created by Researcher01 on 2016-09-27.
 */
public class RatePlanInfoDao {
    private static RatePlanInfoDao instance;
    public static RatePlanInfoDao getInstance() {
        if (instance == null) instance = new RatePlanInfoDao();
        return instance;
    }

    public Vector<RatePlanInfoListVo> getRatePlanInfoList() {
        Vector<RatePlanInfoListVo> list = new Vector<RatePlanInfoListVo>();
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

            rs = stmt.executeQuery(String.format("SELECT `rate_plan_no`, `carrier`, `plan_code`, `plan_desc`, `plan_type`, `group_type`, `mrc`, `updated_user_no`, `updated_user_id`, DATE_FORMAT(`updated_datetime`, '%%m/%%d/%%Y %%h:%%i:%%s %%p') as `_updated_datetime` FROM `rate_plan_info`"));

            while(rs.next()) {
                list.add(new RatePlanInfoListVo(
                        rs.getInt("rate_plan_no"),
                        rs.getString("carrier"),
                        rs.getString("plan_code"),
                        rs.getString("plan_desc"),
                        rs.getString("plan_type"),
                        rs.getString("group_type"),
                        rs.getFloat("mrc"),
                        rs.getInt("updated_user_no"),
                        rs.getString("updated_user_id"),
                        rs.getString("_updated_datetime")
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

    public RatePlanInfoDto getRatePlanInfoByPlanCode(String planCode) {
        RatePlanInfoDto obj = null;
        Context context = null;
        DataSource dataSource = null;
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        if (planCode == null) {
            return null;
        }

        try {
            context = new InitialContext();
            dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
            conn = dataSource.getConnection();

            stmt = conn.createStatement();

            rs = stmt.executeQuery(String.format("SELECT *, DATE_FORMAT(`updated_datetime`, '%%m/%%d/%%Y %%h:%%i:%%s %%p') as `_updated_datetime` FROM `rate_plan_info` WHERE `plan_code`='%s'", planCode));

            if(rs.next()) {
                obj = new RatePlanInfoDto(
                        rs.getInt("rate_plan_no"),
                        rs.getString("carrier"),
                        rs.getString("plan_code"),
                        rs.getString("plan_desc"),
                        rs.getString("plan_type"),
                        rs.getString("group_type"),
                        rs.getFloat("mrc"),
                        rs.getInt("react_plan_flag"),
                        rs.getFloat("newact_prime_com"),
                        rs.getFloat("newact_subprime_com"),
                        rs.getFloat("newact_eipvad_com"),
                        rs.getFloat("upgrade_upg_com"),
                        rs.getFloat("upgrade_eipvad_com"),
                        rs.getFloat("emp_prime_com"),
                        rs.getFloat("emp_subprime_com"),
                        rs.getFloat("emp_eipvad_com_1"),
                        rs.getFloat("emp_upg_com"),
                        rs.getFloat("emp_eipvad_com_2"),
                        rs.getFloat("mrc_amnt_for_pre_collect"),
                        rs.getInt("updated_user_no"),
                        rs.getString("updated_user_id"),
                        rs.getString("_updated_datetime")
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

    public int updateRatePlanInfo(String sessionUserInfo, RatePlanInfoDto mRatePlanInfoDto, String oldPlanCode) {
        Context context = null;
        DataSource dataSource = null;
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        UserInfoDto mUserInfoDto = UserInfoDao.getInstance().getUserInfoBySessionUserData(sessionUserInfo);

        if (mUserInfoDto == null) {
            return -1;
        }

        try {
            context = new InitialContext();
            dataSource = (DataSource) context.lookup("java:comp/env/jdbc/MySQL");
            conn = dataSource.getConnection();

            stmt = conn.createStatement();

            if (oldPlanCode == null) {
                stmt.execute(
                        String.format(
                                "INSERT INTO `rate_plan_info`(`carrier`,`plan_code`,`plan_desc`,`plan_type`,`group_type`,`mrc`,`react_plan_flag`,`newact_prime_com`,`newact_subprime_com`,`newact_eipvad_com`,`upgrade_upg_com`,`upgrade_eipvad_com`,`emp_prime_com`,`emp_subprime_com`,`emp_eipvad_com_1`,`emp_upg_com`,`emp_eipvad_com_2`,`mrc_amnt_for_pre_collect`,`updated_user_no`,`updated_user_id`,`updated_datetime`) VALUES('%s','%s','%s','%s','%s','%f','%d','%f','%f','%f','%f','%f','%f','%f','%f','%f','%f','%f','%d','%s',NOW())",
                                mRatePlanInfoDto.getCarrier(),  mRatePlanInfoDto.getPlanCode(), mRatePlanInfoDto.getPlanDesc(), mRatePlanInfoDto.getPlanType(),
                                mRatePlanInfoDto.getGroupType(),    mRatePlanInfoDto.getMrc(),      mRatePlanInfoDto.getReactPlanFlag(),    mRatePlanInfoDto.getNewactPrimeCom(),
                                mRatePlanInfoDto.getNewactSubprimeCom(),    mRatePlanInfoDto.getNewactEipvadCom(),  mRatePlanInfoDto.getUpgradeUpgCom(),    mRatePlanInfoDto.getUpgradeEipvadCom(),
                                mRatePlanInfoDto.getEmpPrimeCom(),  mRatePlanInfoDto.getEmpSubprimeCom(),   mRatePlanInfoDto.getEmpEipvadCom1(),    mRatePlanInfoDto.getEmpUpgCom(),
                                mRatePlanInfoDto.getEmpEipvadCom2(),    mRatePlanInfoDto.getMrcAmntForPreCollect(),    mUserInfoDto.getUserNo(),   mUserInfoDto.getUserId()
                        ));
            } else {
                stmt.execute(
                        String.format(
                                "UPDATE `rate_plan_info` SET `carrier`='%s', `plan_code` = '%s', `plan_desc` = '%s', `plan_type` = '%s', `group_type` = '%s', `mrc` = '%f', `react_plan_flag` = '%d', `newact_prime_com` = '%f', `newact_subprime_com` = '%f', `newact_eipvad_com` = '%f', `upgrade_upg_com` = '%f', `upgrade_eipvad_com` = '%f', `emp_prime_com` = '%f', `emp_subprime_com` = '%f', `emp_eipvad_com_1` = '%f', `emp_upg_com` = '%f', `emp_eipvad_com_2` = '%f', `mrc_amnt_for_pre_collect` = '%f', `updated_user_no` = '%d', `updated_user_id` = '%s', `updated_datetime` = NOW() WHERE `plan_code` = '%s'",
                                mRatePlanInfoDto.getCarrier(),  mRatePlanInfoDto.getPlanCode(), mRatePlanInfoDto.getPlanDesc(), mRatePlanInfoDto.getPlanType(),
                                mRatePlanInfoDto.getGroupType(),    mRatePlanInfoDto.getMrc(),      mRatePlanInfoDto.getReactPlanFlag(),    mRatePlanInfoDto.getNewactPrimeCom(),
                                mRatePlanInfoDto.getNewactSubprimeCom(),    mRatePlanInfoDto.getNewactEipvadCom(),  mRatePlanInfoDto.getUpgradeUpgCom(),    mRatePlanInfoDto.getUpgradeEipvadCom(),
                                mRatePlanInfoDto.getEmpPrimeCom(),  mRatePlanInfoDto.getEmpSubprimeCom(),   mRatePlanInfoDto.getEmpEipvadCom1(),    mRatePlanInfoDto.getEmpUpgCom(),
                                mRatePlanInfoDto.getEmpEipvadCom2(),    mRatePlanInfoDto.getMrcAmntForPreCollect(),    mUserInfoDto.getUserNo(),   mUserInfoDto.getUserId(),   oldPlanCode
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
