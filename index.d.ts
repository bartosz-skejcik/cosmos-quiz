interface Question {
    question: string;
    answers: Answer[];
}

interface Answer {
    id: number;
    answer: string;
    is_correct: boolean;
}
