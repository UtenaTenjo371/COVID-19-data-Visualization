from django.shortcuts import render
from django.http import JsonResponse
from utils import utils
# Create your views here.
def homeApi(request):
    return JsonResponse()

def home(request):
    return render(request, 'Home01_noiframe.html')


