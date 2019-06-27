export default [
    {
        label: '登记/接收',
        iconPath: require('@images/menu_apply.svg'),
        iconTop: '23',
        background:
            'linear-gradient(360deg,rgba(254,62,97,1) 0%,rgba(255,110,151,1) 100%)',
        roleName: 'register',
        url: 'apply'
    },
    {
        label: '取材',
        iconPath: require('@images/menu_qc.svg'),
        iconTop: '24',
        background:
            'linear-gradient(360deg,rgba(103,85,220,1) 0%,rgba(158,139,239,1) 99%,rgba(158,139,239,1) 100%)',
        roleName: 'case',
        url: 'cases'
    },
    {
        label: '包埋',
        iconPath: require('@images/menu_bm.svg'),
        iconTop: '25',
        background:
            'linear-gradient(180deg,rgba(49,197,211,1) 0%,rgba(53,152,220,1) 100%)',
        roleName: 'common',
        url: 'embedding'
    },
    {
        label: '切片',
        iconPath: require('@images/menu_zp.svg'),
        iconTop: '10',
        background:
            'linear-gradient(180deg,rgba(53,220,156,1) 0%,rgba(70,190,144,1) 100%)',
        roleName: 'common',
        url: 'sectioning'
    },
    {
        label: '染色',
        iconPath: require('@images/menu_rs.svg'),
        iconTop: '22',
        background:
            'linear-gradient(180deg,rgba(156,220,53,1) 0%,rgba(112,190,70,1) 100%)',
        roleName: 'common',
        url: 'staining'
    },
    {
        label: '免疫组化',
        iconPath: require('@images/menu_myzh.svg'),
        iconTop: '24',
        background:
            'linear-gradient(180deg,rgba(213,140,254,1) 0%,rgba(186,80,246,1) 100%)',
        roleName: 'ihcWorkstation',
        url: 'ihcWorkstation'
    },
    {
        label: '免疫组化管理',
        iconPath: require('@images/menu_myzh_config.svg'),
        iconTop: '28',
        background:
            'linear-gradient(180deg,rgba(253,138,253,1) 0%,rgba(196,85,246,1) 100%)',
        roleName: 'ihcManage',
        url: 'ihcMarks'
    },
    {
        label: '特殊染色',
        iconPath: require('@images/special_staining.svg'),
        iconTop: '22',
        background:
            'linear-gradient(180deg,rgba(104,182,248,1) 0%,rgba(62,89,240,1) 100%)',
        roleName: 'specialWorkstation',
        url: 'specialStains'
    },
    {
        label: '特殊染色管理',
        iconPath: require('@images/menu_myzh_config.svg'),
        iconTop: '28',
        background:
            'linear-gradient(180deg,rgba(102,197,247,1) 0%,rgba(100,140,247,1) 100%)',
        roleName: 'ihcManage',
        url: 'specialMarks'
    },
    {
        label: '报告',
        iconPath: require('@images/menu_report.svg'),
        iconTop: '24',
        background:
            'linear-gradient(180deg,rgba(249,181,107,1) 0%,rgba(255,140,4,1) 100%)',
        roleName: 'report',
        url: 'report'
    },
    {
        label: '分子病理',
        iconPath: require('@images/menu_molecular.svg'),
        iconTop: '22',
        background:
            'linear-gradient(180deg,rgba(101,253,240,1) 0%,rgba(43,160,234,1) 100%)',
        roleName: 'molecularPath',
        url: 'molecularPath'
    }
];