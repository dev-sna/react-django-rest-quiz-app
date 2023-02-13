from re import T
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import PermissionDenied
from rest_framework import status
from django.shortcuts import get_object_or_404
from quiz_app.apps.quizzes.utils import get_exam_result
import shortuuid

from quiz_app.apps.quizzes.models import Quiz
from quiz_app.apps.quizzes.serializers import (
    CreateQuizRequestSerializer,
    QuizResponseSerializer,
    TakeQuizSerializer,
)
from quiz_app.apps.utils.constants import (
    QUIZ_CREATION_SUCCESS,
    QUIZ_DELETE_SUCCESS,
    QUIZ_OWNER_FAILURE,
)
from quiz_app.apps.utils.exceptions import QuizPublishedException
from quiz_app.apps.utils.response_format import failure_response, success_response


class QuizzesApi(viewsets.ModelViewSet):

    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        return CreateQuizRequestSerializer

    def get_queryset(self):
        return Quiz.objects.filter(owner=self.request.user)

    def list(self, request):
        quizzes = Quiz.objects.filter(owner=request.user)
        serializer = QuizResponseSerializer(quizzes, many=True)
        return success_response(data=serializer.data, status_code=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        queryset = Quiz.objects.filter(owner=request.user)
        quiz = get_object_or_404(queryset, pk=pk)
        serializer = QuizResponseSerializer(quiz)
        return success_response(data=serializer.data, status_code=status.HTTP_200_OK)

    def create(self, request):
        request.data["owner"] = request.user.id
        request_serializer = CreateQuizRequestSerializer(data=request.data)
        request_serializer.is_valid(raise_exception=True)
        request_serializer.save()

        response_data = request_serializer.data
        return success_response(
            data=response_data, success_message=QUIZ_CREATION_SUCCESS
        )

    def update(self, request, pk):
        try:
            request.data["owner"] = request.user.id
            quiz = self.get_object()
            request_serializer = CreateQuizRequestSerializer(
                instance=quiz, data=request.data
            )
            request_serializer.is_valid(raise_exception=True)
            request_serializer.save()

            response_data = request_serializer.data
            return success_response(
                data=response_data, success_message=QUIZ_CREATION_SUCCESS
            )
        except PermissionDenied:
            return failure_response(
                failure_message=QUIZ_OWNER_FAILURE,
                status_code=status.HTTP_403_FORBIDDEN,
            )

        except QuizPublishedException as ex:
            return failure_response(
                failure_message=str(ex), status_code=status.HTTP_400_BAD_REQUEST
            )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user != instance.owner:
            return failure_response(
                failure_message=QUIZ_OWNER_FAILURE,
                status_code=status.HTTP_403_FORBIDDEN,
            )
        instance.delete()
        return success_response(
            success_message=QUIZ_DELETE_SUCCESS, status_code=status.HTTP_204_NO_CONTENT
        )

    @action(detail=False, methods=["POST"])
    def publish_quiz(self, request):
        try:
            quiz_id = request.data.get("quiz")
            instance = Quiz.objects.filter(id=quiz_id).first()
            short_uuid = shortuuid.ShortUUID().random(length=6)
            instance.uuid = short_uuid
            instance.is_published = True
            instance.save()
            serializer = QuizResponseSerializer(instance)
            return success_response(
                data=serializer.data, status_code=status.HTTP_200_OK
            )
        except Exception as ex:
            return failure_response(
                failure_message=str(ex), status_code=status.HTTP_400_BAD_REQUEST
            )


class TakeQuizView(APIView):
    permission_classes = []

    def get(self, request):
        quiz_uuid = request.GET.get("quiz_uuid")
        queryset = Quiz.objects.get(uuid=quiz_uuid)
        serializer = TakeQuizSerializer(queryset)
        return success_response(data=serializer.data, status_code=status.HTTP_200_OK)

    def post(self, request):
        quiz_id = request.data.get("quiz")
        user_answers = request.data.get("answers")
        queryset = Quiz.objects.get(id=quiz_id)
        serialized_data = QuizResponseSerializer(queryset).data
        exam_result = get_exam_result(serialized_data, user_answers)
        return success_response(data=exam_result, status_code=status.HTTP_200_OK)
