const trim = (str: string, symb: string = " ") => {
    return str.replace(new RegExp(`[${symb}]+`, "gi"), "");
 }

 export default trim;
