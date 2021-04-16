export const DateParser = (fecha) => {
    var date = new Date(fecha)
    return (date.getDate()+1)+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
}