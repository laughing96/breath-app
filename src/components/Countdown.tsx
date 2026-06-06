interface CountdownProps {
    remaining:number;
}

export function Countdown({ remaining }: CountdownProps) {
    return (
        <div style={{fontSize:48, fontWeight:"bold",}}>
        {remaining}
        </div>
    )
}
