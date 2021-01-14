from django.shortcuts import render,redirect
from django.http import JsonResponse
from utils import utils
# Create your views here.
def homeApi(request):
    return JsonResponse(json)

def home(request):
    print(request.method)
    if request.method == 'GET':
        return render(request, 'Home02.html')
    else:
        print(request.POST)
        departure = request.POST.get('Departure')
        destination = request.POST.get('Destination')
        date = request.POST.get('date')
        if departure == '1':

            context = [
                {'dep': 'Beijing', 'des': 1, 'date': 1, 'zone': '朝阳', 'time': 1, 'times': 1, 'prices': 1, 'transit': 1},
                {'dep': 2, 'des': 'London', 'date': 1, 'zone': '朝阳', 'time': 1, 'times': 1, 'prices': 1, 'transit': 'Dubai'},
                {'dep': 3, 'des': 3, 'date': 1, 'zone': '朝阳', 'time': 1, 'times': '2', 'prices': 3000, 'transit': 1},
                {'dep': 4, 'des': 4, 'date': '2021-12-02', 'zone': '朝阳' , 'time': 1, 'times': 1, 'prices': 1, 'transit': 1},
            ]
            info_list = {'info_list':context}
            return render(request, 'Result.html', context=info_list)
        else:
            return render(request, 'Home02.html')

def result(request):
    return render(request, 'Result.html')


