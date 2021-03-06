import React ,{useState} from 'react';
import style from './index.css';
import Input from 'input';
import {api} from 'utils.js';
import {CODE} from 'myConstants.js'
import Message from 'message';
import AddPop from 'addPop';
import TextArea from 'textarea';

export default function Index(props){
    const {onClose,onCancel,onAdd} = props;

    const [name,setName] = useState('');
    const [cloneNum,setCloneNum] = useState('');
    const [zhName,setZhName] = useState('');
    const [shortName,setShortName] = useState('');
    const [comment,setComment] = useState('');

    const addMark = () => {
        if(!name.trim())return
        let data = {
            type:2,
            name: name.trim(),
            clone_num: cloneNum.trim(),
            zh_name: zhName.trim(),
            short_name: shortName.trim(),
            comment: comment.trim(),
        }
        api('mpf_manage/add_marker',data)
        .then(({code}) => {
            if(code === CODE.SUCCESS){
                Message.success('新增标记物成功');
                setName('');
                setCloneNum('');
                setZhName('');
                setShortName('');
                setComment('');
                onAdd();
                onClose();
            }else{
                Message.error('新增标记物失败');
            }
        })
    }

    
    const labelStyle = {
        width: '160px',
        display: 'inline-block',
        textAlign: 'right'
    };

    return (

        <AddPop
            title={'新增标本'}
            onClose={onClose}
            onCancel={onCancel}
            confirmButtonDisabled={!name.trim()}
            onConfirm={addMark}
        >
            <div className={style.row}>
                <Input
                    label={'标记物名称：'}
                    labelStyle={labelStyle}
                    lineFeed={false}
                    required={true}
                    containerStyle={{marginTop:'10px'}}
                    inputStyle={{ width: '240px' }}
                    onChange={e=>setName(e.target.value)}
                    value={name}
                ></Input>
            </div>
            <div className={style.row}>
                <Input
                    label={'克隆号：'}
                    labelStyle={labelStyle}
                    lineFeed={false}
                    inputStyle={{ width: '240px' }}
                    value={cloneNum}
                    onChange={e=>setCloneNum(e.target.value)}
                ></Input>
            </div>
            <div className={style.row}>
                <Input
                    label={'中文名：'}
                    labelStyle={labelStyle}
                    lineFeed={false}
                    inputStyle={{ width: '240px' }}
                    value={zhName}
                    onChange={e=>setZhName(e.target.value)}
                ></Input>
            </div>
            <div className={style.row}>
                <Input
                    label={'简称：'}
                    labelStyle={labelStyle}
                    lineFeed={false}
                    inputStyle={{ width: '240px' }}
                    value={shortName}
                    onChange={e=>setShortName(e.target.value)}
                ></Input>
            </div>
            <div className={style.row}>
                <TextArea
                    lineFeed={false}
                    label={'备注：'}
                    textAreaStyle={{width:'240px',height:'56px'}}
                    labelStyle={{
                        width: '160px',
                        display: 'inline-block',
                        textAlign: 'right',
                        verticalAlign:'top',
                    }}
                    value={comment}
                    onChange={e=>setComment(e.target.value)}
                ></TextArea>
            </div>
            
            

        </AddPop>
        // <div className={style.outer}>
        //     <span style={{
        //             color:'#F25B24',
        //             fontSize: '21px',paddingTop: '8px',
        //             marginRight: '3px'}}
        //     >*</span>
        //     标记物名称：
        //     <Input
        //         lineFeed={false}
        //         containerStyle={{width:'168px',marginRight:'8px'}}
        //         onChange={e=>setName(e.target.value)}
        //         value={name}
        //     ></Input>
        //     克隆号：
        //     <Input
        //         lineFeed={false}
        //         containerStyle={{width:'104px',marginRight:'8px'}}
        //         value={cloneNum}
        //         onChange={e=>setCloneNum(e.target.value)}
        //     ></Input>
        //     中文名：
        //     <Input
        //         lineFeed={false}
        //         containerStyle={{width:'118px',marginRight:'8px'}}
        //         value={zhName}
        //         onChange={e=>setZhName(e.target.value)}
        //     ></Input>
        //     简称：
        //     <Input
        //         lineFeed={false}
        //         containerStyle={{width:'88px',marginRight:'8px'}}
        //         value={shortName}
        //         onChange={e=>setShortName(e.target.value)}
        //     ></Input>
            
        //     备注：
        //     <Input
        //         lineFeed={false}
        //         containerStyle={{width:'168px',marginRight:'8px'}}
        //         value={comment}
        //         onChange={e=>setComment(e.target.value)}
        //     ></Input>
        //     <button className={style.addBtn} disabled={!name.trim()} onClick={addMark}>新增</button>
        // </div>
    )
}