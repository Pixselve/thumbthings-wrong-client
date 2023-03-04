interface ProgressBarProps {
    progress: number;
}

export default function ProgressBar({progress}: ProgressBarProps) {
    const max = 10;

    return (
        <div className="flex items-center">
            <div
                className="bg-green-600 p-2 text-white translate-x-2 rounded-full aspect-square h-10 flex items-center border-black border-4 justify-center">
                {progress}
            </div>
            <div className="w-full h-6 rounded-sm grid grid-cols-10 bg-blue-800 overflow-hidden border-black border-4">
                {[...Array(max)].map((_, i) => {
                    return <div key={i}
                                className={`w-full ${i < progress ? 'bg-gradient-to-b from-green-500 to-green-700' : ''} ${i < max - 1 ? 'border-r-2 border-black/50' : ''}`}></div>
                })}
            </div>
        </div>
    );
}
