var myChart = echarts.init(document.getElementById('main'));
var option;

option = {
    title: {
        text: '机场所在地区累计确诊病例饼图',
        left: 'center',
        top: 20,
        textStyle: {
            fontSize: 24
        }

    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 20]
        }
    },
    series: [
        {
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
                {value: 5010, name: 'Aberdeen City'},
                {value: 18293, name: 'Ealing'},
                {value: 38190, name: 'Manchester'},
                {value: 63201, name: 'York'},
                {value: 2345, name: 'Dumfries and Galloway'}
            ].sort(function (a, b) {
                return a.value - b.value;
            }),
            roseType: 'radius',
            label: {
                fontSize: 14
            },
            labelLine: {
                smooth: 0.2,
                length: 20,
                length2: 100
            },
            itemStyle: {
                color: '#c23531',
                shadowBlur: 20,
                shadowColor: 'rgba(116, 0, 0, 0.5)'
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
};