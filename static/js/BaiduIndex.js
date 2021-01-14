var myChart_bd = echarts.init(document.getElementById('baiduIndex'));
var option_bd;

option_bd = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    title: {
        text: '城市搜索指数图'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['伯明翰', '曼彻斯特', '爱丁堡', '伦敦', '英国疫情']
    },
    toolbox: {
        feature: {
            saveAsImage: {}

        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['12月2日-12月8日', '12月9日-12月15日', '12月16日-12月22日', '12月23-12月29日', '12月30日-1月5日', '1月6日-1月12日']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '伯明翰',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(128, 255, 165)'
                }, {
                    offset: 1,
                    color: 'rgba(1, 191, 236)'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: [806,809,1671,807,874,742]
        },
        {
            name: '曼彻斯特',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 221, 255)'
                }, {

                    offset: 1,
                    color: 'rgba(77, 119, 255)'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: [1069,1087,2134,1042,987,884]
        },
        {
            name: '爱丁堡',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(55, 162, 255)'
                }, {
                    offset: 1,
                    color: 'rgba(116, 21, 219)'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: [1124,1126,2345,1056,908,950]
        },
        {
            name: '伦敦',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(255, 0, 135)'
                }, {
                    offset: 1,
                    color: 'rgba(135, 0, 157)'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: [1668,1658,3996,2895,1717,1758]
        },
        {
            name: '英国疫情',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            label: {
                show: true,
                position: 'top'
            },
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(255, 191, 0)'
                }, {
                    offset: 1,
                    color: 'rgba(224, 62, 76)'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: [1527,1571,12658,9512,4829,4294]
        }
    ]
};

option_bd && myChart_bd.setOption(option_bd);
