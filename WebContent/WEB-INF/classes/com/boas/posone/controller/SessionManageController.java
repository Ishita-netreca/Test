package com.boas.posone.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.boas.posone.db.dao.TbUserDao;
import com.boas.posone.db.dao.UserInfoDao;
import com.boas.posone.util.MyRequestUtil;

/**
 * Servlet implementation class SessionManageCtrl
 */
@WebServlet(name = "SessionManageController", urlPatterns="/SessionManageCtrl/*")
public class SessionManageController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SessionManageController() {
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
		
		if (uri.equals("/loginSystem")) {
			result = TbUserDao.getInstance().loginThisSystem(session, MyRequestUtil.getString(request, "storeId", null), MyRequestUtil.getString(request, "userId", null), MyRequestUtil.getString(request, "password", null));
			//result = UserInfoDao.getInstance().loginSystem(session, MyRequestUtil.getString(request, "storeId", ""), MyRequestUtil.getString(request, "userId", ""), MyRequestUtil.getString(request, "password", ""));
			out.print(String.format("{\"data\":%d}", result));
		} else if (uri.equals("/authAdministrator")) {
			result = TbUserDao.getInstance().authAdmin(MyRequestUtil.getString(request, "adminId", ""), MyRequestUtil.getString(request, "adminPassword", ""));
			out.print(String.format("{\"result\":%d}", result));
		} else if (uri.equals("/logoutSystem")) {
			try {
				session.setAttribute("posone_login_user_id",null);
				session.setAttribute("posone_login_user_sid",null);
				session.setAttribute("posone_login_store_id",null);
				session.setAttribute("posone_login_store_sid",null);
				session.setAttribute("posone_user_info",null);
				session.invalidate();
				out.println("{\"result\":1}");
			} catch (Exception e) {

				out.println("{\"result\":0}");
			}
		}
	}

}
