
const gradientSampler = (start, end, place)  => {
    const r = (start.r * place) + (end.r / place)
    const g = (start.g * place) + (end.g / place)
    const b = (start.b * place) + (end.b / place)
    return `rgb(${r}, ${g}, ${b})`
}
export default gradientSampler;