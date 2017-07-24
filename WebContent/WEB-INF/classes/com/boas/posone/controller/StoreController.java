package com.boas.posone.controller;

import com.boas.posone.util.MyRequestUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by Researcher01 on 2016-09-29.
 */
@WebServlet(name = "StoreController", urlPatterns="/StoreCtrl/*" )
public class StoreController extends HttpServlet {
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
            if (uri.equals("/getItemInInventoryBySerialNo")) {

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
