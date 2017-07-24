/**
 * Created by Researcher01 on 2016-11-25.
 */


try {
    WRP;
} catch (e) {
    WRP = {};
}

WRP.AuditModule = function() {
    var _listId;

    var _inStockItems;

    function _auditAllItems() {
        var i, len, obj;
        for (i = 0, len = _inStockItems.length; i < len; i++) {
            obj = _inStockItems[i];
            obj.auditQty = obj.qty;
        }
        _printItemList(_inStockItems);
    }

    // Item Search를 이 함수에서 구현
    function _printItemList() { // 파라미터  { [list](필수) }
        var list, i, len, obj, innerHTML;
        if (arguments.length < 1) {
            list = _inStockItems;
        } else {
            list = arguments[0];
        }

        try {
            document.getElementById("inventory-audit-container").style.display = "none";
        } catch (e) {

        }

        innerHTML = [];

        for (i = 0, len = list.length; i < len; i++) {
            try {
                obj = list[i];
                if (obj.auditQty === undefined || obj.auditQty === null) obj.auditQty = 0;
                
                
                innerHTML.push('<tr index="');
                innerHTML.push(i);
                innerHTML.push('">');
                innerHTML.push('<td>');
                innerHTML.push((obj.itemCode !== undefined && obj.itemCode !== null)? obj.itemCode: '');
                innerHTML.push('</td>');
                innerHTML.push('<td>');
                innerHTML.push((obj.description !== undefined && obj.description !== null)? obj.description: '');
                innerHTML.push('</td>');
                innerHTML.push('<td>');
                innerHTML.push((obj.sku !== undefined && obj.sku !== null)? obj.sku: '');
                innerHTML.push('</td>');
                innerHTML.push('<td>');
                innerHTML.push((obj.category !== undefined && obj.category !== null)? obj.category: '');
                innerHTML.push('</td>');
                innerHTML.push('<td>');
                innerHTML.push((obj.subCategory !== undefined && obj.subCategory !== null)? obj.subCategory: '');
                innerHTML.push('</td>');
                /*
                innerHTML.push('<td>');
                innerHTML.push((obj.serialNo !== undefined && obj.serialNo !== null)? obj.serialNo: '');
                innerHTML.push('</td>');
                */
                innerHTML.push('<td>');
                innerHTML.push((obj.qty !== undefined && obj.qty !== null)? obj.qty: '');
                innerHTML.push('</td>');
                innerHTML.push('<td>');
                innerHTML.push('<input type="text" value="');
                innerHTML.push(obj.auditQty);
                innerHTML.push('"/>');
                innerHTML.push('</td>');
                if (obj.qty !== obj.auditQty) {
                    if (obj.qty > obj.auditQty) {
                        if ((obj.qty - obj.auditQty) > 0) {
                            innerHTML.push('<td class="decrease">');
                            innerHTML.push(obj.qty - obj.auditQty);
                            innerHTML.push('</td>');
                        } else {
                            innerHTML.push('<td class="">');
                            innerHTML.push('</td>');
                        }
                    } else {
                        if ((obj.auditQty - obj.qty) > 0) {
                            innerHTML.push('<td class="increase">');
                            innerHTML.push(obj.auditQty - obj.qty);
                            innerHTML.push('</td>');
                        } else {
                            innerHTML.push('<td class="">');
                            innerHTML.push('</td>');
                        }
                    }
                } else {
                    innerHTML.push('<td class="">');
                    innerHTML.push('</td>');
                }
                if (obj.qty === obj.auditQty) {
                    innerHTML.push('<td class="accord">');
                } else {
                    innerHTML.push('<td class="non-accord">');
                }
                innerHTML.push('</td>');
                innerHTML.push('</tr>');
            } catch (e) {
                console.warn(e);
                return;
            }
        }

        try {
            document.getElementById(_listId).innerHTML = innerHTML.join("");
        } catch (e) {
            console.warn(e);
        }

        innerHTML = undefined;
        setTimeout(_getTotalAuditCount, 100);
    }

    function _saveAuditData() {
        var i, len, obj, storeId;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }

        for (i = 0, len = _inStockItems.length; i < len; i++) {
            obj = _inStockItems[i];
            obj.category = undefined;
            delete obj.category;

            obj.description = undefined;
            delete obj.description;

            obj.itemCode = undefined;
            delete obj.itemCode;

            obj.itemSid = undefined;
            delete obj.itemSid;

            obj.qty = undefined;
            delete obj.qty;

            obj.sku = undefined;
            delete obj.sku;

            obj.subCategory = undefined;
            delete obj.subCategory;
        }

        $.ajax({
            url: "ajax/inventory/auditInventoryData.jsp",
            data: {
                storeId: storeId,
                auditStr: JSON.stringify(_inStockItems)
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    WRP.AuditModule.init(_listId);
                } else {
                    alert("Error : " + result);
                }
            }
        });
    }

    function _getInStockItemsList() {
        var storeId, category, subCategory;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId.length == 0) return;
        } catch (e) {
            console.warn(e);
            return;
        }
        
        try {
        	category = parseInt(document.getElementById("inventory-audit-category").value);
        	if (isNaN(category)) {
        		console.warn("category format error");
        		category = 0;
        	}
        } catch (e) {
        	console.warn(e);
        	return;
        }
        
        try {
        	subCategory = parseInt(document.getElementById("inventory-audit-category-sub").value);
        	if (isNaN(subCategory)) {
        		console.warn("sub category format error");
        		subCategory = 0;
        	}
        } catch (e) {
        	console.warn(e);
        	return;
        }

        $.ajax({
            url: "ajax/inventory/getInStockItemsList.jsp" ,
            data: {
                storeId: storeId,
                categorySid: category,
                subCategorySid: subCategory
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data;

                data = result.data;
                if (!data) return;

                _inStockItems = data;

                _printItemList(_inStockItems, true);
            }
        });
    }

    function _onQtyValueChanged(event) {
        var target, tr, auditQty, item, index;
        target = event.target;
        if (target.nodeName !== "INPUT") {
            return;
        }

        tr = target.parentNode;

        while((tr = tr.parentNode)) {
            try {
                if (tr.nodeName === "TR") break;
            } catch (e) {
                console.warn(e);
            }
        }

        if (!tr) return;
        if (tr.children.length == 10) {


            index = parseInt(tr.getAttribute("index"));

            if (isNaN(index)) {
                console.warn("no index");
                return;
            }

            auditQty = parseInt(target.value);
            if (isNaN(auditQty)) {
                auditQty = 0;
            }
            target.value = auditQty;

            item = _inStockItems[index];
            if (!item) return;

            item.auditQty = auditQty;

            if (item.qty === item.auditQty) {
                tr.children[9].setAttribute("class","accord");
                tr.children[8].setAttribute("class","");
                tr.children[8].innerHTML = '';
            } else {
                tr.children[8].setAttribute("class","non-accord");
                if (item.qty > item.auditQty) {
                    if ((item.qty - item.auditQty) > 0) {
                        tr.children[8].setAttribute("class","decrease");
                        tr.children[8].innerHTML = (item.qty - item.auditQty);
                    } else {
                        tr.children[8].setAttribute("class","");
                    }
                } else {
                    if ((item.auditQty - item.qty) > 0) {
                        tr.children[8].setAttribute("class","increase");
                        tr.children[8].innerHTML = (item.auditQty - item.qty);
                    } else {
                        tr.children[8].setAttribute("class","");
                    }
                }
            }
        } else if (tr.children.length == 8) {
            index = parseInt(tr.getAttribute("index"));

            if (isNaN(index)) {
                console.warn("no index");
                return;
            }

            auditQty = parseInt(target.value);
            if (isNaN(auditQty)) {
                auditQty = 0;
            }
            target.value = auditQty;

            item = _inStockItems[index];
            if (!item) return;

            item._auditQty = auditQty;

            if (item.qty === item._auditQty) {
                tr.children[6].setAttribute("class","accord");
                tr.children[5].setAttribute("class", "");
                tr.children[5].innerHTML = '';
            } else {
                tr.children[6].setAttribute("class","non-accord");
                if (item.qty > item._auditQty) {
                    if ((item.qty - item._auditQty) > 0) {
                        tr.children[5].setAttribute("class","decrease");
                        tr.children[5].innerHTML = (item.qty - item._auditQty);
                    } else {
                        tr.children[5].setAttribute("class","");
                    }
                } else {
                    if ((item._auditQty - item.qty) > 0) {
                        tr.children[5].setAttribute("class","increase");
                        tr.children[5].innerHTML = (item._auditQty - item.qty);
                    } else {
                        tr.children[5].setAttribute("class","");
                    }
                }
            }
        }
        setTimeout(_getTotalAuditCount, 100);
    }

    function _searchKeywordInItemList() {
        var keyword, list, i, len, obj, elem, tbody, tr, innerHTML;
        if (arguments.length < 1) {
            console.warn("no input search keyword");
            return;
        }

        keyword = arguments[0];

        if (keyword.length == 0) {
            try {
                document.getElementById("inventory-audit-search-item-list").innerHTML = innerHTML.join("");
            } catch (e) {
                console.warn(e);
            }
            return;
        }

        list = {};

        tbody = document.getElementById(_listId);

        if (!tbody) return;

        for (i = 0, len = _inStockItems.length; i < len; i++) {
            obj = _inStockItems[i];
            if (obj.serialNo === keyword) {
                list[i] = obj;
                if (obj.auditQty === undefined || obj.auditQty === null) obj.auditQty = 0;
                obj.auditQty++;

                tr = tbody.children[i];
                if (parseInt(tr.getAttribute("index")) === i) {
                    if (tr.children.length == 10) {
                        try {
                            tr.children[7].children[0].value = obj.auditQty;
                        //    tbody.parentNode.parentNode.scrollTop = tr.offsetTop;
                        } catch (e) {
                            console.warn(e);
                        }
                        if (obj.qty === obj.auditQty) {
                            tr.children[9].setAttribute("class", "accord");
                        } else {
                            tr.children[9].setAttribute("class", "non-accord");
                        }
                    }
                }
            }

            if (obj.sku === keyword) {
                list[i] = obj;
            } else if (obj.description.indexOf(keyword) > -1) {
                list[i] = obj;
            } else if (obj.itemCode.indexOf(keyword) > -1) {
                list[i] = obj;
            }
        }

        innerHTML = [];

        i = undefined;

        for (i in list) {
            try {
                obj = list[i];
                if (obj.auditQty === undefined || obj.auditQty === null) obj.auditQty = 0;
                innerHTML.push('<tr index="');
                innerHTML.push(i);
                innerHTML.push('">');
                innerHTML.push('<td>');
                innerHTML.push((obj.itemCode !== undefined && obj.itemCode !== null)? obj.itemCode: '');
                innerHTML.push('</td>');
                innerHTML.push('<td>');
                innerHTML.push((obj.description !== undefined && obj.description !== null)? obj.description: '');
                innerHTML.push('</td>');
                innerHTML.push('<td>');
                innerHTML.push((obj.sku !== undefined && obj.sku !== null)? obj.sku: '');
                innerHTML.push('</td>');
                innerHTML.push('<td>');
                innerHTML.push((obj.serialNo !== undefined && obj.serialNo !== null)? obj.serialNo: '');
                innerHTML.push('</td>');
                innerHTML.push('<td>');
                innerHTML.push('<input type="text" value="');
                innerHTML.push(obj.auditQty);
                innerHTML.push('"/>');
                innerHTML.push('</td>');
                if (obj.qty !== obj.auditQty) {
                    if (obj.qty > obj.auditQty) {
                        if ((obj.qty - obj.auditQty) > 0) {
                            innerHTML.push('<td class="decrease">');
                            innerHTML.push(obj.qty - obj.auditQty);
                            innerHTML.push('</td>');
                        } else {
                            innerHTML.push('<td class="">');
                            innerHTML.push('</td>');
                        }
                    } else {
                        if ((obj.auditQty - obj.qty) > 0) {
                            innerHTML.push('<td class="increase">');
                            innerHTML.push(obj.auditQty - obj.qty);
                            innerHTML.push('</td>');
                        } else {
                            innerHTML.push('<td class="">');
                            innerHTML.push('</td>');
                        }
                    }
                } else {
                    innerHTML.push('<td class="">');
                    innerHTML.push('</td>');
                }
                if (obj.qty === obj.auditQty) {
                    innerHTML.push('<td class="accord">');
                } else {
                    innerHTML.push('<td class="non-accord">');
                }
                innerHTML.push('</td>');
                innerHTML.push('<td>');
                innerHTML.push('<div class="apply-btn" onclick="WRP.AuditModule.applyAuditQty(');
                innerHTML.push(i);
                innerHTML.push(');"></div>');
                innerHTML.push('</td>');
                innerHTML.push('</tr>');
            } catch (e) {
                console.warn(e);
                return;
            }
        }

        try {
            document.getElementById("inventory-audit-search-item-list").innerHTML = innerHTML.join("");
        } catch (e) {
            console.warn(e);
        }

        if (i === undefined) {
            alert("Undefined Items");
        }

        setTimeout(_getTotalAuditCount, 100);
    }

    function _getTotalAuditCount() {
        var i, len, count, obj;
        count = 0;
        for (i = 0, len = _inStockItems.length; i < len; i++) {
            try {
                obj = _inStockItems[i];
                if (obj.qty === obj.auditQty) {
                    count++;
                }
            } catch (e) {
                console.warn(e);
            }
        }

        try {
            document.getElementById("inventory-audit-total-audit").innerHTML = count;
        } catch (e) {
            console.warn(e);
        }

        try {
            document.getElementById("inventory-audit-total-items").innerHTML = len;
        } catch (e) {
            console.warn(e);
        }
    }

    function _applyAuditQty() {
        var obj, i, len, index, elem;
        if (arguments.length < 1) {
            console.warn("no input index");
            return;
        }
        index = arguments[0];
        if (index < _inStockItems.length) {
            obj = _inStockItems[index];
            if (obj._auditQty !== undefined && obj._auditQty > 0) {
                obj.auditQty = obj._auditQty;
            }
            if (obj.auditQty == obj.qty) {

            }
            setTimeout(_getTotalAuditCount, 100);
        }
    }

    return {
        init: function() {
            var list;

            if (arguments.length < 1) {
                console.warn("no input audit item list element id");
                return;
            }

            _listId = arguments[0];

            list = document.getElementById(_listId);
            if (!list) {
                console.warn("audit item list element not exists");
                return;
            }

            if (navigator.userAgent.indexOf(".NET") > -1) { // IE
                if (!list.onkeydown) {
                    list.addEventListener("keydown", function(event){
                        if (event.keyCode == 13) {
                            _onQtyValueChanged(event);
                        }
                    });
                }
            }

            if (!list.onchange) {
                list.addEventListener("change",_onQtyValueChanged);
            }

            list = undefined;

            list = document.getElementById("inventory-audit-search-item-list");
            if (list) {
                if (navigator.userAgent.indexOf(".NET") > -1) { // IE
                    if (!list.onkeydown) {
                        list.addEventListener("keydown", function(event){
                            if (event.keyCode == 13) {
                                _onQtyValueChanged(event);
                            }
                        });
                    }
                }

                if (!list.onchange) {
                    list.addEventListener("change",_onQtyValueChanged);
                }
            }



            _getInStockItemsList();
        },
        getItemByIndex: function() {
            if (arguments.length < 1) {
                return undefined;
            }
            if (arguments[0] < _inStockItems.length) {
                return _inStockItems[arguments[0]];
            } else {
                return undefined;
            }
        },
        searchKeywordInItemList: function() {
            var keyword = "";
            try {
                keyword = document.getElementById("inventory-audit-search-keyword").value;
                document.getElementById("inventory-audit-search-keyword").value = '';
            } catch (e) {
                console.warn(e);
            }
            _searchKeywordInItemList(keyword);

            //WRPAdminApp.closePopup(document.querySelector(".popup-container[popupname='auditInputKeywordContainer']"));
        },
        printAllItemList: function() {
            _printItemList();
        },
        auditAllItems: function() {
            _auditAllItems();
        },
        submitAuditData: function() {
            if(!confirm("Submit Audit Data")) return;

            _saveAuditData();
        },
        applyAuditQty: function() {
            _applyAuditQty(arguments[0]);
        }
    }; // 세미콜론을 붙이지 않으면 디버거에서 return된 object 멤버 외의 다른 멤버(Closure, Global 등)도 출력되지만, 붙이면 출력이 안됨. 차이점을 알아야함
}();
