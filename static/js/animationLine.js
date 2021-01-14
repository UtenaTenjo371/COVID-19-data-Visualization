var myChart_an = echarts.init(document.getElementById('animationLine'));
var option_an;

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

    option_an = {
        animationDuration: 5000,
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

    myChart_an.setOption(option_an);

}
option_an && myChart_an.setOption(option_an);