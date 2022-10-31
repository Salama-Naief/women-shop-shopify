import { useTranslation } from "next-i18next";
import Image from "next/image";
import {TiSocialPinterest} from "react-icons/ti"
import {FiFacebook,FiInstagram,FiTwitter} from "react-icons/fi"

export default function ConenctionWithUs (){

     const {t}=useTranslation();

    const handleSubmit=(e)=>{
        e.preventDefault();
    }
    return(
        <div className="w-full font-serif text-gray-900 bg-gray-200 md:flex justify-between p-4">
            <div className="w-full md:w-1/3 px-2">
                <div className="text-2xl my-4 capitalize mb-4"><span className="text-primary">SA</span><span className="text-secondary">NI</span></div>
                <div className="flex items-center my-4">
                    <div className="relative w-8 h-8">
                        <Image src={"https://cdn.shopify.com/s/files/1/0662/0371/3755/files/contact_1.webp?v=1664723434"} layout="fill" objectFit="center" objectPosition={"center"} alt="phone"/>
                    </div>
                    <div className="mx-4">
                    <div className="font-semibold">phone:</div>
                    <div className="text-gray-600">01063723668</div>
                    </div>
                </div>
                <div className="flex items-center my-4">
                    <div className="relative w-8 h-8">
                        <Image src={"https://cdn.shopify.com/s/files/1/0662/0371/3755/files/contact_2_ft_150x_fe621070-bda6-4bc6-a122-6e5731ba582c.webp?v=1664723435"} layout="fill" objectFit="center" objectPosition={"center"} alt="location"/>
                    </div>
                    <div className="mx-4">
                    <div className="font-semibold">location:</div>
                    <div className="text-gray-600">birelabid ,north sania ,egypt</div>
                    </div>
                </div>
                <div className="flex items-center my-4">
                    <div className="relative w-8 h-8">
                        <Image src={"https://cdn.shopify.com/s/files/1/0662/0371/3755/files/contact_3_ft_150x_d483c902-b0b2-428b-8267-2db3bcac315c.webp?v=1664723435"} layout="fill" objectFit="center" objectPosition={"center"} alt="email"/>
                    </div>
                    <div className="mx-4">
                    <div className="font-semibold">email:</div>
                    <div className="text-gray-600">eng.salama.naief@gmail.com</div>
                    </div>
                </div>
            </div>
            <div className=" w-full md:w-1/3 ">
                <div className="text-2xl my-4 capitalize">{t("common:Chate_with_us")}</div>
                <div className="my-2 text-sm md:text-base capitalize text-gray-700">{t("common:connect_details")}</div>
               <form  onSubmit={handleSubmit}>
                   <input type="text" className="outline-none border border-primary bg-white py-2 px-4 text-gray-900 w-80 flex-grow" placeholder={t("common:message")} />
                   <button type="submit" className="mx-2 py-2 px-6 md:px-3 text-gray-900 bg-white border border-primary uppercase font-bold my-2 md:my-0">{t("common:send")}</button>
               </form>
               <div className="my-2 capitalize text-sm md:text-base text-gray-700"> {t("common:replay_with_24hour")}</div>
               <div className="my-5 flex items-center">
                <span className="mx-2"><FiFacebook className="cursor-pointer hover:bg-primary hover:text-white text-5xl text-gray-600 p-2 rounded-full border border-primary"/></span>
                <span className="mx-2"><FiInstagram className="cursor-pointer hover:bg-primary hover:text-white text-5xl text-gray-600 p-2 rounded-full border border-primary"/></span>
                <span className="mx-2"><FiTwitter className="cursor-pointer hover:bg-primary hover:text-white text-5xl text-gray-600 p-2 rounded-full border border-primary"/></span>
                <span className="mx-2"><TiSocialPinterest className="cursor-pointer hover:bg-primary hover:text-white text-5xl text-gray-600 p-2 rounded-full border border-primary"/></span>
               </div>
            </div>
            <div className="w-full md:w-1/3 ">
                <div className="text-2xl my-4 capitalize">Our Galary</div>

                <div className="flex flex-wrap">
                    <div className="overflow-hidden w-1/3 h-28 relative p-1">
                        <Image src={"https://cdn.shopify.com/s/files/1/0662/0371/3755/files/instagram-4_600x_bf0e7492-db27-4fc1-b385-798a8fe220fb.jpg?v=1664725238"} layout="fill" objectFit="cover" objectPosition={"center"} alt="galary" className="hover:scale-125 transition ease-in-out duration-500 cursor-pointer"/>
                    </div>
                    <div className="overflow-hidden w-1/3 h-28 relative p-1 ">
                        <Image src={"https://cdn.shopify.com/s/files/1/0662/0371/3755/files/instagram-1_600x_cbb8e728-0136-4f09-98cc-fbc9770d4df1.webp?v=1664725232"} layout="fill" objectFit="cover" objectPosition={"center"} alt="galary" className="hover:scale-125 transition ease-in-out duration-500 cursor-pointer"/>
                    </div>
                    <div className="overflow-hidden w-1/3 h-28 relative p-1 ">
                        <Image src={"https://cdn.shopify.com/s/files/1/0662/0371/3755/files/instagram-2_600x_39317fdc-6023-44e1-b0e3-69628bdc4497.webp?v=1664725237"} layout="fill" objectFit="cover" objectPosition={"center"} alt="galary" className="hover:scale-125 transition ease-in-out duration-500 cursor-pointer"/>
                    </div>
                    <div className="overflow-hidden w-1/3 h-28 relative p-1 ">
                        <Image src={"https://cdn.shopify.com/s/files/1/0662/0371/3755/files/instagram-3_600x_ebc24505-5676-4c4d-85a8-b944ac0f602d.webp?v=1664725232"} layout="fill" objectFit="cover" objectPosition={"center"} alt="galary" className="hover:scale-125 transition ease-in-out duration-500 cursor-pointer"/>
                    </div>
                    <div className="overflow-hidden w-1/3 h-28 relative p-1 ">
                        <Image src={"https://cdn.shopify.com/s/files/1/0662/0371/3755/files/instagram-5_600x_7532f4e3-1506-40a8-9725-b621898f732f.webp?v=1664725232"} layout="fill" objectFit="cover" objectPosition={"center"} alt="galary" className="hover:scale-125 transition ease-in-out duration-500 cursor-pointer"/>
                    </div>
                    <div className="overflow-hidden w-1/3 h-28 relative p-1 ">
                        <Image src={"https://cdn.shopify.com/s/files/1/0662/0371/3755/files/instagram-6_600x_29d5f524-48d5-42d7-89ba-218d11eae1fc.webp?v=1664725231"} layout="fill" objectFit="cover" objectPosition={"center"} alt="galary" className="hover:scale-125 transition ease-in-out duration-500 cursor-pointer"/>
                    </div>
                </div>
            </div>
        </div>
    )
}