import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
import { cn } from "../lib/utils";
import { useState } from 'react';
import { Listbox } from '@headlessui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { PrimaryBtn } from "../components/ui/buttons";
import PostViewSection from "../components/postview-section";





export default function GenerateContentPage() {
    return (
        <MainLayout heading="Generate Content">
            <div className="pb-5 flex gap-[20px] h-full">
                <GrBorderBox className="w-4/5 p-[2px] rounded-20" type="lg">
                    <div className="h-full min-h-[500px] bg-gr-purple-light backdrop-blur-[10px] opacity-90 rounded-20 relative">
                        {/* Main Content  */}
                        <div className="p-5  pb-[30px] border-b-[5px] border-primary">
                            <SelectEl />
                        </div>
                        <div className="p-5 pt-8 space-y-4">
                            <InputEl label="Question 1" placeholder="Write your answer here" />
                            <InputEl label="Question 2" placeholder="Write your answer here" />
                            <InputEl label="Question 3" placeholder="Write your answer here" />
                            <InputEl label="Question 4" placeholder="Write your answer here" />
                        </div>
                        <div className="absolute bottom-7 right-6">
                            <PrimaryBtn className="px-10 h-12">
                                Generate
                            </PrimaryBtn>
                        </div>
                    </div>
                </GrBorderBox>
                <PostViewSection
                    className="w-1/4"
                    contentClassName="px-4 pt-10 pb-5"
                    customContent={<EmptyPostContent />}
                />
            </div>
        </MainLayout>
    );
}






function EmptyPostContent() {
    return (
        <div className="h-full flex flex-col">
            <h5 className="text-xl text-white font-nebula font-normal leading-8 text-shadow">
                Result
            </h5>
            <div className={cn(
                "rounded-20 w-full h-full bg-white/5 backdrop-blur-[10px]",
                "flex flex-col items-center justify-center px-8 text-center mt-3"
            )}>
                <img src="/images/file-round-with-boder.svg" width={70} height={70}
                    className="w-[70px] h-auto aspect-square"
                    alt="" />
                <h4 className="text-xl leading-7 font-semibold font-jakarta mt-[10px] text-white">
                    Your content will be shown here
                </h4>
                <p className="text-sm font-normal font-jakarta text-white/70 mt-2">
                    Sed consectetur imperdiet facilisis. Nulla maa.
                </p>
            </div>
        </div>
    );
}






const people = [
    { id: 1, name: 'Durward Reynolds', unavailable: false },
    { id: 2, name: 'Kenton Towne', unavailable: false },
    { id: 3, name: 'Therese Wunsch', unavailable: false },
    { id: 4, name: 'Benedict Kessler', unavailable: false },
    { id: 5, name: 'Katelyn Rohan', unavailable: false },
]

function SelectEl() {
    const [selectedPerson, setSelectedPerson] = useState(people[0])

    return (
        <Listbox value={selectedPerson} onChange={setSelectedPerson}>
            <Listbox.Label className={cn(
                "text-base leading-7 font-semibold font-jakarta text-white"
            )}>
                Select Topic
            </Listbox.Label>
            <Listbox.Button
                className={cn(
                    "text-white/70 text-start font-jakarta font-semibold text-sm leading-6 py-4 px-5",
                    "border border-white/10 bg-input rounded-10 w-full",
                    "inline-flex items-center justify-between gap-3 mt-2",
                    "data-[headlessui-state=open]:bg-th-gray/10"
                )}>
                {selectedPerson.name}
                <FontAwesomeIcon icon={faChevronDown} />
            </Listbox.Button>
            <div className="relative w-full">
                <Listbox.Options className={"absolute top-0 left-0 w-full mt-2 bg-gr-purple backdrop-blur-[10px] rounded-10 overflow-hidden outline-none"}>
                    {people.map((person) => (
                        <Listbox.Option
                            key={person.id}
                            value={person}
                            disabled={person.unavailable}
                            className={cn(
                                "text-white/70 text-start font-jakarta font-medium text-sm leading-6 py-4 px-5",
                                "border-b last:border-none border-white/10 w-full",
                                "data-[headlessui-state=active]:bg-white/20 data-[headlessui-state=disabled]:bg-white/5",
                                selectedPerson.id === person.id ? "bg-white/20" : "bg-transparent hover:bg-white/20"
                            )}
                        >
                            {person.name}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    )
}



type InputElProps = {
    label: string;
    placeholder?: string;
}

function InputEl({ label, placeholder = "" }: InputElProps) {

    return (
        <div className="w-full">
            <label htmlFor={label.replace(" ", "_")} className={cn(
                "text-base leading-7 font-semibold font-jakarta text-white"
            )}>
                {label}
            </label>
            <input type="text" id={label.replace(" ", "_")} placeholder={placeholder}
                className={cn(
                    "text-white text-start font-jakarta font-semibold text-sm leading-6 py-4 px-5",
                    "border border-white/10 bg-input rounded-10 w-full bg-transparent mt-2",
                    "focus:bg-th-gray/10 outline-none transition-all placeholder:text-white/70"
                )} />
        </div>
    )
}