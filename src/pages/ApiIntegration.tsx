import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
import { useState, useRef } from "react";





export default function ApiIntegrationPage() {


    return (
        <MainLayout heading="Drafts">
            <GrBorderBox className="p-px md:p-[2px] rounded-20 lg:max-h-[calc(100vh_-_130px)] " type="lg">
                <div className="p-3 md:p-5 h-full w-full flex flex-col backdrop-blur-[10px] bg-gr-purple-light opacity-90 rounded-20">
                    
                </div>
            </GrBorderBox>
        </MainLayout>
    );
}




