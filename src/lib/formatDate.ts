export function formatDateToDayMonth(dateString: string): string {
    const date = new Date(dateString);

    // 월을 영어로 표시하는 배열
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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


  function addDay(dateStr: string): string {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  }
  
  // 오늘 날짜가 데이터에 포함되어 있는지 확인하는 함수
  function includesToday(data: DateCount[]): boolean {
    const todayStr = new Date().toISOString().split('T')[0];
    return data.some(entry => entry.date.startsWith(todayStr));
  }
  
  // 비어있는 날짜를 포함하여 데이터를 채우는 함수
export  function fillDates(data: DateCount[]): DateCount[] {
    if (!includesToday(data)) {
      const todayStr = new Date().toISOString().split('T')[0] + 'T00:00:00.000Z';
      data.push({ date: todayStr, count: 0 });
    }
  
    const sortedData = data.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const filledData: DateCount[] = [];
  
    for (let i = 0; i < sortedData.length; i++) {
      filledData.push(sortedData[i]);
      const currentDateStr = sortedData[i].date.split('T')[0];
      const nextDateStr = i < sortedData.length - 1 ? sortedData[i + 1].date.split('T')[0] : null;
  
      let nextDay = addDay(currentDateStr);
      while (nextDateStr && nextDay < nextDateStr) {
        filledData.push({ date: nextDay + 'T00:00:00.000Z', count: 0 });
        nextDay = addDay(nextDay);
      }
    }
  
    return filledData;
  }