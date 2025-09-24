import type { Dispatch, SetStateAction } from 'react';

interface TermSelectorProps {
    options: string[];
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
}

export const TermSelector = (props: TermSelectorProps) => {

    return (
        <div>
            {props.options.map((option) => (
                <div key={option} className="flex flex-row gap-1">
                    <input
                        type="radio"
                        id={option}
                        value={option}
                        checked={option === props.selected}
                        onChange={() => {
                            props.setSelected(option);
                        }}
                    />
                    <label htmlFor={option}>{option}</label>
                </div>
            ))}
        </div>
    )
}
