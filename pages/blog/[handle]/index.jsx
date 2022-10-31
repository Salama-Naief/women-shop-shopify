import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react';
import { MdOutlineMail,MdOutlineDateRange,MdPersonOutline } from 'react-icons/md';
import { getArticles, getBlogArticles, getBlogs, getPages, getProductsType } from '../../../lib/shopify';
import Layout from '../../../components/utils/Layout';
import { useRouter } from 'next/router';


function Index({pages,blogArticles,articles,productsTypes,errMsg}) {
const router=useRouter()
const {handle}=router.query


  if(errMsg){
    return(
      <Layout title={`blog-error`} desc="blog articles" productsTypes={productsTypes} pages={pages}>
      <div>error</div>
    </Layout>
    )
  }
  return (
    <Layout title={`blog-${handle?handle:""}`} desc="blog articles" productsTypes={productsTypes} pages={pages}>
      <div className='w-full h-48 md:h-96 relative'>
        <Image src={"https://cdn.shopify.com/s/files/1/0662/0371/3755/files/hero.webp?v=1663940666"} layout="fill" objectFit='cover' objectPosition={"center"} alt=''/>
          <h1 className="absolute top-1/3 md:top-1/2 text-6xl text-secondary left-1/3 md:left-1/2"><Link href={`/blog/${handle}`}><a>{handle?handle:"blog"}</a></Link></h1>
          <hr/>
        </div>
     <div className="container mx-auto my-8">
        
        <div className="md:grid md:grid-cols-6 ">
          <div className="col-span-5 flex flex-wrap">
            {
              blogArticles.articles.edges.length>0?blogArticles.articles.edges.map((article,index)=>(
                <div key={index} className="md:w-1/3 w-full  mb-2">
                  <div className="mx-2 border">
                  <div className="relative w-full h-48 cursor-pointer">
                  <Link href={`/blog/${handle}/${article.node.handle}`}>
                    <Image src={article.node.image.url} layout="fill" objectFit='cover' objectPosition={"center"} alt=''/>
                  </Link>
                  </div>
                  <div className="flex justify-between flex-wrap px-2 md:px-4 py-2.5">
                    <div className="">
                      <div className='text-primary flex items-center'><span className='text-xl '><MdPersonOutline/></span><span className='mx-1'>{article.node.authorV2.name}</span></div>
                      <div className='text-gray-400 text-sm flex items-center'><span className='text-xl '><MdOutlineMail/></span><span className='mx-1'>{article.node.authorV2.email}</span></div>
                    </div>
                    
                  </div>
                  <div className="w-full text-center my-2">
                       <h1 className='text-xl'><Link href={`/blog/${handle}/${article.node.handle}`}><a>{article.node.title}</a></Link></h1>
                    </div>
                  <div className="px-4 ">
                  <p className=' text-clip overflow-clip h-24'>{article.node.excerpt}</p>
                  </div>
                    <div className="text-secondary px-4 my-2 flex"><span className="text-xl"><MdOutlineDateRange/></span><span className="mx-1">{new Date(article.node.publishedAt).toLocaleDateString()}</span></div>
                  </div>

                </div>
              )):(
                <div className="h-full w-full justify-center items-center">
                  <h1 className='text-primary capitalize text-xl text-center'> no articles here</h1>
                </div>
              )
            }
          </div>
          <div className="col-span-1 border p-2 flex md:block flex-wrap">
          <h1 className='my-4 w-full text-center text-2xl'>Recent Articles</h1>
            {articles&&articles.edges.map((article,index)=>(
              <div key={index} className="w-1/2 md:w-full  mb-2">
              <div className="mx-0.5 border">
              <Link href={`/blog/${article.node.blog.handle}/${article.node.handle}`}>
                <div className="relative w-full h-20 cursor-pointer">
                  <Image src={article.node.image.url} layout="fill" objectFit='cover' objectPosition={"center"} alt=''/>
                </div>
              </Link>
              <div className="flex justify-between flex-wrap px-2 md:px-4 py-2.5">
                <div className="">
                  <div className='text-primary text-sm flex items-center'><span className='text-xl '><MdPersonOutline/></span><span className='mx-1'>{article.node.authorV2.name}</span></div>
                </div>
                <div className="text-secondary text-sm flex items-center"><span className="text-lg"><MdOutlineDateRange/></span><span className="mx-1">{new Date(article.node.publishedAt).toLocaleDateString()}</span></div>
                <Link href={`/blog/${article.node.blog.handle}/${article.node.handle}`}><a className="text-sm">{article.node.title}</a></Link>
              </div>
              </div>

            </div>
            ))}
          </div>
        </div>
     </div>
    </Layout>
  )
}

export async function getStaticPaths ({locales}){
  const paths=[]
  try {
    const res=await getBlogs();
    const blogs=JSON.parse(res)
    if(blogs){
       blogs.edges.map(blog=>{
        locales.map(locale=>{
          paths.push({params:{handle:blog.node.title.toLowerCase()},locale})
        })
      })
    }else{
      const paths=[{params:{handle:"news"},locale:locales[0]},{params:{handle:"news"},locale:locales[1]}]
    }
  } catch (error) {
    const paths=[{params:{handle:"news"},locale:locales[0]},{params:{handle:"news"},locale:locales[1]}]
  }
    
  

    return{
        paths,
        fallback:false
    }
}
export const getStaticProps=async(ctx)=>{
    const {handle} =ctx.params;
    const locale=ctx.locale;
    try{
      const blogArticles=await getBlogArticles(handle,locale)
      const articles=await getArticles(locale)

      const pages=await getPages(locale) 
      const clothes=await getProductsType("clothes",locale)
      const shoes=await getProductsType("shoes",locale)
      const accessory=await getProductsType("accessory",locale)

      return{
        props:{
          blogArticles:JSON.parse(blogArticles)||{},
          articles:JSON.parse(articles)||{},
          productsTypes:{clothes:JSON.parse(clothes),shoes:JSON.parse(shoes),accessory:JSON.parse(accessory)}||[],
          pages:JSON.parse(pages)||[],
           errMsg:false,
          ...(await serverSideTranslations(locale, ['common']))
        }
      }

    }catch(err){
        return{
            props:{
                errMsg:true,
                ...(await serverSideTranslations(locale, ['common']))
            }
        }
    }
}
export default Index;
