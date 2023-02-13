from django.contrib import admin

from quiz_app.apps.users.models import User
from quiz_app.apps.quizzes.models import Quiz, Question, Answer


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    pass


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    pass


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    pass
