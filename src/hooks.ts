import {useState, useEffect, CSSProperties} from 'react'

export const useAnimatedScale = (scGap : number = 0.01, delay : number = 20) => {
    const [scale, setScale] = useState<number>(0)
    const [animated, setAnimated] = useState<boolean>(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0 
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
            return () => {
                window.onresize = () => {

                }
            }
        }
    }, [])
    return {
        w, 
        h 
    }
}

const maxScale = (scale : number, i : number, n : number) : number => Math.max(0, scale - i / n)

const divideScale = (scale : number, i : number, n : number) : number => Math.min(1 / n, maxScale(scale, i, n)) * n 

const sinify = (scale : number) : number => Math.sin(scale * Math.PI)

export const useStyle = (w : number, h : number, scale : number) => {
    
    const position = 'absolute'
    const background = 'indigo'
    const sf = sinify(scale)
    const size : number = Math.min(w, h) / 10
    const hSize : number = Math.min(w, h) / 25

    return {
        parentStyle() : CSSProperties {
            return {
                position, 
                left: `${w / 2}px`,
                top: `${h / 2}px`,
                transform: `rotate(${90 * divideScale(sf, 1, 3)}deg)`
            }
        },
        barStyle() : CSSProperties {
            return {
                position,
                left: `${-w / 2 + (w / 2 - size) * divideScale(sf, 0, 3)}px`, 
                top: `${-hSize / 2 + (-h / 2) * divideScale(sf, 2, 3)}px`,
                width: `${size}px`,
                height: `${hSize}px`,
                background 
            }
        }
    }
} 