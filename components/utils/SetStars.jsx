import ReactStars from "react-rating-stars-component";

function SetStars({setRate}) {
    const arr=[1,2,3,4,5]
  return (
    
    <div>
    <ReactStars
    count={5}
    value={5}
    onChange={(e)=>setRate(e)}
    size={40}
    activeColor="#E655B6"
    
  />
    </div>
      
    
  )
}

export default SetStars