import React, { useState, useEffect, useRef } from 'react';
import style from './index.css';
import { api, userInfo, getCaseRecords, changeDate, handleSearch } from 'utils';
import Workstation from 'workstation';
import BtnGroup from './btnGroup';
import Message from 'message';
import confirm from 'confirm';
import { CODE } from 'myConstants';

const texts = require('./lan/zh.js');

export default function Index(props) {
	const columns = [
		{
			title: '任务来源',
			dataIndex: 'task_src',
			render: value => texts.source[value],
			width:100
		},
		{
			title: '姓名',
			dataIndex: 'name',
			width:100
		},
		{
			title: '病理号',
			dataIndex: 'pathnum',
			width:120
		},
		{
			title: '蜡块号',
			dataIndex: 'paraffin_num',
			width:140
		},
		{
			title: '切片号',
			dataIndex: 'slice_id',
			width:140
		},
		{
			title: '标记物',
			dataIndex: 'marker_id',
			width:120	
		},
		{
			title: '克隆号',
			dataIndex: 'clone_num',
			width:120
		},
		{
			title: '申请医生',
			dataIndex: 'apply_doc',
			width:100
		},
		{
			title: '申请时间',
			dataIndex: 'apply_time',
			width:180
		},
		{
			title: '备注',
			dataIndex: 'comment',
		},
		{
			title: '免疫号',
			dataIndex: 'immune_num',
			width:140
		},
		{
			title: '设备型号',
			dataIndex: 'facility_model',
			width:130
		},
		{
			title: '接收技师',
			dataIndex: 'receive_tech',
			width:100
		},
		{
			title: '接收时间',
			dataIndex: 'receive_time',
			width:180
		},
		{
			title: '标签打印状态',
			dataIndex: 'tag_printed',
			width:170,
			render: value => texts.tagPrinted[value],
		},
		{
			title: '工作单打印状态',
			dataIndex: 'app_printed',
			width:170,
			render: value => texts.appPrinted[value],
		},

		{
			title: '任务状态',
			dataIndex: 'task_status',
			width:120,
			render: value => (
				<React.Fragment>
					<span
						className={style.dot}
						style={{
							background: { 1: '#6FC831', 0: '#F4BB00' }[value],
						}}
					/>
					{texts.status[value]}
				</React.Fragment>
			),
			filters: [
				{
					text: '待接收',
					value: 0,
				},
				{
					text: '已接收',
					value: 1,
				},
			],
		},
	];
	
	const word = {
		rowkey: 'id',
		name: '医嘱列表',
		timeText: '申请日期：',
		inputText: '病理号：',
		total: '切片数总计',
		unaccomplished: '未接收切片：',
		finishText: '发送至制片',
		printTab: '打印标签',
		printSheet: '打印工作单',
		status: 'task_status',
		scrollX:2280,
		scrollY:375
	};

	const paraffinList = useRef();

	const [waxId, setWaxId] = useState([]);

	const [dateRange, setDateRange] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [searchList, setSearchList] = useState([]);
	const [filters, setFilters] = useState({});

	const [facilityList, setFacilityList] = useState([]);

	useEffect(() => {
		const init = async e => {
			paraffinList.current = await getCaseRecords('immune/search_tech_order', {}, 'task_status');
			if (paraffinList.current) {
				setSearchList(paraffinList.current);
			}
		};
		init();
		api('mpf_manage/get_facilities', { type: 1 }).then(({ code, data }) => {
			if (CODE.SUCCESS === code) {
				let facilities = [];
				//data.map(o => Object.assign(o, { value: o.brand, title: o.brand }));//显示品牌
				data.map(o => Object.entries(o.models).forEach(e => facilities.push({ value: e[0], title: e[1] }))); //显示设备
				setFacilityList(facilities);
			}
		});
	}, []);

	const reload = async e => {
		paraffinList.current = await getCaseRecords('immune/search_tech_order', {}, 'task_status');
		setSearchList(handleSearch(filters, dateRange, inputValue, paraffinList.current, 'apply_time', 'pathnum'));
	};

	const finish = () => {
		if (!waxId.length) return;
		confirm({
			content: '确认发送至制片？',
			onOk: async e => {
				api('immune/send_to_slice', {
					ihc_id: JSON.stringify(waxId),
					receive_tech: userInfo().username,
				}).then(data => {
					if (CODE.SUCCESS === data.code) {
						Message.success('发送成功');
						setWaxId([]);
						reload();
					} else {
						Message.error(data.message);
					}
				});
			},
		});
	};

	return (
		<div className={style.outerbg}>
			{paraffinList.current && (
				<Workstation
					searchList={searchList}
					columns={columns}
					word={word}
					finish={finish}
					waxId={waxId}
					checkList={e => setWaxId(e)}
					saveFilter={e => setFilters(e)}
					filter={filters}
					dateRange={dateRange}
					changeTimeVal={e => setDateRange(changeDate(e))}
					inputValue={inputValue}
					changeInputVal={value => setInputValue(value)}
					handleSearch={e =>
						setSearchList(
							handleSearch(e, dateRange, inputValue, paraffinList.current, 'apply_time', 'pathnum')
						)
					}
					btnGroup={() => (
						<BtnGroup
							checkedList={waxId}
							slideList={paraffinList.current}
							facilityList={facilityList}
							reload={reload}
						/>
					)}
				/>
			)}
		</div>
	);
}
