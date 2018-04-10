var MQFHandler = function(field){
    this.handleValue = function(value){
        return value;
    }
};
var MQFHandler_string = function(field){
    MQFHandler.call(this, field);
};
$.extend(MQFHandler_string, MQFHandler);

var MQFHandler_number = function(field){
    MQFHandler.call(this, field);
    this.handleValue = function(value){
        if((value | 0 )===value){
            return value;
        }
        return value.toFixed(2);
    }
};
$.extend(MQFHandler_number, MQFHandler);

var MQFHandler_datetime = function(field){
    MQFHandler.call(this, field);
    this.handleValue = function(value){
        return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
    }
};
$.extend(MQFHandler_datetime, MQFHandler);

var MQFHandler_date = function(field){
    MQFHandler.call(this, field);
};
$.extend(MQFHandler_date, MQFHandler);

var MQFHandler_time = function(field){
    MQFHandler.call(this, field);
};
$.extend(MQFHandler_time, MQFHandler);

var MQFHandler_price = function(field){
    MQFHandler.call(this, field);
};
$.extend(MQFHandler_price, MQFHandler);

function createFieldHandler(field){
    if(field.type){
        try{
            return new Function('field', 'return new MQFHandler_' + field.type + '(field)')(field);
        }catch(e){
            console.log(e);
        }
    }
    return new MQFHandler(field);
}

var MQueryField = function(field){

    var fieldHandler = createFieldHandler(field);
    this.type = field.type;

    this.getTitle = function(){

    };

    this.getValue = function(value){
        return fieldHandler.handleValue(value);
    };
};

Date.prototype.Format = function(fmt)
{ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}