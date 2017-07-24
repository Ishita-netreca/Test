package com.boas.posone.util;

import javax.servlet.http.HttpServletRequest;

public class MyRequestUtil {
	
	public static String getString(HttpServletRequest request, String param, String defaultValue) {
		return (request.getParameter(param) != null)? request.getParameter(param) : defaultValue;
	}
	
	public static int getInt(HttpServletRequest request, String param, int defaultValue) {
		try {
			return Integer.parseInt(request.getParameter(param));			
		} catch (Exception e) {
			return defaultValue;
		}
	}
	
	public static float getFloat(HttpServletRequest request, String param, float defaultValue) {
		try {
			return Float.parseFloat(request.getParameter(param));			
		} catch (Exception e) {
			return defaultValue;
		}
	}
	
	public static double getDouble(HttpServletRequest request, String param, double defaultValue) {
		try {
			return Double.parseDouble(request.getParameter(param));			
		} catch (Exception e) {
			return defaultValue;
		}
	}
}
