export const isPointWithinArea = (pointX, pointY, areaTlX, areaTlY, areaBrX, areaBrY) => {
   return areaTlX <= pointX && 
   pointX <= areaBrX && 
    areaTlY <= pointY && 
    pointY <= areaBrY
}
export const moveArrayElement = (array, from, to, mergeProps) => {
    if(to > array.length){
        return array
    }
    const arr = [...array.slice(0,from), ...array.slice(from + 1)]
    return [...arr.slice(0,to), array[from], ...arr.slice(to)]
}