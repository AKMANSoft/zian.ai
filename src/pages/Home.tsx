import { PrimaryBtn, SecondaryBtn } from "../components/ui/buttons";
import { Seperator } from "../components/ui/seperator";
import { CalendarIcon, Edit3Icon, Trash2Icon } from "lucide-react";



export default function HomePage() {
    return (
        <div className="flex gap-[20px] h-[calc(100%_-_140px)]">
            <div className="w-2/5 h-full min-h-[500px] backdrop-blur-[10px] bg-gr-purple bg-opacity-90 opacity-90 border-2 border-primary rounded-[20px] relative">
                <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 bg-primary w-[80%] h-[8px] stick-shadow"></div>
                <div className="h-full px-[30px] py-[38px] flex flex-col justify-between">
                    <div className="">
                        <h5 className="text-xl text-white font-nebula font-normal text-shadow">
                            Today&apos;s Post
                        </h5>
                        <p className="mt-7 font-light text-base text-th-gray font-jakarta">
                            Lorem ipsum dolor sit amet, consect etur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia m, quis nostrud exercitation ullam co laboris nisi ut aliquip ex ea commodo consquat.
                        </p>
                        <img src="/images/today-post.png"
                            className="mt-6 rounded-20 overflow-hidden object-cover object-center w-full h-[300px]" />
                        <p className="my-3 text-xs text-white font-bold font-jakarta">
                            <span>Date: </span>
                            <span className="font-medium">April 2022, Sunday 2:00PM</span>
                        </p>
                        <Seperator />
                        <div className="mt-[14px] space-x-4">
                            <SecondaryBtn>
                                <CalendarIcon size={18} />
                                Reschedule
                            </SecondaryBtn>
                            <SecondaryBtn>
                                <Edit3Icon size={18} />
                                Edit
                            </SecondaryBtn>
                            <SecondaryBtn>
                                <Trash2Icon size={18} />
                                Delete
                            </SecondaryBtn>
                        </div>
                    </div>
                    {/* Buttons  */}
                    <div className="flex items-center gap-4">
                        <SecondaryBtn filled={false} className="border-white/10 py-3 w-1/2">
                            Regenerate Image
                        </SecondaryBtn>
                        <PrimaryBtn filled={false} className="py-3 w-1/2 h-full">
                            Send Now
                        </PrimaryBtn>
                    </div>
                </div>
            </div>
            <div className="w-3/5 h-full min-h-[500px] bg-gr-purple-light opacity-90 border-2 border-primary rounded-[20px]">

            </div>
        </div>
    );
}

