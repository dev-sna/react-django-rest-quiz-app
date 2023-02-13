from django.db import models

from django_extensions.db.fields import ShortUUIDField

from quiz_app.apps.users.models import User
from quiz_app.apps.utils.constants import BASE_URL


class Quiz(models.Model):
    title = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    is_published = models.BooleanField(default=False)
    uuid = ShortUUIDField(null=True, blank=True)

    @property
    def questions(self):
        return self.question_set.all()

    @property
    def quiz_permalink(self):
        if self.is_published:
            return f"{BASE_URL}/{self.uuid}"


class Question(models.Model):
    statement = models.CharField(max_length=400)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    has_multiple_answers = models.BooleanField(default=False)

    @property
    def answers(self):
        return self.answer_set.all()


class Answer(models.Model):
    is_correct = models.BooleanField(default=False)
    content = models.CharField(max_length=400)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
