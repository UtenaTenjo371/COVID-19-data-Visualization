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
        content = {'departure':departure, 'destination':destination, 'date':date}
        if departure == '1':
            context = {}
            return redirect('http://127.0.0.1:8000/result/', context)
        else:
            return render(request, 'Home02.html')

def result(request):
    print(request.POST)
    content = {}
    return render(request, 'Result.html', content)


