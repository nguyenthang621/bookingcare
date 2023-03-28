export const adminMenu = [
    {
        //quản lý người dùng:
        name: 'menu.admin.manage-user',
        menus: [
            { name: 'menu.admin.crud-redux', link: '/system/user-redux' },
            // { name: 'menu.admin.crud', link: '/system/user-manage' },
            { name: 'menu.admin.manage-doctor', link: '/system/manage-doctor' },
            // { name: 'menu.admin.manage-admin', link: '/system/user-admin' },
            { name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule' },
            { name: 'menu.doctor.manage-appointment', link: '/doctor/manage-patient-appointment' },
        ],
    },
    {
        //quản lý phòng khám:
        name: 'menu.admin.manage-clinic',
        menus: [
            { name: 'menu.admin.clinic', link: '/system/manage-clinic' },
            // { name: 'menu.admin.listClinic', link: '/system/manage-clinic' },
        ],
    },
    {
        //quản lý chuyên khoa:
        name: 'menu.admin.manage-specialty',
        menus: [
            { name: 'menu.admin.specialty', link: '/system/manage-specialty' },
            // { name: 'menu.admin.listSpecialty', link: '/system/manage-specialty' },
        ],
    },

    {
        //quản lý cẩm nang:
        name: 'menu.admin.manage-handbook',
        menus: [
            { name: 'menu.admin.handbook', link: '/doctor/manage-handbook' },
            { name: 'menu.admin.listHandbook', link: '/doctor/list-handbook' },
        ],
    },
    {
        //quản lý cẩm nang:
        name: 'menu.admin.news',
        menus: [
            { name: 'menu.admin.news', link: '/doctor/manage-news' },
            { name: 'menu.admin.listNews', link: '/doctor/list-news' },
        ],
    },
];

export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            { name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule' },
            { name: 'menu.doctor.manage-appointment', link: '/doctor/manage-patient-appointment' },
        ],
    },
    {
        //quản lý cẩm nang:
        name: 'menu.admin.manage-handbook',
        menus: [
            { name: 'menu.admin.handbook', link: '/doctor/manage-handbook' },
            { name: 'menu.admin.listHandbook', link: '/doctor/list-handbook' },
        ],
    },
    {
        //quản lý cẩm nang:
        name: 'menu.admin.news',
        menus: [
            { name: 'menu.admin.news', link: '/doctor/manage-news' },
            { name: 'menu.admin.listNews', link: '/doctor/list-news' },
        ],
    },
];
