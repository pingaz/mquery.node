

function mq_field_value_number(field, value){

}
function mq_field_value_string(field, value){
    return value;
}
function mq_field_value_time(field, value){
    return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
}
function mq_field_value_price(field, value){

}

function execute_mq_field_value(field, value){
    if(field.type){
        try{
            return new Function('field', 'value', 'return mq_field_value_' + field.type + '(field, value)')(field, value);
        }catch(e){
            console.log(e);
        }
    }
    return value;
}

var MQueryField = function(field){

    this.field = field;
    this.type = field.type;
    var mqf = this;

    this.getTitle = function(){

    };

    this.getValue = function(value){
        return execute_mq_field_value(field, value);
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