export const newProduct=(product)=>{
    const currentMonth=new Date().getMonth()
    const currenYear=new Date().getFullYear()
    const createAtMonth=new Date(product.createdAt).getMonth()
    const createAtYear=new Date(product.createdAt).getFullYear()

    if(createAtYear===currenYear){
       if((currentMonth-createAtMonth)<=1){
        return "new"
       }else{
        return "bundle"
       }
    }else if(currenYear>createAtYear){
        if((createAtMonth-currentMonth)<=1){
            return "new"
           }else{
            return "bundle"
           }
    }

}