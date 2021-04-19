export const DateParser = (fecha) => {
    var date = new Date(fecha)
    var correctDate = new Date( date.getTime() + Math.abs(date.getTimezoneOffset()*60000) )
    return (correctDate.getDate())+"/"+(correctDate.getMonth()+1)+"/"+correctDate.getFullYear()
}