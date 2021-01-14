myChart = echarts.init(document.getElementById('pieGraph'));
var option;

option = {
    legend: {
        top: 'bottom'
    },
    title: {
        text: '机场所在地区累计确诊病例占比',
        left: 'center',
        top: 20,
        textStyle: {
            fontSize: 24
        }

    },
    toolbox: {
        show: true,
        feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    series: [
        {
            name: '面积模式',
            type: 'pie',
            radius: [70, 180],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 8
            },
            data: [
                {value: 5010, name: 'Aberdeen City'},
                {value: 18293, name: 'Ealing'},
                {value: 38190, name: 'Manchester'},
                {value: 63201, name: 'York'},
                {value: 2345, name: 'Dumfries and Galloway'}
            ]
        }
    ]
};

option && myChart.setOption(option);

/* 动态折线图 */
var myChart2 = echarts.init(document.getElementById('test02'));
option = {}

$.get('../static/data/animationLine.json', function (_rawData) {
    run(_rawData);
});
function run(_rawData) {

    var countries = ['Aberdeen City','Ealing','Birmingham','Manchester','York','Dumfries and Galloway']
    var datasetWithFilters = [];
    var seriesList = [];
    echarts.util.each(countries, function (country) {
        var datasetId = 'dataset_' + country;
        datasetWithFilters.push({
            id: datasetId,
            fromDatasetId: 'dataset_raw',
            transform: {
                type: 'filter',
                config: {
                    and: [
                        { dimension: 'date', gte:2020-12-13  },
                        { dimension: 'name', '=': country }
                    ]
                }
            }
        });
        seriesList.push({
            type: 'line',
            datasetId: datasetId,
            showSymbol: false,
            name: country,
            endLabel: {
                show: true,
                formatter: function (params) {
                    return params.value[3] + ': ' + params.value[0];
                }
            },
            labelLayout: {
                moveOverlap: 'shiftY'
            },
            emphasis: {
                focus: 'series'
            },
            encode: {
                x: 'date',
                y: 'cases-cumulative',
                label: ['name', 'cases-cumulative'],
                itemName: 'date',
                tooltip: ['cases-cumulative'],
            }
        });
    });

    option = {
        animationDuration: 3000,
        dataset: [{
            id: 'dataset_raw',
            source: _rawData
        }].concat(datasetWithFilters),
        title: {
            text: 'cases of covid19'
        },
        tooltip: {
            order: 'valueDesc',
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            nameLocation: 'middle'
        },
        yAxis: {
            name: 'cases-cumulative'
        },
        grid: {
            right: 140
        },
        series: seriesList
    };

    myChart2.setOption(option);

}
option && myChart2.setOption(option);

/* 气泡图 */
var myChart3 = echarts.init(document.getElementById('main'));
option={};

myChart3.showLoading();

$.get('../static/data/test.json', function (data) {
    myChart3.hideLoading();

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

    myChart3.setOption(option);

});