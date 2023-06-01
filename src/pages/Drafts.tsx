import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
import { faChevronLeft, faChevronRight, faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { cn } from "../lib/utils";
import { PrimaryBtn, SecondaryBtn } from "../components/ui/buttons";



const filters = [
    "Announcements",
    "Giveaways",
    "Engagement Questions",
    "Engagement Questions",
    "Promotions",
]


export default function DraftsPage() {
    return (
        <MainLayout heading="Drafts">
            <div className="pb-5 flex">
                <GrBorderBox className="p-[2px] rounded-20" type="lg">
                    <div className="p-5 min-h-full backdrop-blur-[10px] bg-gr-purple-light opacity-90 rounded-20">
                        {/* Tabs List View  */}
                        <div className="relative h-[50px] flex justify-center gap-3">
                            <button className="absolute top-0 left-0 h-full aspect-square rounded-10 bg-white/10 text-white shadow-primary-tabs">
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>

                            <div className="flex mx-16 max-w-[calc(100vw_-_540px)] h-full gap-3 no-scrollbar overflow-x-auto">
                                {
                                    [...filters, ...filters].map((filter, index) => (
                                        <TabItem key={filter} text={filter} active={index === 0} />
                                    ))
                                }
                            </div>

                            <button className="absolute top-0 right-0 h-full aspect-square rounded-10 bg-white/10 text-white shadow-primary-tabs">
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>
                        {/* Drafts Table  */}
                        <div className="mt-7 bg-gr-purple-light rounded-10 max-h-[700px] overflow-y-auto max-w-[100%] overflow-x-auto">
                            <table className="text-white font-jakarta table-auto w-full">
                                <thead className="border-b-[5px] border-primary">
                                    <tr>
                                        <th className="py-5 text-start pl-7 w-24">#</th>
                                        <th className="py-5 text-start w-32 px-5">Photo</th>
                                        <th className="py-5 text-start px-5 max-w-[200px]">Content</th>
                                        <th className="py-5 text-start w-44 px-5">Status</th>
                                        <th className="py-5 text-start w-48 px-5">Username</th>
                                        <th className="py-5 text-start px-5">Created Date</th>
                                        <th className="py-5 text-start px-12">Actions</th>
                                        <th className="py-5 text-start pr-7">Photo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <SingleTableRow />
                                    <SingleTableRow />
                                    <SingleTableRow />
                                    <SingleTableRow />
                                    <SingleTableRow />
                                    <SingleTableRow />
                                    <SingleTableRow />
                                    <SingleTableRow />
                                    <SingleTableRow />
                                    <SingleTableRow />
                                    <SingleTableRow />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </GrBorderBox>
            </div>
        </MainLayout>
    );
}



function SingleTableRow() {
    return (
        <tr>
            <td className="py-5 pl-7">01</td>
            <td className="py-5 px-5">
                <img src="/images/table-img.png" width={80} height={80} alt="" />
            </td>
            <td className="py-5 px-5">
                <p className="line-clamp-4 max-w-[200px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur aliquid doloribus mollitia magni fugiat quisquam rerum a alias aspernatur, dolorem in neque dolore sed quis hic nulla animi minima debitis.
                </p>
            </td>
            <td className="py-5 px-5">
                Scheduled
            </td>
            <td className="py-5 px-5">
                moonlanding.media
            </td>
            <td className="py-5 px-5">
                April 2022,  Sunday   2:00PM
            </td>
            <td className="py-5 px-12">
                <div className="inline-flex items-center gap-2">
                    <SecondaryBtn className="p-3">
                        <FontAwesomeIcon icon={faEye} />
                    </SecondaryBtn>
                    <SecondaryBtn className="p-3">
                        <FontAwesomeIcon icon={faEdit} />
                    </SecondaryBtn>
                    <SecondaryBtn className="p-3">
                        <FontAwesomeIcon icon={faTrash} />
                    </SecondaryBtn>
                </div>
            </td>
            <td className="py-5 pr-7">
                <PrimaryBtn className="py-3 px-5 h-12">
                    Regenerate
                </PrimaryBtn>
            </td>
        </tr>
    );
}



type TabItemProps = {
    text: string;
    className?: string;
    active?: boolean;
}

function TabItem({ text, className, active = false }: TabItemProps) {
    return (
        <button className={cn(
            "min-w-max h-full px-6 rounded-10 text-white shadow-primary-tabs",
            active ? "bg-primary" : "bg-white/10",
            className
        )}>
            {text}
        </button>
    );
}

