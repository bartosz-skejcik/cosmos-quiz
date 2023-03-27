"use client";

import { Score } from "@/components";
import questions from "@/questions.json";
import { useState } from "react";

const getRandomQuestion = (questions: Question[]) => {
    const index = Math.floor(Math.random() * questions.length);
    const q = questions[index];

    q.answers = q.answers.sort(() => Math.random() - 0.5);

    questions.splice(index, 1);
    return q;
};

export default function Home() {
    const [question, setQuestion] = useState<Question>(
        getRandomQuestion(questions)
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);

    const handleAnswer = (e: any, answer: Answer) => {
        if (isLoading) {
            alert("Please wait");
        } else {
            if (answer.is_correct) {
                // chage the color to green, wait 1 second, remove bg and then change the question
                setIsLoading(true);
                e.target.classList.add("border-green-800");
                e.target.classList.add("text-green-800");
                e.target.classList.add("bg-green-500");

                setTimeout(() => {
                    setQuestion(getRandomQuestion(questions));
                    e.target.classList.remove("border-green-800");
                    e.target.classList.remove("text-green-800");
                    e.target.classList.remove("bg-green-500");
                    setIsLoading(false);
                }, 1000);
                setScore(score + 1);

                // if there are no more questions, show a message
                if (questions.length === 0) {
                    setIsLoading(true);
                    e.target.classList.add("border-green-800");
                    e.target.classList.add("text-green-800");
                    e.target.classList.add("bg-green-500");
                    setScore(score + 1);

                    setTimeout(() => {
                        e.target.classList.remove("border-green-800");
                        e.target.classList.remove("text-green-800");
                        e.target.classList.remove("bg-green-500");
                        setQuestion({
                            question: `You got ${score} out of ${questions.length}`,
                            answers: [],
                        });
                        setIsLoading(false);
                    }, 1000);
                }
            } else {
                setIsLoading(true);
                e.target.classList.add("border-red-800");
                e.target.classList.add("text-red-800");
                e.target.classList.add("bg-red-500");

                // change the color of the correct answer to green
                const correctAnswer = document.querySelector(
                    `p[data-is-correct="true"]`
                );
                correctAnswer?.classList.add("border-green-800");
                correctAnswer?.classList.add("text-green-800");
                correctAnswer?.classList.add("bg-green-500");

                setTimeout(() => {
                    e.target.classList.remove("border-red-800");
                    e.target.classList.remove("bg-red-500");
                    e.target.classList.remove("text-red-800");
                    correctAnswer?.classList.remove("border-green-800");
                    correctAnswer?.classList.remove("text-green-800");
                    correctAnswer?.classList.remove("bg-green-500");
                    setIsLoading(false);
                    setQuestion(getRandomQuestion(questions));
                    setScore(0);
                }, 1500);
            }
        }
    };

    return (
        <main className="flex flex-col items-center w-screen h-screen justify-evenly bg-gradient-to-b from-secondary to-tertiary text-neutral-100">
            <Score points={score} />
            <h1 className="w-3/4 text-2xl font-bold text-center md:text-5xl lg:w-2/3 text-primary">
                {question.question}
            </h1>
            <div className="gap-3 py-3 space-y-3 columns-1 lg:columns-2">
                {/* shuffle the answers */}
                {question.answers.map((answer: Answer, index: number) => (
                    <p
                        data-is-correct={answer.is_correct}
                        onClick={(e) => handleAnswer(e, answer)}
                        className="px-10 py-2 text-xl font-semibold text-center transition-all duration-300 border-2 shadow-xl md:text-2xl w-72 md:w-96 hover:md:scale-105 hover:md:opacity-80 hover:cursor-pointer text-primary bg-tertiary border-primary rounded-xl shadow-white/10"
                        key={index}
                    >
                        {answer.answer}
                    </p>
                ))}
            </div>
        </main>
    );
}
