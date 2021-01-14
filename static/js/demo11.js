var myChart = echarts.init(document.getElementById('main'));
var option;

$.get('./data/a1.json', function (_rawData) {
    run(_rawData);
});
function run(_rawData) {

    // var countries = ['Australia', 'Canada', 'China', 'Cuba', 'Finland', 'France', 'Germany', 'Iceland', 'India', 'Japan', 'North Korea', 'South Korea', 'New Zealand', 'Norway', 'Poland', 'Russia', 'Turkey', 'United Kingdom', 'United States'];
    //var countries = ['Finland', 'France', 'Germany', 'Iceland', 'Norway', 'Poland', 'Russia', 'United Kingdom'];
    var countries = ['Aberdeen City']
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
                        { dimension: 'date', gte:"2020-01-06"  },
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
        animationDuration: 10,
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

    myChart.setOption(option);

}