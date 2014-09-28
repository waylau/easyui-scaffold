"use strict";

var initLeftMenu = function(){
    $.ajax({
        //请求方式为get
        type:"GET",
        //json文件位置
        url:"data/left-menu.json",
        //返回数据格式为json
        dataType: "json",
        //请求成功完成后要执行的方法
        success: function( result ) {
            if( result.data ){
                var data = result.data;
                $.each( data,function( i, item ){
                    var group = item.group ;
                    var gorupData = item.data;
                    var accd = '<div  title="'+group+'" style="border:0"><ul>';

                    $.each( gorupData,function( i, item ){
                        var title = item.title;
                        var icon = item.icon;
                        var url = item.url;

                        accd += '<li><div class="menu-item"><a href="javascript:void(0);" class="easyui-linkbutton" plain="true" ';
                        accd += 'onclick="javascript:addTabHref(\''+title+'\',\''+url+'\');return false;">';
                        accd += '<img src="' + icon + '" />'+ title+' </a></div></li>';

                    });

                    accd += '</di></ul>';

                    $("#left-menu-content-id").append( accd );
                })
            }

        },
        error: function() {
            alert('失败');
        }
    });
};


var getDateTime = function () {
    //获取当地时间
    var weekArray = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var today = new Date();
    var week = weekArray[today.getDay()];
    var dateime = today.format('yyyy-MM-dd hh:mm:ss')
    $('#dateime_id').html(week + ' ' + dateime);
};

/**
 * Tabs  以  Content形式加载
 * @param closableValue 是指是否关闭窗口
 */
var addTabContent = function (title, url, closableValue) {
    if ($('#tabs').tabs('exists', title)) {
        $('#tabs').tabs('select', title);
    } else {
        if ("undefined" == typeof arguments[2]) {
            closableValue = true
        }
        var content = '<iframe scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:100%;"></iframe>';
        $('#tabs').tabs('add', {
            title: title,
            content: content,
            closable: closableValue
        });
    }

};

/**
 * Tabs  以  Url 形式加载
 * @param closableValue 是指是否关闭窗口
 */
var addTabHref = function (title, url, closableValue) {
    if ($('#tabs').tabs('exists', title)) {
        $('#tabs').tabs('select', title);
    } else {
        if ("undefined" == typeof arguments[2]) {
            closableValue = true
        }
        $('#tabs').tabs('add', {
            title: title,
            href: url,
            closable: closableValue
        });
    }
};

/**
 * 弹窗
 */
var slide = function (title,msg){
    $.messager.show({
        title:title,
        msg:msg,
        timeout:3000,
        showType:'slide'
    });
};


$(document).ready(function () {

    //定时更新时间
    $(function () {
        setInterval("getDateTime();", 1000);
    });

    initLeftMenu();

    //换肤
    $(function(){
        $('#theme_id').tooltip({
            content: $('<div></div>'),
            showEvent: 'click',
            onUpdate: function(content){
                content.panel({
                    width: 200,
                    border: false,
                    title: '更换皮肤',
                    href: 'app/theme/index.html'
                });
            },
            onShow: function(){
                var t = $(this);
                t.tooltip('tip').unbind().bind('mouseenter', function(){
                    t.tooltip('show');
                }).bind('mouseleave', function(){
                    t.tooltip('hide');
                });
            }
        });
    });


});
