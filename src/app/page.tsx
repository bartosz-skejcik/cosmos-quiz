"use client";

import questions from "@/questions.json";
import { useState } from "react";

const getRandomQuestion = (questions: Question[]) => {
    const index = Math.floor(Math.random() * questions.length);
    const q = questions[index];

    questions.splice(index, 1);
    return q;
};

export default function Home() {
    const [question, setQuestion] = useState<Question>(
        getRandomQuestion(questions)
    );

    const handleAnswer = (e: any, answer: Answer) => {
        if (answer.is_correct) {
            // chage the color to green, wait 1 second, remove bg and then change the question
            e.target.classList.add("border-green-800");
            e.target.classList.add("text-green-800");
            e.target.classList.add("bg-green-500");

            setTimeout(() => {
                e.target.classList.remove("border-green-800");
                e.target.classList.remove("text-green-800");
                e.target.classList.remove("bg-green-500");
                setQuestion(getRandomQuestion(questions));
            }, 2000);

            // if there are no more questions, show a message
            if (questions.length === 0) {
                e.target.classList.add("border-green-800");
                e.target.classList.add("text-green-800");
                e.target.classList.add("bg-green-500");

                setTimeout(() => {
                    e.target.classList.remove("border-green-800");
                    e.target.classList.remove("text-green-800");
                    e.target.classList.remove("bg-green-500");
                    setQuestion({
                        question: "You have answered all the questions!",
                        answers: [],
                    });
                }, 2000);
            }
        } else {
            e.target.classList.add("border-red-800");
            e.target.classList.add("text-red-800");
            e.target.classList.add("bg-red-500");
            setTimeout(() => {
                e.target.classList.remove("border-red-800");
                e.target.classList.remove("bg-red-500");
                e.target.classList.remove("text-red-800");
                setQuestion(getRandomQuestion(questions));
            }, 2000);
        }
    };

    return (
        <main className="flex flex-col items-center w-screen h-screen justify-evenly bg-gradient-to-b from-secondary to-tertiary text-neutral-100">
            <h1 className="w-3/4 text-2xl font-bold text-center md:text-5xl lg:w-2/3 text-primary">
                {question.question}
            </h1>
            <div className="gap-3 py-3 space-y-3 columns-1 lg:columns-2">
                {/* shuffle the answers */}
                {question.answers
                    .sort(() => Math.random() - 0.5)
                    .map((answer: Answer, index: number) => (
                        <p
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
