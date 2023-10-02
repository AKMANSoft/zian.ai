import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
import { Input } from "@/components/ui/input";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuthUserStore from "@/lib/zustand/authUserStore";
import { PrimaryBtn, PrimaryBtnNeon } from "@/components/ui/buttons";


const code = `

api_key = 'IST.eyJraWQiOiJxxxxxxxxxxxx0.eyJkYXRhIjoie1wiaWRcIjpcIjkyZTBjNjFhLThjZjMtNDU0YS05NGUzLTdkZjY5Y2I5MDQyNFwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjQ1OTliZDQyLTFmZGxxxxxxxx1hZDk2LWQxNjhiMWQ4YzQ2YlwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCJlNzU1MzJlMy1kODNkLTRlZTAtYjBmMi1kN2Y2MWI0NzRkYThcIn19IiwiaWF0IjoxNjk1NzM3Nzk0fQ.f4sJQKmS_05BQywhsdDHnSFg-yuKvXg8_J6WdbEh_ZgcTvahDWs2DVCY4sfVe7GrbRt38nXiC0Jb1np7I7L6JGcwq8GX91lbpimvlsgni07uyDuU718jMVL-xTY1610FlnIPXZVSltctVG5oM4Gmsyk6rdaL-9Z3KczS8PZoM5z2vfJHqzjvyl-jW8yCilHF4Yu9eiekdu73dlDNtbagiVGJaoKid5cqpBWjHYkcOvadvKRkcWe9ykp2J8_qMCKroMDhz3vYmJq4-Xz0cXRnfVWIPb8cmzSFQmPZc6YhF9U11XRhWamZe0f-fOz4vJr7Y_XHKbdaSAganDRD5CeV2A'
site_id = 'xxxxxxxx-d6dc-4ce3-8ff5-d8ac003089fd'
account_id = 'xxxxxxx-d83d-4ee0-b0f2-d7f61b474da8'

url = 'https://www.wixapis.com/blog/v3/draft-posts'
img_url = 'https://www.wixapis.com/site-media/v1/files/import'
member_url = 'https://www.wixapis.com/members/v1/members'
headers = {'Authorization': api_key, 'wix-account-id': account_id, 'wix-site-id': site_id, 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0'}
output = inputData

try:
    r = requests.get(member_url, headers=headers)
    memberId = r.json()['members'][0]['id']

    nodes = []
    item = inputData
    print(f'item id: {item["id"]}')
    paras = item['article'].split('\n\n')

    for p in paras:
        nodes.append(
        {
            "type": "PARAGRAPH",
            "id": "",
            "nodes": [            {
              "type": "TEXT",
              "id": "",
              "nodes": [],
              "textData":               {
                "text": p,
                "decorations": []
              }
            }],
            "paragraphData":             {
              "textStyle": {"textAlignment": "AUTO"},
              "indentation": 0
            }
         }
        )
    img_data = {
        'url': item['image'],
        'mimeType': "image/jpeg",
    }
    r = requests.post(img_url, headers=headers, json=img_data)
    try:
        result = r.json()
        print(f'image result: {result}')
    except Exception as e:
        print(e)
        print(f'image result: {r.text}')
        raise e

    #import time
    #time.sleep(3)

    nodes.insert(0,
        {
            "type": "IMAGE",
            "id": "",
            "nodes": [
              {
                "type": "IMAGE",
                "id": "",
                "nodes": [],
                "imageData": {
                  'image': {
                      'src': {
                          'url': result['file']['url'],
                          #'url': item['image'],
                      }
                  }
                }
              }
            ],
            "imageData":  {
              'containerData': {
                'width': {
                  'size': 'CONTENT',
                },
                'alignment': 'CENTER',
              },
              'image': {
                  'src': {
                      #'url': result['file']['url'],
                      'url': item['image'],
                  }
              }
            }
         }
    )

    data = {
        "draftPost": {
            "title": item['headline'],
            "richContent": {
                "nodes": nodes,
            },
            'memberId': memberId,
            "heroImage": {
                'id': result['file']['id'],
                'url': result['file']['url'],
            },
            'media': {
                'displayed': False,
                'custom': True,
                #'embedMedia': {
                #    'thumbnail': {
                #        'url': result['file']['url'],
                #        #'url': item['image'],
                #        'width': 800,
                #        'height': 800,
                #    }
                #},
                'wixMedia': {
                    'image': {
                        'id': result['file']['id'],
                        'url': result['file']['url'],
                    }
                }
            },
        },
        "publish": True,
    }
    r = requests.post(url, headers=headers, json=data)
    print(f'status: {r.status_code}')
    print(f'result: {r.text}')
except Exception as e:
    print(e)



`


export default function ApiIntegrationWix() {
  const { authUser } = useAuthUserStore();

  return (
    <MainLayout heading="INTEGRATE API ">
      <GrBorderBox
        className="p-px md:p-[2px]   rounded-20   lg:max-h-[calc(100vh_-_130px)]  "
        type="lg"
      >
        <div className="py-3 md:py-[30px]   h-full w-full flex flex-col backdrop-blur-[10px] bg-gr-purple-light opacity-90 rounded-20">
          <div className="max-h-full px-3 w-full  space-y-2 md:px-[30px] md:space-y-7 overflow-x-hidden ">
            <div className="">
              <h1 className="text-xl font-bold text-white font-jakarta ">
                API Key
              </h1>
              <div className="relative mt-[10px]">
                <Input className="pr-24" readOnly value={authUser?.token} />
                <button className="absolute text-sm font-semibold -translate-y-1/2 font-jakarta top-1/2 right-5">
                  <FontAwesomeIcon className="pr-2" icon={faCopy} /> Copy
                </button>
              </div>
              <div className="mt-3 md:mt-5  mb-[15px]">
                <p className="text-base font-bold text-white lg:text-xl font-jakarta">
                  Select your Integration:
                </p>
                <div className="mt-3 md:mt-5  flex md:flex-row flex-col gap-[10px]   mb-[15px]">
                  <a href="/integrate">
                    <PrimaryBtnNeon className="font-normal text-[15px] py-[8px] w-full md:w-auto">
                      Wordpress Integration
                    </PrimaryBtnNeon>
                  </a>
                  <a href="/shopify">
                    <PrimaryBtnNeon className="font-normal text-[15px] py-[8px] w-full md:w-auto">
                      Shopify Integration Via Zapier
                    </PrimaryBtnNeon>
                  </a>
                  <a href="/wix">
                    <PrimaryBtn className="font-normal text-[15px] w-full md:w-auto">
                      Wix Integration Via Zapier
                    </PrimaryBtn>
                  </a>
                </div>
              </div>
              <hr className="border-2 border-primary " />
              <div className="">
                <h2 className="md:text-[32px] text-base font-bold font-jakarta text-white my-4 md:my-[30px] tracking-wider">
                  How To Connect Zian AI SEO to Wix Via Zapier
                </h2>
                <hr className="border border-white/10" />
                <h2 className="mt-3 md:mt-5  mb-[5px] text-base lg:text-xl font-bold font-jakarta">
                  Tools Needed:
                </h2>
                <ol className="text-sm font-normal list-decimal text-white/70 md:text-base font-jakarta px-[18px]">
                  <li className="">
                    <span className="ps-1">
                      Your Zian SEO API Key:{" "}
                      <a
                        target="_blank"
                        href=" https://seo.zian.ai/integrate"
                        className="underline text-primary ps-1"
                      >
                        {" "}
                        https://seo.zian.ai/integrate
                      </a>{" "}
                    </span>
                  </li>
                  <li className="">
                    <span className="md:flex items-center ps-1">
                      Zapier:{" "}
                      <a
                        target="_blank"
                        href="https://zapier.com/ "
                        className="underline text-primary ps-1"
                      >
                        {" "}
                        https://zapier.com/
                      </a>
                    </span>
                  </li>
                  <li className="">
                    <span className="md:flex items-center ps-1 ">
                      UUID Generator:{" "}
                      <a
                        target="_blank"
                        href="https://www.uuidgenerator.net/version4"
                        className="underline text-primary ps-1"
                      >
                        https://www.uuidgenerator.net/version4
                      </a>
                    </span>
                  </li>
                  <li className="">
                    <span className="md:flex items-center md:ps-1 ">
                      Your Wix API Key:{" "}
                      <a
                        target="_blank"
                        href=" https://manage.wix.com/account/api-keys"
                        className="underline text-primary md:ps-1"
                      >
                        {" "}
                        https://manage.wix.com/account/api-keys
                      </a>
                    </span>
                  </li>
                </ol>
                <div className="mt-3 md:mt-5  space-y-[10px]">
                  <div className="mb-2">
                    <VideoComponent />
                  </div>
                  <a
                    href="https://www.loom.com/share/55bd2943e2b54559a85ae44695671b99"
                    target="_blank"
                    className="text-base font-normal text-white underline font-jakarta"
                  >
                    Creating a Zapier Integration with Wix using Code by Zapier
                  </a>
                  <hr className="border-white/10 border mt-3 md:mt-[10px]" />
                </div>
                <h2 className="mt-3 text-base font-bold text-white lg:text-xl md:mt-5 font-jakarta">
                  Steps:
                </h2>
                <div className="mt-[10px] text-base font-normal text-white/70 leading-[26px] max-w-[1050px] w-full ">
                  <ol className="list-decimal px-[18px]">
                    <li>
                      Navigate to Zapier {">"} Create Zap   (you should watch
                      the video above)
                    </li>
                    <li>
                      Select: Run Python Code as the trigger {">"}Paste the
                      below code and edit:
                      <br />
                      <span className="lg:pl-3">
                        a. Replace the api_token = with your Zian API token.
                        Between then ‘ ‘
                      </span>
                      <br />
                      <span className="lg:pl-3">
                        b. Create a uuid (using the free link above) and replace
                        the uuid = in the code snippet between then ‘ ‘
                      </span>
                    </li>
                  </ol>
                  <img
                    src="/images/wix-python.png"
                    alt=""
                    className="w-[634px] h-auto  my-5"
                  />
                  <div className="border rounded-xl border-white/10">
                    <pre className="px-5  leading-[26px] py-[15px] overflow-x-auto text-xs font-semibold text-white/70 md:text-sm font-jakarta">
                      url =
                      'https://seo.zian.ai/api?limit=399&offset=0&image_url=1'
                      <br />
                      api_token =
                      '0xxxxxxxxxx1446f512a4c18150e1e936f2189393d3e040be330d75b173cdc'
                      <br />
                      # create one uuid on the site:
                      https://www.uuidgenerator.net/version4
                      <br />
                      uuid = 'dfdfda8d-1f11-49f5-924c-48a7ec6f5791'
                      <br />
                      headers = {"{'Authorization': api_token}"} <br />
                      r = requests.get(url, headers=headers) <br />
                      result = r.json()['articles'] <br />
                      output = [] <br />
                      <br />
                      <br />
                      store = StoreClient(uuid) <br />
                      for item in result: <br />
                      aid = item['id'] <br />
                      store_result = store.get(f'{"{aid}"}') <br />
                      print(f'aid: {"{aid}"}, store: {"{store_result}"}') <br />
                      if not store_result: <br />
                      <p className="pl-2">
                        article_html = item['article'].replace("\n","{"<br />"}
                        ") <br />
                        item['article_html'] = article_html <br />
                        output.append(item) <br />
                        store.set(f'{"{aid}"}', 'true');
                        <br />
                        print(f'Set the id on store: {"aid"}') <br />
                      </p>
                    </pre>
                  </div>
                </div>
                <div className="flex flex-col gap-4 md:gap-6 lg:gap-[30px] mt-3 md:mt-5  max-w-[1060px] w-full ">
                  <h2 className="text-base lg:text-[32px] text-white font-bold font-jakarta leading-[20px] lg:leading-[100%] list-decimal flex gap-2">
                    3.
                    <span>
                      Save step in Zapier, run test. If it produces an error,
                      just run the test again and again.
                    </span>
                  </h2>
                  <img
                    src="/images/python-wix.png"
                    alt=""
                    className="md:w-[634px] w-full h-auto"
                  />
                  <div className="">
                    <h2 className="text-base mb-2 lg:mb-4 lg:text-[32px] text-white font-bold font-jakarta  leading-[20px] lg:leading-[100%] flex gap-[6px]">
                      4. <span className="" /> Navigate to Wix to get your API
                      Key and account id:
                    </h2>
                    <div className="pl-7 lg:pl-[47px]">
                      <a
                        href="https://manage.wix.com/account/api-keys"
                        target="_blank"
                        className="  underline text-base lg:text-2xl text-white font-bold font-jakarta leading-[20px] lg:leading-[100%]"
                      >
                        https://manage.wix.com/account/api-keys
                      </a>
                    </div>
                    <div className="flex flex-col gap-2 md:gap-5 pl-7 md:pl-[47px] mt-4 md:mt-10">
                      <ol className="flex gap-2  text-sm font-normal md:text-xl font-jakarta">
                        {" "}
                        a.{" "}
                        <span className="">
                          - Click ``Copy ID`` to copy ``account id``
                        </span>
                      </ol>
                      <ol className="flex gap-2  text-sm font-normal md:text-xl font-jakarta">
                        {" "}
                        b.{" "}
                        <span className="">- Click ``Generate API Key``</span>
                      </ol>
                      <ol className="flex gap-2  text-sm font-normal md:text-xl font-jakarta">
                        {" "}
                        c.{" "}
                        <span className="">
                          - Click ``All site permissions``
                        </span>
                      </ol>
                      <ol className="flex gap-2  text-sm font-normal md:text-xl font-jakarta">
                        {" "}
                        d.{" "}
                        <span className="">
                          - Select permissions: ``Wix Blog`` and ``Manage Site
                          Media`` {"( "}or you can select “all”
                        </span>
                      </ol>
                      <ol className="flex gap-2  text-sm font-normal md:text-xl font-jakarta">
                        {" "}
                        e. <span className="">- Click ``Generate Key``</span>
                      </ol>
                      <ol className="flex gap-2  text-sm font-normal md:text-xl font-jakarta">
                        {" "}
                        f.{" "}
                        <span className="">
                          - Copy the key to safe somewhere
                        </span>
                      </ol>
                    </div>
                  </div>

                  <h2 className="text-base lg:text-[32px] text-white flex gap-2 font-bold font-jakarta leading-[20px] lg:leading-[100%]">
                    5. <span className="" /> Get your site_id:
                  </h2>
                  <div className="flex flex-col gap-5 pl-6 md:pl-[47px]  md:mt-4">
                    <ol className="flex flex-wrap gap-2   text-base font-normal md:text-xl font-jakarta">
                      {" "}
                      a.{" "}Go to{" "}
                      <span className="">
                        
                        <a
                          href="https://manage.wix.com/account/sites?referralAdditionalInfo=Route"
                          className="underline ps-1"
                        >
                          https://manage.wix.com/account/sites?referralAdditionalInfo=Route
                        </a>
                        , then hover the blog site, and select ``Select & Edit
                        Site``,
                      </span>
                    </ol>
                    <ol className="flex gap-2  text-base font-normal md:text-xl font-jakarta">
                      {" "}
                      b.{" "}
                      <span className="">
                        click it, then go to the site, and copy the ``site_id``
                        from the url {"("} the code between the brackets:
                      </span>
                    </ol>
                  </div>
                  <img
                    src="/images/wax-site-id.png"
                    alt=""
                    className="md:w-[634px] w-full h-auto"
                  />
                  <div className="text-base lg:text-[32px] text-white font-bold font-jakarta flex gap-2 leading-[20px] lg:leading-[100%]">
                    6.{" "}
                    <h2 className="">
                      Set the second step in Zapier. Code by Zapier {">"} Python{" "}
                      {" > "} Add input data
                    </h2>
                  </div>
                  <div className="px-4 md:px-[30px] flex flex-col gap-5 mt-1 lg:mt-[10px]">
                    <p className="text-base font-normal md:text-xl font-jakarta">
                      a. Create ``Input Data`` map
                    </p>
                    <img
                      src="/images/blog-entry-shopify.png"
                      alt=""
                      className="w-[419px] h-auto"
                    />
                    <div className="text-base font-normal md:text-xl font-jakarta">
                      b.{" "}
                      <span>
                        {" "}
                        - ``headline`` : ``Headline`` <br />
                      </span>
                      <p className="pl-6">
                        - ``id`` : ``ID`` <br />
                        - ``article`` : ``Article`` <br />
                        - ``summary`` : ``Summary`` <br />
                        - ``image`` : ``Image`` <br />
                        - ``article_html`` : ``Article Html`` <br />
                      </p>
                      <p className="mt-5 pl-6">Example :</p>
                      <img
                        src="/images/wax-action.png"
                        alt=""
                        className="w-[512px] h-auto mt-5 pl-6"
                      />
                    </div>
                  </div>

                  <div className="border rounded-xl border-white/10 ">

                    <pre className="px-5 py-4 overflow-x-auto text-xs font-semibold text-white/70 md:text-sm font-jakarta pl-10">
                      {code}
                    </pre>





                  </div>
                  <h2 className="text-base lg:text-[32px] text-white flex gap-2 font-bold font-jakarta leading-[20px] lg:leading-[100%]">
                    8. <span className="" /> Run test, check Wix account, then save & turn on Zap. You’re finished! 🎉

                  </h2>
                  <p className=" pl-6 text-base font-normal md:text-xl font-jakarta ">Example :</p>
                  <img
                    src="/images/wix-last-step.png"
                    alt=""
                    className="w-[512px] h-auto  pl-6"
                  />
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
        <iframe
          width={500}
          height={300}
          src="https://www.loom.com/embed/ea53704bf2fb4a9b88bcabacc5a211c2?sid=b5590f8d-0c1c-4b22-85f7-fc070909d368"
          className="object-cover w-full h-auto overflow-hidden rounded-20 aspect-video"
        >
          {" "}
        </iframe>
      </div>
    </div>
  );
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
