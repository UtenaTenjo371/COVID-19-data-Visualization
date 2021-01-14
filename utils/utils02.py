import json
import os

def listDir(path,list_name,name_list):
    '''
    获得文件夹下文件路径以及城市名
    :param path: 文件夹路径
    :param list_name: 文件路径
    :param name_list: 城市名
    :return:
    '''
    for file in os.listdir(path):
        file_path = os.path.join(path,file)
        list_name.append(file_path)
        tempName = os.path.basename(file)
        tempName01 = tempName.replace(' ', '_')
        tempName02 = tempName01.split('.')[0]
        name_list.append(tempName02)

base_path_list = []
name_list = []
timeline = []
files_list = []
listDir(r'E:\Learning Materials\Peking\FirstSemester\软件工程导论\大作业\前端学习\Django_All\djangoProject1\appTest\data', base_path_list, name_list)
timeline_list = []

def get_timeline_data():
    '''
    获得timeline数组
    :return: None
    '''
    file = open(base_path_list[0], 'rb')
    fileJson = json.load(file)
    result = fileJson['data']
    count = 0
    result_reversed_list = []
    index = 0
    for x in result:
        if index<30:
            timeline.append(x['date'])
            index+=1

    for x in range(0, result.__len__())[::-1]:
        result_reversed_list.append(result[x])
    # print(timeline)

    for x in result_reversed_list:
        count += x['cases']['daily']
        x['cases']['cumulative'] = count
        if x['deaths']['cumulative'] is None:
            x['deaths']['cumulative'] = 0
        # print(x['date'], 'cases:', x['cases']['cumulative'], x['cases']['daily'],'death:', x['deaths']['cumulative'])

total_data = []
def get_series_data(series_index):
    series_total_arr = []
    name_index = 0
    total_num = 0
    for file_path in base_path_list:
        series_arr = []
        file = open(file_path,'rb')
        fileJson = json.load(file)
        result = fileJson['data']
        count = 0
        result_reversed_list = []
        for x in range(0, result.__len__())[::-1]:
            result_reversed_list.append(result[x])

        for x in result_reversed_list:
            count += x['cases']['daily']
            x['cases']['cumulative'] = count
            if x['date'] == timeline[series_index]:
                total_num += x['cases']['cumulative']
                if x['deaths']['cumulative'] is not None:
                    total_num -= x['deaths']['cumulative']

        name_index+=1
        series_total_arr.append(series_arr)

    return total_num


def return_dict_fun():
    return_dict = {}
    get_timeline_data()
    total_data_list = []
    for i in range(timeline.__len__()):
        total_data.append(get_series_data(i))
    for x in range(0, total_data.__len__())[::-1]:
        total_data_list.append(total_data[x])
        timeline_list.append(timeline[x])

    return_dict['series'] = total_data_list
    return_dict['timeline'] = timeline_list
    return return_dict

filename = r"E:\Learning Materials\Peking\FirstSemester\软件工程导论\大作业\前端学习\Django_All\djangoProject1\static\data\total_data.json"
with open(filename, 'w') as file_obj:
    json.dump(return_dict_fun(),file_obj)