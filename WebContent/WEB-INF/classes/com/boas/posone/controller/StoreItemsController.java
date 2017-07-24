package com.boas.posone.controller;

import com.boas.posone.db.dao.TbCategoriesDictDao;
import com.boas.posone.db.dao.TbItemDictDao;
import com.boas.posone.db.dao.TbRateplanDao;
import com.boas.posone.db.dto.TbCategoriesDictDto;
import com.boas.posone.db.dto.TbItemDictDto;
import com.boas.posone.db.dto.TbRateplanDto;
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
 * Created by Researcher01 on 2016-09-28.
 */
@WebServlet(name = "StoreItemsController", urlPatterns="/StoreItemsCtrl/*")
public class StoreItemsController extends HttpServlet {
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
            if (uri.equals("/getItemDictList")) {
                if (session.getAttribute("posone_login_store_id") == null) return;

                Vector<TbItemDictListVo> itemDictList = TbItemDictDao.getInstance().getItemList(session.getAttribute("posone_login_store_id").toString());

                if (itemDictList != null && itemDictList.size() > 0) {
                    sb.append("{\"data\":[");
                    for (i = 0, len = itemDictList.size(); i < len; i++) {
                        if (i < len -1) sb.append(String.format("%s,", itemDictList.get(i).toJsonString()));
                        else sb.append(String.format("%s", itemDictList.get(i).toJsonString()));
                    }
                    sb.append("]}");
                    out.print(sb.toString());
                } else {
                    out.print("{\"data\":[]}");
                }
            }
            else if (uri.equals("/getItemDictListAdmin")) {
                if (session.getAttribute("posone_admin_login_store_id") == null) return;

                Vector<TbItemDictListVo> itemDictList = TbItemDictDao.getInstance().getItemList(session.getAttribute("posone_admin_login_store_id").toString());

                if (itemDictList != null && itemDictList.size() > 0) {
                    sb.append("{\"data\":[");
                    for (i = 0, len = itemDictList.size(); i < len; i++) {
                        if (i < len -1) sb.append(String.format("%s,", itemDictList.get(i).toJsonString()));
                        else sb.append(String.format("%s", itemDictList.get(i).toJsonString()));
                    }
                    sb.append("]}");
                    out.print(sb.toString());
                } else {
                    out.print("{\"data\":[]}");
                }
            } else if (uri.equals("/getItemDictInfoBySID")) {
                if (session.getAttribute("posone_login_store_id") == null) return;


                TbItemDictDto mTbItemDictDto = TbItemDictDao.getInstance().getItemInfoBySID(session.getAttribute("posone_login_store_id").toString(), MyRequestUtil.getInt(request, "sid", 0));

                if (mTbItemDictDto != null) {
                    out.print(String.format("{\"data\":%s}", mTbItemDictDto.toJsonString()));
                } else {
                    out.print(String.format("{\"data\":null}"));
                }
            } else if (uri.equals("/getCategoriesByParentSID")) {
                Vector<TbCategoriesDictDto> categoriesDictList = TbCategoriesDictDao.getInstance().getCategoriesByParentSID(MyRequestUtil.getInt(request, "parentSid", 0));
                if (categoriesDictList != null && categoriesDictList.size() > 0) {
                    sb.append("{\"data\":[");
                    for (i = 0, len = categoriesDictList.size(); i < len; i++) {
                        if (i < len -1) sb.append(String.format("%s,", categoriesDictList.get(i).toJsonString()));
                        else sb.append(String.format("%s", categoriesDictList.get(i).toJsonString()));
                    }
                    sb.append("]}");
                    out.print(sb.toString());
                } else {
                    out.print("{\"data\":[]}");
                }
            } else if (uri.equals("/updateItemDictInfo")) {
                if (session.getAttribute("posone_login_store_id") == null) return;
                if (session.getAttribute("posone_login_user_sid") == null) return;

                TbItemDictDto mTbItemDictDto = new TbItemDictDto();
                mTbItemDictDto.setSid(MyRequestUtil.getInt(request, "sid", 0));
                mTbItemDictDto.setItemCode(MyRequestUtil.getString(request, "itemCode", null));
                mTbItemDictDto.setName(MyRequestUtil.getString(request, "name", null));
                mTbItemDictDto.setDescription(MyRequestUtil.getString(request, "description", null));
                mTbItemDictDto.setDistributor(MyRequestUtil.getString(request, "distributor", null));
                mTbItemDictDto.setCategorySid(MyRequestUtil.getInt(request, "category", 0));
                mTbItemDictDto.setSubCategorySid(MyRequestUtil.getInt(request, "subCategory", 0));
                mTbItemDictDto.setManufacturer(MyRequestUtil.getString(request, "manufacturer", null));
                mTbItemDictDto.setColor(MyRequestUtil.getString(request, "color", null));
                mTbItemDictDto.setCondition(MyRequestUtil.getString(request, "condition", null));
                mTbItemDictDto.setSku(MyRequestUtil.getString(request, "sku", null));
                mTbItemDictDto.setItemType(MyRequestUtil.getInt(request, "itemType", 0));
                mTbItemDictDto.setItemCost(MyRequestUtil.getFloat(request, "itemCost", 0));
                switch (mTbItemDictDto.getItemType()) {
                    case 0:
                    case 1:
                        mTbItemDictDto.setNewPrice(MyRequestUtil.getFloat(request, "newPrice", 0));
                        mTbItemDictDto.setUpgradePrice(MyRequestUtil.getFloat(request, "upgradePrice", 0));
                        mTbItemDictDto.setSorPrice(MyRequestUtil.getFloat(request, "sorPrice", 0));
                        break;
                    case 3:
                        mTbItemDictDto.setQty(MyRequestUtil.getInt(request, "qty", 0));
                        mTbItemDictDto.setRetailPrice(MyRequestUtil.getFloat(request, "retailPrice", 0));
                        mTbItemDictDto.setWholesalePrice(MyRequestUtil.getFloat(request, "wholesalePrice", 0));
                        break;
                }

                out.print(String.format("%d", TbItemDictDao.getInstance().updateItemDictInfo(Integer.parseInt(session.getAttribute("posone_login_user_sid").toString()), session.getAttribute("posone_login_store_id").toString(), mTbItemDictDto)));
            } else if (uri.equals("/getRateplanList")) {

                boolean dateLimited = (MyRequestUtil.getInt(request, "dateLimited", 0) > 0)? true : false ;
                boolean isContainsDisabled = (MyRequestUtil.getInt(request, "isContainsDisabled", 0) > 0)? true : false ;

                Vector<TbRateplanListVo> rateplanList = TbRateplanDao.getInstance().getRateplanList(
                        ( (MyRequestUtil.getInt(request, "dateLimited", 0) > 0)? true: false ),
                        ( (MyRequestUtil.getInt(request, "isContainsDisabled", 0) > 0)? true: false ),
                        MyRequestUtil.getInt(request, "plan_type", -1),
                        MyRequestUtil.getInt(request, "group_type", -1)
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
            } else if (uri.equals("/getRateplanByRateplanCode")) {

                TbRateplanDto mTbRateplanDto = TbRateplanDao.getInstance().getRateplanByRateplanCode(MyRequestUtil.getString(request, "rateplanCode", null));

                if (mTbRateplanDto != null) {
                    out.print(String.format("{\"data\":%s}", mTbRateplanDto.toJsonString()));
                } else {
                    out.print(String.format("{\"data\":null}"));
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
