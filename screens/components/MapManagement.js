export function handleMaps(option){

    const dataMap = new Map();

    if(option=='Weekly') {

        dataMap.set('Sat',0);
        dataMap.set('Sun',0);
        dataMap.set('Mon',0);
        dataMap.set('Tue',0);
        dataMap.set('Wed',0);
        dataMap.set('Thu',0);
        dataMap.set('Fri',0);

    } else if(option=='Monthly'){

        dataMap.set('01',0);
        dataMap.set('02',0);
        dataMap.set('03',0);
        dataMap.set('04',0);
        dataMap.set('05',0);
        dataMap.set('06',0);
        dataMap.set('07',0);
        dataMap.set('08',0);
        dataMap.set('09',0);
        dataMap.set('10',0);
        dataMap.set('11',0);
        dataMap.set('12',0);
        dataMap.set('13',0);
        dataMap.set('14',0);
        dataMap.set('15',0);
        dataMap.set('16',0);
        dataMap.set('17',0);
        dataMap.set('18',0);
        dataMap.set('19',0);
        dataMap.set('20',0);
        dataMap.set('21',0);
        dataMap.set('22',0);
        dataMap.set('23',0);
        dataMap.set('24',0);
        dataMap.set('25',0);
        dataMap.set('26',0);
        dataMap.set('27',0);
        dataMap.set('28',0);
        dataMap.set('29',0);
        dataMap.set('30',0);
        dataMap.set('31',0);
    } else if(option=='Yearly'){
        dataMap.set('01',0);
        dataMap.set('02',0);
        dataMap.set('03',0);
        dataMap.set('04',0);
        dataMap.set('05',0);
        dataMap.set('06',0);
        dataMap.set('07',0);
        dataMap.set('08',0);
        dataMap.set('09',0);
        dataMap.set('10',0);
        dataMap.set('11',0);
        dataMap.set('12',0);
    }

    return dataMap;

}