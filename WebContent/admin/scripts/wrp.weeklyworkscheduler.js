/**
 * Created by Researcher01 on 2016-11-18.
 */

// 변수가 정의되지 않을 경우 변수 정의(자바스크립트에서만 가능함)
try {
    WRP;
} catch (e) {
    WRP = {};
}

WRP.WeeklyWorkScheduler = function() {

    var _weeklyData = {
        weekStartDate: undefined,
        weekEndDate: undefined,
    };

    return {
        getWeeklySchedule: function() {
            var date, date2, i;

            if (arguments.length == 1) {
                date = arguments[0];
                if (!arguments[0].getFullYear) return;
            } else {
                date = new Date();
            }

            _weeklyData.weekStartDate = undefined;
            _weeklyData.weekEndDate = undefined;

            for (i = 0 ; i < 10 ; i++) {
                if (_weeklyData.weekStartDate === undefined) {
                    date2 = new Date(date.getFullYear(), date.getMonth(), ( date.getDate() - i ) ) ;
                    if (date2.getDay() === 1) {
                        _weeklyData.weekStartDate = date2;
                    }
                }

                if (_weeklyData.weekEndDate === undefined) {
                    date2 = new Date(date.getFullYear(), date.getMonth(), ( date.getDate() + i ));
                    if (date2.getDay() === 0) {
                        _weeklyData.weekEndDate = date2;
                    }
                }

                if (_weeklyData.weekStartDate !== undefined && _weeklyData.weekEndDate !== undefined) {
                    return true;
                }
            }

            return false;
        },
        getWeekStartDate: function() {
            return _weeklyData.weekStartDate;
        },
        getWeekEndDate: function() {
            return _weeklyData.weekEndDate;
        },
        printWeeklyWorkScheduler: function() {

        },
        getTimeToSeconds: function() {
            var i1, i2, i3;

            if (arguments.length == 1) {
                if (typeof(arguments[0]) == "object") {
                    if (arguments[0].length == 3) {
                        i1 = parseInt(arguments[0][0]);
                        if (isNaN(i1)) {
                            console.warn("getTimeToSeconds : format error");
                            return;
                        }

                        i2 = parseInt(arguments[0][1]);
                        if (isNaN(i2)) {
                            console.warn("getTimeToSeconds : format error");
                            return;
                        }

                        i3 = parseInt(arguments[0][2]);
                        if (isNaN(i3)) {
                            console.warn("getTimeToSeconds : format error");
                            return;
                        }

                        return (i1 * 3600) + (i2 * 60) + i3;
                    } else if (arguments[0].length == 2) {

                        i1 = parseInt(arguments[0][0]);
                        if (isNaN(i1)) {
                            console.warn("getTimeToSeconds : format error");
                            return;
                        }

                        i2 = parseInt(arguments[0][1]);
                        if (isNaN(i2)) {
                            console.warn("getTimeToSeconds : format error");
                            return;
                        }

                        return (i1 * 3600) + (i2 * 60);
                    } else {
                        console.warn("getTimeToSeconds : You must input 2 or 3 length array");
                        return;
                    }
                } else {
                    i1 = parseInt(arguments[0]);
                    if (isNaN(i1)) {
                        console.warn("getTimeToSeconds : format error");
                        return;
                    }
                    return (i1 * 3600);
                }
            } else if (arguments.length == 2) {
                i1 = parseInt(arguments[0]);
                if (isNaN(i1)) {
                    console.warn("getTimeToSeconds : format error");
                    return;
                }

                i2 = parseInt(arguments[1]);
                if (isNaN(i2)) {
                    console.warn("getTimeToSeconds : format error");
                    return;
                }

                return (i1 * 3600) + (i2 * 60);
            } else if (arguments.length > 2) {
                i1 = parseInt(arguments[0]);
                if (isNaN(i1)) {
                    console.warn("getTimeToSeconds : format error");
                    return;
                }

                i2 = parseInt(arguments[1]);
                if (isNaN(i2)) {
                    console.warn("getTimeToSeconds : format error");
                    return;
                }

                i3 = parseInt(arguments[2]);
                if (isNaN(i3)) {
                    console.warn("getTimeToSeconds : format error");
                    return;
                }

                return (i1 * 3600) + (i2 * 60) + i3;
            }
        },
        getSecondsToTime: function() {
            var tmp;
            if (arguments.length == 1) {
                tmp = parseInt(arguments[0]);
                if (isNaN(tmp)) {
                    return undefined;
                }

                return WRPAdminApp.toDecimalFormat(Math.floor(tmp / 3600), "00") + ":" + WRPAdminApp.toDecimalFormat(Math.floor((tmp - Math.floor(tmp / 3600) * 3600) / 60), "00") + ":" + WRPAdminApp.toDecimalFormat(tmp % 60, "00");
            }
            return undefined;
        }
    }
}();