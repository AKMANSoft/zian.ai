import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
import { Input } from "@/components/ui/input";
import { faCopy, faPlay } from "@fortawesome/free-solid-svg-icons";
import JSONPretty from 'react-json-pretty';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { cn } from "@/lib/utils";





export default function ApiIntegrationPage() {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleVideoClick = () => {
    
        if (!videoRef.current) return;
        if (!videoRef.current.paused) {
            videoRef.current.pause();
        }
    };


    return (
        <MainLayout heading="INTEGRATE API">
            <GrBorderBox className="p-px md:p-[2px] rounded-20 lg:max-h-[calc(100vh_-_130px)] " type="lg">
                <div className="py-3 md:py-7 h-full w-full flex flex-col backdrop-blur-[10px] bg-gr-purple-light opacity-90 rounded-20">
                    <div className="max-h-full overflow-y-auto space-y-2 px-3 md:px-7 md:space-y-7">
                        <div className="space-y-[10px]">
                            <h1 className="text-base font-jakarta font-bold text-white md:text-xl">
                                API Key
                            </h1>
                            <div className="relative">
                                <Input className="pr-24" readOnly
                                    value={'a5ddddc6343e7b1e1f1b4393a8dcce689e0055bb66742e14295f0343ad3046b3'}
                                    placeholder="Copy" />
                                <button className="absolute text-sm font-semibold font-jakarta top-1/2 right-5 -translate-y-1/2">
                                    <FontAwesomeIcon className="pr-2" icon={faCopy} /> Copy
                                </button>
                            </div>


                        </div>
                        <div className="space-y-3">
                            <h1 className="text-base font-jakarta font-bold text-white md:text-xl">
                                How to install on Wordpress
                            </h1>
                            <ul className="text-white/70 text-sm font-normal md:text-base">
                                <li>
                                    Download, install and activate this Zain.Ai plugin
                                </li>
                                <li>Go to Setting -{">"} Zian.ai API
                                </li>
                                <li>
                                    Fill the API Key
                                </li>
                                <li>
                                    Save Changes
                                </li>
                            </ul>
                            <div className="space-y-[10px]">
                                <div className="" onClick={handleVideoClick}>
                                    <div className="md:w-[500px] w-auto relative">
                                        <video ref={videoRef} src="/videos/test_video.mp4" width={500} height={300} className="rounded-[20px] w-auto aspect-video bg-cover bg-no-repeat md:w-[500px] md:h-[300px] relative" />
                                        <button onClick={async () => {
                                            await videoRef.current?.play()
                                        }} className={cn(
                                            "px-4 py-3 bg-transparent/60 flex items-center justify-center border rounded-full absolute top-1/2 right-1/2 -translate-y-1/2",
                                            videoRef.current?.paused && "hidden"
                                        )}>
                                            <FontAwesomeIcon className="text-3xl text-white " icon={faPlay} />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <a className="text-base font-jakarta font-bold text-white underline  md:text-xl cursor-pointer">
                                        Installing Zian AI into Your WordPress Website 🚀 - Watch Video
                                    </a>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="space-y-[10px]">
                            <h1 className="text-base font-jakarta font-bold text-white md:text-xl">
                                List the industry
                            </h1>
                            <div className="border rounded-xl border-white/10">
                                <pre className="px-5 py-4 text-xs font-semibold text-white/70 overflow-x-auto md:text-sm">
                                    <code>
                                        Method : GET
                                        <br /><br />
                                        Parameters :
                                        <br /><br />
                                        list : industry
                                        <br /><br />
                                        Endpoint :
                                        <br /><br />
                                        https://seo.zian.ai/api?list=industry
                                        <br /><br />
                                        Result :
                                        <JSONPretty className="pl-10" id="json-pretty" data={
                                            {
                                                "industry": [
                                                    {
                                                        "id": 1,
                                                        "name": "Bitcoin"
                                                    },
                                                    {
                                                        "id": 2,
                                                        "name": "Fitness"
                                                    }
                                                ],
                                                "status": true
                                            }
                                        }>
                                        </JSONPretty>
                                    </code>
                                </pre>
                            </div>
                        </div>
                        <div className="space-y-[10px]">
                            <h1 className="text-base font-jakarta font-bold text-white md:text-xl">
                                Update the keyword
                            </h1>
                            <div className="border rounded-xl border-white/10">
                                <pre className="px-5 py-4 text-xs font-semibold text-white/70 overflow-x-auto md:text-sm">
                                    <code>
                                        Method : POST
                                        <br /><br />
                                        Parameters :
                                        <br /><br />
                                        industry_id : int
                                        <br /><br />
                                        keyword : str
                                        <br /><br />
                                        Endpoint :
                                        <br /><br />
                                        https://seo.zian.ai/api
                                        <br /><br />
                                        Result :
                                        <JSONPretty className="pl-10" id="json-pretty" data={
                                            {
                                                "data": {
                                                    "industry_id": "3",
                                                    "keyword": "Business valuations Sydney, business valuations Brisbane, accountants Sydney"
                                                },
                                                "status": true
                                            }
                                        }>
                                        </JSONPretty>
                                        {

                                        }
                                    </code>
                                </pre>

                            </div>
                        </div>
                        <div className="space-y-[10px]">
                            <h1 className="text-base font-jakarta font-bold text-white md:text-xl">
                                List the article
                            </h1>
                            <div className="border rounded-xl border-white/10">
                                <pre className="px-5 py-4 text-xs font-semibold text-white/70 overflow-x-auto md:text-sm">
                                    <code>
                                        Method : GET
                                        <br /><br />
                                        Parameters :
                                        <br /><br />
                                        limit : optional : default = 1 : example : https://seo.zian.ai/api?limit=5
                                        <br /><br />
                                        Endpoint :
                                        <br /><br />
                                        https://seo.zian.ai/api
                                        <br /><br />
                                        Result :
                                        <JSONPretty className="pl-10" id="json-pretty" data={
                                            {
                                                "articles": [
                                                    {
                                                        "article": `As India continues to experience extreme weather conditions, with temperatures soaring and heat waves showing no sign of abating, the harsh summer sun can take its toll on the eyes if left unprotected.According to the World Health Organisation, approximately 2.2,  billion people are affected by near or distance vision impairment, with around half of these cases potentially preventable with simple protective measures.In order to help protect the eyes during the summer months, Dr. Rishi Raj Borah, Country Director - India at Orbis has offered some advice.`,
                                                        "headline": "Protect Your Vision from Scorching Heat this Summer",
                                                        "id": 13,
                                                        "image": "image",
                                                        "summary": "With the summer heatwaves in India causing temperatures to soar, it is important to take precautions to protect your eyes from the harmful UV rays. Dr. Rishi Raj Borah, Country Director - India, Orbis, recommends taking simple yet effective measures such as using eye drops, wearing UV-protected sunglasses and other protective gear to keep your eyes healthy and happy all summer long. These best practices can help reduce the existing burden of global eye diseases, which affects 2.2 billion people worldwide, and prevent further vision impairment.",
                                                        "timestamp": "Fri, 19 May 2023 06:41:29 GMT"
                                                    }
                                                ],
                                                "status": true
                                            }
                                        }>
                                        </JSONPretty>

                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>

                </div>

            </GrBorderBox>
        </MainLayout >
    );
}




