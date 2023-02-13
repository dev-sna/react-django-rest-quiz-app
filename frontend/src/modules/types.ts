export interface Answer {
  id?: number;
  content: string;
  is_correct: boolean;
}

export interface Question {
  id: number;
  statement: string;
  answers: Array<Answer>;
  hasMultipleAnswers?: boolean;
}

export interface Quiz {
  title: string;
  id?: number;
  questions?: Array<Question>;
  isPublished?: boolean;
  quizPermalink?: string;
}
