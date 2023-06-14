import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { SmallSchedulePostEl } from "../postview-section"
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { PrimaryBtn, SecondaryBtn } from "../ui/buttons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"



export default function AddDraftPopup() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Hell</Button>
            </DialogTrigger>
            <DialogContent className={cn(
                "w-full max-w-xl md:max-h-[90vh] h-full transform overflow-hidden rounded-20 bg-gr-purple-dark shadow-xl transition-all p-0 border-none",
                "relative"
            )}>
                <DialogHeader className="p-5 text-white">
                    <DialogTitle>
                        Add New Draft
                    </DialogTitle>
                </DialogHeader>
                <div className="p-8 py-16 max-h-full overflow-y-auto">
                    <div className="h-full flex flex-col justify-between gap-6">
                        <div className="">
                            {/* {heading} */}
                            <div className="flex items-center gap-3">
                                <SmallSchedulePostEl text="@moonlanding.media" icon={faTwitter} />
                                <SmallSchedulePostEl text="@moonlanding.media" icon={faFacebook} />
                            </div>
                            <p className="mt-4 font-light text-sm text-th-gray font-jakarta">
                                Lorem ipsum dolor sit amet, consect etur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia m, quis nostrud exercitation ullam co laboris nisi ut aliquip ex ea commodo consquat.
                            </p>
                            <img src="/images/today-post.png" loading="lazy"
                                className="mt-6 rounded-20 overflow-hidden object-cover object-center aspect-video w-full lg:h-[490px]" />

                        </div>
                        {/* Buttons  */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <SecondaryBtn className="px-2 xs:px-4">
                                    <FontAwesomeIcon icon={faEdit} />
                                    Edit
                                </SecondaryBtn>
                                <SecondaryBtn className="px-2 xs:px-4">
                                    <FontAwesomeIcon icon={faTrash} />
                                    Delete
                                </SecondaryBtn>
                            </div>
                            <div className="flex items-center gap-4">
                                <SecondaryBtn filled={false} className="border-white/10 py-3">
                                    Regenerate Image
                                </SecondaryBtn>
                                <PrimaryBtn className="py-3 h-full">
                                    Send Now
                                </PrimaryBtn>
                            </div>
                        </div>

                    </div>
                </div>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

