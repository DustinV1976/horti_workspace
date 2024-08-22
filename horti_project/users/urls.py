from django.urls import path
from .views import Sign_up, Log_in, Log_out, Master_Sign_Up

urlpatterns = [
    path('signup/', Sign_up.as_view(), name='signup'),
    path("login/", Log_in.as_view(), name="login"),
    path("logout/", Log_out.as_view(), name="logout"),
    path('master/', Master_Sign_Up.as_view(), name='master'),
]