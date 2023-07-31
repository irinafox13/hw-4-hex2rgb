import React, { useState } from "react";
import hexToRgb from "../hexToRgb";
import changeLightness from "../changeLightness";

const ERROR_BG_COLOR = "rgb(169, 27, 27)";
const DEFAULT_RESULT_FIELD_COLOR = "rgb(255, 255, 255)";

const Converter = () => {
    const [hex, setHex] = useState("#");
    const [rgb, setRgb] = useState("");
    const [isError, setIsError] = useState(false);

    const handleHex = event => {
        const { value } = event.target;

        if (value.length <= 7) {
            !value ? setHex("#") : setHex(value);
            setRgb("");
            setIsError(false);
        }

        if (value.length === 7) {
            const res = hexToRgb(value);
            setRgb(res || ERROR_BG_COLOR);
            if (!res) {
               setIsError(true); 
            }
        }
    };

    return (
        <div className="converter" style={{ background: rgb }}>
            <input
                type="text"
                value={hex}
                onChange={handleHex}
                placeholder="#123456"
            />

            <input
                className="result"
                type="text"
                style={{
                    background: rgb
                        ? changeLightness(rgb, 10)
                        : DEFAULT_RESULT_FIELD_COLOR
                }}
                value={isError ? "Ошибка!" : rgb}
            />
        </div>
    );
}

export default Converter;