import { genImageBlurHash } from "../../lib/next/genImageBlurHash";
import { useState, useEffect } from "react";
export function useImageBlurHashes(imgUrlList, args) {
    const [imageBlurHashes, setImageBlurHashes] = useState([]);
    const { w = 16, q = 75 } = args ?? {};
    useEffect(() => {
        const genImageBlurHashes = async () => {
            if (!Array.isArray(imgUrlList)) {
                return;
            }
            const resources = await Promise.all(imgUrlList.map(async (imgUrl) => {
                if (typeof imgUrl !== 'string') {
                    return '';
                }
                return await genImageBlurHash(imgUrl, w, q);
            }));
            setImageBlurHashes(resources);
        };
        genImageBlurHashes();
    }, [imgUrlList, w, q]);
    return imageBlurHashes;
}
