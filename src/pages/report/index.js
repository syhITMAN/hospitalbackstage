import React, {useState, useEffect} from 'react';
import style from './index.css';
import {api} from 'utils';
import Page from 'page';
import Table from 'table';
import Details from './details';
import {DatePicker} from 'antd';
import Transition from 'transition';
import translate from './language/zh.js';
import {CODE} from 'myConstants';
import Message from 'message';

const {RangePicker} = DatePicker;

export default function Index(props) {
    const columns = [
        {
            title: '病理号',
            dataIndex: 'pathnum',
            width: 145
        },
        {
            title: '姓名',
            dataIndex: 'name'
        },
        {
            title: '性别',
            dataIndex: 'gender',
            render: text => <React.Fragment>{translate.gender[text]}</React.Fragment>
        },
        {
            title: '年龄',
            dataIndex: 'age'
        },
        {
            title: '临床诊断',
            dataIndex: 'clinical_openDetails'
        },
        {
            title: '申请类别',
            dataIndex: 'apply_type',
            render: text => <React.Fragment>{translate.applyType[text]}</React.Fragment>
        },
        {
            title: '取样部位',
            dataIndex: 'sampling_location'
        },
        {
            title: '登记日期',
            dataIndex: 'checkin_time',
            render: text => <React.Fragment>{text && text.split(' ')[0]}</React.Fragment>
        },
        {
            title: '收样日期',
            dataIndex: 'receive_time'
        },
        {
            title: '患者来源',
            dataIndex: 'source',
            render: text => <React.Fragment>{translate.source[text]}</React.Fragment>
        },
        {
            title: '住院号',
            dataIndex: 'admission_num'
        },
        {
            title: '门诊号',
            dataIndex: 'outpatient_num'
        },
        {
            title: '送检医生',
            dataIndex: 'deliver_doc'
        },
        {
            title: '状态',
            dataIndex: 'diag_status',
            render: text => (
                <React.Fragment>
                    <i className={style.state} style={{backgroundColor: {1: '#0B94FC', 2: '#6FC831'}[text]}} />
                    {translate.reportState[text]}
                </React.Fragment>
            )
        },
        {
            title: '操作',
            dataIndex: 'option',
            render: (text, record) => (
                <React.Fragment>
                    <button className={style['btn-table']} onClick={e => openDetails(record)}>
                        诊断
                    </button>
                </React.Fragment>
            )
        }
    ].map(o => {
        o.width = o.width ? o.width : 125;
        return o;
    });

    const [records, setRecords] = useState([]);
    const [dateRange, setDateRange] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [keySearch, setKeySearch] = useState('');

    useEffect(() => getReportList(), []);

    const getReportList = () => {
        api('records/search_case', {status: JSON.stringify([1, 2])}).then(data => {
            if (data.code === CODE.SUCCESS) {
                setRecords(data.data.case_info);
            }
        });
    };

    const filterList = (arr = records, key = keySearch, date = dateRange) => {
        if (!key && !date.length) return arr;
        if (!date.length)
            return (arr || []).filter(o => o.pathnum && o.pathnum.toLowerCase().includes(key.toLowerCase()));
        else {
            let start = new Date(date[0]).getTime();
            let end = new Date(date[1]);
            end.setHours(23);
            end.setMinutes(59);
            end.setSeconds(59);
            end.getTime();
            return (arr || [])
                .filter(o => o.pathnum && o.pathnum.toLowerCase().includes(key.toLowerCase()))
                .filter(
                    o =>
                        (new Date(o.receive_time).getTime() > start || new Date(o.receive_time).getTime() === start) &&
                        (new Date(o.receive_time).getTime() < end || new Date(o.receive_time).getTime() === end)
                );
        }
    };

    const openDetails = record => {
        setCurrentRecord(record);
        setShowDetails(true);
    };

    const closeDetails = () => {
        getReportList();
        setShowDetails(false);
    };

    const dateChange = (obj, arr) => {
        if (!obj.length) {
            setDateRange([]);
        } else {
            setDateRange(arr);
        }
    };

    const searchList = (key = keySearch) => {
        let current = records.find(o => o.pathnum === keySearch);
        if (!current) Message.error('未找到对应的病理单');
        else openDetails(current);
    };

    const inputSearchWord = e => {
        setKeySearch(e.target.value.trim());
    };

    return (
        <Page>
            <div className={style.list}>
                <div className={style.outer}>
                    <div className={style.head}>
                        报告列表
                        <div className={style.search}>
                            <span style={{fontSize: '14px', color: '#2E3134', marginLeft: '27px'}}>收样日期：</span>
                            <RangePicker
                                className={style.antdDateRange}
                                style={{width: '279px', marginRight: '10px'}}
                                onChange={dateChange}
                            />
                            <span style={{fontSize: '14px', color: '#2E3134'}}>病理号：</span>
                            <input
                                className={style['input-search']}
                                type='text'
                                onChange={e => inputSearchWord(e)}
                                onKeyUp={e => e.keyCode === 13 && searchList()}
                            />
                            <button onClick={searchList}>搜索</button>
                        </div>
                    </div>
                    {/* 报告列表 */}
                    <Table
                        columns={columns}
                        data={filterList()}
                        rowKey={'pathnum'}
                        style={{height: 'calc(100% - 54px)', overflowY: 'auto'}}
                        scroll={{y: 'calc(100vh - 280px)'}}
                        onRow={record => {
                            return {
                                onDoubleClick: e => openDetails(record)
                            };
                        }}
                    />
                </div>
            </div>
            {showDetails && (
                <Transition>
                    <Details close={closeDetails} record={currentRecord} />
                </Transition>
            )}
        </Page>
    );
}