myChart_pie = echarts.init(document.getElementById('pieGraph'));
var option_pie;

option_pie = {
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

option_pie && myChart_pie.setOption(option_pie);
