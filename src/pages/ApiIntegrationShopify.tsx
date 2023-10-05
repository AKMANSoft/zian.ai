import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
import { Input } from "@/components/ui/input";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuthUserStore from "@/lib/zustand/authUserStore";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { PrimaryBtn, PrimaryBtnNeon } from "@/components/ui/buttons";
import { Link } from "react-router-dom";





export default function ApiIntegrationShopify() {
    const { authUser } = useAuthUserStore()

    return (
        <MainLayout heading="INTEGRATE API">
            <GrBorderBox className="p-px md:p-[2px] rounded-20 lg:max-h-[calc(100vh_-_130px)] " type="lg">
                <div className="py-3 md:py-[30px]  h-full w-full flex flex-col backdrop-blur-[10px] bg-gr-purple-light opacity-90 rounded-20">
                    <div className="max-h-full px-3 space-y-2 overflow-y-auto md:px-[30px] md:space-y-7 ">
                        <div className="">
                            <h1 className="text-xl font-bold text-white font-jakarta ">
                                API Key
                            </h1>
                            <div className="relative mt-[10px]">
                                <Input className="pr-24" readOnly
                                    value={authUser?.authorization} />
                                <button className="absolute text-sm font-semibold -translate-y-1/2 font-jakarta top-1/2 right-5">
                                    <FontAwesomeIcon className="pr-2" icon={faCopy} /> Copy
                                </button>
                            </div>
                            <div className="mt-3 md:mt-5  mb-[15px]" >
                                <p className="text-base font-bold text-white lg:text-xl font-jakarta">
                                    Select your Integration:
                                </p>
                                <div className="mt-3 md:mt-5  flex md:flex-row flex-col gap-[10px]   mb-[15px]">
                                    <Link to="/wordpress">
                                        <PrimaryBtnNeon className="font-normal text-[15px] py-[8px] w-full md:w-auto">
                                            Wordpress Integration
                                        </PrimaryBtnNeon>
                                    </Link>
                                    <Link to="/shopify">
                                        <PrimaryBtn className="font-normal text-[15px] w-full md:w-auto">
                                        Shopify Integration Via Zapier
                                        </PrimaryBtn>
                                    </Link>
                                    <Link to="/wix">
                                        <PrimaryBtnNeon className="font-normal text-[15px] py-[8px] w-full md:w-auto">
                                        Wix Integration Via Zapier
                                        </PrimaryBtnNeon>
                                    </Link>
                                </div>

                            </div>
                            <hr className="border-2 border-primary " />
                            <div>
                                <h2 className="md:text-[32px] text-base font-bold font-jakarta text-white my-4 md:my-[30px]">
                                    Shopify Integration Via Zapier
                                </h2>
                                <hr className="border border-white/10" />
                                <h2 className="mt-3 md:mt-5  mb-[5px] text-base lg:text-xl font-bold font-jakarta">
                                    Tools Needed:
                                </h2>
                                <ol className="text-sm font-normal list-decimal text-white/70 md:text-base font-jakarta px-[18px]">
                                    <li className="">
                                        <span className="ps-1">Your Zian SEO API</span>
                                    </li>
                                    <li className=""><span className="flex items-center gap-2 underline text-primary ps-1">Zapier <ExternalLinkIcon className="mt-[4px]" /></span>
                                    </li>
                                    <li className="">
                                        <span className="underline text-primary ps-1">UUID Generator</span>
                                    </li>
                                    <li>
                                        <span className="underline text-primary ps-1">Your Shopify Login</span>
                                    </li>
                                </ol>
                                <div className="mt-3 md:mt-5  space-y-[10px]">
                                    <div className="mb-2">
                                        <VideoComponent />
                                    </div>
                                    <a href="https://www.loom.com/share/55bd2943e2b54559a85ae44695671b99" target="_blank" className="text-base font-normal text-white underline font-jakarta">
                                        Creating a Zapier Integration with Shopify using Code by Zapier
                                    </a>
                                    <hr className="border-white/10 border mt-3 md:mt-[10px]" />

                                </div>
                                <h2 className="mt-3 text-base font-bold text-white lg:text-xl md:mt-5 font-jakarta">
                                    Steps:
                                </h2>
                                <div className="mt-[10px] text-base font-normal text-white/70 leading-[26px] max-w-[1050px] w-full ">
                                    You should already have a page the posts are going to automatically, you just need to find it. However this will depend on however the developers of your website configured your system.
                                    <br /><br />
                                    <ol className="list-decimal px-[18px]">
                                        <li>
                                            Navigate to Zapier {">"} Create Zap (you should watch the video above)
                                        </li>
                                        <li>
                                            Select: Run Python Code as the trigger {">"}Paste the below code and edit:<br />
                                            <span className="lg:pl-3">
                                                a. Replace the api_token = with your Zian API token. Between then ‘ ‘
                                            </span>
                                            <br />
                                            <span className="lg:pl-3">
                                                b. Create a uuid (using the free link above) and replace the uuid = in the code snippet between then ‘ ‘
                                            </span>

                                        </li>
                                    </ol>
                                    <img src="/images/python-shopify.png" alt="" className="w-[634px] h-auto  my-5" />
                                    <div className="border rounded-xl border-white/10">
                                        <pre className="px-5  leading-[26px] py-[15px] overflow-x-auto text-xs font-semibold text-white/70 md:text-sm font-jakarta">
                                            url = 'https://seo.zian.ai/api?limit=399&offset=0&image_url=1'<br />
                                            api_token = '0xxxxxxxxxx1446f512a4c18150e1e936f2189393d3e040be330d75b173cdc'<br />
                                            # create one uuid on the site: https://www.uuidgenerator.net/version4<br />
                                            uuid = 'dfdfda8d-1f11-49f5-924c-48a7ec6f5791'<br />
                                            headers = {"{'Authorization': api_token}"} <br />
                                            r = requests.get(url, headers=headers) <br />
                                            result = r.json()['articles'] <br />
                                            output = [] <br />
                                            <br /><br />
                                            store = StoreClient(uuid) <br />
                                            for item in result: <br />
                                            aid = item['id'] <br />
                                            store_result = store.get(f'{"{aid}"}') <br />
                                            print(f'aid: {"{aid}"}, store: {'{store_result}'}') <br />
                                            if not store_result: <br />
                                            <p className="pl-2">
                                                article_html = item['article'].replace("\n","{'<br />'}") <br />
                                                item['article_html'] = article_html <br />
                                                output.append(item) <br />
                                                store.set(f'{"{aid}"}', 'true');<br />
                                                print(f'Set the id on store: {"aid"}') <br />
                                            </p>



                                        </pre>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 md:gap-6 lg:gap-[30px] mt-3 md:mt-5  max-w-[1060px] w-full ">
                                    <h2 className="text-base lg:text-[32px] text-white font-bold font-jakarta leading-[20px] lg:leading-[100%] list-decimal flex gap-2">
                                        3.
                                        <span>
                                            Save step in Zapier, run test. If it produces an error, just run the test again and again.
                                        </span>
                                    </h2>
                                    <img src="/images/shopify-python.png" alt="" className="md:w-[634px] w-full h-auto" />
                                    <h2 className="text-base lg:text-[32px] text-white font-bold font-jakarta leading-[20px] lg:leading-[100%] flex gap-[6px]">
                                        4. <span className="" /> Connect Shopify app {">"} Configure shopify step with correct fields in the zap as below:
                                    </h2>
                                    <img src="/images/shopify-blog.png" alt="" className="md:w-[634px] w-full h-auto" />
                                    <h2 className="text-base lg:text-[32px] text-white flex gap-2 font-bold font-jakarta leading-[20px] lg:leading-[100%]">
                                        5. <span className="" /> Run Shopify test, check Shopify account, then save & turn on Zap. You’re finished! 🎉
                                    </h2>
                                    <div className="text-base lg:text-[32px] text-white font-bold font-jakarta flex gap-2 leading-[20px] lg:leading-[100%]">
                                        6. <h2 className="" > Optional Extra: <span className="font-normal ">
                                            If you want to ensure the paragraph formatting is correct, which fixes the bug on Shopify’s side:</span>
                                        </h2>
                                    </div>
                                    <div className="px-4 md:px-[30px] flex flex-col gap-5 mt-1 lg:mt-[10px]">
                                        <p className="text-base font-normal md:text-xl font-jakarta">
                                            a. Navigate to the shopify step {">"} action {">"} content {">"} article {">"} format data
                                        </p>
                                        <img src="/images/blog-entry-shopify.png" alt="" className="w-[419px] h-auto" />
                                        <p className="text-base font-normal md:text-xl font-jakarta">
                                            b. n the AI Prompt text box, copy and paste:Format the following article in HTML to include the following after every paragraph spacing:
                                        </p>
                                        <img src="/images/format-data-shopify.png" alt="" className="w-[512px] h-auto" />

                                        <p className="text-base font-normal md:text-xl font-jakarta">
                                            c. In the Shopify Step, replace the “Content” field with the new content from the new formatting step we just added:
                                        </p>
                                        <img src="/images/shopify-data.png" className="md:w-[512px] w-full h-auto" />
                                        <p className=" text-base font-normal text-start text-white md:text-xl md:mt-5 font-jakarta">
                                            Finally run test, save a turn on zap!
                                        </p>

                                    </div>


                                </div>


                            </div>


                        </div>


                    </div>

                </div>

            </GrBorderBox>
        </MainLayout >
    );
}








function VideoComponent() {


    return (
        <div className="">
            <div className="relative w-full md:w-[500px]">
                <iframe width={500} height={300} src="https://www.loom.com/embed/6e0e77ef595f4e488e8636a1d03770dc?sid=1c27efb4-bbb7-4d21-a14d-7d5e897fd125" className="object-cover w-full h-auto overflow-hidden rounded-20 aspect-video"> </iframe>
            </div>
        </div>
    )
}

// function VideoComponent() {

//     const videoRef = useRef<HTMLVideoElement>(null);
//     const [showBtn, setShowBtn] = useState(false);


//     useEffect(() => {
//         videoRef.current?.addEventListener("play", function () {
//             if (!videoRef.current) return;
//             setShowBtn(!videoRef.current.paused)
//         })
//     }, [videoRef])


//     const onPlayVideoClicked = async () => {
//         if (!videoRef.current) return;
//         await videoRef.current.play()
//         videoRef.current.controls = true;
//     }

//     return (
//         <div className="">
//             <div className="relative w-full md:w-[500px]">
//                 <video ref={videoRef} src="/videos/test_video.mp4" width={500} height={300} className="object-cover w-full h-auto overflow-hidden rounded-20 aspect-video" />
//                 <button onClick={onPlayVideoClicked} className={cn(
//                     "aspect-square p-7 bg-transparent/60 flex items-center justify-center border rounded-full",
//                     "absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2",
//                     showBtn && "hidden"
//                 )}>
//                     <FontAwesomeIcon className="w-6 h-6 text-lg text-white" icon={faPlay} />
//                 </button>
//             </div>
//         </div>
//     )}


