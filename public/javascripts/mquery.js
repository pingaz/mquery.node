
function mq_createHeader(headerlement, resultTable){
    headerlement.empty();
    var tr = $('<tr>');
    headerlement.append(tr);
    var headers = resultTable.headers;
    for(var i=0;i<headers.length;i++){
        var th = $('<th class="sorting" tabindex="0" aria-controls="example" rowspan="1" colspan="1" style="width: 15%;"aria-label="Position: activate to sort column ascending">');
        th.text(headers[i]);
        tr.append(th);
    }
}

function mq_createBody(bodyElement, resultTable){
    bodyElement.empty();
    var fields = resultTable.fields;
    var rows = resultTable.rows;
    var keys = resultTable.keys;
    for(var i=0;i<rows.length;i++){
        var trclass = i%2 === 0 ? "odd" : "even";
        var tr = $('<tr>');
        tr.addClass(trclass);
        var map = rows[i];
        for(var column=0;column<keys.length;column++){
            var td = $('<td>');
            if(fields[column].type){
                td.addClass(fields[column].type)
            }
            td.text(fields[column].getValue(map[keys[column]]));
            tr.append(td);
        }
        bodyElement.append(tr);
    }
}

var MQuery = function(element, options){
    /* This is a private declaration, isn't it ? */
    var settings = {
        pageSize: 50
    };

    this.element = $(element);
    this.headerElement = $('<thead>');
    this.bodyElement = $('<tbody>');
    this.options = $.extend(settings, options);
    this.loadUrl = '/s/pnp.mquery.finder.test01';
    this.queryUrl = '/q/pnp.mquery.finder.test01';

    //append head, body and foot
    this.element.empty();
    this.element.append(this.headerElement);
    this.element.append(this.bodyElement);

    var mq = this;

    this.load = function(){
        var dfd = $.Deferred();
        $.get(mq.loadUrl,function(data){
            console.log("load data:", data);
            mq.searcher = JSON.parse(data);
            mq.fields =[];
            for(var i=0;i<mq.searcher.fields.length;i++){
                mq.fields[i] = new MQueryField(mq.searcher.fields[i]);
            }
            dfd.resolve('load view finished.');
        });
        return dfd.promise();
    };

    this.execute = function(){
        var dfd = $.Deferred();
        $.post(mq.queryUrl,function(data){
            var resultTable = JSON.parse(data);
            console.log("result:", resultTable);
            resultTable.fields = mq.fields;
            mq_createHeader(mq.headerElement, resultTable);
            mq_createBody(mq.bodyElement, resultTable);
            dfd.resolve('query finished.');
        });
        return dfd.promise();
    };
};


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