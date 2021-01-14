var myChart = echarts.init(document.getElementById('main'));
var option;

myChart.showLoading();

$.get('../static/data/test.json', function (data) {
    myChart.hideLoading();

    var itemStyle = {
        opacity: 0.8
    };

    var sizeFunction = function (x) {
        var y = Math.sqrt(x / 10) + 0.1;
        return y * 80;
    };
    // Schema:
    var schema = [
        {name: 'Infected', index: 0, text: '感染人数', unit: ''},
        {name: 'Augment', index: 1, text: '新增感染', unit: ''},
        {name: 'Rate', index: 2, text: '新增速率', unit: '%'},
        {name: 'County', index: 3, text: '地区', unit: ''}
    ];

    option = {
        baseOption: {
            timeline: {
                axisType: 'category',
                orient: 'vertical',
                autoPlay: true,
                inverse: true,
                playInterval: 1000,
                left: null,
                right: 0,
                top: 20,
                bottom: 20,
                width: 55,
                height: null,
                symbol: 'none',
                checkpointStyle: {
                    borderWidth: 2
                },
                controlStyle: {
                    showNextBtn: false,
                    showPrevBtn: false
                },
                data: []
            },
            title: [{
                text: data.timeline[0],
                textAlign: 'center',
                left: '68%',
                top: '62%',
                textStyle: {
                    fontSize: 50,
                    color: 'rgba(88,88,88,0.7)'
                }
            }, {
                text: '英国一个月内各地感染人数',
                left: 'center',
                top: 10,
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 20
                }
            }],
            tooltip: {
                padding: 5,
                borderWidth: 1,
                formatter: function (obj) {
                    var value = obj.value;
                    return schema[3].text + '：' + value[3] + '<br>'
                            + schema[1].text + '：' + value[1] + schema[1].unit + '<br>'
                            + schema[0].text + '：' + value[0] + schema[0].unit + '<br>'
                            + schema[2].text + '：' + value[2] + '<br>';
                }
            },
            grid: {
                top: 100,
                containLabel: true,
                left: 30,
                right: '110'
            },
            xAxis: {
                type: 'log',
                name: '总感染',
                max: 200000,
                min: 100,
                nameGap: 25,
                nameLocation: 'middle',
                nameTextStyle: {
                    fontSize: 18
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            yAxis: {
                type: 'log',
                name: '新增',
                max: 1600,
                min: 1,
                nameTextStyle: {
                    fontSize: 18
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            visualMap: [
                {
                    show: false,
                    dimension: 3,
                    categories: data.counties,
                    inRange: {
                        color: (function () {
                            var colors = ['#51689b', '#ce5c5c', '#fbc357', '#8fbf8f', '#659d84', '#fb8e6a', '#c77288', '#786090', '#91c4c5', '#6890ba'];
                            return colors.concat(colors);
                        })()
                    }
                }
            ],
            series: [
                {
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: data.series[0],
                    symbolSize: function(val) {
                        return sizeFunction(val[2]);
                    }
                }
            ],
            animationDurationUpdate: 1000,
            animationEasingUpdate: 'quinticInOut'
        },
        options: []
    };

    for (var n = 0; n < data.timeline.length; n++) {
        option.baseOption.timeline.data.push(data.timeline[n]);
        option.options.push({
            title: {
                show: true,
                'text': data.timeline[n] + ''
            },
            series: {
                name: data.timeline[n],
                type: 'scatter',
                itemStyle: itemStyle,
                data: data.series[n],
                symbolSize: function(val) {
                    return sizeFunction(val[2]);
                }
            }
        });
    }

    myChart.setOption(option);

});