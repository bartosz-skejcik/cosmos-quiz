import React from "react";

type Props = {
    points: number;
};

export default function Score({ points }: Props) {
    return (
        <h2 className="w-3/4 font-bold text-center text-neutral-200 text-8xl ">
            {points}
        </h2>
    );
}
