import { useEffect, useRef, useState } from 'react';
import './like-button.css';

const LikeButton: React.FC = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [isUnliked, setIsUnliked] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isFirstClick, setIsFirstClick] = useState(true);
    // console.log(isLiked, "isLiked");//---             false---true---false---true
    // console.log(isUnliked, "isUnliked");;//---        false---false---true---true
    // console.log(isFirstClick, "isFirstClick");;//--- true---false---true---false

    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => {
                setIsAnimating(false);
                setIsLiked(true);
            }, 1000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [isAnimating]);

    const handleLike = () => {
        if (isAnimating) return;
        if (isFirstClick) {
            setIsAnimating(true);
            setIsFirstClick(false);
        } else {
            if (isLiked) {
                setIsLiked(false);
                setIsUnliked(true);
            } else {
                setIsLiked(true);
                setIsUnliked(false);
            }
            setIsFirstClick(true);
            setIsUnliked(true);
        }
    };

    const svgRefs = useRef<[React.RefObject<SVGSVGElement>, React.RefObject<SVGSVGElement>]>([useRef(null), useRef(null)]);
    useEffect(() => {
        const svgElement1 = svgRefs.current[0].current;
        const svgElement2 = svgRefs.current[1].current;
        if (svgElement1 && svgElement2 && isAnimating) {
            const path1 = svgElement1.querySelector('path');
            const path2 = svgElement2.querySelector('path');
            if (path1 && path2) {
                const length1 = path1.getTotalLength();
                const length2 = path2.getTotalLength();
                path1.style.strokeDasharray = `${length1}`;
                path1.style.strokeDashoffset = `${length1}`;
                path2.style.strokeDasharray = `${length2}`;
                path2.style.strokeDashoffset = `${length2}`;
                animatePath(path1, length1);
                animatePath(path2, length2);
            }
        }
    }, [isAnimating]);

    const animatePath = (path: SVGPathElement, length: number) => {
        let start: number | null = null;
        const animate = (timestamp: number) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const progress = elapsed / 0.2
            const offset = length - progress;
            path.style.strokeDashoffset = `${Math.max(offset, 0)}`;
            if (offset > 0) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center relative">
            <div className={`relative ${isAnimating ? 'block' : 'hidden'} `}>
                <svg ref={svgRefs.current[0]}
                    className='squiggle -top-[80px] -left-1'
                    width="814" height="800" viewBox="0 0 814 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M36.4733 764.185C36.4733 764.185 385.561 286.926 555.678 354.52C649.136 391.655 735.612 450.448 717.441 543.935C703.434 616 648.401 652.718 573.755 676.081C415.683 725.556 313.834 523.179 307.567 368.469C298.914 154.864 777.776 36 777.776 36"
                        stroke="#05EA00" strokeWidth="71.0881" strokeLinecap="round" />
                </svg>
                <svg ref={svgRefs.current[1]}
                    className='squiggle1 top-[20px] -left-[70px] rotate-90 '
                    width="50" height="60" viewBox="0 0 431 609" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.1257 20C3.06784 100.648 30.2379 145.498 111.636 154.549C211.123 172.651 247.299 222.432 220.167 303.892C183.99 394.402 211.123 439.658 301.565 439.658C401.051 457.76 432.706 507.54 396.529 589" stroke="white" strokeWidth="40" strokeLinecap="round" />
                </svg>
            </div>
            {isAnimating && (
                <>
                    <div className='firework'>
                        <div className='lines'>
                            <div className='child-lines' />
                            <div className='child-lines' />
                            <div className='child-lines' />
                            <div className='child-lines' />
                            <div className='child-lines' />
                            <div className='child-lines' />
                        </div>
                        <div className='lines' >
                            <div className='child-lines' />
                            <div className='child-lines' />
                            <div className='child-lines' />
                            <div className='child-lines' />
                            <div className='child-lines' />
                            <div className='child-lines' />
                        </div>
                        <div className='lines' />
                        <div className='lines' />
                        <div className='lines'>
                            <div className='child-lines' />
                            <div className='child-lines' />
                            <div className='child-lines' />
                            <div className='child-lines' />
                            <div className='child-lines' />
                            <div className='child-lines' />
                        </div>
                        <div className='lines' />
                    </div>
                </>
            )}
            <div onClick={handleLike} className='relative flex justify-center items-center'>
                <svg
                    className={`absolute z-10 ${isAnimating ? 'heart-animation' : ''}  `}
                    fill={isLiked ? "#B50000" : isUnliked ? "#e5c66704" : "#FFFFFF"}
                    width="73" height="73" viewBox="0 0 3708 3550" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1808.76 3148.28L2029.33 2768.39C2041.23 2748.01 2040.7 2721.84 2028.87 2701.47L1813.62 2330.84L2029.32 1959.36C2041.22 1938.91 2040.69 1912.81 2028.86 1892.38L1813.61 1521.75L2029.31 1150.27C2039.17 1133.37 2040.49 1112.53 2033.98 1094.26L1902.6 698.591C1774.57 360.897 1486.63 0 1062.12 0C770.568 0 500.111 139.034 258.121 413.158C-24.7521 733.758 -184.462 1461.73 371.433 2006.17C627.434 2256.96 1781.02 3515.95 1792.65 3528.64C1805.4 3542.64 1823.21 3550 1841.09 3550C1852.2 3550 1863.37 3547.17 1873.55 3541.39C1900.24 3526.27 1912.86 3494.71 1904.05 3465.33L1808.76 3148.28Z" />
                    <path d="M3456.02 413.559C3221.17 142.981 2942.93 0 2651.47 0C2298.01 0 1965.65 274.199 1804.76 698.605C1799.44 712.741 1799.11 728.318 1803.85 742.585L1925.94 1110.06L1705.94 1488.71C1694.05 1509.16 1694.05 1534.4 1705.94 1554.78L1921.72 1926.33L1705.94 2297.82C1694.05 2318.27 1694.05 2343.44 1705.94 2363.89L1921.72 2735.38L1705.94 3106.93C1696.73 3122.64 1694.57 3141.44 1699.76 3158.86L1803.25 3503.2C1810.09 3525.81 1828.43 3543.04 1851.44 3548.36C1856.37 3549.48 1861.3 3550 1866.23 3550C1884.38 3550 1901.87 3542.57 1914.56 3528.96C1926.19 3516.27 3089.22 2259.95 3342.94 2005.6C3888.31 1458.93 3732.82 732.393 3456.02 413.559Z" />
                </svg>
                <svg className={`absolute z-30 -left-[4px] -top-[25px]  ${isUnliked && isFirstClick ? 'block' : 'hidden'}`} width="10" height="70" viewBox="0 0 294 2971" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M261.16 443.77L279.143 453.612L283.335 445.953L280.717 437.623L261.16 443.77ZM26.12 873.261L8.13675 863.42L2.69796 873.358L8.21886 883.251L26.12 873.261ZM261.16 1294.43L279.081 1304.39L284.623 1294.41L279.061 1284.44L261.16 1294.43ZM26.64 1716.64L8.71902 1706.69L3.07907 1716.84L8.89007 1726.9L26.64 1716.64ZM270 2137.82L287.787 2148.01L293.652 2137.77L287.75 2127.56L270 2137.82ZM23 2568.87L5.21321 2558.67L0.854778 2566.28L3.34339 2574.69L23 2568.87ZM116.183 2955.82C119.397 2966.68 130.804 2972.87 141.66 2969.66C152.516 2966.44 158.711 2955.04 155.497 2944.18L116.183 2955.82ZM104.323 13.1468L241.603 449.917L280.717 437.623L143.437 0.853175L104.323 13.1468ZM243.177 433.929L8.13675 863.42L44.1032 883.102L279.143 453.612L243.177 433.929ZM8.21886 883.251L243.259 1304.42L279.061 1284.44L44.0211 863.271L8.21886 883.251ZM243.239 1284.48L8.71902 1706.69L44.561 1726.6L279.081 1304.39L243.239 1284.48ZM8.89007 1726.9L252.25 2148.07L287.75 2127.56L44.3899 1706.39L8.89007 1726.9ZM252.213 2127.62L5.21321 2558.67L40.7868 2579.06L287.787 2148.01L252.213 2127.62ZM3.34339 2574.69L116.183 2955.82L155.497 2944.18L42.6566 2563.05L3.34339 2574.69Z"
                        fill='#1E2A3B'
                    />
                </svg>
                <svg className={`z-20 ${isUnliked && isFirstClick ? 'block spin-right' : 'hidden'}`} width="70" height="70" viewBox="0 0 2011 3550" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1759.02 413.559C1524.17 142.981 1245.93 0 954.467 0C601.007 0 268.65 274.199 107.765 698.605C102.441 712.741 102.109 728.318 106.848 742.585L228.939 1110.06L8.94215 1488.71C-2.95416 1509.16 -2.95416 1534.4 8.94215 1554.78L224.724 1926.33L8.94215 2297.82C-2.95416 2318.27 -2.95416 2343.44 8.94215 2363.89L224.724 2735.38L8.94215 3106.93C-0.265163 3122.64 -2.43024 3141.44 2.76283 3158.86L106.247 3503.2C113.089 3525.81 131.426 3543.04 154.441 3548.36C159.372 3549.48 164.303 3550 169.234 3550C187.379 3550 204.869 3542.57 217.559 3528.96C229.193 3516.27 1392.22 2259.95 1645.94 2005.6C2191.31 1458.93 2035.82 732.393 1759.02 413.559Z"
                        fill="#B50000" />
                </svg>
                <svg className={`z-20 ${isUnliked && isFirstClick ? 'block spin-left' : 'hidden'}`} width="70" height="70" viewBox="0 0 2038 3550" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1808.76 3148.28L2029.33 2768.39C2041.23 2748.01 2040.7 2721.84 2028.87 2701.47L1813.62 2330.84L2029.32 1959.36C2041.22 1938.91 2040.69 1912.81 2028.86 1892.38L1813.61 1521.75L2029.31 1150.27C2039.17 1133.37 2040.49 1112.53 2033.98 1094.26L1902.6 698.591C1774.57 360.897 1486.63 0 1062.12 0C770.568 0 500.111 139.034 258.121 413.158C-24.7521 733.758 -184.462 1461.73 371.433 2006.17C627.434 2256.96 1781.02 3515.95 1792.65 3528.64C1805.4 3542.64 1823.21 3550 1841.09 3550C1852.2 3550 1863.37 3547.17 1873.55 3541.39C1900.24 3526.27 1912.86 3494.71 1904.05 3465.33L1808.76 3148.28Z"
                        fill="#B50000" />
                </svg>
            </div>

        </div>
    );
};

export default LikeButton;
