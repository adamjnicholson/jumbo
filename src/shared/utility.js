const monthList = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
 
export const formatDate = (date, format = 'my') => {
  const theDate = new Date(date)
  const dateObj = {
    m: monthList[theDate.getMonth()],
    y: theDate.getFullYear()
  }

  return format.split('').map( char => dateObj[char]).join(' ')
}

export const hourMins = mins => {
  return Math.floor(mins / 60) + 'h ' + mins % 60 + ' min'
}