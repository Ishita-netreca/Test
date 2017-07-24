package com.boas.posone.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Vector;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.boas.posone.db.dao.*;
import com.boas.posone.db.dto.*;
import com.boas.posone.db.vo.*;
import com.boas.posone.util.MyRequestUtil;

/**
 * Servlet implementation class DBAccessController
 */
@WebServlet(name = "DBAccessController", urlPatterns="/DBAccessCtrl/*")
public class DBAccessController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DBAccessController() {
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
		
		StringBuffer sb = new StringBuffer();
		
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/plain; charset=UTF-8");
		response.setCharacterEncoding("utf-8");
				
		int i = 0, len = 0, pageNo = 0, countPerPage = 0;
		
		try {		
			if (uri.equals("/getCustomerList")) {
				if (session.getAttribute("posone_user_info") == null) {
					out.print("{\"data\":null}");
					return;
				}
				Vector<CustomerInfoDto> mCustomerInfoList = CustomerInfoDao.getInstance().getCustomerList(session.getAttribute("posone_user_info").toString(), MyRequestUtil.getInt(request, "pageNo", 1), MyRequestUtil.getInt(request, "countPerPage", 10));
			
				if (mCustomerInfoList != null) {
					sb.append("{\"data\":[");
					for (i = 0, len = mCustomerInfoList.size(); i < len; i++) {
						if (i > 0) {
							sb.append(String.format(",%s", mCustomerInfoList.get(i).toJsonString()));
						} else {
							sb.append(String.format("%s", mCustomerInfoList.get(i).toJsonString()));
						}
					}
					sb.append("]}");
					out.print(sb.toString());
				} else {
					out.print("{\"data\":null}");
				}
			} else if (uri.equals("/getCustomerInfo")) {
				if (session.getAttribute("posone_user_info") == null) {
					out.print("{\"data\":null}");
					return;
				}
				CustomerInfoDto mCustomerInfoDto = CustomerInfoDao.getInstance().getCustomerInfo(session.getAttribute("posone_user_info").toString(), MyRequestUtil.getInt(request, "accountNo", 0));
			
				if (mCustomerInfoDto != null) {					
					out.print(String.format("{\"data\":%s}", mCustomerInfoDto.toJsonString()));
				} else {
					out.print("{\"data\":null}");
				}
			} else if (uri.equals("/getClockIoInfoList")) {
				if (session.getAttribute("posone_user_info") == null) {
					out.print("{\"data\":null}");
					return;
				}
				
				Vector<ClockIoInfoListVo> mClockIoInfoList = ClockIoInfoDao.getInstance().getClockIoInfoList(session.getAttribute("posone_user_info").toString(), MyRequestUtil.getInt(request, "pageNo", 1), MyRequestUtil.getInt(request, "countPerPage", 10));
			
				if (mClockIoInfoList != null) {
					sb.append("{\"data\":[");
					for (i = 0, len = mClockIoInfoList.size(); i < len; i++) {
						if (i > 0) {
							sb.append(String.format(",%s", mClockIoInfoList.get(i).toJsonString()));
						} else {
							sb.append(String.format("%s", mClockIoInfoList.get(i).toJsonString()));
						}
					}
					sb.append("]}");
					out.print(sb.toString());
				} else {
					out.print("{\"data\":null}");
				}
			} else if (uri.equals("/deleteClockIoInfo")) {
				if (session.getAttribute("posone_user_info") == null) {
					out.print("{\"data\":-101}");
					return;
				}
				int result = ClockIoInfoDao.getInstance().deleteClockIoInfo(session.getAttribute("posone_user_info").toString(), MyRequestUtil.getString(request, "clockIoInfoIdxList", null));
				out.print(String.format("{\"data\":%d}", result));
			} else if (uri.equals("/getPrimaryRatePlanList")) {
				Vector<PrimaryRatePlanInfoDto> primaryRatePlanList = PrimaryRatePlanInfoDao.getInstance().getList();
				
				sb.append("{\"data\":[");
				for (i = 0, len = primaryRatePlanList.size(); i < len; i++) {					
					if (i < len-1) sb.append(String.format("%s,", primaryRatePlanList.get(i).toJsonString()));
					else sb.append(String.format("%s", primaryRatePlanList.get(i).toJsonString()));
				}
				sb.append("]}");
				
				out.print(sb.toString());
			} else if (uri.equals("/getClockIoInfo")) {
				if (session.getAttribute("posone_user_info") == null) return;
				
				ClockIoInfoUserVo mClockIoInfoUserVo = ClockIoInfoDao.getInstance().getClockIoInfoInPopup(session.getAttribute("posone_user_info").toString());
				if (mClockIoInfoUserVo == null) {
					out.print("{\"data\":null}");
				} else {
					mClockIoInfoUserVo.setRemoteIp(request.getRemoteHost());
					out.print(String.format("{\"data\":%s}",mClockIoInfoUserVo.toJsonString()));
				}
			} else if (uri.equals("/updateClockIo")) {
				if (session.getAttribute("posone_user_info") == null) return;
				
				out.print(String.format("{\"data\":%d}", ClockIoInfoDao.getInstance().updateClockIo(session.getAttribute("posone_user_info").toString(), request.getRemoteHost(), request.getParameter("clock_io_memo"))));
				
			} else if (uri.equals("/getFeaturesDataPlanList")) {
				Vector<FeaturesDataPlanInfoDto> featuresDataInfoList = FeaturesDataPlanInfoDao.getInstance().getList();
				
				sb.append("{\"data\":[");
				for (i = 0, len = featuresDataInfoList.size(); i < len; i++) {					
					if (i < len-1) sb.append(String.format("%s,", featuresDataInfoList.get(i).toJsonString()));
					else sb.append(String.format("%s", featuresDataInfoList.get(i).toJsonString()));
				}
				sb.append("]}");
				
				out.print(sb.toString());
			} else if (uri.equals("/getInventoryDataList")) {								
				FeaturesDataPlanInfoDao mFeaturesDataPlanInfoDao = new FeaturesDataPlanInfoDao();
				Vector<FeaturesDataPlanInfoDto> featuresDataInfoList = mFeaturesDataPlanInfoDao.getList();
				
				sb.append("{\"data\":[");
				for (i = 0, len = featuresDataInfoList.size(); i < len; i++) {					
					if (i < len-1) sb.append(String.format("%s,", featuresDataInfoList.get(i).toJsonString()));
					else sb.append(String.format("%s", featuresDataInfoList.get(i).toJsonString()));
				}
				sb.append("]}");
				
				out.print(sb.toString());
			} else if (uri.equals("/getProductList")) {
				
				if (session.getAttribute("posone_user_info") == null) return;
				
				Vector<ProductInfoCategoryInventoryVo> productInfoCategoryInventoryList = ProductInfoDao.getInstance().getProductList(session.getAttribute("posone_user_info").toString(), 1, 10);
								
				if (productInfoCategoryInventoryList != null) {
					sb.append("{\"data\":[");
					for (i = 0, len = productInfoCategoryInventoryList.size(); i < len; i++) {					
						if (i < len-1) sb.append(String.format("%s,", productInfoCategoryInventoryList.get(i).toJsonString()));
						else sb.append(String.format("%s", productInfoCategoryInventoryList.get(i).toJsonString()));
					}
					sb.append("]}");
					
					out.print(sb.toString());
				} else {
					out.print("{\"data\":null}");
				}
			} else if (uri.equals("/getProductInfo")) {
				
				if (request.getParameter("item_number") == null) {
					out.print("{\"data\":null}");
					return;
				}
				
				ProductInfoDto mProductInfoDto = ProductInfoDao.getInstance().getProductInfo(Integer.parseInt(request.getParameter("item_number")));
							
				if (mProductInfoDto != null) {
					out.print(String.format("{\"data\":%s}", mProductInfoDto.toJsonString()));							
				} else {
					out.print("{\"data\":null}");
				}
			} else if (uri.equals("/getPhoneList")) {
				
				try {
					pageNo = Integer.parseInt(request.getParameter("page_no"));
					countPerPage = Integer.parseInt(request.getParameter("count_per_page"));
				} catch (Exception e) {
					
				}
				
				if (pageNo == 0 || countPerPage == 0) {
					out.print("{\"data\":null}");
					return;
				}
				
				if (session.getAttribute("posone_user_info") == null) {
					out.print("{\"data\":null}");
					return;
				}
				
				Vector<ProductInfoCategoryInventoryVo> productInfoCategoryInventoryList = ProductInfoDao.getInstance().getPhoneList(session.getAttribute("posone_user_info").toString(), pageNo, countPerPage);
								
				if (productInfoCategoryInventoryList != null) {
					sb.append("{\"data\":[");
					for (i = 0, len = productInfoCategoryInventoryList.size(); i < len; i++) {					
						if (i < len-1) sb.append(String.format("%s,", productInfoCategoryInventoryList.get(i).toJsonString()));
						else sb.append(String.format("%s", productInfoCategoryInventoryList.get(i).toJsonString()));
					}
					sb.append("]}");
					
					out.print(sb.toString());
				} else {
					out.print("{\"data\":null}");
				}
			} else if (uri.equals("/getSelectedItem")) {
				if (request.getParameter("item_number") == null) {
					out.print("{\"data\":null}");					
				} else {
					ProductInfoPromotionVo mProductInfoPromotionVo = ProductInfoDao.getInstance().getSelectedItemByItemNumber(Integer.parseInt(request.getParameter("item_number")));
					if (mProductInfoPromotionVo == null) {
						out.print("{\"data\":null}");					
					} else {
						if (mProductInfoPromotionVo.getPromotionType() == 1) {
							mProductInfoPromotionVo.setSrp(mProductInfoPromotionVo.getSrp()-mProductInfoPromotionVo.getPromotionValue());
						}
						sb.append(String.format("{\"data\":%s}", mProductInfoPromotionVo.toJsonString()));
						out.print(sb.toString());				
					}	
				}
			} else if (uri.equals("/getPromotionList")) {
				try {
					pageNo = Integer.parseInt(request.getParameter("page_no"));
					countPerPage = Integer.parseInt(request.getParameter("count_per_page"));
				} catch (Exception e) {
					
				}
				
				if (pageNo == 0 || countPerPage == 0) {
					out.print("{\"data\":null}");
					return;
				}
				
				Vector<PromotionInfoListVo> promotionList = PromotionInfoDao.getInstance().getPromotionList(pageNo, countPerPage);

				sb.append("{\"data\":[");
				for (i = 0, len = promotionList.size() ; i < len; i++) {
					if (i < len -1) sb.append(String.format("%s,", promotionList.get(i).toJsonString()));
					else sb.append(String.format("%s", promotionList.get(i).toJsonString()));
				}
				sb.append("]}");
				
				out.print(sb.toString());
			} else if (uri.equals("/getPromotionInfo")) { 
				if (request.getParameter("promotion_no") == null) {
					out.print("{\"data\":null}");					
				} else {
					PromotionInfoDto mPromotionInfoDto = null;
					try {
						mPromotionInfoDto = PromotionInfoDao.getInstance().getPromotionInfoByPromotionNo(Integer.parseInt(request.getParameter("promotion_no")));
					} catch (Exception e) {
						
					}
					
					if (mPromotionInfoDto == null) {
						out.print("{\"data\":null}");					
					} else {
						out.print(String.format("{\"data\":%s}", mPromotionInfoDto.toJsonString()));
					}
				}
			} else if (uri.equals("/saveNewPromotionData")) { 
				try {
					PromotionInfoDto mPromotionInfoDto = new PromotionInfoDto();
					mPromotionInfoDto.setProductItemNumber(Integer.parseInt(request.getParameter("item_number")));
					mPromotionInfoDto.setStartDate(request.getParameter("start_date"));
					mPromotionInfoDto.setEndDate(request.getParameter("end_date"));
					mPromotionInfoDto.setPromotionType(Integer.parseInt(request.getParameter("promotion_type")));
					if (mPromotionInfoDto.getPromotionType() == 1) {
						mPromotionInfoDto.setPromotionValue(Float.parseFloat(request.getParameter("promotion_value")));
					}
					out.println(String.format("{\"data\":%d}",PromotionInfoDao.getInstance().saveNewPromotionData(mPromotionInfoDto)));
				} catch (Exception e) {
					out.println("{\"data\":-100}");
				}
			} else if (uri.equals("/getPrimaryRatePlanInfo")) {
				if (request.getParameter("plan_code") == null) {
					out.print("{\"data\":null}");					
				} else {
					Vector<PrimaryRatePlanInfoDto> primaryRatePlanList = PrimaryRatePlanInfoDao.getInstance().getPrimaryRatePlanInfoByPlanCode(request.getParameter("plan_code"));
					
					sb.append("{\"data\":[");
					for (i = 0, len = primaryRatePlanList.size(); i < len; i++) {					
						if (i < len-1) sb.append(String.format("%s,", primaryRatePlanList.get(i).toJsonString()));
						else sb.append(String.format("%s", primaryRatePlanList.get(i).toJsonString()));
					}
					sb.append("]}");
					
					out.print(sb.toString());
				}
			} else if (uri.equals("/getFeaturesDataPlanInfo")) {
				if (request.getParameter("plan_code") == null) {
					out.print("{\"data\":null}");					
				} else {
					
					Vector<FeaturesDataPlanInfoDto> featuresDataInfoList = FeaturesDataPlanInfoDao.getInstance().getFeaturesDataPlanInfoByPlanCode(request.getParameter("plan_code"));					
					
					sb.append("{\"data\":[");
					for (i = 0, len = featuresDataInfoList.size(); i < len; i++) {					
						if (i < len-1) sb.append(String.format("%s,", featuresDataInfoList.get(i).toJsonString()));
						else sb.append(String.format("%s", featuresDataInfoList.get(i).toJsonString()));
					}
					sb.append("]}");
					
					out.print(sb.toString());
				}
			} else if (uri.equals("/getIssueTrackingList")) {

				try {
					pageNo = Integer.parseInt(request.getParameter("page_no"));
					countPerPage = Integer.parseInt(request.getParameter("count_per_page"));
				} catch (Exception e) {
					
				}
				
				if (pageNo == 0 || countPerPage == 0) {
					out.print("{\"data\":null}");
					return;
				}
				
				Vector<IssueTrackingListVo> issueTrackingList = IssueTrackingDao.getInstance().getIssueTrackingList(session.getAttribute("posone_user_info").toString(), pageNo, countPerPage);

				if (issueTrackingList != null && issueTrackingList.size() > 0) {
					sb.append("{\"data\":[");
					for (i = 0, len = issueTrackingList.size(); i < len; i++) {
						if (i < len-1) sb.append(String.format("%s,", issueTrackingList.get(i).toJsonString()));
						else sb.append(String.format("%s", issueTrackingList.get(i).toJsonString()));
					}
					sb.append("]}");
					out.print(sb.toString());
				} else {
					out.print("{\"data\":null}");					
				}
			} else if (uri.equals("/getAllPositionInfoList")) {
				Vector<PositionInfoDto> positionInfoList = PositionInfoDao.getInstance().getAllPositionList();

				if (positionInfoList != null && positionInfoList.size() > 0) {
					sb.append("{\"data\":[");
					for (i = 0, len = positionInfoList.size(); i < len; i++) {
						if (i < len -1) sb.append(String.format("%s,", positionInfoList.get(i).toJsonString()));
						else sb.append(String.format("%s", positionInfoList.get(i).toJsonString()));
					}
					sb.append("]}");
					out.print(sb.toString());
				} else {
					out.print("{\"data\":null}");
				}
			} else if (uri.equals("/getStoreEmpListInPopupEmp")) {
				
				if (session.getAttribute("posone_user_info") == null) return;
				
				Vector<UserInfoEmpListVo> userInfoList = UserInfoDao.getInstance().getStoreEmpListInPopupEmp(session.getAttribute("posone_user_info").toString(), 1, 10);
				
				if (userInfoList != null) {
					sb.append("{\"data\":[");
					for (i = 0, len = userInfoList.size(); i < len; i++) {
						if (i < len -1) sb.append(String.format("%s,", userInfoList.get(i).toJsonString()));
						else sb.append(String.format("%s", userInfoList.get(i).toJsonString()));
					}
					sb.append("]}");
					out.print(sb.toString());
				} else {
					out.print("{\"data\":null}");
				}
			} else if (uri.equals("/searchStoreEmpListInPopupEmp")) {
				
				if (session.getAttribute("posone_user_info") == null) return;
				
				try {
					Integer.parseInt(request.getParameter("searchType"));
				} catch (Exception e) {
					out.print("{\"data\":null}");
					return;
				}
				
				Vector<UserInfoEmpListVo> userInfoList = UserInfoDao.getInstance().searchStoreEmpListInPopupEmp(session.getAttribute("posone_user_info").toString(), Integer.parseInt(request.getParameter("searchType")), request.getParameter("keyword"), 1, 10);
				
				if (userInfoList != null) {
					sb.append("{\"data\":[");
					for (i = 0, len = userInfoList.size(); i < len; i++) {
						if (i < len -1) sb.append(String.format("%s,", userInfoList.get(i).toJsonString()));
						else sb.append(String.format("%s", userInfoList.get(i).toJsonString()));
					}
					sb.append("]}");
					out.print(sb.toString());
				} else {
					out.print("{\"data\":null}");
				}
			} else if (uri.equals("/getUserInfo")) {
				int userNo = 0;
				
				try {
					userNo = Integer.parseInt(request.getParameter("userNo"));
				} catch (Exception e) {
					
				}
				
				if (userNo == 0) return;
				
				UserInfoDto mUserInfoDto = UserInfoDao.getInstance().getUserInfo(userNo);
				
				if (mUserInfoDto != null) {
					out.print(String.format("{\"data\":%s}",mUserInfoDto.toJsonString()));
				} else {
					out.print("{\"data\":null}");					
				}
			} else if (uri.equals("/updateUserInfo")) {
				
				if (session.getAttribute("posone_user_info") == null) return;
				
				UserInfoDto mUserInfoDto = new UserInfoDto();
				
				
				try {
					mUserInfoDto.setUserNo(Integer.parseInt(request.getParameter("userNo")));
					mUserInfoDto.setUserName(request.getParameter("userName"));
					mUserInfoDto.setUserId(request.getParameter("userId"));
					mUserInfoDto.setPassword(request.getParameter("password"));
					mUserInfoDto.setEmail(request.getParameter("email"));
					mUserInfoDto.setPhone(request.getParameter("phone"));
					mUserInfoDto.setPosition(Integer.parseInt(request.getParameter("position")));
					
					StoreInfoDto mStoreInfoDto = StoreInfoDao.getInstance().getStoreInfoBySessionUserData(session.getAttribute("posone_user_info").toString());
					
					mUserInfoDto.setStoreNo(mStoreInfoDto.getStoreNo());
					
				} catch (Exception e) {
					e.printStackTrace();
					out.print("{\"data\":-100}");
					mUserInfoDto = null;
					return;
				}
				
				out.print(String.format("{\"data\":%d}", UserInfoDao.getInstance().updateUserInfo(mUserInfoDto)));		
				
				mUserInfoDto = null;
			} else if (uri.equals("/getItemCtgrList")) {

				try {
					Vector<ItemCtgrInfoDto> itemCtgrInfoList = ItemCtgrInfoDao.getInstance().getItemCtgrInfoList();
					if (itemCtgrInfoList != null && itemCtgrInfoList.size() > 0) {
						sb.append("{\"data\":[");
						for (i = 0, len = itemCtgrInfoList.size(); i < len; i++) {
							if (i < len -1) sb.append(String.format("%s,", itemCtgrInfoList.get(i).toJsonString()));
							else sb.append(String.format("%s", itemCtgrInfoList.get(i).toJsonString()));
						}
						sb.append("]}");
						out.print(sb.toString());
					} else {
						out.print("{\"data\":[]}");
					}

				} catch (Exception e) {
					e.printStackTrace();
					out.print("{\"data\":-100}");
					return;
				}
			} else if (uri.equals("/getItemSubCtgrListByCtgrNo")) {

				try {
					Vector<ItemSubCtgrInfoDto> itemSubCtgrInfoList = ItemSubCtgrInfoDao.getInstance().getItemSubCtgrInfoList(MyRequestUtil.getInt(request, "ctgrNo", 0));
					if (itemSubCtgrInfoList != null && itemSubCtgrInfoList.size() > 0) {
						sb.append("{\"data\":[");
						for (i = 0, len = itemSubCtgrInfoList.size(); i < len; i++) {
							if (i < len -1) sb.append(String.format("%s,", itemSubCtgrInfoList.get(i).toJsonString()));
							else sb.append(String.format("%s", itemSubCtgrInfoList.get(i).toJsonString()));
						}
						sb.append("]}");
						out.print(sb.toString());
					} else {
						out.print("{\"data\":[]}");
					}

				} catch (Exception e) {
					e.printStackTrace();
					out.print("{\"data\":-100}");
					return;
				}
			} else if (uri.equals("/getStoreInvenList")) {

				if (session.getAttribute("posone_user_info") == null) return;

				try {
					Vector<StoreInvenInfoListVo> storeInvenInfoList = StoreInvenInfoDao.getInstance().getStoreInvenList(session.getAttribute("posone_user_info").toString());
					if (storeInvenInfoList != null && storeInvenInfoList.size() > 0) {
						sb.append("{\"data\":[");
						for (i = 0, len = storeInvenInfoList.size(); i < len; i++) {
							if (i < len -1) sb.append(String.format("%s,", storeInvenInfoList.get(i).toJsonString()));
							else sb.append(String.format("%s", storeInvenInfoList.get(i).toJsonString()));
						}
						sb.append("]}");
						out.print(sb.toString());
					} else {
						out.print("{\"data\":[]}");
					}

				} catch (Exception e) {
					e.printStackTrace();
					out.print("{\"data\":-100}");
					return;
				}
			} else if (uri.equals("/searchStoreInvenList")) {

				if (session.getAttribute("posone_user_info") == null) return;

				try {
					Vector<StoreInvenInfoListVo> storeInvenInfoList = StoreInvenInfoDao.getInstance().searchStoreInvenList(session.getAttribute("posone_user_info").toString(), MyRequestUtil.getString(request, "keyword", null), MyRequestUtil.getInt(request, "type", 0));

					if (storeInvenInfoList != null && storeInvenInfoList.size() > 0) {
						sb.append("{\"data\":[");
						for (i = 0, len = storeInvenInfoList.size(); i < len; i++) {
							if (i < len -1) sb.append(String.format("%s,", storeInvenInfoList.get(i).toJsonString()));
							else sb.append(String.format("%s", storeInvenInfoList.get(i).toJsonString()));
						}
						sb.append("]}");
						out.print(sb.toString());
					} else {
						out.print("{\"data\":[]}");
					}
				} catch (Exception e) {
					e.printStackTrace();
					out.print("{\"data\":-100}");
					return;
				}
			} else if (uri.equals("/getItemInfoinInven")) {

				if (session.getAttribute("posone_user_info") == null) return;

				try {
					StoreInvenInfoDto mStoreInvenInfoDto = StoreInvenInfoDao.getInstance().getStoreInvenInfo(session.getAttribute("posone_user_info").toString(), MyRequestUtil.getString(request, "itemNo", null));

					if (mStoreInvenInfoDto != null) {
						mStoreInvenInfoDto.setSerialNo("");
						out.print(String.format("{\"data\":%s}", mStoreInvenInfoDto.toJsonString()));
					} else {
						out.print("{\"data\":null}");
					}
				} catch (Exception e) {
					e.printStackTrace();
					out.print("{\"data\":-100}");
					return;
				}
			} else if (uri.equals("/updateItemInfo")) {

				if (session.getAttribute("posone_user_info") == null) return;

				String oldItemNo = MyRequestUtil.getString(request, "oldItemNo", null);

				StoreInvenInfoDto mStoreInvenInfoDto = new StoreInvenInfoDto();
				mStoreInvenInfoDto.setItemNo(MyRequestUtil.getString(request, "newItemNo", null));
				if (mStoreInvenInfoDto.getItemNo() == null) {
					out.println("{\"result\":-1}");
					return;
				}

				mStoreInvenInfoDto.setDesc(MyRequestUtil.getString(request, "desc", null));
				mStoreInvenInfoDto.setCompany(MyRequestUtil.getString(request, "company", null));
				mStoreInvenInfoDto.setCtgr(MyRequestUtil.getInt(request, "ctgr", 0));
				mStoreInvenInfoDto.setSubCtgr(MyRequestUtil.getInt(request, "subCtgr", 0));
				mStoreInvenInfoDto.setManufacturer(MyRequestUtil.getString(request, "manufacturer", null));
				mStoreInvenInfoDto.setColor(MyRequestUtil.getString(request, "color", null));
				mStoreInvenInfoDto.setQty(MyRequestUtil.getInt(request, "qty", 0));
				mStoreInvenInfoDto.setSrp(MyRequestUtil.getFloat(request, "srp", 0));
				mStoreInvenInfoDto.setDisable(MyRequestUtil.getInt(request, "disable", 0));

				out.print(String.format("{\"result\":%d}",StoreInvenInfoDao.getInstance().updateItemInfoinInven(session.getAttribute("posone_user_info").toString(), mStoreInvenInfoDto, oldItemNo)));
			} else if (uri.equals("/getRatePlanInfoList")) {
				try {
					Vector<RatePlanInfoListVo> ratePlanInfoList = RatePlanInfoDao.getInstance().getRatePlanInfoList();

					if (ratePlanInfoList != null && ratePlanInfoList.size() > 0) {
						sb.append("{\"data\":[");
						for (i = 0, len = ratePlanInfoList.size(); i < len; i++) {
							if (i < len -1) sb.append(String.format("%s,", ratePlanInfoList.get(i).toJsonString()));
							else sb.append(String.format("%s", ratePlanInfoList.get(i).toJsonString()));
						}
						sb.append("]}");
						out.print(sb.toString());
					} else {
						out.print("{\"data\":[]}");
					}
				} catch (Exception e) {
					e.printStackTrace();
					out.print("{\"data\":-100}");
					return;
				}
			} else if (uri.equals("/getRatePlanInfoByPlanCode")) {
				try {

					RatePlanInfoDto mRatePlanInfoDto = RatePlanInfoDao.getInstance().getRatePlanInfoByPlanCode(MyRequestUtil.getString(request, "planCode", null));

					if (mRatePlanInfoDto != null) {
						out.print(String.format("{\"data\":%s}", mRatePlanInfoDto.toJsonString()));
					} else {
						out.print("{\"data\":null}");
					}

				} catch (Exception e) {
					e.printStackTrace();
					out.print("{\"data\":-100}");
					return;
				}
			} else if (uri.equals("/updateRatePlanInfo")) {
				if (session.getAttribute("posone_user_info") == null) return;

				String oldPlanCode = MyRequestUtil.getString(request, "oldPlanCode", null);

				RatePlanInfoDto mRatePlanInfoDto = new RatePlanInfoDto();
				mRatePlanInfoDto.setPlanCode(MyRequestUtil.getString(request, "newPlanCode", null));
				if (mRatePlanInfoDto.getPlanCode() == null) {
					out.println("{\"result\":-1}");
					return;
				}

				mRatePlanInfoDto.setCarrier(MyRequestUtil.getString(request, "carrier", null));
				mRatePlanInfoDto.setPlanDesc(MyRequestUtil.getString(request, "planDesc", null));
				mRatePlanInfoDto.setPlanType(MyRequestUtil.getString(request, "planType", null));
				mRatePlanInfoDto.setGroupType(MyRequestUtil.getString(request, "groupType", null));
				mRatePlanInfoDto.setMrc(MyRequestUtil.getFloat(request, "mrc", 0));
				mRatePlanInfoDto.setReactPlanFlag(MyRequestUtil.getInt(request, "reactPlanFlag", 0));
				mRatePlanInfoDto.setNewactPrimeCom(MyRequestUtil.getFloat(request, "newactPrimeCom", 0));
				mRatePlanInfoDto.setNewactSubprimeCom(MyRequestUtil.getFloat(request, "newactSubprimeCom", 0));
				mRatePlanInfoDto.setNewactEipvadCom(MyRequestUtil.getFloat(request, "newactEipvadCom", 0));
				mRatePlanInfoDto.setUpgradeUpgCom(MyRequestUtil.getFloat(request, "upgradeUpgCom", 0));
				mRatePlanInfoDto.setUpgradeEipvadCom(MyRequestUtil.getFloat(request, "upgradeEipvadCom", 0));
				mRatePlanInfoDto.setEmpPrimeCom(MyRequestUtil.getFloat(request, "empPrimeCom", 0));
				mRatePlanInfoDto.setEmpSubprimeCom(MyRequestUtil.getFloat(request, "empSubprimeCom", 0));
				mRatePlanInfoDto.setEmpEipvadCom1(MyRequestUtil.getFloat(request, "empEipvadCom1", 0));
				mRatePlanInfoDto.setEmpUpgCom(MyRequestUtil.getFloat(request, "empUpgCom", 0));
				mRatePlanInfoDto.setEmpEipvadCom2(MyRequestUtil.getFloat(request, "empEipvadCom2", 0));
				mRatePlanInfoDto.setMrcAmntForPreCollect(MyRequestUtil.getFloat(request, "mrcAmntForPreCollect", 0));

				out.print(String.format("{\"result\":%d}",RatePlanInfoDao.getInstance().updateRatePlanInfo(session.getAttribute("posone_user_info").toString(), mRatePlanInfoDto, oldPlanCode)));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
