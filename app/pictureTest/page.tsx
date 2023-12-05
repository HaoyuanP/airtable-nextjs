'use client';
import React, { useEffect, useState } from "react";
import { Scene, Layer, Sprite } from "spritejs";
// import a from "../pictureTest/images/dark.jpg"

export default function Home() {
    const [displayPicture, setDisplayPicture] = useState<'A' | 'B'>('A');

    useEffect(() => {
        const container = document.getElementById('stage') as HTMLDivElement;
        const scene = new Scene({ container, width: 288, height: 288 });
        const layer = scene.layer() as Layer;

        const spriteA = new Sprite();
        spriteA.attr({
            size: [288, 288],
            texture: '../pictureTest/images/dark.jpg',
        });

        const spriteB = new Sprite();
        spriteB.attr({
            size: [288, 288],
            texture: '../pictureTest/images/dark.jpg',
        });

        layer.append(spriteA, spriteB);

        const updateSprites = () => {
            console.log(`Displaying picture ${displayPicture}`);
            if (displayPicture === 'A') {
                spriteA.attr({ opacity: 1 });
                spriteB.attr({ opacity: 0 });
            } else {
                spriteA.attr({ opacity: 0 });
                spriteB.attr({ opacity: 1 });
            }
        };

        updateSprites(); // Initialize

        // Event handlers
        const handleMouseMove = () => setDisplayPicture('A');
        const handleMouseLeave = () => setDisplayPicture('B');

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [displayPicture]);


    return <div className="flex flex-col items-center justify-center overflow-hidden grow">
        <h1 className="p-2 text-white/80 text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold">
            Project Lilith
        </h1>
        <div id="stage" className="w-72 h-72"></div>;
    </div>
}
