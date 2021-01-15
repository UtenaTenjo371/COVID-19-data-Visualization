import pandas as pd
import numpy as np


def filter_data(data, conditions):
    """
    Remove elements that do not match the condition provided.
    Takes a data list as input and returns a filtered list.
    Conditions should be a list of strings of the following format:
      '<field> <op> <value>'
    where the following operations are valid: >, <, >=, <=, ==, !=

    Example: ["duration < 15", "city == 'San Francisco'"]
    """
    for condition in conditions:
        field, op, value = condition.split(" ", 2)

        # check if field is valid
        if field not in data.columns.values:
            raise Exception("'{}' is not a feature of the dataframe. Did you spell something wrong?".format(field))

        # convert value into number or strip excess quotes if string
        try:
            value = float(value)
        except:
            value = value.strip("\'\"")

        # get booleans for filtering
        if op == ">":
            matches = data[field] > value
        elif op == "<":
            matches = data[field] < value
        elif op == ">=":
            matches = data[field] >= value
        elif op == "<=":
            matches = data[field] <= value
        elif op == "==":
            matches = data[field] == value
        elif op == "!=":
            matches = data[field] != value
        else:  # catch invalid operation codes
            raise Exception("Invalid comparison operator. Only >, <, >=, <=, ==, != allowed.")

        # filter data and outcomes
        data = data[matches].reset_index(drop=True)

    return data


def dest_process(dest):
    if dest == '1':
        dest_processed = '希思罗机场'
    elif dest == '2':
        dest_processed = '曼彻斯特机场'
    elif dest == '3':
        dest_processed = '爱丁堡机场'
    else:
        dest_processed = '伯明翰机场'
    return dest_processed


def data_process(dataframe):
    dataframe.date = pd.to_datetime(dataframe.date)
    return dataframe


def flight_recommend(dest, date):
    # flight_data = pd.read_csv('static\\data', encoding='gbk')
    flight_data = pd.read_csv('utils\\航班信息.csv', encoding='gbk')
    # flight_data = pd.read_csv('航班信息.csv', encoding='gbk')
    dest_processed = dest_process(dest)
    flight_data.date = pd.to_datetime(flight_data.date)
    flight_filter = filter_data(flight_data, ["destination == %s" % dest_processed, "date == %s" % date])

    flight_array = np.array(flight_filter)
    flight_recommend_list = flight_array.tolist()
    list_id = ['dep', 'des', 'date', 'zone', 'time', 'times', 'prices', 'transit']
    flight_recommend_dict = []
    for ls in flight_recommend_list:
        flight_recommend_dict.append(dict(zip(list_id, ls)))
    return flight_recommend_dict
