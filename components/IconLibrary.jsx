import React from "react";
import Svg, { Path, Rect, Line } from "react-native-svg";

const icons = {
    home: (
        <Svg width="15" height="20" viewBox="0 0 15 20" fill="none">
            <Path
                d="M11.2568 0H15L9.01639 11.8589V20H5.68306V13.3243L11.2568 0ZM3.74317 0L5.37705 6.39891L3.90164 9.95387L0 0H3.74317Z"
            />
        </Svg>

    ),
    list: (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Rect x="1.91667" y="1.91667" width="20.1667" height="20.1667" rx="2.75" stroke="#8E8E93"
                  stroke-width="1.83333"/>
            <Line x1="1" y1="5.58333" x2="23" y2="5.58333" stroke="#8E8E93" stroke-width="1.83333"/>
            <Line x1="1" y1="9.24984" x2="23" y2="9.24984" stroke="#8E8E93" stroke-width="1.83333"/>
            <Line x1="1" y1="12.9168" x2="23" y2="12.9168" stroke="#8E8E93" stroke-width="1.83333"/>
        </Svg>
    ),
    update: (
        <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <Path
                d="M12.5 18H16.7942C18.6594 18 19.592 18 20.1215 17.6092C20.5832 17.2685 20.8763 16.7459 20.9263 16.1743C20.9836 15.5187 20.4973 14.7229 19.5247 13.1313L18.5278 11.5M5.63014 9.60522L3.47528 13.1314C2.50267 14.7229 2.01637 15.5187 2.07372 16.1743C2.12372 16.7459 2.41681 17.2685 2.87846 17.6092C3.40799 18 4.34059 18 6.20578 18H8M16.3889 7.99999L14.2305 4.46808C13.3277 2.99079 12.8763 2.25214 12.2952 2.00033C11.7879 1.78049 11.2121 1.78049 10.7048 2.00033C10.1237 2.25214 9.67229 2.99079 8.7695 4.46809L7.74967 6.13689M17.5 4.00006L16.4019 8.09813L12.3038 7.00006M1.5 10.5981L5.59808 9.49999L6.69615 13.5981M15 21L12 18L15 15"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            />
        </Svg>
    ),
    participants: (
        <Svg width="23" height="20" viewBox="0 0 23 20" fill="none">
            <Path
                d="M21.5 19V17C21.5 15.1362 20.2252 13.5701 18.5 13.126M15 1.29076C16.4659 1.88415 17.5 3.32131 17.5 5C17.5 6.67869 16.4659 8.11585 15 8.70924M16.5 19C16.5 17.1362 16.5 16.2044 16.1955 15.4693C15.7895 14.4892 15.0108 13.7105 14.0307 13.3045C13.2956 13 12.3638 13 10.5 13H7.5C5.63623 13 4.70435 13 3.96927 13.3045C2.98915 13.7105 2.21046 14.4892 1.80448 15.4693C1.5 16.2044 1.5 17.1362 1.5 19M13 5C13 7.20914 11.2091 9 9 9C6.79086 9 5 7.20914 5 5C5 2.79086 6.79086 1 9 1C11.2091 1 13 2.79086 13 5Z"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>

    )
};

export default function CustomIcon({ name, size = 24, color = "#ffff" }) {
    const IconComponent = icons[name];

    if (!IconComponent) {
        console.warn(`Icon "${name}" not found`);
        return null;
    }

    return React.cloneElement(IconComponent, { width: size, height: size, fill: color });
}