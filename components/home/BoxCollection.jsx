
import dynamic from 'next/dynamic';
import CardBox from './CardBox'
 function BoxCollection({topSection,bottomSection}){
 
    return(
      <>
      {
         topSection&&<div className={`grid md:grid-cols-3 container mx-auto`}>
         {
          topSection.edges.map((collection)=>(
            <div key={collection.node.id} className='col-span-1'>
              <CardBox height="h-40 md:h-80" collection={collection.node}/>
            </div>
          ))
         }
         </div>
      }
        {
         bottomSection&&<div className={`grid md:grid-cols-2 container mx-auto `}>
         {
          bottomSection.edges.map((collection)=>(
            <div key={collection.node.id} className='col-span-1'>
              <CardBox height="h-80 md:h-96" collection={collection.node}/>
            </div>
          ))
         }
         </div>
      }
      </>
       
    )
}
export default dynamic(() => Promise.resolve(BoxCollection), { ssr: false });