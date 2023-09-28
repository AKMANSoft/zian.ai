import { Fragment, useState } from "react"
import { PrimaryBtn, SecondaryBtn } from "../ui/buttons"
import { Dialog, Transition } from "@headlessui/react"
import { cn } from "@/lib/utils"
import { Input, TagsInputEl } from "../ui/input"
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavigationItem } from "../sidebar"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import GrBorderBox from "../ui/gr-border-box"
import { useSwrFetcher } from "@/lib/useSwrFetcher"
import { TIndustry } from "@/types/response.types"
import apiConfig from "@/config/api.config"
import api from "@/api"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { CustomizeSchema, customizeSchema } from "@/types/forms.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormSelect } from "../ui/select"
import { Spinner } from "../ui/spinner"
import { useToast } from "../ui/use-toast"
import useAuthUserStore from "@/lib/zustand/authUserStore"
import { Customtip } from "../customtip"






export default function CustomizePopup() {

    const { authUser, setProfile } = useAuthUserStore()
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast()
    const form = useForm<CustomizeSchema>({
        resolver: zodResolver(customizeSchema),
        mode: "all",
        defaultValues: {
            filter_brand: authUser?.profile?.data?.filter_brand ?? true,
            filter_negativity: authUser?.profile?.data?.filter_negativity ?? true,
            filter_advertisement: authUser?.profile?.data?.filter_advertisement ?? false,
            industry: authUser?.profile?.data?.industry?.id?.toString(),
            otherIndustry: (authUser?.profile?.data?.industry?.industry?.toLowerCase()?.includes("other") ? authUser?.profile?.data?.industry?.name : ""),
            keywords: authUser?.profile?.data?.keyword?.split(",") ?? [],
        }
    })
    const { data: industryList } = useSwrFetcher<Array<TIndustry>>(apiConfig.endpoints.industryList, api.other.industryListFetcher)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }


    const [industryOthers, setIndustryOthers] = useState(authUser?.profile?.data?.industry?.industry?.toLowerCase()?.includes("other") ?? false)
    const checkIndustryOthers = () => {
        const industryId = form.getValues('industry')?.toLowerCase()
        if (!industryId) return false;
        const industry = industryList?.find((ind) => ind.id === Number(industryId));
        if (!industry) return false;
        console.log(industry)
        setIndustryOthers(industry.name.toLowerCase() === "other")
    }
    const handleFormSubmit = async (values: CustomizeSchema) => {
        if (!authUser?.profile) return;
        const res = await api.user.updateKeyword({
            ...values,
            website: ""
        }, industryOthers)
        if (res.success && res.data) {
            setProfile({
                ...authUser.profile,
                authorization: authUser.profile.authorization,
                email: authUser.profile.email,
                data: {
                    ...res.data,
                    filter_brand: values.filter_brand,
                    filter_negativity: values.filter_negativity,
                    filter_advertisement: values.filter_advertisement,
                }
            })
        }
        toast({
            title: res.success ? "Information updated successfully." : "An error occured while processing your request.",
            variant: res.success ? "default" : "destructive"
        })
    }

    const [isNegativityChecked, setIsNegativityChecked] = useState(true);
    const [isAdvertisementChecked, setIsAdvertisementChecked] = useState(false);
    const [isBrandChecked, setIsBrandChecked] = useState(true);

    const handleNegativityToggle = () => {
        setIsNegativityChecked(!isNegativityChecked);
    };

    const handleAdvertisementToggle = () => {
        setIsAdvertisementChecked(!isAdvertisementChecked);
    };

    const handleBrandToggle = () => {
        setIsBrandChecked(!isBrandChecked);   
    };
    


    return (
        <>
            <NavigationItem
                onClick={openModal} active={isOpen}
                className="my-0.5"
                text="Customize"
                icon={<FontAwesomeIcon icon={faPen} />} />

            <Transition appear show={isOpen} static as={Fragment}>
                <Dialog as="div" onClose={() => setIsOpen(true)} static className="relative z-50">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur " />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4">
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
                                    "w-full max-w-[805px] transform overflow-hidden rounded-20  bg-gr-purple-dark shadow-xl transition-all",
                                    "relative"
                                )}>
                                    <Form {...form}>
                                        <form method="POST" onSubmit={form.handleSubmit(handleFormSubmit)}>
                                            <div className="flex flex-row items-center justify-between w-full px-5 mt-5 ">
                                                <div></div>
                                                <button type="button" onClick={closeModal}
                                                    className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer">
                                                    <FontAwesomeIcon icon={faXmark} />
                                                </button>
                                            </div>
                                            <div className="max-h-[calc(100vh_-_200px)] overflow-y-auto flex flex-col space-y-32">
                                                {/* content */}
                                                <div className="pb-4 space-y-5 px-7  md:space-y-7">
                                                    <div className="font-jakarta text-white text-[32px] font-bold">
                                                        Customize
                                                    </div>
                                                    <FormField
                                                        control={form.control}
                                                        name="industry"
                                                        render={({ field, fieldState }) => (
                                                            <FormItem>
                                                                <FormLabel>Industry</FormLabel>
                                                                <FormControl>
                                                                    <FormSelect
                                                                        onValueChange={(value) => {
                                                                            field.onChange(value);
                                                                            form.setValue("otherIndustry", "")
                                                                            checkIndustryOthers()
                                                                        }}
                                                                        {...field}
                                                                        placeholder="Select Industry"
                                                                        className="w-full"
                                                                        options={
                                                                            industryList?.map((industry) => ({
                                                                                label: industry.name,
                                                                                value: industry.id.toString(),
                                                                            }))}
                                                                    />

                                                                </FormControl>
                                                                {fieldState.error?.message && (
                                                                    <FormMessage>{fieldState.error.message}</FormMessage>
                                                                )}
                                                            </FormItem>
                                                        )}

                                                    />
                                                    {
                                                        industryOthers && (

                                                            <FormField
                                                                control={form.control}
                                                                name="otherIndustry"
                                                                render={({ field, fieldState }) => (
                                                                    <FormItem>
                                                                        <FormLabel></FormLabel>
                                                                        <FormControl>
                                                                            <Input {...field} />
                                                                        </FormControl>
                                                                        {
                                                                            fieldState.error &&
                                                                            <FormMessage />
                                                                        }
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        )
                                                    }
                                                    <FormField
                                                        control={form.control}
                                                        name="keywords"
                                                        render={({ field, fieldState }) => (
                                                            <FormItem>
                                                                <FormLabel>Keywords</FormLabel>
                                                                <FormControl>
                                                                    <TagsInputEl
                                                                        placeholder="Add keyword"
                                                                        max={5}
                                                                        {...field} />
                                                                </FormControl>
                                                                {
                                                                    fieldState.error?.message &&
                                                                    <FormMessage>
                                                                        {fieldState.error.message}
                                                                    </FormMessage>
                                                                }
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="filter_negativity"
                                                        render={({ field, fieldState }) => (
                                                            <FormItem>
                                                                <div className="flex items-center gap-4">
                                                                    <Switch
                                                                        id="customize-filter-negativity"
                                                                        ref={field.ref}
                                                                        name="customize-filter-negativity"
                                                                        onCheckedChange={handleNegativityToggle}
                                                                        checked={isNegativityChecked}
                                                                    />
                                                                    <Label htmlFor="customize-filter-negativity" className="text-sm font-bold text-white font-jakarta">
                                                                        Filter out negative or criminal topics or news  - <span className="font-normal text-white/70">
                                                                            {isNegativityChecked ? 'Yes' : 'No'}
                                                                        </span>
                                                                    </Label>
                                                                </div>
                                                                {
                                                                    fieldState.error?.message &&
                                                                    <FormMessage>
                                                                        {fieldState.error.message}
                                                                    </FormMessage>
                                                                }
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="filter_advertisement"
                                                        render={({ field, fieldState }) => (
                                                            <FormItem>
                                                                <div className="flex items-center gap-4">
                                                                    <Switch
                                                                        id="customize-filter-advertisement"
                                                                        ref={field.ref}
                                                                        name="customize-filter-advertisement"
                                                                        onCheckedChange={handleAdvertisementToggle}
                                                                        checked={isAdvertisementChecked}
                                                                        
                                                                    /> 
                                                                                                                                    
                                                                    <Label htmlFor="customize-filter-advertisement" className="text-sm font-bold text-white font-jakarta">
                                                                        Filter out promotions or sales from 3rd parties or other businesses  - <span className="font-normal text-white/70">
                                                                            {isAdvertisementChecked ? 'Yes' : 'No'}
                                                                            
                                                                        </span>
                                                                    </Label>
                                                                </div>
                                                                {
                                                                    fieldState.error?.message &&
                                                                    <FormMessage>
                                                                        {fieldState.error.message}
                                                                    </FormMessage>
                                                                }
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="filter_brand"
                                                        render={({ field, fieldState }) => (
                                                            <FormItem>
                                                                <div className="flex items-center gap-4">
                                                                    <Switch
                                                                        id="customize-filter-brand"
                                                                        ref={field.ref}
                                                                        name="customize-filter-brand"
                                                                        onCheckedChange={handleBrandToggle}
                                                                        checked={isBrandChecked}
                                                                    />
                                                                    <Label htmlFor="customize-filter-brand" className="text-sm font-bold text-white font-jakarta">
                                                                        Filter out all topics about 3rd parties, specific places or specific people (not often recommend)-
                                                                        <span className="font-normal text-white/70">
                                                                            {isBrandChecked ? 'Yes' : 'No'}
                                                                        </span>
                                                                    </Label>
                                                                </div>
                                                                {
                                                                    fieldState.error?.message &&
                                                                    <FormMessage>
                                                                        {fieldState.error.message}
                                                                    </FormMessage>
                                                                }
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <div>
                                                        <Customtip
                                                            title="Increase Article Volume"
                                                            className="h-12 mt-[62px]"
                                                            content={
                                                                <>
                                                                    To increase articles volume, please email <a href="mailto:hello@zian.ai" className="underline">hello@zian.ai</a>
                                                                </>
                                                            } />
                                                    </div>
                                                </div>

                                            </div>
                                            <GrBorderBox className="mt-4 rounded-none md:mt-[54px]">
                                                <div className="flex justify-end bg-gr-purple-dark space-x-[10px] py-2 md:py-5 px-7">
                                                    <SecondaryBtn onClick={closeModal} className="py-3 text-sm">
                                                        Cancel
                                                    </SecondaryBtn>
                                                    <PrimaryBtn type="submit" className="w-auto h-12 px-12 py-3 ">
                                                        {
                                                            form.formState.isSubmitting ?
                                                                <Spinner />
                                                                :
                                                                <span>Save</span>
                                                        }
                                                    </PrimaryBtn>
                                                </div>
                                            </GrBorderBox>
                                        </form>
                                    </Form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}


