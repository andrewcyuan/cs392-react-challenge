import { useState } from 'react'

interface TermSelectorProps {
    options: string[];
    defaultSelected: string;
    setSelected: (selected: string) => void;
}

export const TermSelector = (props: TermSelectorProps) => {

    const [current, setCurrent] = useState(props.defaultSelected);

    return (
        <div>
            {props.options.map((option) => (
                <div key={option}>
                    <input
                        type="radio"
                        id={option}
                        value={option}
                        checked={option === current}
                        onChange={() => {
                            props.setSelected(option);
                            setCurrent(option);
                        }}
                    />
                    <label htmlFor={option}>{option}</label>
                </div>
            ))}
        </div>
    )
}
