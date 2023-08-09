import { Fragment, ReactNode, useState } from "react"
import { PrimaryBtnNeon, SecondaryBtn } from "../ui/buttons"
import { Dialog, Transition } from "@headlessui/react"
import { b64Image, cn } from "@/lib/utils"
import { TriggerFunProps } from "../WarningPopup"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Article } from "@/types/response.types"
import { AnchorNeon } from "../ui/anchor-link"
import { useToast } from "../ui/use-toast"




type Props = {
    article: Article,
    trigger?: ({ close, open }: TriggerFunProps) => ReactNode;
}


export default function ArticleViewPopup({ trigger, article }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast()

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const copyTitle = async () => {
        await navigator.clipboard.writeText(article.headline);
        toast({
            title: "Article title copied to clipboard.",
            variant: "default",
            duration: 1500
        })
    }
    const copyArticleBody = async () => {
        await navigator.clipboard.writeText(article.headline);
        toast({
            title: "Article copied to clipboard.",
            variant: "default",
            duration: 1500,
        })
    }

    return (
        <>
            {
                trigger ?
                    trigger?.({
                        open: openModal,
                        close: closeModal
                    })
                    :
                    <SecondaryBtn onClick={openModal} className="p-3">
                        Article View Popup
                    </SecondaryBtn>
            }

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur" />
                    </Transition.Child>

                    <div className="fixed inset-0">
                        <div className="flex min-h-full items-center justify-center md:p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className={cn(
                                    "w-full max-w-[805px] transform flex flex-col bg-gr-purple-light shadow-xl transition-all",
                                    "relative overflow-hidden pb-5 max-h-screen md:max-h-[95vh] md:rounded-20"
                                )}>
                                    <div className="w-full flex flex-row gap-5 items-start justify-between sticky top-0 p-4 md:p-8 pb-0">
                                        <div className="w-full mt-8 md:mt-0 md:max-w-[90%]">
                                            <h1 className="text-2xl font-bold font-jakarta">
                                                {article.headline}
                                            </h1>
                                            <div className="flex flex-wrap items-center mt-5 gap-2">
                                                <PrimaryBtnNeon onClick={copyTitle} className="text-sm">
                                                    Copy Title
                                                </PrimaryBtnNeon>
                                                <PrimaryBtnNeon onClick={copyArticleBody} className="text-sm">
                                                    Copy Article
                                                </PrimaryBtnNeon>
                                                <AnchorNeon href={b64Image(article.image)} download={article.headline} className="text-sm">
                                                    Download Image
                                                </AnchorNeon>
                                            </div>
                                        </div>
                                        <button type="button" onClick={closeModal}
                                            className={cn(
                                                "text-white block text-3xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer",
                                                "absolute top-4 md:top-8 right-4 md:right-5"
                                            )}>
                                            <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                    </div>

                                    <div className="max-h-full mt-5 overflow-y-auto flex flex-col md:p-8">
                                        <div className="min-h-[430px] md:min-h-[330px] rounded-10 border py-2 md:py-4 border-white/20 overflow-hidden">
                                            <div className="max-h-[430px] md:max-h-[330px] px-2 md:px-5 overflow-y-auto">
                                                <p className="text-sm font-light font-jakarta text-body">
                                                    {article.body}
                                                    {/* The Digital Summit Minneapolis is set to be a marketing extravaganza, taking place over two days on August 16-17, 2023, at the renowned Minneapolis Convention Center. This prominent marketing conference is expected to feature more than 35 sessions, each led by a distinguished expert from the industry. The conference will delve into a wide array of topics including SEO, social media marketing, content marketing, email marketing, and more. <br /><br />The Summit is not just about learning; it also provides ample opportunities for networking, interactive workshops, and engaging social events. The primary goal of Digital Summit Minneapolis is to equip marketers with the latest skills, keep them abreast of current trends, and provide a platform for networking with other industry professionals. <br /><br />The conference is meticulously designed to cater to marketers across the spectrum, from those who are just starting out in their careers to seasoned professionals seeking to refine their skills. The benefits of attending this summit are manifold. <br /><br />For those keen on enhancing their marketing prowess and staying ahead of the game, Digital Summit Minneapolis is an event not to be missed. Registrations are now open - just click on the red button to secure your spot at this dynamic event. <br /><br />The Summit provides a unique opportunity to hone your marketing skills through a variety of workshops and sessions. These are designed to provide practical, tactical, and strategic insights from some of the country's top marketing talent. A total of forty-three visionaries from the beauty industry will be sharing their expertise on the latest trends and groundbreaking innovations that are set to take the online and in-store experience by storm. <br /><br />The event will showcase the latest developments in digital and tech, social media, influencer marketing, and retailer insights – all aimed at keeping attendees irresistibly on trend. Digital Summit Minneapolis brings together senior leaders from some of the world's most influential brands to shape service & experience as disciplines across various industry lines.<br /><br />Equip yourself with the knowledge, metrics, and strategies you need to rally your organization around Customer Experience (CX) and deliver a unified, frictionless experience. This essential information will arm you with the tools necessary to drive sales and improve your overall marketing strategy.<br /><br />This weekly listing of small business events, contests, and awards is brought to you as a community service by Small Business Trends. Visit the Small Business Events Calendar to see a full list of events, contest and award listings or to post your own events.<br /><br />Whether you're looking for a software solution to enhance your marketing efforts or seeking to improve your SEO strategies, Digital Summit Minneapolis is the place to be. With its blend of knowledge sharing, networking opportunities, and practical workshops, this conference is set to be a game-changer for marketers in 2023. Don't miss out on this opportunity to learn from the best in the business and take your marketing skills to new heights. */}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-5 h-full">
                                            <img src={b64Image(article.image)} width={800} height={400} alt=""
                                                className="w-full h-auto object-fill" />
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}


