export default class ValidaCPF{
    constructor(cpf){
        this.cpf = cpf
        this.cpfLimpo = ValidaCPF.limpaChars(this.cpf)
    }

    static limpaChars(cpf){
        return cpf.replace(/\D+/g , '')
    }

    static criaDigito(cpfLimpo){
        const digitos = Array.from(cpfLimpo)
        let multiplicador = digitos.length + 1
        const digito1 = digitos.reduce((ac, valor)=>{
            const parcial = ac += multiplicador * Number(valor)
            multiplicador--
            return parcial
        },0)
        return String(11 - (digito1 % 11))          
    }

    static geraNovoCPF(cpf){
        const cpf9digitos = cpf.slice(0, -2)
        const digito1 = ValidaCPF.criaDigito(cpf9digitos)
        const digito2 = ValidaCPF.criaDigito(cpf9digitos + digito1)
        return cpf9digitos + digito1 + digito2    
    }

    eSequencia(){
        const sequencia = this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length)
        return sequencia === this.cpfLimpo
    }

    valida(){
        if(this.eSequencia()) return false
        if(typeof this.cpfLimpo !== 'string') return false
        if(this.cpfLimpo.length !== 11) return false    
        return ValidaCPF.geraNovoCPF(this.cpfLimpo) === this.cpfLimpo
    }
}
