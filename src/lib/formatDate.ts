export function formatDateToDayMonth(dateString: string): string {
    const date = new Date(dateString);

    // 월을 영어로 표시하는 배열
    const months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];

    const day = date.getDate();
    const month = months[date.getMonth()]; // 월은 0부터 시작하므로 배열에서 직접 사용할 수 있습니다.

    return `${day.toString().padStart(2, '0')} ${month}`;
}



interface DateCount {
    date: string;
    count: number;
}

export function aggregateByMonth(data: DateCount[]): DateCount[] {
    const aggregatedData: Record<string, number> = {};
  
    data.forEach(entry => {
      const monthYear = entry.date.slice(0, 7); // Extract YYYY-MM from the date string
      if (!aggregatedData[monthYear]) {
        aggregatedData[monthYear] = 0;
      }
      aggregatedData[monthYear] += entry.count;
    });
  
    return Object.keys(aggregatedData).map(monthYear => ({
      date: monthYear,
      count: aggregatedData[monthYear]
    }));
  }