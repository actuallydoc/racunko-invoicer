'use client'

import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { useTheme } from "next-themes";

const DarkImages: string[] = [
    "https://i.imgur.com/uQ9DO12.png",
    "https://i.imgur.com/KlZH4va.png",
    "https://i.imgur.com/e0b9fAF.png",
    "https://i.imgur.com/60JQ95p.png",
]
const LightImages: string[] = [
    "https://i.imgur.com/hDJCzDo.png",
    "https://i.imgur.com/zpivzZQ.png",
    "https://i.imgur.com/OXdtxxZ.png",
    "https://i.imgur.com/2WCBFP7.png",

];

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};


// TODO: Adapt this to the theme of the website (dark/light).

export const ImageGallery = () => {
    const [[page, direction], setDarkPage] = useState([0, 0]);
    const [[page2, direction2], setLightPage] = useState([0, 0]);
    const { theme } = useTheme()
    // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
    // then wrap that within 0-2 to find our image ID in the array below. By passing an
    // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
    // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
    useEffect(() => {
        setDarkPage([0, 0]);
        setLightPage([0, 0]);
    }, [theme])
    if (theme === "dark") {

        const imageIndex = wrap(0, DarkImages.length, page);

        const DarkPaginate = (newDirection: number) => {
            setDarkPage([page + newDirection, newDirection]);
        };
        return (
            <>
                <AnimatePresence initial={true} custom={direction}>
                    <motion.img
                        className="box"
                        key={page}
                        src={DarkImages[imageIndex]}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                DarkPaginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                DarkPaginate(-1);
                            }
                        }}
                    />
                </AnimatePresence>
                <div className="nextDark" onClick={() => DarkPaginate(1)}>
                    <p className="text-black"> {"‣"}</p>
                </div>
                <div className="prevDark" onClick={() => DarkPaginate(-1)}>
                    <p className="text-black">{"‣"}</p>
                </div>
            </>
        );
    } else if (theme === "light") {
        const imageIndex = wrap(0, LightImages.length, page2);
        const LightPaginate = (newDirection: number) => {
            setLightPage([page2 + newDirection, newDirection]);
        };
        return (
            <>
                <AnimatePresence initial={false} custom={direction2}>
                    <motion.img
                        className="box"
                        key={page2}
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        src={LightImages[imageIndex]}
                        custom={direction2}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                LightPaginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                LightPaginate(-1);
                            }
                        }}
                    />
                </AnimatePresence>
                <div className="nextLight" onClick={() => LightPaginate(1)}>
                    <p className="text-white">{"‣"}</p>
                </div>
                <div className="prevLight" onClick={() => LightPaginate(-1)}>
                    <p className="text-white">{"‣"}</p>
                </div>
            </>
        );
    }
};