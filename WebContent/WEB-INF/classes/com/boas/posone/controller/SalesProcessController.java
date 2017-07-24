package com.boas.posone.controller;

import com.boas.posone.db.dao.TbAccountsInfoDao;
import com.boas.posone.db.dao.TbInventoryDao;
import com.boas.posone.db.dao.TbItemDictDao;
import com.boas.posone.db.dao.TbRateplanDao;
import com.boas.posone.db.dto.TbAccountsInfoDto;
import com.boas.posone.db.vo.TbInventoryItemDictVo;
import com.boas.posone.db.vo.TbItemDictListVo;
import com.boas.posone.db.vo.TbRateplanListVo;
import com.boas.posone.util.MyRequestUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Vector;

/**
 * Created by Researcher01 on 2016-09-29.
 */
@WebServlet(name = "SalesProcessController", urlPatterns="/SalesProcessCtrl/*")
public class SalesProcessController extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String uri = request.getRequestURI().replace(request.getContextPath(), "").replace(request.getServletPath(), "");
        PrintWriter out = response.getWriter();
        HttpSession session = request.getSession();

        StringBuffer sb = new StringBuffer();

        request.setCharacterEncoding("utf-8");
        response.setContentType("text/plain; charset=UTF-8");
        response.setCharacterEncoding("utf-8");

        int i = 0, len = 0, pageNo = 0, countPerPage = 0;

        try {
            if (uri.equals("/getAccountAsapInfo")) {
                if (session.getAttribute("posone_login_store_id") == null) return;

                TbAccountsInfoDto mTbAccountAsapQpayDto = TbAccountsInfoDao.getInstance().getAccountAsapInfo(session.getAttribute("posone_login_store_id").toString());

                if (mTbAccountAsapQpayDto != null) {
                    out.print(String.format("%s", mTbAccountAsapQpayDto.toString()));
                } else {
                    out.print(String.format(""));
                }

            } else if (uri.equals("/getAccountQpayInfo")) {
                if (session.getAttribute("posone_login_store_id") == null) return;

                TbAccountsInfoDto mTbAccountAsapQpayDto = TbAccountsInfoDao.getInstance().getAccountQpayInfo(session.getAttribute("posone_login_store_id").toString());

                if (mTbAccountAsapQpayDto != null) {
                    out.print(String.format("%s", mTbAccountAsapQpayDto.toString()));
                } else {
                    out.print(String.format(""));
                }
            } else if (uri.equals("/getAccountAsapQpayInfo")) {
                if (session.getAttribute("posone_login_store_id") == null) return;

                TbAccountsInfoDto mTbAccountAsapQpayDto = TbAccountsInfoDao.getInstance().getAccountAsapQpayInfo(session.getAttribute("posone_login_store_id").toString());

                if (mTbAccountAsapQpayDto != null) {
                    out.print(String.format("%s", mTbAccountAsapQpayDto.toString()));
                } else {
                    out.print(String.format(""));
                }
            } else if (uri.equals("/getItemInInventoryBySerialNo")) {
                if (session.getAttribute("posone_login_store_id") == null) return;

                TbInventoryItemDictVo mTbInventoryItemDictVo = TbInventoryDao.getInstance().getItemInInventoryBySerialNo(session.getAttribute("posone_login_store_id").toString(), MyRequestUtil.getString(request, "serialNo", null));

                if (mTbInventoryItemDictVo != null) {
                    out.print(String.format("{\"data\":%s}", mTbInventoryItemDictVo.toJsonString()));
                } else {
                    out.print(String.format("{\"data\":null}"));
                }
            } else if (uri.equals("/getItemInInventoryBySerialNoOrSKU")) {
                if (session.getAttribute("posone_login_store_id") == null) return;

                TbInventoryItemDictVo mTbInventoryItemDictVo = TbInventoryDao.getInstance().getItemInInventoryBySerialNo(session.getAttribute("posone_login_store_id").toString(), MyRequestUtil.getString(request, "keyword", null));

                if (mTbInventoryItemDictVo == null) {
                    mTbInventoryItemDictVo = TbInventoryDao.getInstance().getItemInInventoryBySKU(session.getAttribute("posone_login_store_id").toString(), MyRequestUtil.getString(request, "keyword", null));
                }

                if (mTbInventoryItemDictVo != null) {
                    out.print(String.format("{\"data\":%s}", mTbInventoryItemDictVo.toJsonString()));
                } else {
                    out.print(String.format("{\"data\":null}"));
                }
            } else if (uri.equals("/newactivationSelectPhone")) {
                if (session.getAttribute("posone_login_store_id") == null) return;

                TbInventoryItemDictVo mTbInventoryItemDictVo = TbInventoryDao.getInstance().getItemInInventoryBySerialNo(session.getAttribute("posone_login_store_id").toString(), MyRequestUtil.getString(request, "serialNo", null));

                if (mTbInventoryItemDictVo != null) {
                    out.print(String.format("{\"data\":%s}", mTbInventoryItemDictVo.toJsonString()));
                } else {
                    out.print(String.format("{\"data\":null}"));
                }
            } else if (uri.equals("/newActivationGetAccessoryList")) {
                if (session.getAttribute("posone_login_store_id") == null) return;

                Vector<TbInventoryItemDictVo> newActivationAccessoryList = TbInventoryDao.getInstance().getItemDicInInventoryListByCategorySid(session.getAttribute("posone_login_store_id").toString(), 4);

                if (newActivationAccessoryList != null && newActivationAccessoryList.size() > 0) {
                    sb.append("{\"data\":[");
                    for (i = 0, len = newActivationAccessoryList.size(); i < len; i++) {
                        if (i < len -1) sb.append(String.format("%s,", newActivationAccessoryList.get(i).toJsonString()));
                        else sb.append(String.format("%s", newActivationAccessoryList.get(i).toJsonString()));
                    }
                    sb.append("]}");
                    out.print(sb.toString());
                } else {
                    out.print("{\"data\":[]}");
                }
            } else if (uri.equals("/newActivationAddAccessory")) {
                if (session.getAttribute("posone_login_store_id") == null) return;

                TbInventoryItemDictVo mTbInventoryItemDictVo = TbInventoryDao.getInstance().getItemInInventoryBySerialNo(session.getAttribute("posone_login_store_id").toString(), MyRequestUtil.getString(request, "code", null));

                if (mTbInventoryItemDictVo == null) {
                    mTbInventoryItemDictVo = TbInventoryDao.getInstance().getItemInInventoryBySKU(session.getAttribute("posone_login_store_id").toString(), MyRequestUtil.getString(request, "code", null));
                }

                if (mTbInventoryItemDictVo != null) {
                    out.print(String.format("{\"data\":%s}", mTbInventoryItemDictVo.toJsonString()));
                } else {
                    out.print(String.format("{\"data\":null}"));
                }

            } else if (uri.equals("/newActivationGetRateplanList")) {
                if (session.getAttribute("posone_login_store_id") == null) return;

                Vector<TbRateplanListVo> rateplanList = TbRateplanDao.getInstance().getRateplanList(
                    ( (MyRequestUtil.getInt(request, "dateLimited", 0) > 0)? true: false ),
                    ( (MyRequestUtil.getInt(request, "isContainsDisabled", 0) > 0)? true: false ),
                    MyRequestUtil.getInt(request, "planType", -1),
                    MyRequestUtil.getInt(request, "groupType", -1)
                );

                if (rateplanList != null && rateplanList.size() > 0) {
                    sb.append("{\"data\":[");
                    for (i = 0, len = rateplanList.size(); i < len; i++) {
                        if (i < len -1) sb.append(String.format("%s,", rateplanList.get(i).toJsonString()));
                        else sb.append(String.format("%s", rateplanList.get(i).toJsonString()));
                    }
                    sb.append("]}");
                    out.print(sb.toString());
                } else {
                    out.print("{\"data\":[]}");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
