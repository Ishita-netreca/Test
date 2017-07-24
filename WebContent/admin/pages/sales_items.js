/**
 * Created by Researcher01 on 2016-10-07.
 */
var _pagescript = {
    _selectedItemSid: 0,
    _selectedStoreId: undefined,
    init: function() {
        WRPAdminApp.pagescript.getCategoriesDicListByParentSID(0);
        WRPAdminApp.pagescript.getItemDictList();
    },
    getItemDictList: function() {

        var storeId;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId === undefined || storeId.length === 0 || storeId === "all") {
                return;
            }
        } catch (e) {
            console.log(e);
            return;
        }

        WRPAdminApp.pagescript._selectedStoreId = storeId;

        $.ajax({
            url: "ajax/item/getItemDictList.jsp",
            data: {
                storeId: storeId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, itemList, innerHTML;

                data = result.data;
                if (!data) return;
                    WRPAdminApp.pagescript.printItemDictList(data);
            }
        });
    },
    printItemDictList: function() {
        var data, i, len, obj, itemList, innerHTML;

        if (arguments.length < 1) {
            console.warn("no input data");
            return;
        }

        data = arguments[0];
        if (!data) return;

        itemList = document.getElementById("item-list");
        if (!itemList) return;

        innerHTML = [];
        for (i = 0, len = data.length; i < len; i++) {
            try {
                obj = data[i];
                if (!(obj.sid)) continue;
                innerHTML.push('<tr onclick="WRPAdminApp.pagescript.getItemInfoBySID(');
                innerHTML.push(obj.sid);
                innerHTML.push(');">');
                innerHTML.push('<td>');
                innerHTML.push((obj.itemCode !== undefined)? obj.itemCode : '&nbsp;');
                innerHTML.push('</td>');
                innerHTML.push('<td>');
                innerHTML.push((obj.description !== undefined)? obj.description : '&nbsp;');
                innerHTML.push('</td>');
                innerHTML.push('<td>');
                innerHTML.push((obj.distributor !== undefined)? obj.distributor : '&nbsp;');
                innerHTML.push('</td>');
                innerHTML.push('<td>');
                innerHTML.push((obj.category !== undefined)? obj.category : '&nbsp;');
                innerHTML.push('</td>');
                innerHTML.push('<td>');
                innerHTML.push((obj.subCategory !== undefined)? obj.subCategory : '&nbsp;');
                innerHTML.push('</td>');
                innerHTML.push('<td>');
                innerHTML.push((obj.manufacturer !== undefined)? obj.manufacturer : '&nbsp;');
                innerHTML.push('</td>');
                innerHTML.push('<td>');
                innerHTML.push((obj.color !== undefined)? obj.color : '&nbsp;');
                innerHTML.push('</td>');
                innerHTML.push('<td>');
                innerHTML.push((obj.qty !== undefined)? obj.qty : '&nbsp;');
                innerHTML.push('</td>');
                innerHTML.push('<td>');
                innerHTML.push((obj.itemCost !== undefined)? '$' + obj.itemCost.toFixed(2) : '&nbsp;');
                innerHTML.push('</td>');
                innerHTML.push('</tr>');
            } catch (e) {
                console.warn(e);
            }
        }

        if (len < 17) {
            for (i = len; i < 17; i++) {
                innerHTML.push('<tr class="blank"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
            }
        }

        itemList.innerHTML = innerHTML.join("");
        innerHTML = undefined;
    },
    initItemEditContainer: function() {
        try {
            WRPAdminApp.pagescript._selectedItemSid = 0;
        } catch (e) {

        }
        try {
            document.getElementById("item-edit-item-code").value = "";
        } catch (e) {

        }
        try {
            document.getElementById("item-edit-item-model").value = "";
        } catch (e) {

        }
        try {
            document.getElementById("item-edit-item-description").value = "";
        } catch (e) {

        }
        try {
            document.getElementById("item-edit-item-distributor").value = "";
        } catch (e) {

        }
        try {
            document.getElementById("item-edit-item-manufacturer").value = "";
        } catch (e) {

        }
        try {
            document.getElementById("item-edit-item-category").value = "";
        } catch (e) {

        }
        try {
            document.getElementById("item-edit-item-sub-category").value = "";
        } catch (e) {

        }
        try {
            document.getElementById("item-edit-item-color").value = "";
        } catch (e) {

        }
        try {
            document.getElementById("item-edit-item-condition").value = "";
        } catch (e) {

        }
        try {
            document.getElementById("item-edit-item-sku").value = "";
        } catch (e) {

        }

        try {
            document.getElementById("item-edit-item-type").value = 0;
        } catch (e) {

        }

        /*
        try {
            document.getElementById("item-edit-serialized").checked = false;
        } catch (e) {

        }
        */
        try {
            document.getElementById("item-edit-item-cost").value = "$0.00";
        } catch (e) {

        }
        try {
            document.getElementById("item-edit-item-qty-wrapper").innerHTML = '<input type="text" class="fill_width_parent" id="item-edit-item-qty" value="0"/>';
        } catch (e) {
            console.log(e);
        }
        try {
            document.getElementById("item-edit-item-retail-price").value = "$0.00";
        } catch (e) {

        }
        try {
            document.getElementById("item-edit-item-wholesale-price").value = "$0.00";
        } catch (e) {

        }
        try {
            document.getElementById("item-edit-item-image").value = "";
        } catch (e) {

        }

        try { document.getElementById("item-edit-image-preview").style.backgroundImage= ''; } catch (e) {}

        //WRPAdminApp.pagescript.onItemTypeValueChanged();
        WRPAdminApp.pagescript.getCategoriesDicListByParentSID(0);

        WRPAdminApp.openPopupInPage('itemEditContainer');
    },
    onItemTypeValueChanged: function() {
        var selectItemType = document.getElementById("item-edit-item-type"), elemList, i, len;

        return;

        if (!selectItemType) return;

        switch (parseInt(selectItemType.value)) {
            case 0:
            case 1:
            case 2:
                elemList = document.querySelectorAll(".item-edit-for-only-serialized");
                for (i = 0,len = elemList.length; i < len; i++) {
                    elemList[i].style.display = "block";
                }
                elemList = document.querySelectorAll(".item-edit-for-only-tangible");
                for (i = 0,len = elemList.length; i < len; i++) {
                    elemList[i].style.display = "none";
                }

                try {
                    document.getElementById("item-edit-item-new-price").disabled = false;
                } catch (e) {

                }
                try {
                    document.getElementById("item-edit-item-upgrade-price").disabled = false;
                } catch (e) {

                }
                try {
                    document.getElementById("item-edit-item-sor-price").disabled = false;
                } catch (e) {

                }
                try {
                    document.getElementById("item-edit-item-retail-price").disabled = true;
                } catch (e) {

                }
                try {
                    document.getElementById("item-edit-item-wholesale-price").disabled = true;
                } catch (e) {

                }

                break;
            case 3:
                elemList = document.querySelectorAll(".item-edit-for-only-serialized");
                for (i = 0,len = elemList.length; i < len; i++) {
                    elemList[i].style.display = "none";
                }
                elemList = document.querySelectorAll(".item-edit-for-only-tangible");
                for (i = 0,len = elemList.length; i < len; i++) {
                    elemList[i].style.display = "block";
                }
                try {
                    document.getElementById("item-edit-item-retail-price").disabled = false;
                } catch (e) {

                }
                try {
                    document.getElementById("item-edit-item-wholesale-price").disabled = false;
                } catch (e) {

                }

                break;
        }
    },
    getCategoriesDicListByParentSID: function() {
        var parentSid = 0, selectedSid, arg;

        arg = arguments;

        if (arg.length > 0) {
            parentSid = parseInt(arguments[0]);
        }

        if (isNaN(parentSid)) {
            parentSid = 0;
        }

        if (arg.length > 1) {
            selectedSid = parseInt(arg[1]);
            if (isNaN(selectedSid)) {
                selectedSid = undefined;
            }
        }

        $.ajax({
            url:  "../StoreItemsCtrl/getCategoriesByParentSID",
            data: {
                parentSid: parentSid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var selectBox, innerHTML, data, i, len, obj;

                data = result.data;
                if (!data) return;

                if (parentSid == 0) {
                    selectBox = document.getElementById("item-edit-item-category");
                } else {
                    selectBox = document.getElementById("item-edit-item-sub-category");
                }

                if (!selectBox) return;

                innerHTML = [];
                innerHTML.push('<option value="0">-- SELECT --</option>');
                for (i = 0, len = data.length ; i < len; i++) {
                    try {
                        obj = data[i];

                        innerHTML.push('<option value="');
                        innerHTML.push(obj.sid);
                        innerHTML.push('"');
                        if (selectedSid !== undefined && selectedSid === obj.sid) {
                            innerHTML.push(' selected');
                        }
                        innerHTML.push('>');
                        innerHTML.push(obj.categoryName);
                        innerHTML.push('</option>');
                    } catch (e) {

                    }
                }

                if (innerHTML.length > 0) {
                    selectBox.innerHTML = innerHTML.join("");
                } else {
                    selectBox.innerHTML = "";
                    selectBox.value = "";
                }
                innerHTML = undefined;

                if (parentSid === 0 && arg.length > 2) {
                    if (selectedSid !== undefined) {
                        WRPAdminApp.pagescript.getCategoriesDicListByParentSID(selectedSid, arg[2]);
                    }
                } else {

                }
            }
        });
    },
    getItemInfoBySID: function() {
        if (arguments.length < 1) {
            console.warn("no input sid");
            return;
        }

        if (WRPAdminApp.pagescript._selectedStoreId === undefined) {
            alert("No selected store");
            return;
        }

        $.ajax({
            url: "ajax/item/getItemDictByItemSid.jsp",
            data: {
                storeId: WRPAdminApp.pagescript._selectedStoreId,
                itemSid: arguments[0]
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, elem, i, len;

                data = result.data;

                if (!data) return;

                if (data.sid === undefined || data.sid === null || data.sid < 1) {
                    alert("ITEM INDEX Error");
                    return;
                }

                WRPAdminApp.pagescript._selectedItemSid = data.sid;

                try {
                    document.getElementById("item-edit-item-code").value = (data.itemCode !== undefined && data.itemCode !== null)? data.itemCode : "";
                } catch (e) {

                }
                try {
                    document.getElementById("item-edit-item-model").value = (data.model !== undefined && data.model !== null)? data.model : "";
                } catch (e) {

                }
                try {
                    document.getElementById("item-edit-item-description").value = (data.description !== undefined && data.description !== null)? data.description : "";
                } catch (e) {

                }
                try {
                    document.getElementById("item-edit-item-distributor").value = (data.distributor !== undefined && data.distributor !== null)? data.distributor : "";
                } catch (e) {

                }
                try {
                    document.getElementById("item-edit-item-manufacturer").value = (data.manufacturer !== undefined && data.manufacturer !== null)? data.manufacturer : "";
                } catch (e) {

                }
                try {
                    document.getElementById("item-edit-item-category").value = data.categorySid;
                } catch (e) {

                }

                if (data.category) {
                    if (data.subCategory) {
                        WRPAdminApp.pagescript.getCategoriesDicListByParentSID(0, data.category, data.subCategory);
                    } else {
                        WRPAdminApp.pagescript.getCategoriesDicListByParentSID(0, data.category);
                    }
                }

                try {
                    document.getElementById("item-edit-item-color").value = (data.color !== undefined && data.color !== null)? data.color : "";
                } catch (e) {

                }
                try {
                    document.getElementById("item-edit-item-condition").value = (data.condition !== undefined && data.condition !== null)? data.condition : "";
                } catch (e) {

                }
                try {
                    document.getElementById("item-edit-item-sku").value = (data.sku !== undefined && data.sku !== null)? data.sku : "";
                } catch (e) {

                }

                try {
                    document.getElementById("item-edit-item-type").value = (data.itemType !== undefined && data.itemType !== null)? data.itemType : 0;
                } catch (e) {

                }

/*
                try {
                    if (data.serialized === undefined) {
                        throw "";
                    }
                    if( data.serialized === 1) {
                        document.getElementById("item-edit-serialized").checked = true;
                    } else {
                        document.getElementById("item-edit-serialized").checked = false;
                    }
                } catch (e) {

                }
*/
                try {
                    document.getElementById("item-edit-item-cost").value = (data.itemCost !== undefined && data.itemCost !== null)? "$"+data.itemCost.toFixed(2) : "$0.00";
                } catch (e) {

                }

                if (data.serialized > 0) {
                    console.log("serializable");
                    try {
                        document.getElementById("item-edit-item-qty-wrapper").innerHTML = (data.qty !== undefined) ? data.qty : 0;
                    } catch (e) {
                        console.log(e);

                    }
                } else {
                    console.log("non serializable");
                    try {
                        document.getElementById("item-edit-item-qty-wrapper").innerHTML = ('<input type="text" class="fill_width_parent" id="item-edit-item-qty" value="' + ((data.qty !== undefined) ? data.qty : 0 )+ '"/>');
                    } catch (e) {
                        console.log(e);
                    }
                }
                try {
                    elem = document.getElementById("item-edit-item-retail-price");
                    elem.disabled = false;
                    elem.value = (data.retailPrice !== undefined && data.retailPrice !== null)? "$"+data.retailPrice.toFixed(2) : "$0.00";
                } catch (e) {

                }
                try {
                    elem = document.getElementById("item-edit-item-wholesale-price");
                    elem.disabled = false;
                    elem.value = (data.wholesalePrice !== undefined && data.wholesalePrice !== null)? "$"+data.wholesalePrice.toFixed(2) : "$0.00";
                } catch (e) {

                }

                switch(data.serialized) {
                    case 0:
                        elem = document.querySelectorAll(".item-edit-for-only-serialized");
                        for (i = 0,len = elem.length; i < len; i++) {
                            elem[i].style.display = "none";
                        }
                        elem = document.querySelectorAll(".item-edit-for-only-tangible");
                        for (i = 0,len = elem.length; i < len; i++) {
                            elem[i].style.display = "block";
                        }
                        try {
                            elem = document.getElementById("item-edit-item-retail-price");
                            elem.disabled = false;
                            elem.value = (data.retailPrice !== undefined && data.retailPrice !== null)? "$"+data.retailPrice.toFixed(2) : "$0.00";
                        } catch (e) {

                        }
                        try {
                            elem = document.getElementById("item-edit-item-wholesale-price");
                            elem.disabled = false;
                            elem.value = (data.wholesalePrice !== undefined && data.wholesalePrice !== null)? "$"+data.wholesalePrice.toFixed(2) : "$0.00";
                        } catch (e) {

                        }
                        break;
                    case 1:
                        elem = document.querySelectorAll(".item-edit-for-only-serialized");
                        for (i = 0,len = elem.length; i < len; i++) {
                            elem[i].style.display = "block";
                        }
                        elem = document.querySelectorAll(".item-edit-for-only-tangible");
                        for (i = 0,len = elem.length; i < len; i++) {
                            elem[i].style.display = "none";
                        }
                        try {
                            elem = document.getElementById("item-edit-item-retail-price");
                            elem.disabled = false;
                            elem.value = (data.retailPrice !== undefined && data.retailPrice !== null)? "$"+data.retailPrice.toFixed(2) : "$0.00";
                        } catch (e) {

                        }
                        try {
                            elem = document.getElementById("item-edit-item-wholesale-price");
                            elem.disabled = false;
                            elem.value = (data.wholesalePrice !== undefined && data.wholesalePrice !== null)? "$"+data.wholesalePrice.toFixed(2) : "$0.00";
                        } catch (e) {

                        }
                        break;
                }

                try {
                    document.getElementById("item-edit-item-image").value = "";
                } catch (e) {

                }

                try {
                    document.getElementById("item-edit-image-preview").style.backgroundImage = "url('../"+ data.image +"')";
                } catch (e) {
                    console.log(e);
                }


                WRPAdminApp.openPopupInPage('itemEditContainer');

                WRPAdminApp.pagescript.getSerializedItemListInInvenByItemSid();
            }
        });
    },
    getSerializedItemListInInvenByItemSid: function() {

        if (WRPAdminApp.pagescript._selectedStoreId === undefined) {
            alert("No selected store");
            return;
        }

        $.ajax({
            url: "ajax/inventory/getSerializedItemListInInvenByItemSid.jsp",
            data: {
                storeId: WRPAdminApp.pagescript._selectedStoreId,
                itemSid: WRPAdminApp.pagescript._selectedItemSid
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, serialNoList, i, len, obj, innerHTML, strBuffer;
                data = result.data;
                if (!data) return;

                serialNoList = document.getElementById("item-edit-inven-serial-no-list");
                if (!serialNoList) return;

                innerHTML = [];

                for (i = 0, len = data.length; i < len; i++) {
                    try {
                        obj = data[i];
                        innerHTML.push('<div class="tr">');
                        innerHTML.push('<div class="td">');
                        innerHTML.push((obj.serialNo !== undefined && obj.serialNo)? obj.serialNo : "&nbsp;");
                        innerHTML.push('</div>');
                        innerHTML.push('<div class="td">');
                        innerHTML.push((obj.poSid !== undefined && obj.poSid)? obj.poSid : "&nbsp;");
                        innerHTML.push('</div>');
                        innerHTML.push('<div class="td">');
                        innerHTML.push((obj.vendor !== undefined && obj.vendor)? obj.vendor : "&nbsp;");
                        innerHTML.push('</div>');
                        innerHTML.push('<div class="td">');
                        innerHTML.push((obj.updateDate !== undefined && obj.updateDate)? obj.updateDate : "&nbsp;");
                        innerHTML.push('</div>');
                        strBuffer = [];
                        if (obj.firstName !== undefined && obj.firstName) {
                            strBuffer.push(obj.firstName);
                        }
                        if (obj.middleName !== undefined && obj.middleName) {
                            strBuffer.push(obj.middleName);
                        }
                        if (obj.lastName !== undefined && obj.lastName) {
                            strBuffer.push(obj.lastName);
                        }
                        innerHTML.push('<div class="td">');
                        innerHTML.push(strBuffer.join(" "));
                        innerHTML.push('</div>');
                        innerHTML.push('</div>');

                        strBuffer = undefined;
                    } catch (e) {
                        console.warn(e);
                    }
                }

                if (len < 4) {
                    for (; len < 4; len++) {
                        innerHTML.push('<div class="tr"><div class="td"></div><div class="td"></div><div class="td"></div><div class="td"></div><div class="td"></div></div>');
                    }
                }

                serialNoList.innerHTML = innerHTML.join("");
                innerHTML = undefined;
            }
        });
    },
    updateItemDictInfo: function() {
        var data = {}, elem;

        if (!confirm("Are you sure?")) return;

        try {
            if (document.getElementById("item-edit-item-image").files.length > 0) {
                WRPAdminApp.pagescript.uploadItemImage();
                return;
            }
        } catch (e) {

        }

        try {
            data.sid = parseInt(WRPAdminApp.pagescript._selectedItemSid);
            if (isNaN(data.sid)) {
                throw "";
            }
        } catch (e) {
            console.warn("SID Format ERR");
            console.warn(e);
            return;
        }

        try {
            elem = document.getElementById("item-edit-item-code");
            data.itemCode = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("item-edit-item-model");
            data.model = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("item-edit-item-description");
            data.description = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("item-edit-item-distributor");
            data.distributor = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("item-edit-item-manufacturer");
            data.manufacturer = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("item-edit-item-category");
            data.category = elem.value;
            if (data.category == 0) {
                alert("Select category");
                return;
            }
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("item-edit-item-sub-category");
            data.subCategory = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("item-edit-item-color");
            data.color = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("item-edit-item-condition");
            data.condition = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("item-edit-item-sku");
            data.sku = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("item-edit-item-type");
            data.itemType = parseInt(elem.value);
            if (isNaN(data.itemType)) {
                throw "";
            }
        } catch (e) {
            console.warn("Item type is non-numeric character");
            console.warn(e);
            alert("Item Type ERR");
            return;
        }

/*
        try {
            elem = document.getElementById("item-edit-serialized");
            if (elem.checked === true) {
                data.serialized = 1;
            } else {
                data.serialized = 0;
            }
        } catch (e) {
            console.warn("serialized error");
            console.warn(e);
            return;
        }
*/
        try {
            elem = document.getElementById("item-edit-item-cost");
            data.itemCost = parseFloat(elem.value.replace("$", ""));
            if (isNaN(data.itemCost)) {
                throw "";
            }
        } catch (e) {
            console.warn(e);
            alert("Item Cost contains non-numeric character");
            return;
        }

        switch(data.serialized) {
            case 0:
                try {
                    elem = document.getElementById("item-edit-item-qty");
                    if (elem) {
                        data.qty = parseInt(elem.value);
                        if (isNaN(data.qty)) {
                            throw "";
                        }
                    } else {
                        data.qty = -999;
                    }
                } catch (e) {
                    console.warn(e);
                    alert("Qty contains non-numeric character");
                    return;
                }
                try {
                    elem = document.getElementById("item-edit-item-retail-price");
                    data.retailPrice = parseFloat(elem.value.replace("$", ""));
                    if (isNaN(data.retailPrice)) {
                        throw "";
                    }
                } catch (e) {
                    console.warn(e);
                    alert("Retail contains non-numeric character");
                    return;
                }
                try {
                    elem = document.getElementById("item-edit-item-wholesale-price");
                    data.wholesalePrice = parseFloat(elem.value.replace("$", ""));
                    if (isNaN(data.wholesalePrice)) {
                        throw "";
                    }
                } catch (e) {
                    console.warn(e);
                    alert("SOR Price contains non-numeric character");
                    return;
                }
                break;
            case 1:
                break;
        }

        $.ajax({
            url: "ajax/item/updateItemDict.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    WRPAdminApp.closePopup('itemEditContainer');
                    WRPAdminApp.pagescript.getItemDictList();
                } else {
                    alert("Error. ("+ result + ")");
                }
            }
        });
    },
    setItemImagePreview: function() {
        var itemImage = document.getElementById("item-edit-item-image"), reader;
        if (!itemImage) return;

        if (itemImage.files && itemImage.files[0]) {
            reader = new FileReader();
            reader.onload = function(e) {
                try { document.getElementById("item-edit-image-preview").style.backgroundImage= 'url("'+e.target.result+'")'; } catch (e) {}
            };

            reader.readAsDataURL(itemImage.files[0]);
        } else {
            try { document.getElementById("item-edit-image-preview").style.backgroundImage= ''; } catch (e) {}
        }
    },
    uploadItemImage: function() {
        var jqueryUploadItemImage = $("#form-upload-image");
        if (!jqueryUploadItemImage[0]) return;
        jqueryUploadItemImage.attr("action", "ajax/item/uploadImageUpload.jsp");
        jqueryUploadItemImage.ajaxForm(WRPAdminApp.pagescript.callBackUploadItemImageFile);
        jqueryUploadItemImage.submit();
    },
    callBackUploadItemImageFile: function(imageUrl, state) { // img path
        var data = {}, elem;

        try {
            data.sid = parseInt(WRPAdminApp.pagescript._selectedItemSid);
            if (isNaN(data.sid)) {
                throw "";
            }
        } catch (e) {
            console.warn("SID Format ERR");
            console.warn(e);
            return;
        }

        data.image = imageUrl.trim();

        try {
            document.getElementById("item-edit-item-image").value = "";
        } catch (e) {

        }

        try {
            elem = document.getElementById("item-edit-item-code");
            data.itemCode = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("item-edit-item-model");
            data.model = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("item-edit-item-description");
            data.description = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("item-edit-item-distributor");
            data.distributor = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("item-edit-item-manufacturer");
            data.manufacturer = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("item-edit-item-category");
            data.category = elem.value;
            if (data.category == 0) {
                alert("Select category");
                return;
            }
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("item-edit-item-sub-category");
            data.subCategory = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("item-edit-item-color");
            data.color = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("item-edit-item-condition");
            data.condition = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("item-edit-item-sku");
            data.sku = elem.value;
        } catch (e) {
            console.warn(e);
        }

        try {
            elem = document.getElementById("item-edit-item-type");
            data.itemType = parseInt(elem.value);
            if (isNaN(data.itemType)) {
                throw "";
            }
        } catch (e) {
            console.warn("Item type is non-numeric character");
            console.warn(e);
            alert("Item Type ERR");
            return;
        }

/*
        try {
            elem = document.getElementById("item-edit-serialized");
            if (elem.checked === true) {
                data.serialized = 1;
            } else {
                data.serialized = 0;
            }
        } catch (e) {
            console.warn("serialized error");
            console.warn(e);
            return;
        }
*/
        try {
            elem = document.getElementById("item-edit-item-cost");
            data.itemCost = parseFloat(elem.value.replace("$", ""));
            if (isNaN(data.itemCost)) {
                throw "";
            }
        } catch (e) {
            console.warn(e);
            alert("Item Cost contains non-numeric character");
            return;
        }

        switch(data.serialized) {
            case 0:
                try {
                    elem = document.getElementById("item-edit-item-qty");
                    if (elem) {
                        data.qty = parseInt(elem.value);
                        if (isNaN(data.qty)) {
                            throw "";
                        }
                    } else {
                        data.qty = -999;
                    }
                } catch (e) {
                    console.warn(e);
                    alert("Qty contains non-numeric character");
                    return;
                }
                try {
                    elem = document.getElementById("item-edit-item-retail-price");
                    data.retailPrice = parseFloat(elem.value.replace("$", ""));
                    if (isNaN(data.retailPrice)) {
                        throw "";
                    }
                } catch (e) {
                    console.warn(e);
                    alert("Retail contains non-numeric character");
                    return;
                }
                try {
                    elem = document.getElementById("item-edit-item-wholesale-price");
                    data.wholesalePrice = parseFloat(elem.value.replace("$", ""));
                    if (isNaN(data.wholesalePrice)) {
                        throw "";
                    }
                } catch (e) {
                    console.warn(e);
                    alert("SOR Price contains non-numeric character");
                    return;
                }
                break;
            case 1:
                break;
        }

        console.log(data);

        $.ajax({
            url: "ajax/item/updateItemDict.jsp",
            data: data,
            method: "POST",
            dataType: "json",
            success: function(result) {
                if (result === 0) {
                    WRPAdminApp.closePopup('itemEditContainer');
                    WRPAdminApp.pagescript.getItemDictList();
                } else {
                    alert("Error. ("+ result + ")");
                }
            }
        });
    }
};