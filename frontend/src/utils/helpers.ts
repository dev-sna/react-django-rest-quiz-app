export const getUserFullName = (user: any) => {
  return `${user.firstName} ${user.lastName}`;
};

export const getSubmitQuizPayload = (quiz_id: number, answers: any) => {
  return {
    quiz: quiz_id,
    answers: Object.keys(answers).map((key) => {
      return { question: key, selectedAnswers: answers[key] };
    }),
  };
};
