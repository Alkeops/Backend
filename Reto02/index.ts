const {Suma, Resta} = require('./class/class')
const operacion = (n1:number,n2:number,o:string) => {
    let result = o ==="suma" ? new Suma(n1, n2).resultado() : o ==="resta" ? new Resta(n1, n2).resultado() : null;
    return new Promise((resolve, reject) => {
        if(result === null) reject("Operacion No Valida");
        resolve(result);
    });
}
const operaciones = async(callback:any, n1:number, n2:number, o:string) => {
    try{
        const data = await callback(n1,n2,o);
        console.log(data)   
        return data
    }
    catch(error){console.error(error)}
}

operaciones(operacion,10, 8, "suma")
operaciones(operacion,10, 5, "suma")
operaciones(operacion,10, 8, "resta")
operaciones(operacion,10, 4, "resta")
operaciones(operacion,10, 8, "error")
