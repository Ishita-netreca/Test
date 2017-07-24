package com.boas.posone.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.boas.posone.db.dao.UserInfoDao;
import com.boas.posone.util.MyRequestUtil;

/**
 * Servlet implementation class SalesCtrl
 */
@WebServlet(name = "SalesCtrl", urlPatterns="/SalesCtrl/*")
public class SalesCtrl extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SalesCtrl() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String uri = request.getRequestURI().replace(request.getContextPath(), "").replace(request.getServletPath(), "");
		PrintWriter out = response.getWriter();		
		HttpSession session = request.getSession();
		
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/plain; charset=UTF-8");
		response.setCharacterEncoding("utf-8");
		
		int result = -1;
		
		if (uri.equals("/newActivationSelectPhone")) {
			String itemNo = MyRequestUtil.getString(request, "itemNo", null);
			if (itemNo == null) {
				out.println("{\"error\":-100}");
				return;
			}
			out.println("{\"data\": { \"itemNo\":661235, \"desc\":\"ALCATEL ONETOUCH Fierce XL\",\"sn\":\"15RGB13FG454\",\"qty\":1, \"srp\":45.99, \"tax\":1, \"taxRate\":0.1, \"discount\":10.00 } }");
		} else if (uri.equals("/newActivationAddAccessory")) {
			String itemNo = MyRequestUtil.getString(request, "itemNo", null);
			if (itemNo == null) {
				out.println("{\"error\":-100}");
				return;
			}
			
			if (itemNo.equals("CASE2415")) {
				out.println("{\"data\": { \"itemNo\":\"CASE2415\", \"desc\":\"BLACK JELLY CASE\",\"qty\":1, \"srp\":7.99, \"tax\":1, \"taxRate\":0.1, \"discount\":0 } }");
			} else if (itemNo.equals("CASE2416")) {
				out.println("{\"data\": { \"itemNo\":\"CASE2416\", \"desc\":\"BLUE JELLY CASE\",\"qty\":1, \"srp\":7.99, \"tax\":1, \"taxRate\":0.1, \"discount\":0 } }");
			} else if (itemNo.equals("CASE2417")) {
				out.println("{\"data\": { \"itemNo\":\"CASE2417\", \"desc\":\"RED JELLY CASE\",\"qty\":1, \"srp\":7.99, \"tax\":1, \"taxRate\":0.1, \"discount\":0 } }");
			} else if (itemNo.equals("SCPR4731")) {
				out.println("{\"data\": { \"itemNo\":\"SCPR4731\", \"desc\":\"SCREEN PROTECTOR\",\"qty\":1, \"srp\":11.99, \"tax\":1, \"taxRate\":0.1, \"discount\":0 } }");
			} else {
				out.println("{\"data\":null}");				
			}
		}
	}

}
