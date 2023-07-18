import TermsPrivacyComponent from "@/components/TermsPrivacyComponent";
import GrBorderBox from "@/components/ui/gr-border-box";





export default function TermsPage() {

    return (
        <div className="h-screen py-10 overflow-y-auto">
            <GrBorderBox className="max-w-5xl mx-auto">
                <div className="flex flex-col rounded-20 items-center bg-gr-purple-dark text-white space-y-7 py-5 pb-16 px-8">
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
                        <TermsPrivacyComponent
                            heading="Prohibited Conduct"
                            content={
                                <>
                                    You agree not to attempt to copy, modify, duplicate, create derivative works from, frame, mirror, republish, download, display, transmit, distribute, reverse compile, disassemble, reverse engineer, or sell, license or sublicense any part of our service. Any use of the service not expressly permitted by this agreement is a breach of this agreement and may violate copyright, trademark, and other laws.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="Non-Compete"
                            content={
                                <>
                                    You agree not to engage in any enterprise that directly competes with Zian AI, in the form of selling AI-generated marketing, social media, blog, news or SEO content for businesses. This includes not being a shareholder of more than 20% in, creating, or selling a similar service or tool that uses artificial intelligence, large language models, or image generation models for SEO, blog or article creation, or AI social media generative tools for a period of three years from the last date of using Zian AI, in the countries of USA, United Kingdom, China, Australia, Canada, New Zealand, and UAE. Affiliates or white-label distributors of Zian AI, selling a form of Zian AI, are excluded from this non-compete and are free to sell their own solution as long as that solution is financially compensating Zian AI in an agreed manner.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="Subscription and Cancellation"
                            content={
                                <>
                                    You can cancel your account at any time with 14 days' notice. You understand that if you cancel before the end of your billing cycle, you will not be refunded for any billing charges incurred for that cycle. You will be responsible for the full 14 days payments until the account is canceled. Cancellation notice must be delivered in Writing to hello@zian.ai or canceled within the platform itself (where available). Canceling your subscription may result in termination of your account subject to the “Termination Rights” section.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="Refunds"
                            content={
                                <>
                                    All payments are non-refundable and there are no refunds or credits for partially used periods. Following any cancellation, however, you will continue to have access to the service through the end of your current billing period. For the avoidance of doubt, this includes but is not limited to, no refunds for service interruptions, failing to connect to or use the system, creating duplicate accounts, disputes against quality or topics of created material, or any other reason that may be argued as a case for a refund.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="Changes to Terms"
                            content={
                                <>
                                    Zian AI reserves the right to modify these terms at any time. Users may not always be notified of any changes, and it is the User’s responsibility to stay up to date with the current Terms of Service as listed on this website. Continued use of the service after either notification of change via email or SMS, or 7 days after publishing an update without a notification, constitutes the user's acceptance of the updated terms.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="Termination Rights"
                            content={
                                <>
                                    Zian AI may terminate this agreement and the user's access to the service at any time, for any reason, and without notice. In the event of termination, the user agrees to immediately cease all use of the service. Upon termination, Zian AI reserves the right to delete all user data, assets, and remove all associated materials from the User’s site(s) or social media channels that were created as part of this service at any time, including but not limited to images, blogs, posts, articles, headlines, SEO optimisation. This may include specific assets such as but not limited to social media posts, blog and article posts that can not or refuse to be deleted, being submitted to Google, Facebook, Twitter, or the respective party, to be de-indexed from their SEO searches, rankings, feeds, platforms, and filing a case of contract-breach, IP breach and/or copyright breach to have the material forcibly removed or profile / website blacklisted. The User waives all rights to contest this decision or seek damages from such actions.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="Failed Payments"
                            content={
                                <>
                                    Zian AI may allow up to or beyond 1 week for the User to rectify any payment issues, at Zian AI’s sole discretion. During this time and while the account is still active, the User is still responsible for all ongoing payments accrued from having an active account, even in the account is locked or unable to be access by the user temporarily due to failed payment. Failure to receive payments may result in debt collection services being initiated (see section “Debt Collection”). Ongoing payment failures may results in termination of the account, including all conditions under section “Termination Rights” above.
                                </>
                            } />

                        <TermsPrivacyComponent
                            heading="Data Usage and IP"
                            content={
                                <>
                                    By using Zian AI, the user grants us an irrevocable, non-exclusive, royalty-free, worldwide license to use, copy, store, transmit, modify, create derivative works of any data, content, or information provided by the user or gathered in the course of using the service. This includes, but is not limited to, the development, refinement, and improvement of our artificial intelligence technologies, and for other commercial purposes including the sale of products or services. The user acknowledges and agrees that this license extends to our affiliates, partners, and third-party service providers, as well as any successors or assignees of the foregoing.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="User Brand Representation and Intellectual Property"
                            content={
                                <>
                                    By using Zian AI, the user grants us an irrevocable, non-exclusive, royalty-free, worldwide license to represent the user's brand and to use any copyrighted material, trademarks, logos, colors, names, or other brand identifiers for the purpose of marketing, promotion, or other related services offered by Zian AI. The user affirms they have the necessary rights or permissions to grant this license, and that by doing so, they are not infringing on any third-party rights. The user acknowledges and agrees that this license extends to our affiliates, partners, and third-party service providers, as well as any successors or assignees of the foregoing.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="Debt Collection"
                            content={
                                <>
                                    The user agrees to pay all amounts due on their account when due. If the user does not make payment on time, in addition to any other rights or remedies we may have, we reserve the right to employ third-party debt collection services to assist in the recovery of these funds. The user agrees to reimburse us for all costs and expenses, including legal fees and costs of any collection agency, which may be based on a percentage of the debt up to a maximum of 50%, that we incur in efforts to collect any unpaid balances from you. Further, the user will be subject to a 2% compounded monthly interest rate on all debts owed until the debt is fully paid.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="Publicity"
                            content={
                                <>
                                    The user agrees to not publish, post, or distribute any negative media, comments, news, or content regarding Zian AI, Envisionaires Media Pty Ltd., its platform, team, company, directors, staff, or its operations. Any material that, in our sole discretion, may be damaging to our reputation, goodwill, sales, or business relations is strictly prohibited. In the event of a breach of this clause, the user agrees to be held responsible for any damages, losses, or costs, including but not limited to legal fees, incurred by Zian AI or Envisionaires Media Pty Ltd., and may be subjected to further legal action.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="Non-solicitation"
                            content={
                                <>
                                    The user agrees that during the term of this agreement and for a period of one year after the termination or expiration of this agreement, they will not directly or indirectly, solicit or attempt to solicit any employee, independent contractor, affiliate, contributor, developer or consultant of Zian AI or Envisionaires Media Pty Ltd. to terminate their relationship with us in order to become an employee, consultant, or contractor to or for any other person or entity, or to participate in any deal or sale that may result in profits generated for any other party other than Zian AI and approved affiliates.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="Privacy"
                            content={
                                <>
                                    The privacy of our users is important to us. Zian AI collects, stores, maintains, and shares information about its users in accordance with its Privacy Policy, which is incorporated by reference into this Agreement.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="Force Majeure"
                            content={
                                <>
                                    Neither party will be liable for any failure or delay in performance under this Agreement due to circumstances beyond its reasonable control including, without limitation, acts of nature, acts of government, flood, fire, earthquakes, civil unrest, acts of terror, strikes or other labor problems, internet service provider failures or delays, or the unavailability or Modification by third parties of third-party websites.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="Severability"
                            content={
                                <>
                                    If any provision in this Agreement is found to be unenforceable, then (except as expressly provided otherwise in this Agreement) that provision will not affect the enforceability of the remaining provisions of the Agreement, which will remain in full force and effect.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="Waiver"
                            content={
                                <>
                                    The failure of Zian AI to exercise or enforce any right or provision of this Agreement will not constitute a waiver of such right or provision. Any waiver of any provision of this Agreement will be effective only if in writing and signed by Zian AI.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="Dispute Resolution"
                            content={
                                <>
                                    In the event of a dispute arising out of or relating to this Agreement, the parties agree to attempt to resolve any dispute by negotiation between the parties. If they are unable to resolve the dispute, either party may commence mediation or binding arbitration through an Australian Government Body or other third party; approved by Envisionaires Media Pty Ltd.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="Confidentiality"
                            content={
                                <>
                                    You acknowledge that, in the course of your relationship with Zian AI and in using the Services, you have had access to and have been entrusted with confidential information concerning Zian AI and its business. You undertake to keep secret and not directly or indirectly disclose or use or permit others to use any such confidential information, except as may be necessary in the ordinary course of performing your duties under this Agreement.
                                </>
                            } />
                        <TermsPrivacyComponent
                            heading="Entire Agreement"
                            content={
                                <>
                                    This Agreement constitutes the entire agreement between the parties, and supersedes all prior written or oral agreements or communications with respect to the subject matter herein. Zian AI in its sole discretion may amend this Agreement, and your use of the Service after such amendment is posted on our website will constitute acceptance of it by you.
                                </>
                            } />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold font-jkarta text-white">
                            By using Zian AI, or creating or paying for an account, or accessing any of the webpages hosted on zian.ai, you acknowledge that you have read, understood, and agreed to be bound by these terms.
                        </h1>
                    </div>
                </div>
            </GrBorderBox>
        </div>

    );
}


















