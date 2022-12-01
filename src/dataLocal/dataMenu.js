import { IoInformationCircleOutline, IoLanguageOutline, IoBookmarkOutline, IoLogOutOutline } from 'react-icons/io5';
import { FormattedMessage } from 'react-intl';

export const dataMenuUser = [
    {
        title_vi: 'Thông tin',
        title_en: 'Information',
        to: '/detail-user',
        icon: <IoInformationCircleOutline />,
    },
    {
        title_vi: 'Ngôn ngữ',
        title_en: 'Language',
        icon: <IoLanguageOutline />,

        children: {
            title_vi: 'Ngôn ngữ',
            title_en: 'Language',
            data: [
                {
                    title_vi: 'Việt Nam',
                    title_en: 'Viet Nam',

                    codeLanguage: 'vi',
                },
                {
                    title_vi: 'Tiếng Anh',
                    title_en: 'English',

                    codeLanguage: 'en',
                },
            ],
        },
    },

    {
        title_vi: 'Lịch sử',
        title_en: 'History',
        to: '/login',
        icon: <IoBookmarkOutline />,
    },
    {
        title_vi: 'Đăng xuất',
        title_en: 'Logout',
        to: '/login',
        icon: <IoLogOutOutline />,
        action: 'processLogout',
    },
];

export const dataHomeHeader = [
    {
        title: <FormattedMessage id="home-header.specialty" />,
        sub: <FormattedMessage id="home-header.searchDoctor" />,
        modal: 'modalSpecialty',
    },
    {
        title: <FormattedMessage id="home-header.health-facility" />,
        sub: <FormattedMessage id="home-header.select-room" />,
        modal: 'modalClinic',
    },
    {
        title: <FormattedMessage id="home-header.doctor" />,
        sub: <FormattedMessage id="home-header.select-doctor" />,
        modal: 'modalDoctor',
    },
    {
        title: <FormattedMessage id="home-header.fee" />,
        sub: <FormattedMessage id="home-header.check-health" />,
        modal: 'modalHealth',
    },
];
