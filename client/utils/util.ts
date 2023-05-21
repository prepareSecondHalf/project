const numberReg = (param: string) => {
    let numReg = /^[0-9]+$/;
    
    if (numReg.test(param)) {
        return param;
    } else {
        let notNum = /[^0-9]+/g;
        return param.replaceAll(notNum, '');
    }
}

const numberComma = (num: string) => {
    let convert = Number(num.replaceAll(',', ''));
    return convert.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export { 
    numberReg,
    numberComma,
}