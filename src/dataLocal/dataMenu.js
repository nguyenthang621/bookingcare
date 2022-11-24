import { IoInformationCircleOutline, IoLanguageOutline, IoBookmarkOutline, IoLogOutOutline } from 'react-icons/io5';

export const dataMenuUser = [
    {
        title_vi: 'Thông tin',
        title_en: 'Information',
        to: '/login',
        icon: <IoInformationCircleOutline />,
    },
    {
        title_vi: 'Ngôn ngữ',
        title_en: 'Language',
        to: '/login',
        icon: <IoLanguageOutline />,

        children: {
            title_vi: 'Ngôn ngữ',
            title_en: 'Language',
            data: [
                {
                    title_vi: 'Việt Nam',
                    title_en: 'Viet Nam',
                    to: '/login',
                    codeLanguage: 'vi',
                },
                {
                    title_vi: 'Tiếng Anh',
                    title_en: 'English',
                    to: '/login',
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
