import { useEffect } from 'react';
import { DirectionEnum } from './Banners-slider';
import './Animated-banners-slider.css';

export interface AnimatedSpiralProps {
    animationDirection: DirectionEnum | undefined
}
const AnimatedSpiral = ({ animationDirection }: AnimatedSpiralProps) => {

    useEffect(() => {
        const fullPath = document.getElementById(
            'fullpath'
        ) as SVGPathElement | null;
        if (!fullPath) {
            return;
        }

        const numberOfLoops = 13;// Number of loops in the spiral
        const stepsPerLoop = 16; // Number of steps per loop
        const tangentOffset = (4 / 3) * Math.tan(Math.PI / (2 * stepsPerLoop)); // Tangent offset for curve calculation
        const centerX = animationDirection === DirectionEnum.RTL ? 0.98 : 0.02; // Center x-coordinate based on animation direction

        let pathData = ''; // Initialize the path string
        let previousX = 0; // Previous x-coordinate
        let previousY = 0;// Previous y-coordinate
        let previousControlX = 0; // Previous control point x-coordinate
        let previousControlY = 0; // Previous control point y-coordinate

        const totalLoops = Math.ceil(numberOfLoops * Math.sqrt(4)) + 15;
        for (let loop = 0; loop <= totalLoops; loop++) {
            for (let step = 0; step < stepsPerLoop; step++) {
                const radius = Math.max(
                    0.3 / numberOfLoops,
                    (step / stepsPerLoop + loop) / numberOfLoops / 2
                ); // حساب نصف القطر للنقطة الحالية
                const angle = (2 * Math.PI * step) / stepsPerLoop; // حساب الزاوية للخطوة الحالية
                // حساب إحداثيات : بناءً على الزاوية ونصف القطر
                const x = Math.cos(angle) * radius + centerX;
                const y = Math.sin(angle) * radius + 0.13;
                // حساب إزاحة الظل
                const tangentAngle = angle + Math.PI / 2;
                const offsetX = Math.cos(tangentAngle) * radius * tangentOffset;
                const offsetY = Math.sin(tangentAngle) * radius * tangentOffset;

                // Draw the curve using the cubic Bezier curve "C" and  "M" using to move
                // ${previousX + previousControlX} ${previousY + previousControlY}: represents the first control point of the curve.
                // ${x - offsetX} ${y - offsetY}: represents the second control point of the curve.
                // ${x} ${y}: represents the end point of the curve.
                pathData +=
                    loop || step
                        ? `C${previousX + previousControlX} ${previousY + previousControlY
                        } ${x - offsetX} ${y - offsetY} ${x} ${y}`
                        : `M${x} ${y}`;
                //Update
                previousX = x;
                previousY = y;
                previousControlX = offsetX;
                previousControlY = offsetY;
            }
        }

        fullPath.setAttribute('d', pathData);
        const fullElement = document.getElementById('full');
        if (fullElement) {
            fullElement.classList.add('anim');
        }
    }, [animationDirection]);




    return (
        <div className="relative h-screen w-screen">
            <div className="absolute inset-0" id="full">
                <svg id="spiral" preserveAspectRatio="none" viewBox="0 0 1 1">
                    <path id="fullpath" className="path" fill="none" />
                </svg>
            </div>
        </div>
    );
};

export default AnimatedSpiral;
