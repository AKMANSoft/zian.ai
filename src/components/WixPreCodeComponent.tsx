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



`;

export default function WixPreCode() {
  return (
    <>
      <h2 className="text-base lg:text-[32px] text-white flex gap-2 font-bold font-jakarta leading-[20px] lg:leading-[126%]">
        7. <span className="" /> Paste the code below and configure to match the
        screenshot. Change the items:
      </h2>
      <div className="flex flex-col gap-2 md:gap-5 pl-7 md:pl-[47px]  ">
        <ol className="flex gap-2  text-sm font-normal md:text-xl font-jakarta">
          {" "}
          a. <span className="">``api_key``,</span>
        </ol>
        <ol className="flex gap-2  text-sm font-normal md:text-xl font-jakarta">
          {" "}
          b. <span className="">``site_id``, and</span>
        </ol>
        <ol className="flex gap-2  text-sm font-normal md:text-xl font-jakarta">
          {" "}
          c. <span className="">``account_id``</span>
        </ol>
      </div>
      <div className="border rounded-xl border-white/10 ">
        <pre className="px-5 py-4 overflow-x-auto text-xs font-semibold text-white/70 md:text-sm font-jakarta pl-10">
          {code}
        </pre>
      </div>
    </>
  );
}
