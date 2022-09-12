
export const Offer=(compairesPrice,price)=>{
  if(compairesPrice===null){
    return null
  }
  return Math.trunc(100-(price/compairesPrice)*100);
}