
export function formatDate(date: Date | string): string {
    const formattedDate = new Date(date);
  
    const day = formattedDate.getDate();
    const month = formattedDate.getMonth() + 1; 
    const year = formattedDate.getFullYear();
  
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
  
    return `${formattedDay}-${formattedMonth}-${year}`;
  }

export function formatTime(date: Date | string): string {
  const formattedDate = new Date(date);

  const hours = formattedDate.getHours().toString().padStart(2, '0');
  const minutes = formattedDate.getMinutes().toString().padStart(2, '0');
  const seconds = formattedDate.getSeconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}
  