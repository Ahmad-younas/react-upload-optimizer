import { useCallback, useState } from "react";
import { compressImage } from "../utils/compressImage";
import type { CompressionOption, OptimizedImageResult } from "../types";

export function useUploadOptimizer(){
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<OptimizedImageResult | null>(null);
    const [error, setError] = useState<string | null>(null);


    const optimizeImage = useCallback(
        async(
            file:File,
            options?: CompressionOption
        ):Promise<OptimizedImageResult> =>{

            try{

                setLoading(true);
                setProgress(20);
                setError(null);

                setProgress(50);

                const optimizedResult = await compressImage(file, options);

                setProgress(100);
                setResult(optimizedResult);

                return optimizedResult;

            }catch (err) {
                const message =
                err instanceof Error ? err.message : "Something went wrong.";
                setError(message);
                throw err;
            }finally{
                setLoading(false);
            }
        },
        []
     );


     const reset = useCallback (()=>{

        setLoading(false);
        setProgress(0);
        setResult(null);
        setError(null);

     },[])


     return{
        optimizeImage,
        loading,
        progress,
        result,
        error,
        reset,
     }
}