from django.core.exceptions import PermissionDenied

from rest_framework import serializers
from quiz_app.apps.quizzes.models import Answer, Question, Quiz

from quiz_app.apps.utils.constants import QUIZ_ALREADY_PUBLISHED_MESSAGE
from quiz_app.apps.utils.exceptions import QuizPublishedException


class AnswerSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False, allow_null=True)
    content = serializers.CharField()
    is_correct = serializers.BooleanField()

    class Meta:
        model = Answer
        fields = (
            "id",
            "content",
            "is_correct",
        )
        # fields = "__all__"


class QuestionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False, allow_null=True)
    statement = serializers.CharField()
    answers = AnswerSerializer(many=True)

    class Meta:
        model = Question
        fields = ("id", "statement", "answers")


class QuizResponseSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Quiz
        fields = (
            "id",
            "title",
            "questions",
            "is_published",
            "quiz_permalink",
        )


class CreateQuizRequestSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False, allow_null=True)
    title = serializers.CharField(max_length=100)
    questions = QuestionSerializer(many=True)

    def parse_for_multiple_answers(self, answers):
        return len(list(filter(lambda x: x["is_correct"] == True, answers))) > 1

    def create_or_update_answers(self, answers, question):
        for answer in answers:
            Answer.objects.update_or_create(
                id=answer.get("id"), defaults={**answer, "question": question}
            )

    def create_or_update_questions(self, questions, quiz):
        for question in questions:
            answers = question.pop("answers")
            has_multiple_answers = self.parse_for_multiple_answers(answers)
            question_instance, created = Question.objects.update_or_create(
                id=question.get("id"),
                defaults={
                    **question,
                    "quiz": quiz,
                    "has_multiple_answers": has_multiple_answers,
                },
            )
            self.create_or_update_answers(answers, question_instance)

    def create(self, validated_data):
        questions = validated_data.pop(
            "questions",
        )
        owner = validated_data["owner"]
        quiz = Quiz.objects.create(title=validated_data["title"], owner=owner)
        self.create_or_update_questions(questions, quiz)
        return QuizResponseSerializer(quiz).data

    def update(self, instance, validated_data):
        owner = validated_data["owner"]
        if instance.owner != owner:
            raise PermissionDenied

        if instance.is_published:
            raise QuizPublishedException(QUIZ_ALREADY_PUBLISHED_MESSAGE)

        questions = validated_data.pop("questions")
        instance.title = validated_data.get("title")
        self.create_or_update_questions(questions, instance)
        instance.save()
        return QuizResponseSerializer(instance).data

    def to_representation(self, instance):
        return {"quiz": instance}

    class Meta:
        model = Quiz
        exclude = (
            "is_published",
            "uuid",
        )


class TakeQuizAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = (
            "id",
            "content",
            "question",
        )


class TakeQuizQuestionSerializer(serializers.ModelSerializer):
    answers = TakeQuizAnswerSerializer(many=True)

    class Meta:
        model = Question
        fields = "__all__"


class TakeQuizSerializer(serializers.ModelSerializer):
    questions = TakeQuizQuestionSerializer(many=True)

    class Meta:
        model = Quiz
        fields = (
            "id",
            "title",
            "questions",
        )
