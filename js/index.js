$(function(){
    getLine();
    var series = [
        {
            name: '重点市',
            type: 'map',
            map: 'jilin',//要和echarts.registerMap（）中第一个参数一致
            scaleLimit: { min: 1.2, max: 1.9 },//缩放
            mapLocation:{  
                y:60  
            },  
            itemStyle:{
               normal:{
                    borderWidth:2,//省份的边框宽度
                    borderColor:'#6ea6dd',//省份的边框颜色
                    // color:'#fff'//地图背景颜色
                    areaColor:'#fff'//设置地图颜色
                },
                emphasis: {
                    label: {
                        show: false
                    },
                    areaColor: '#fff'
                }
            },
            markPoint: {  
                symbol: 'rect',
                large: true,  
                symbolSize: [35, 25],   
                itemStyle:{  
                    normal:{
                        color: '#5b9bd5', 
                        label:{ 
                            show: true,  
                            formatter: function (param) { 
                                return param.name;  
                            }    
                        }  
                    }  
                }, 
                data: [
                    {
                        name: '白城',
                        x: 130,
                        y: 90
                    },
                    {
                        name: '松原',
                        x: 290,
                        y: 130
                    },
                    {
                        name: '长春',
                        x: 340,
                        y: 278
                    },
                    {
                        name: '吉林',
                        x: 445,
                        y: 270
                    },
                    {
                        name: '四平',
                        x: 270,
                        y: 350
                    },
                    {
                        name: '辽源',
                        x: 320,
                        y: 380
                    },                                
                    {
                        name: '通化',
                        x: 385,
                        y: 510
                    },
                    {
                        name: '白山',
                        x: 460,
                        y: 490
                    },
                    {
                        name: '延吉',
                        x: 670,
                        y: 385
                    }
                ]      
            } 
        },
        {
            name: '二级市',
            type: 'map',
            map: 'jilin',
            markPoint: {  
                symbol: 'rect',
                large: true,  
                symbolSize: [35, 20],
                itemStyle:{  
                    normal:{
                        label:{ 
                            show: true,  
                            formatter: function (param) { 
                                return param.name;  
                            }    
                        },
                        borderWidth:1,//边框宽度
                        borderColor:'#6ea6dd',//边框颜色
                        color:'#6ea6dd',//背景颜色
                        
                    }                        
                }, 

                data: [
                    {
                        name: '大安',
                        x: 240,
                        y: 100
                    },
                    {
                        name: '太平川',
                        x: 200,
                        y: 220
                    },
                    {
                        name: '长岭',
                        x: 245,
                        y: 230
                    },
                    {
                        name: '口前',
                        x: 450,
                        y: 310
                    },
                    {
                        name: '磐石',
                        x: 400,
                        y: 365
                    },
                    {
                        name: '梅河口',
                        x: 380,
                        y: 430
                    },
                    {
                        name: '靖宇',
                        x: 450,
                        y: 440
                    }
                ]  
            },  
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false
                }
            },
        }
    ];
    window.series = series;

    var
        
        yellow = '#ffff00',
        green = '#27f56a',
        purple = '#7030a0',
        grey = '#999',
        boldLine = 3.5,
        fineLine = 1.5,
        statusRed = '#ff2828',      //显示红色的线颜色与宽度
        // statusRedWidth = 5,
        statusBlack = '#000',      //显示黑色的线颜色与宽度
        // statusBlackWidth = 5,
        tableColor = '#bce8f1',    //指向表格的线颜色与宽度
        tableLine = 1;

    function Line(name, color, width, type, data){
        var
            line = {
                name: name,
                type: 'map',
                map: 'jilin',//要和echarts.registerMap（）中第一个参数一致
                markLine: {  
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    smooth: false,  
                    itemStyle: {  
                        borderWidth: 100,  
                        normal: {  
                            borderWidth: 100,  
                            width: 10,  
                            color: color,  
                            lineStyle: {  
                                type: type,  
                                width: width,  
                                borderWidth: 100
                            }  
                        }  
                    },  
                    data: [data]
                }
            };

        return line;
    }

    /**
     * 获取线路段
     */
    function getLine(){
        $.ajax({
            type: "GET",
            url: '/json/index.json',
            contentType: "application/json; charset=utf-8",
            data: {request: 0},     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                //location.reload();
                if(rs.code == 0){
                    $.each(rs.list, function(index, item){
                        var
                            data1 = {}, 
                            data2 = {},
                            line = {};
                        if(item.type == 1 && item.status == 1){//status == 1，红色线
                            data1 = {"name": item.name, "x": item.startX, "y": item.startY};
                            data2 = {"x": item.endX, "y": item.endY};
                            line = Line(item.id, statusRed, boldLine, 'solid', [data1, data2]);
                        }else if(item.type == 2 && item.status == 1){
                            data1 = {"name": item.name, "x": item.startX, "y": item.startY};
                            data2 = {"x": item.endX, "y": item.endY};
                            line = Line(item.id, statusRed, boldLine, 'solid', [data1, data2]);
                        }else if(item.type == 3 && item.status == 1){
                            data1 = {"name": item.name, "x": item.startX, "y": item.startY};
                            data2 = {"x": item.endX, "y": item.endY};
                            line = Line(item.id, statusRed, fineLine, 'solid', [data1, data2]);
                        }else if(item.type == 4 && item.status == 1){
                            data1 = {"name": item.name, "x": item.startX, "y": item.startY};
                            data2 = {"x": item.endX, "y": item.endY};
                            line = Line(item.id, statusRed, boldLine, 'solid', [data1, data2]);
                        }else if(item.type == 5 && item.status == 1){
                            data1 = {"name": item.name, "x": item.startX, "y": item.startY};
                            data2 = {"x": item.endX, "y": item.endY};
                            line = Line(item.id, statusRed, fineLine, 'solid', [data1, data2]);
                        }else if(item.type == 6 && item.status == 1){
                            data1 = {"name": item.name, "x": item.startX, "y": item.startY};
                            data2 = {"x": item.endX, "y": item.endY};
                            line = Line(item.id, statusRed, fineLine, 'solid', [data1, data2]);
                        }else if(item.type == 1 && item.status == 2){//status == 2，黑色线
                            data1 = {"name": item.name, "x": item.startX, "y": item.startY};
                            data2 = {"x": item.endX, "y": item.endY};
                            line = Line(item.id, statusBlack, boldLine, 'solid', [data1, data2]);
                        }else if(item.type == 2 && item.status == 2){
                            data1 = {"name": item.name, "x": item.startX, "y": item.startY};
                            data2 = {"x": item.endX, "y": item.endY};
                            line = Line(item.id, statusBlack, boldLine, 'solid', [data1, data2]);
                        }else if(item.type == 3 && item.status == 2){
                            data1 = {"name": item.name, "x": item.startX, "y": item.startY};
                            data2 = {"x": item.endX, "y": item.endY};
                            line = Line(item.id, statusBlack, fineLine, 'solid', [data1, data2]);
                        }else if(item.type == 4 && item.status == 2){
                            data1 = {"name": item.name, "x": item.startX, "y": item.startY};
                            data2 = {"x": item.endX, "y": item.endY};
                            line = Line(item.id, statusBlack, boldLine, 'solid', [data1, data2]);
                        }else if(item.type == 5 && item.status == 2){
                            data1 = {"name": item.name, "x": item.startX, "y": item.startY};
                            data2 = {"x": item.endX, "y": item.endY};
                            line = Line(item.id, statusBlack, fineLine, 'solid', [data1, data2]);
                        }else if(item.type == 6 && item.status == 2){
                            data1 = {"name": item.name, "x": item.startX, "y": item.startY};
                            data2 = {"x": item.endX, "y": item.endY};
                            line = Line(item.id, statusBlack, fineLine, 'solid', [data1, data2]);
                        }else if(item.type == 1 && item.status == 0){//status == 0，原色线
                            data1 = {"name": item.name, "x": item.startX, "y": item.startY};
                            data2 = {"x": item.endX, "y": item.endY};
                            line = Line(item.id, yellow, boldLine, 'solid', [data1, data2]);
                        }else if(item.type == 2 && item.status == 0){
                            data1 = {"name": item.name, "x": item.startX, "y": item.startY};
                            data2 = {"x": item.endX, "y": item.endY};
                            line = Line(item.id, green, boldLine, 'solid', [data1, data2]);
                        }else if(item.type == 3 && item.status == 0){
                            data1 = {"name": item.name, "x": item.startX, "y": item.startY};
                            data2 = {"x": item.endX, "y": item.endY};
                            line = Line(item.id, green, fineLine, 'solid', [data1, data2]);
                        }else if(item.type == 4 && item.status == 0){
                            data1 = {"name": item.name, "x": item.startX, "y": item.startY};
                            data2 = {"x": item.endX, "y": item.endY};
                            line = Line(item.id, purple, boldLine, 'solid', [data1, data2]);
                        }else if(item.type == 5 && item.status == 0){
                            data1 = {"name": item.name, "x": item.startX, "y": item.startY};
                            data2 = {"x": item.endX, "y": item.endY};
                            line = Line(item.id, purple, fineLine, 'solid', [data1, data2]);
                        }else if(item.type == 6 && item.status == 0){
                            data1 = {"name": item.name, "x": item.startX, "y": item.startY};
                            data2 = {"x": item.endX, "y": item.endY};
                            line = Line(item.id, grey, fineLine, 'solid', [data1, data2]);
                        }
                        window.series.push(line);
                    });                    
                    renderTable();
                    map(window.series);
                }

            },
            error: function (message) {
                
            }
        });
    }
    
    /**
     * 加载地图
     * @param  {[type]} series [description]
     * @return {[type]}        [description]
     */
    function map(series){                    
        $.get('json/jilin.json', function (mapJson){
            echarts.registerMap('jilin', mapJson);  
            var chart = echarts.init(document.getElementById('jilin_map'));//在id为mainMap的dom元素中显示地图
            chart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: function (result){//回调函数，参数params具体格式参加官方API
                       // return result.name+'<br />数据:'+result.value;
                       return result.name;
                    } 
                },
                // dataRange:{  
                //     min:0,  
                //     max:50,  
                //     splitNumber:0,
                //     text:['高','低'],  
                //     realtime:false,
                //     calculable:false,
                //     selectedMode:false,
                //     realtime:false,
                //     show:false,
                //     itemWidth:10,
                //     itemHeight:60,
                //     color:['lightskyblue','#f2f2f2']
                // },
                series: series                    
            });
            chart.on('click', function(param){
                if(param.componentType == 'markLine' && param.color == statusRed && !param.seriesName.match(/table/)){
                    location.href = '#/?id=' + param.seriesName;
                }else if(param.componentType == 'markLine' && !param.seriesName.match(/table/)){
                    location.href = '#';
                }
            });
        });            
    }

    /**
     * 渲染表格
     */
    function renderTable(){
        var
            str = '';

        $.ajax({
            type: "GET",
            url: 'json/table.json',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {table: 0},     //JSON.stringify
            dataType: "json",
            success: function(rs){
                if(rs.code == 0){
                    $.each(rs.list, function(index, item){
                        var
                            data1 = {}, 
                            data2 = {},
                            line = {};   

                        str = '<table class="table table-hover table-bordered renderTable" style="position:absolute;left:'+ item.tablex +'px;top:'+ item.tabley +'px;">\
                                    <thead>\
                                        <tr>\
                                            <th>Z地市</th>\
                                            <th>IDC</th>\
                                            <th>IP承载B网</th>\
                                            <th>数据网</th>\
                                        </tr>\
                                    </thead>\
                                    <tbody>\
                                        <tr>\
                                            <td>'+ item.location1 +'</td>\
                                            <td>'+ item.IDC1 +'</td>\
                                            <td>'+ item.IP1 +'</td>\
                                            <td>'+ item.net1 +'</td>\
                                        </tr>\
                                        <tr>\
                                            <td>'+ item.location2 +'</td>\
                                            <td>'+ item.IDC2 +'</td>\
                                            <td>'+ item.IP2 +'</td>\
                                            <td>'+ item.net2 +'</td>\
                                        </tr>\
                                    </tbody>\
                                </table>'

                        $('body').append(str);
                        data1 = {"x": item.startX, "y": item.startY};
                        data2 = {"x": item.endX, "y": item.endY};
                        line = Line('table'+ item.number, tableColor, tableLine, 'solid', [data1, data2]);
                        window.series.push(line);
                    });
                }
            },
            error: function(message){

            }
        });
    }

    /**
     * 选择影响光缆段
     */
    $('.sele').click(function(){
        $('.selectAll').attr('checked', false);        
        if($('.selectBody').hasClass('hidden')){
            $('.selectBody').removeClass('hidden');
        }else{
            $('.selectBody').addClass('hidden');
        }
        render();
    });

    /**
     * 选择传输系统
     */
    $('.selectSystem').change(function(){
        render();
    });

    /**
     * 取消按钮
     */
    $('.cancel').click(function(){
        $('.selectBody').addClass('hidden');
    });

    /**
     * 确认按钮
     */
    $('.ok').click(function(){
        var
            array = [];

        if($('.select:checked').length == 0){
            alert('至少选择一项！');
        }else{
            $.each($('.select:checked'), function(index, item){
                array.push(item.value);
            });

            $.ajax({
                type: "GET",
                url: 'json/common.json',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {array: array},     //JSON.stringify
                dataType: "json",
                success: function(rs){
                    if(rs.code == 0){
                        getLine();
                    }
                },
                error: function(message){

                }
            });
        }  
    });

    /**
     * 清空按钮
     */
    $('.mark').click(function(){
        $.ajax({
            type: "GET",
            url: 'json/common.json',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {empty: 0},     //JSON.stringify
            dataType: "json",
            success: function(rs){
                if(rs.code == 0){
                    getLine();
                }
            },
            error: function(message){

            }
        });
    });

    /**
     * 渲染表格
     */
    function render(){
        var
            str = '',
            id = $('.selectSystem').val();

        if(id != ''){
            $.ajax({
                type: "GET",
                url: 'json/select.json',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {id: id},     //JSON.stringify
                dataType: "json",
                success: function(rs){
                    if(rs.code == 0){
                        $('.J_template').empty();
                        $.each(rs.list, function(index, item){
                            str += '<tr><td><input type="checkbox" class="select" value="'+ item.id +'"></td><td>'+ item.location1 +'</td><td>'+ item.location2 +'</td></tr>'
                        });
                        $('.J_template').append(str);
                    }
                },
                error: function(message){

                }
            });
        }
    }

    /**
     * selectAll全选
     */
    $('.selectAll').click(function(){
        var
            selectMap = $('.select');
        if( selectMap.length != $('.select:checked').length){
            $('.selectAll').prop('checked', true);
            selectMap.prop('checked', true);
        }else{
            selectMap.prop('checked', false);
        }
    });

    /**
     * select按钮
     */
    $(document).on('click', '.select', function(){
        var
            selectMap = $('.select'),
            selectAll = $('.selectAll');
        if( selectMap.length == $('.select:checked').length){
            selectAll.prop('checked', true);
        }else{
            selectAll.prop('checked', false);
        }
    });
});