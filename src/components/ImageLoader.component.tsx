import Image from 'next/image';
import { useEffect, useState } from 'react';

const IMAGE_SRC_DEFAULT = 'https://links.papareact.com/9xl';

function ImageLoader(props: any) {
    const { src = IMAGE_SRC_DEFAULT, fallbackSrc = IMAGE_SRC_DEFAULT, ...rest } = props;
    const [imgSrc, setImgSrc] = useState<any>(src);

    useEffect(() => {
        setImgSrc(src);
    }, [src])

    return (
        <Image
            {...rest}
            src={imgSrc}
            onError={() => setImgSrc(fallbackSrc)}
        />
    )
}

export default ImageLoader