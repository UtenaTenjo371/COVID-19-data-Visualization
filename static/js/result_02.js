// 获取echarts的容器
var chart = echarts.init(document.getElementById("main"));

/*
    图中相关城市经纬度,根据你的需求添加数据
    关于国家的经纬度，可以用首都的经纬度或者其他城市的经纬度
*/
var geoCoordMap = {
    'London':[-0.15, 51.208425],
    'Manchester':[2.15,53.30],
    'Edinburgh':[3.13,55.57],
    'Birmingham':[1.50,52.30],
    'Beijing':[116.3917,40.2207],
    'Shanghai':[121.4894,31.40527],
    'Guangzhou':[113.3,23.5533],
    'Vienna':[16.22,48.13],
    'Dubai':[55.17,25.13],
    'Paris':[2.2,48.51],
    'Hamad':[50.3025,26.655],
    'Amsterdam':[4.52,52.21],

};

/*
    记录下起点城市和终点城市的名称，以及权重
    数组第一位为终点城市，数组第二位为起点城市，以及该城市的权重，就是图上圆圈的大小
 */

// 重庆
var CQData = [
    [{name: 'London'}, {name: "Dubai",value: 60}],
    [{name: 'London'}, {name: "Hamad",value: 30}],
    [{name: 'London'}, {name: "Paris",value: 20}],
    [{name: 'London'}, {name: "Vienna",value: 20}],
];

// 广州
var GZData = [
    [{name: 'Birmingham'}, {name: "Paris",value: 30}],
    [{name: 'Birmingham'}, {name: "Amsterdam",value: 30}],
];

// 南宁
var NNData = [
    [{name: 'Manchester'}, {name: "Dubai",value: 50}],
    [{name: 'Manchester'}, {name: "Paris",value: 20}],
];

// 南宁
var EdData = [
    [{name: 'Edinburgh'}, {name: "Amsterdam",value: 60}],
    [{name: 'Edinburgh'}, {name: "Dubai",value: 20}],
];

// Amsterdam
var AmData = [
    [{name: 'Amsterdam'}, {name: "Beijing",value: 30}],
];
// Dubai
var DuData = [
    [{name: 'Dubai'}, {name: "Beijing",value: 20}],
];
// Paris
var PaData = [
    [{name: 'Paris'}, {name: "Beijing",value: 60}],
];
// Vienna
var ViData = [
    [{name: 'Vienna'}, {name: "Beijing",value: 30}],
];
// Hamad
var HaData = [
    [{name: 'Hamad'}, {name: "Beijing",value: 30}],
];

// 小飞机的图标，可以用其他图形替换
var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

// 获取地图中起点和终点的坐标，以数组形式保存下来
var convertData = function(data) {
    var res = [];
    for(var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordMap[dataItem[1].name];
        var toCoord = geoCoordMap[dataItem[0].name];
        if(fromCoord && toCoord) {
            res.push([{
                coord: fromCoord // 起点坐标
            }, {
                coord: toCoord // 终点坐标
            }])
        }
    }
    return res;
}

var color  = ['#9ae5fc', '#b1dfbb'];    // 自定义图中要用到的颜色
var series = [];                        // 用来存储地图数据

/*
    图中一共用到三种效果，分别为航线特效图、飞机航线图以及城市图标涟漪图。
    要用到setOption中的series属性，并且对每个城市都要进行三次设置。
*/
[['London', CQData],['Birmingham', GZData],['Manchester', NNData],['Edinburgh',EdData],['Amsterdam',AmData],['Dubai',DuData],['Paris',PaData],['Vienna',ViData],['Hamad',HaData]].forEach(function(item, i) {
    series.push({
        // 白色航线特效图
        type: 'lines',
        zlevel: 1,                    // 用于分层，z-index的效果
        effect: {
            show: true,               // 动效是否显示
            period: 6,                // 特效动画时间
            trailLength: 0.7,         // 特效尾迹的长度
            color: '#fff',            // 特效颜色
            symbolSize: 2             // 特效大小
        },
        lineStyle: {
            normal: {                 // 正常情况下的线条样式
                color: color[0],
                width: 0,             // 因为是叠加效果，要是有宽度，线条会变粗，白色航线特效不明显
                curveness: -0.2       // 线条曲度
            }
        },
        data: convertData(item[1])    // 特效的起始、终点位置
    }, {  // 小飞机航线效果
        type: 'lines',
        zlevel: 2,
        //symbol: ['none', 'arrow'],   // 用于设置箭头
        symbolSize: 10,
        effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,         // 特效形状，可以用其他svg pathdata路径代替
            symbolSize: 12
        },
        lineStyle: {
            normal: {
                color: color[0],
                width: 1,
                opacity: 0.6,
                curveness: -0.2
            }
        },
        data: convertData(item[1])     // 特效的起始、终点位置，一个二维数组，相当于coords: convertData(item[1])
    }, { // 散点效果
        type: 'effectScatter',
        coordinateSystem: 'geo',       // 表示使用的坐标系为地理坐标系
        zlevel: 3,
        rippleEffect: {
            brushType: 'stroke'        // 波纹绘制效果
        },
        itemStyle: {
            normal: {
                color: color[0]
            }
        },
        data: item[1].map(function(dataItem) {
            return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name],  // 起点的位置
                symbolSize: dataItem[1].value / 8,  // 散点的大小，通过之前设置的权重来计算，val的值来自data返回的value
            };
        })
    });
});

// 显示终点位置,类似于上面最后一个效果，放在外面写，是为了防止被循环执行多次
series.push({
    type: 'effectScatter',
    coordinateSystem: 'geo',
    zlevel: 3,
    rippleEffect: {
        brushType: 'stroke'
    },
    label: {
        normal: {
            show: true,
            position: 'left',
            formatter: '{b}'
        }
    },
    symbolSize: function(val) {
        return val[2] / 8;
    },
    itemStyle: {
        normal: {
            color: color[1]
        }
    },
    data: [{
        // 这里面的数据，由于一开始就知道终点位置是什么，所以直接写死，如果通过ajax来获取数据的话，还要进行相应的处理
        name: "London",
        value: [-0.15, 51.208425, 30],
    }, {
        name: 'Manchester',
        value: [2.15,53.30, 30],
    }, {
        name: 'Birmingham',
        value: [1.50,52.30, 20]
    },{
        name: 'Edinburgh',
        value: [3.13,55.57,20],
    },{
        name: 'Amsterdam',
        value: [4.52,52.21],
    },{
        name: 'Dubai',
        value: [55.17,25.13],
    },{
        name: 'Paris',
        value: [2.2,48.51],
    },{
        name: 'Vienna',
        value: [16.22,48.13],
    },{
        name: 'Hamad',
        value: [50.3025,26.655],
    }]
});

// 最后初始化世界地图中的相关数据
chart.setOption({
    title: {
        text: '结果可视化',
        textStyle: {
            color: '#fff',
            fontSize: 20
        },
        top: '10px',
        left: '10px'
    },
    geo: {
        map: 'world',       // 与引用进来的地图js名字一致
        roam: false,        // 禁止缩放平移
        itemStyle: {        // 每个区域的样式
            normal: {
                areaColor: '#67798b'
            },
            emphasis: {
                areaColor: '#576876'
            }
        },
        regions: [{        // 选中的区域
            name: 'United Kingdom',
            selected: true,
            itemStyle: {   // 高亮时候的样式
                emphasis: {
                    areaColor: '#b1dfbb'
                }
            },
            label: {    // 高亮的时候不显示标签
                emphasis: {
                    show: false
                }
            }
        },{
            name: 'China',
            selected: true,
            itemStyle: {
                emphasis: {
                    areaColor: '#b1dfbb'
                }
            },
            label: {
                emphasis: {
                    show: false
                }
            }
        }]
    },
    series: series,   // 将之前处理的数据放到这里
    textStyle: {
        fontSize: 12
    }
});

/* 然后就没有然后了，全剧终！ */
