var myChart_map = echarts.init(document.getElementById('covidMap'));
var option_map;

myChart_map.showLoading();

$.get('../static/data/England.json', function (geoJson) {

    myChart_map.hideLoading();

    echarts.registerMap('HK', geoJson);

    myChart_map.setOption(option = {
        title: {
            text: '英国疫情数据',
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c} 人'
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        visualMap: {
            min: 800,
            max: 80000,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
                color: ['lightskyblue', 'yellow', 'orangered']
            }
        },
        series: [
            {
                name: '香港18区人口密度',
                type: 'map',
                mapType: 'HK', // 自定义扩展图表类型
                label: {
                    show: false
                },
                data: [
                    {name: '东艾尔郡', value: 4033},
                    {name: '东邓巴顿郡', value: 3604},
                    {name: '东伦弗鲁郡', value: 3278},
                    {name: '格拉斯哥城市', value: 28180},
                    {name: '因弗克莱德', value: 2067},
                    {name: '北约克郡', value: 21225},
                    {name: '北拉纳克郡', value: 14394},
                    {name: '伦弗鲁郡', value: 7137},
                    {name: '南埃尔郡', value: 2847},
                    {name: '南拉纳克郡', value: 13277},
                    {name: '西邓巴顿郡', value: 2868},
                    {name: '亚伯丁', value: 5101},
                    {name: '阿伯丁郡', value: 4003},
                    {name: 'Moray', value: 640},
                    {name: '福尔柯克', value: 3458},
                    {name: '斯特灵', value: 1956},
                    {name: '克拉克曼南郡', value: 1290},
                    {name: '佩思郡和金罗斯', value: 2961},
					{name: '安格斯', value: 2022},
					{name: '敦提', value: 5028},
					{name: '法伊夫', value: 7495},
					{name: '东洛锡安', value: 1869},
					{name: '爱丁堡', value: 12125},
					{name: '中洛锡安郡', value: 2152},
					{name: '西洛锡安', value: 4777},
					{name: '苏格兰边境', value: 2184},
					{name: '达灵顿', value: 5085},
					{name: '达拉谟', value: 27753},
					{name: '哈特尔普尔', value: 6440},
					{name: '米德尔斯堡', value: 8128},
					{name: '雷德卡和克利夫兰', value: 6254},
					{name: '蒂斯河畔斯托克顿', value: 10758},
					{name: '诺森伯兰郡', value: 12756},
					{name: '海兰', value: 1963},
					{name: '奥克尼', value: 45},
					{name: '设得兰群岛', value: 175},
					{name: '埃利安锡尔', value: 120},
					{name: '阿盖尔-比特', value: 994},
					{name: '邓弗里斯盖洛韦', value: 2731},
					{name: '坎布里亚', value: 18775},
					{name: '兰开夏郡', value: 68962},
					{name: '格温内思郡', value: 1964},
					{name: '波厄斯郡', value: 2810},
					{name: '德文郡', value: 14586},
					{name: '康沃尔', value: 8748},
					{name: '萨默塞特', value: 12447},
					{name: '多塞特', value: 6573},
					{name: '威尔特郡', value: 10310},
					{name: '汉普郡', value: 40747},
					{name: '西萨塞克斯郡', value: 26067},
					{name: '肯特', value: 87766},
					{name: '东萨西克斯', value: 20958},
					{name: '诺福克', value: 25233},
					{name: '萨福克', value: 19039},
					{name: '艾塞克斯', value: 82372},
					{name: '萨里', value: 49082},
					{name: '林肯郡', value: 28681},
					{name: '剑桥郡', value: 17080},
					{name: '白金汉郡', value: 21049},
					{name: '赫特福德郡', value: 52989},
					{name: '东约克郡', value: 13336},
					{name: '牛津郡', value: 23216},
					{name: '北安普敦郡', value: 29456},
					{name: '诺丁汉郡', value: 36055},
					{name: '莱斯特郡', value: 30008},
					{name: '德比郡', value: 32278},
					{name: '斯塔福德郡', value: 41021},
					{name: '什罗浦郡', value: 9264},
					{name: '赫里福郡', value: 4495},
					{name: '沃里克郡', value: 21044},
					{name: '格洛斯特郡', value: 15950},
					{name: '乌斯特郡', value: 19949},
					{name: '卡马森郡', value: 8529},
					{name: '锡尔迪金', value: 1396},
					{name: '康威', value: 2558},
					{name: '彭布罗克郡', value: 2515},
					{name: '东柴郡', value: 14702},
					{name: '西柴郡和切斯特', value: 14922},
					{name: '北林肯郡', value: 6651},
					{name: '唐卡斯特', value: 16480},
					{name: '利兹市', value: 45366},
					{name: '贝德福德郡中部', value: 10518},
					{name: '贝德福德郡', value: 8719},
					{name: '米尔顿凯恩斯', value: 13693},
					{name: '弗林特郡', value: 6475},
					{name: '雷克瑟姆', value: 8123},
					{name: '登比郡', value: 3109},
					{name: '安格尔西岛', value: 1327},
					{name: '西约克郡', value: 4145},
					{name: '沃金厄姆', value: 5802},
					{name: '彼得伯勒', value: 8914},
					{name: '拉特兰郡', value: 894},
					{name: '南格洛斯特郡', value: 10372},
					{name: '怀特岛', value: 4071},
					{name: '蒙茅斯郡', value: 3417},
					{name: '斯温西', value: 15030},
					{name: '布里真德', value: 10939},
					{name: '格拉摩根谷', value: 5884},
					{name: '下塔尔波特港', value: 9942},
					{name: '新港', value: 9123},
					{name: '北萨默塞特', value: 6974},
					{name: '朗达卡嫩塔夫', value: 18729},
					{name: '卡菲利', value: 11210},
					{name: '史云顿', value: 7723},
					{name: '奥尔德姆', value: 18000},
					{name: '卡尔德达尔', value: 10623},
					{name: '克里斯', value: 24505},
					{name: '布拉德福德', value: 35675},
					{name: '谢菲尔德', value: 32112},
					{name: '韦克菲尔德', value: 17726},
					{name: '罗瑟勒姆', value: 14808},
					{name: '巴恩斯利', value: 13421},
					{name: '威根', value: 21508},
					{name: '利物浦', value: 34426},
					{name: '沃灵顿', value: 12663},
					{name: '洛奇代尔', value: 16083},
					{name: '约克郡', value: 9111},
					{name: '纽维和莫恩山区', value: 4011},
					{name: '道恩', value: 3996},
					{name: '阿尔马', value: 3011},
					{name: '亚兹', value: 1878},
					{name: '班布里奇', value: 5012},
					{name: '里斯本', value: 4008},
					{name: '杜根伦', value: 5008},
					{name: '弗马纳郡', value: 4336},
					{name: '奥马', value: 2112},
					{name: '库克敦', value: 1958},
					{name: '斯特拉巴内', value: 3489},
					{name: '德利', value: 9489},
					{name: '马拉费尔特', value: 3112},
					{name: '安特里姆', value: 5949},
					{name: '克雷加文', value: 1928},
					{name: '莫伊尔', value: 518},
					{name: '巴利米纳', value: 1118},
					{name: '科尔雷恩', value: 1208},
					{name: '利马瓦迪', value: 508},
					{name: '拉尔内', value: 128},
					{name: '巴利马尼区', value: 1268},
					{name: '北埃尔郡', value: 3513},
					{name: '伯明翰', value: 66096},
                ],
                // 自定义名称映射
                nameMap: {
                    'East Ayrshire': '东艾尔郡',
                    'East Dunbartonshire': '东邓巴顿郡',
                    'East Renfrewshire': '东伦弗鲁郡',
                    'Glasgow': '格拉斯哥',
                    'Inverclyde': '因弗克莱德',
                    'North Yorkshire': '北约克郡',
                    'North Lanarkshire': '北拉纳克郡',
                    'Renfrewshire': '伦弗鲁郡',
                    'South Ayrshire': '南埃尔郡',
                    'South Lanarkshire': '南拉纳克郡',
                    'West Dunbartonshire': '西邓巴顿郡',
                    'Aberdeen': '亚伯丁',
                    'Aberdeenshire': '阿伯丁郡',
                    'Moray': 'Moray',
                    'Falkirk': '福尔柯克',
                    'Stirling': '斯特灵',
                    'Clackmannanshire': '克拉克曼南郡',
                    'Perthshire and Kinross': '佩思郡和金罗斯',
					'Angus': '安格斯',
					'Dundee': '敦提',
					'Fife': '法伊夫',
					'East Lothian': '东洛锡安',
					'Edinburgh': '爱丁堡',
					'Midlothian': '中洛锡安郡',
					'West Lothian': '西洛锡安',
					'Scottish Borders': '苏格兰边境',
					'Darlington': '达灵顿',
					'Durham': '达拉谟',
					'Hartlepool': '哈特尔普尔',
					'Middlesbrough': '米德尔斯堡',
					'Redcar and Cleveland': '雷德卡和克利夫兰',
					'Stockton-on-Tees': '蒂斯河畔斯托克顿',
					'Northumberland': '诺森伯兰郡',
					'Highland': '海兰',
					'Orkney': '奥克尼',
					'Shetland Islands': '设得兰群岛',
					'Eilean Siar': '埃利安锡尔',
					'Argyll and Bute': '阿盖尔-比特',
					'Dumfries and Galloway': '邓弗里斯盖洛韦',
					'Cumbria': '坎布里亚',
					'Lancashire': '兰开夏郡',
					'Gwynedd': '格温内思郡',
					'Powys': '波厄斯郡',
					'Devon': '德文郡',
					'Cornwall': '康沃尔',
					'Somerset': '萨默塞特',
					'Dorset': '多塞特',
					'Wiltshire': '威尔特郡',
					'Hampshire': '汉普郡',
					'West Sussex': '西萨塞克斯郡',
					'Kent': '肯特',
					'East Sussex': '东萨西克斯',
					'Norfolk': '诺福克',
					'Suffolk': '萨福克',
					'Essex': '艾塞克斯',
					'Surrey': '萨里',
					'Lincolnshire': '林肯郡',
					'Cambridgeshire': '剑桥郡',
					'Buckinghamshire': '白金汉郡',
					'Hertfordshire': '赫特福德郡',
					'East Riding of Yorkshire': '东约克郡',
					'Oxfordshire': '牛津郡',
					'Northamptonshire': '北安普敦郡',
					'Nottinghamshire': '诺丁汉郡',
					'Leicestershire': '莱斯特郡',
					'Derbyshire': '德比郡',
					'Staffordshire': '斯塔福德郡',
					'Shropshire': '什罗浦郡',
					'Herefordshire': '赫里福郡',
					'Warwickshire': '沃里克郡',
					'Gloucestershire': '格洛斯特郡',
					'Worcestershire': '乌斯特郡',
					'Carmarthenshire': '卡马森郡',
					'Ceredigion': '锡尔迪金',
					'Conwy': '康威',
					'Pembrokeshire': '彭布罗克郡',
					'Cheshire East': '东柴郡',
					'Cheshire West and Chester': '西柴郡和切斯特',
					'North Lincolnshire': '北林肯郡',
					'Doncaster': '唐卡斯特',
					'Leeds': '利兹市',
					'Central Bedfordshire': '贝德福德郡中部',
					'Bedford': '贝德福德郡',
					'Milton Keynes': '米尔顿凯恩斯',
					'Flintshire': '弗林特郡',
					'Wrexham': '雷克瑟姆',
					'Denbighshire': '登比郡',
					'Anglesey': '安格尔西岛',
					'West Berkshire': '西约克郡',
					'Wokingham': '沃金厄姆',
					'Peterborough': '彼得伯勒',
					'Rutland': '拉特兰郡',
					'South Gloucestershire': '南格洛斯特郡',
					'Isle of Wight': '怀特岛',
					'Monmouthshire': '蒙茅斯郡',
					'Swansea': '斯温西',
					'Bridgend': '布里真德',
					'Vale of Glamorgan': '格拉摩根谷',
					'Neath Port Talbot': '下塔尔波特港',
					'Newport': '新港',
					'North Somerset': '北萨默塞特',
					'Rhondda, Cynon, Taff': '朗达卡嫩塔夫',
					'Caerphilly': '卡菲利',
					'Swindon': '史云顿',
					'Oldham': '奥尔德姆',
					'Calderdale': '卡尔德达尔',
					'Kirklees': '克里斯',
					'Bradford': '布拉德福德',
					'Sheffield': '谢菲尔德',
					'Wakefield': '韦克菲尔德',
					'Rotherham': '罗瑟勒姆',
					'Barnsley': '巴恩斯利',
					'Wigan': '威根',
					'Liverpool': '利物浦',
					'Warrington': '沃灵顿',
					'Rochdale': '洛奇代尔',
					'York': '约克郡',
					'Newry and Mourne': '纽维和莫恩山区',
					'Down': '道恩',
					'Armagh': '阿尔马',
					'Ards': '亚兹',
					'Banbridge': '班布里奇',
					'Lisburn': '里斯本',
					'Dungannon': '杜根伦',
					'Fermanagh': '弗马纳郡',
					'Omagh': '奥马',
					'Cookstown': '库克敦',
					'Strabane': '斯特拉巴内',
					'Derry': '德利',
					'Magherafelt': '马拉费尔特',
					'Antrim': '安特里姆',
					'Craigavon': '克雷加文',
					'Moyle': '莫伊尔',
					'Ballymena': '巴利米纳',
					'Coleraine': '科尔雷恩',
					'Limavady': '利马瓦迪',
					'Larne': '拉尔内',
					'Ballymoney': '巴利马尼区',
					'North Ayshire': '北埃尔郡',
					'Birmingham': '伯明翰',
                }
            }
        ]
    });
});

option_map && myChart_map.setOption(option_map);