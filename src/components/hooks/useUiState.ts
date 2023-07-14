import { UiState } from "@/types/uistate.type";
import { useState } from "react";


export default function useUiState<T>() {
    const [uiState, setUiState] = useState<UiState<T>>()

    const setProcessing = (value: boolean) => setUiState((prev) => ({ ...prev, processing: value }))
    const setUiData = (data: T) => setUiState((prev) => ({ ...prev, state: data }))

    return { uiState, setProcessing, setUiData }
}