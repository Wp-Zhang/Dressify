import { useState, lazy, Suspense } from 'react';
import getImgURL from '../../services/utils';
import rgbaster from 'rgbaster';

import { Card } from '@nextui-org/react';

const getBgColor = (img, setColor) => {
    rgbaster(img, {
        ignore: ['rgb(0,0,0)'],
        scale: 0.1
    }).then(res => {
        let tmp_color = res[0].color
        tmp_color = tmp_color.substring(0, tmp_color.length - 1)
        tmp_color = tmp_color + ",0.9)"
        setColor(tmp_color)
    })
}

const ExtendedImg = ({ articleId, height }) => {
    const [color, setColor] = useState('rgb(255,255,255)')
    const imgURL = getImgURL(articleId, false, "tr=w-400,h-100,cm-extract,fo-top_left")
    getBgColor(imgURL, setColor)

    return (
        <div style={{ background: color }}>
            <Card.Image
                src={getImgURL(articleId)}
                objectFit={"contain"}
                style={{ height: height }}
            />
        </div>
    )
}

export default ExtendedImg