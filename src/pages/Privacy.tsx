import TermsPrivacyComponent from "@/components/TermsPrivacyComponent";





export default function PrivacyPage() {

    return (

        <div className="rounded-20 max-w-5xl  px-8 py-5 bg-gr-purple-dark text-white flex flex-col items-center justify-center mx-auto space-y-7">
            <div>
                <img src="/images/avatar.png" alt="" />
            </div>
            <div>
                <h1 className="text-3xl font-normal font-nebula">
                    Zian AI Terms of Service
                </h1>
            </div>
            <div className="space-y-[30px] overflow-y-auto">
                <TermsPrivacyComponent
                    heading="Introduction"
                    content={
                        <>
                            This is a contract between you (the User) and Envisionaires Media Pty Ltd., the provider of Zian AI, a sophisticated AI marketing tool. Please read these terms and conditions carefully before using the service.
                        </>
                    } />
                <TermsPrivacyComponent
                    heading="Acceptance of Terms"
                    content={
                        <>
                            By using Zian AI, you agree to be bound by these terms and conditions. If you disagree with these terms and conditions or any part of these terms and conditions, you must not use the service. By using this service you agree to be within a jurisdiction we support, you confirm that by using this you will not break any laws, and you agree that you are over 18 years old.
                        </>
                    } />
                <TermsPrivacyComponent
                    heading="Service Provision"
                    content={
                        <>
                            Zian AI is provided 'as is' and 'as available', without any representations or warranties, express or implied. We make no representations or warranties about the reliability, availability, timeliness, security, accuracy, sufficiency, suitability, fitness for a particular purpose, or completeness of Zian AI and expressly disclaim any warranties of merchantability or fitness for a particular purpose. Zian makes no claims or guarantees of any particular results, sales, or numbers that a User may or may not gain.
                        </>
                    } />
                <TermsPrivacyComponent
                    heading="Limitation of Liability"
                    content={
                        <>
                            In no event shall Zian AI, Envisionaires Media Pty Ltd., or its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
                        </>
                    } />
                <TermsPrivacyComponent
                    heading="Intellectual Property & Data Rights"
                    content={
                        <>
                            All intellectual property rights related to the software and the data generated or collected through the use of Zian AI are the exclusive property of Envisionaires Media Pty Ltd. You are granted a limited, non-exclusive, non-transferable, revocable license to use the service and any material created from the use of this service. This license does not include any rights to reproduce, duplicate, copy, sell, resell or exploit any portion of the service. If your subscription is terminated, you agree to immediately delete all data and content obtained from Zian AI. The User has rights to use the material created for that User, in any way they like, so long as they maintain an active paying subscription. Canceling a paying subscription will cancel rights to use that content and must be deleted from their website, social media and all hosted or public material immediately. Use of a free account grants access / rights to temporarily use only the material created in that free plan with limited quantity. User has no rights to use any Zian AI branded material. Zian AI retains the right to display, share or present any of the User’s or User’s brands or logos, for the purpose for any marketing material or marketing activities. Any and all lead or contact information, including names, emails, phone numbers, including customer and client contact details, created or passed through Zian AI will grant Envisionaires Media PTY LTD irrevocable rights to use those databases as they wish.
                        </>
                    } />
                <TermsPrivacyComponent
                    heading="Governing Law & Jurisdiction"
                    content={
                        <>
                            This agreement is governed by the laws of Victoria, Australia. You agree to submit to the exclusive jurisdiction of the courts of Victoria, Australia, to resolve any dispute arising out of your use of Zian AI or this agreement. Any dispute arising from this agreement will take place in the courts of Victoria, Australia.
                        </>
                    } />
                
            </div>
            <div>
                <h1 className="text-xl font-bold font-jkarta text-white">
                By using Zian AI, or creating or paying for an account, or accessing any of the webpages hosted on zian.ai, you acknowledge that you have read, understood, and agreed to be bound by these terms.
                </h1>
            </div>
        </div>

    );
}



















