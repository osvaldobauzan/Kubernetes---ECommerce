from django.urls import path
from .views import *

app_name = 'api'

urlpatterns = [
    path('v1/post', Post_APIView.as_view()),
    path('v1/generate-csv/', CSVGenerator.as_view(), name='generate_csv'),
    path('v1/savecsv/', saveImage.as_view()),
    # path('v1/post/<int:pk>/', Post_APIView_Detail.as_view()),
    
]