package com.boas.posone.util;

import org.json.simple.JSONObject;

import java.util.Iterator;
import java.util.Set;

/**
 * Created by Researcher01 on 2016-11-10.
 */
public class JSONObjectController {
    private static JSONObjectController instance;
    public static JSONObjectController getInstance() {
        if (instance == null) {
            instance = new JSONObjectController();
        }
        return instance;
    }

    // key의 공통 여부 상관없이 무조건 병합
    public Object jsonObjectsUnion(Object obj1, Object obj2) {
        if (!obj1.getClass().getSimpleName().equals("JSONObject") || !obj2.getClass().getSimpleName().equals("JSONObject")) {
            return null;
        }

        JSONObject json1 = (JSONObject)obj1;
        JSONObject json2 = (JSONObject)obj2;

        Set<String> keys = json2.keySet();
        Iterator<String> iterator = keys.iterator();

        while(iterator.hasNext()) {
            String key = iterator.next();
            if (json1.get(key) == null) {
                json1.put(key, json2.get(key));
            } else {
                if (json1.get(key).getClass().getSimpleName().equals("JSONObject") && json2.get(key).getClass().getSimpleName().equals("JSONObject")) {
                    this.jsonObjectsUnion(json1.get(key), json2.get(key));
                }
            }
        }

        return obj1;
    }

    // 공통된 key외의 나머지는 모두 제거
    public Object jsonObjectsIntersection(Object obj1, Object obj2) {


        return obj1;
    }
}
