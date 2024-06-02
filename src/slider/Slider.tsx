import { useState } from "react";

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationDirection, setAnimationDirection] = useState(''); // 'left' or 'right'

    const images = [
        'https://c4.wallpaperflare.com/wallpaper/586/603/742/minimalism-4k-for-mac-desktop-wallpaper-preview.jpg',
        "https://5alfiat.com/wp-content/uploads/2023/02/%D8%AE%D9%84%D9%81%D9%8A%D8%A7%D8%AA-%D9%83%D9%85%D8%A8%D9%8A%D9%88%D8%AA%D8%B1-4k-%D9%88%D8%B5%D9%88%D8%B1-3-scaled.jpg"
    ];

    const goToPrevious = () => {
        if (!isAnimating) {
            setAnimationDirection('left');
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex((prevIndex: number) => prevIndex === 0 ? images.length - 1 : prevIndex - 1);
                setIsAnimating(false);
            }, 1000);
        }
    };

    const goToNext = () => {
        if (!isAnimating) {
            setAnimationDirection('right');
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex(prevIndex => prevIndex === images.length - 1 ? 0 : prevIndex + 1);
                setIsAnimating(false);
            }, 1000);
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <button
                className="absolute top-1/2 transform -translate-y-1/2 left-2 rounded-full border-2 border-white text-white hover:bg-white hover:text-black p-2 cursor-pointer transition-colors duration-300 z-10"
                onClick={goToPrevious}
                disabled={isAnimating}
            >
                {'<'}
            </button>
            <div className="absolute w-full h-screen flex items-center justify-center bg-black">
                <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className={`w-full h-full object-cover transition-opacity duration-1000 ${isAnimating ? (animationDirection === 'right' ? 'wave-animation-right' : 'wave-animation-left') : ''}`}
                    style={{ animationDelay: `${isAnimating ? '0.5s' : '0s'}` }} // Add animation delay
                />
            </div>
            <button
                className="absolute top-1/2 transform -translate-y-1/2 right-2 rounded-full border-2 border-white text-white hover:bg-white hover:text-black p-2 cursor-pointer transition-colors duration-300 z-10"
                onClick={goToNext}
                disabled={isAnimating}
            >
                {'>'}
            </button>
            <style>{`
@keyframes wave-right {
    0% {
        clip-path: circle(0% at 85% 50%);
    }
    20% {
        clip-path: circle(20% at 85% 50%);
    }
    40% {
        clip-path: circle(40% at 85% 50%);
    }
    60% {
        clip-path: circle(60% at 85% 50%);
    }
    80% {
        clip-path: circle(80% at 85% 50%);
    }
    100% {
        clip-path: circle(100% at 85% 50%);
    }
}

@keyframes wave-left {
    0% {
        clip-path: circle(0% at 15% 50%);
    }
    20% {
        clip-path: circle(20% at 15% 50%);
    }
    40% {
        clip-path: circle(40% at 15% 50%);
    }
    60% {
        clip-path: circle(60% at 15% 50%);
    }
    80% {
        clip-path: circle(80% at 15% 50%);
    }
    100% {
        clip-path: circle(100% at 15% 50%);
    }
}
    
                
                .wave-animation-right {
                    animation: wave-right 1s ease-in-out forwards;
                }
                
                .wave-animation-left {
                    animation: wave-left 1s ease-in-out forwards;
                }
                
                .wave-animation-right2 {
                    animation: wave-right 1s ease-in-out forwards;
                    animation-delay: 0.5s; /* Add delay for second circle */
                }
                
                .wave-animation-left2 {
                    animation: wave-left 1s ease-in-out forwards;
                    animation-delay: 0.5s; /* Add delay for second circle */
                }
                
            `}</style>
        </div>
    );
};
export default Slider;