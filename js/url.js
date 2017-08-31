 /*-----------------------------------------------------------------------------
 * @Description:    后台管理--配置url地址 (url-core.js)
 * @Version:        V1.0.0
 * @author:         yud(862669640@qq.com)
 * @date            2017.6.30
 * ==NOTES:=============================================
 * v1.0.0(2015.11.02) cuiy:
 * 经项目实践,发现目前项目架构不适合调试使用,需要不断修改IO层,这样会对前\后端的开发带来不便,故决定使用此插件来解决问题
 * v2.0.0(2017.07.22) zhangxn:
 * 为了适应新版框架，现将url-core进行修改
 * ---------------------------------------------------------------------------*/
(function(){
    var
        site ={
            website:'/', //站点地址
            staticWebsite: '/' // 前端服务器地址
        };


    _pw_apiData = {
        //  后台登录
        Login: {
            'getLogin': site.staticWebsite + 'mock/common.json', //'后台登录'
            'sendNameData': site.staticWebsite + 'mock/common.json', //'修改密码发送旧密码'
            'sendPassWordData': site.staticWebsite + 'mock/common.json', //'发送修改密码数据'
        },
        //光缆段管理
        opticalCableManagement: {
            'initData': site.staticWebsite + 'json/init-data.json', //'列表页初始数据'
            'selectData': site.staticWebsite + 'json/select-data.json', //'点击搜索刷数据'
        }
    };

    jQuery.extend({
        url: _pw_apiData
    });
})();