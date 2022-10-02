import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

export const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return <FaAngleRight className={className} style={{ ...style, display: 'block' }} onClick={onClick} />;
};

export const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return <FaAngleLeft className={className} style={{ ...style, display: 'block' }} onClick={onClick} />;
};
