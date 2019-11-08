
export default {
    
    checkFormatCNPJ: (input) =>{
        let strNumber = input.replace(/[^0-9]+/g,'');
        return strNumber.length === 14;
    },
    checkFormatCPF : (input) =>{
        let strNumber = input.replace(/[^0-9]+/g,'');
        return strNumber.length === 11;
    },
    checkPercentage : (val) => {
        let result = (val.replace('.', '') / 100).toFixed(2);
        if(val >= 10000){
            result = '100.00';
        }
        return result;
      }
}
