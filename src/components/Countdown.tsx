interface CountdownProps {
    remaining:number;
}

export function Countdown({ remaining }: CountdownProps) {
    return (
        <div>
        {remaining}
        </div>
    )
}
