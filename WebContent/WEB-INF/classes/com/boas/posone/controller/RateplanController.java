package com.boas.posone.controller;

import com.boas.posone.db.dao.TbRateplanDao;
import com.boas.posone.db.dto.TbRateplanDto;
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
 * Created by Researcher01 on 2016-09-30.
 */
@WebServlet(name = "RateplanController", urlPatterns = "/RateplanCtrl/*")
public class RateplanController extends HttpServlet {
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
            if (uri.equals("/RateplanList")) {
                Vector<TbRateplanListVo> rateplanList = TbRateplanDao.getInstance().getRateplanList(
                        ( (MyRequestUtil.getInt(request, "dateLimited", 0) > 0)? true: false ),
                        ( (MyRequestUtil.getInt(request, "isContainsDisabled", 0) > 0)? true: false ),
                        MyRequestUtil.getInt(request, "plan_type", -1),
                        MyRequestUtil.getInt(request, "group_type", -1)
                );
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
