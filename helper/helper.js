export const dateCalculate = (startdate, enddate) => {
    const newStartDate = new Date(startdate);
    const newEndDate = new Date(enddate);
    const one_day = 1000 * 60 * 60 * 24;
    let result
    result = Math.ceil((newEndDate.getTime() - newStartDate.getTime()) / (one_day))
    console.log('date Converter result', result)
    if (result < 0) { return 0 }
    return result
};