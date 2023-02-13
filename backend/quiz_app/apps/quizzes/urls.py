from django.urls import path, include
from quiz_app.apps.quizzes.views import QuizzesApi, TakeQuizView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"quizzes", QuizzesApi, basename="quizzes")

url_patterns = [
    path("", include(router.urls)),
    path("quizzes/take_quiz", TakeQuizView.as_view(), name="take-quiz"),
]
