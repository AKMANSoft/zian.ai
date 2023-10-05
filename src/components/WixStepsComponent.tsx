import WixPreCode from "./WixPreCodeComponent";

export default function WixSteps() {
  return (
    <>
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
            Navigate to Zapier {">"} Create Zap   (you should watch the video
            above)
          </li>
          <li>
            Select: Run Python Code as the trigger {">"}Paste the below code and
            edit:
            <br />
            <span className="lg:pl-3">
              a. Replace the api_token = with your Zian API token. Between then
              ‘ ‘
            </span>
            <br />
            <span className="lg:pl-3">
              b. Create a uuid (using the free link above) and replace the uuid
              = in the code snippet between then ‘ ‘
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
            url = 'https://seo.zian.ai/api?limit=399&offset=0&image_url=1'
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
            Save step in Zapier, run test. If it produces an error, just run the
            test again and again.
          </span>
        </h2>
        <img
          src="/images/python-wix.png"
          alt=""
          className="md:w-[634px] w-full h-auto"
        />
        <div className="">
          <h2 className="text-base mb-2 lg:mb-4 lg:text-[32px] text-white font-bold font-jakarta  leading-[20px] lg:leading-[100%] flex gap-[6px]">
            4. <span className="" /> Navigate to Wix to get your API Key and
            account id:
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
              b. <span className="">- Click ``Generate API Key``</span>
            </ol>
            <ol className="flex gap-2  text-sm font-normal md:text-xl font-jakarta">
              {" "}
              c. <span className="">- Click ``All site permissions``</span>
            </ol>
            <ol className="flex gap-2  text-sm font-normal md:text-xl font-jakarta">
              {" "}
              d.{" "}
              <span className="">
                - Select permissions: ``Wix Blog`` and ``Manage Site Media``{" "}
                {"( "}or you can select “all”
              </span>
            </ol>
            <ol className="flex gap-2  text-sm font-normal md:text-xl font-jakarta">
              {" "}
              e. <span className="">- Click ``Generate Key``</span>
            </ol>
            <ol className="flex gap-2  text-sm font-normal md:text-xl font-jakarta">
              {" "}
              f. <span className="">- Copy the key to safe somewhere</span>
            </ol>
          </div>
        </div>
        <h2 className="text-base lg:text-[32px] text-white flex gap-1 md:gap-2 font-bold font-jakarta leading-[20px] lg:leading-[100%]">
          5. <span className="" /> Get your site_id:
        </h2>
        <div className="flex flex-col gap-5 pl-6 md:pl-[47px]  md:mt-4">
          <ol className="flex flex-wrap gap-2   text-base font-normal md:text-xl font-jakarta">
            {" "}
            a. Go to{" "}
            <span className="">
              <a
                href="https://manage.wix.com/account/sites?referralAdditionalInfo=Route"
                className="underline ps-1"
              >
                https://manage.wix.com/account/sites?referralAdditionalInfo=Route
              </a>
              , then hover the blog site, and select ``Select & Edit Site``,
            </span>
          </ol>
          <ol className="flex gap-2  text-base font-normal md:text-xl font-jakarta">
            {" "}
            b.{" "}
            <span className="">
              click it, then go to the site, and copy the ``site_id`` from the
              url {"("} the code between the brackets:
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
            Set the second step in Zapier. Code by Zapier {">"} Python {" > "}{" "}
            Add input data
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
            <span className="pl-[6px] md:pl-0">
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

        <WixPreCode />
        <h2 className="text-base lg:text-[32px] text-white flex gap-2 font-bold font-jakarta leading-[20px] lg:leading-[100%]">
          8. <span className="" /> Run test, check Wix account, then save & turn
          on Zap. You’re finished! 🎉
        </h2>
        <p className=" pl-6 md:pl-12 text-base font-normal md:text-xl font-jakarta ">
          Example :
        </p>
        <img
          src="/images/wix-last-step.png"
          alt=""
          className="w-[512px] h-auto  pl-6 md:pl-12"
        />
      </div>
    </>
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
