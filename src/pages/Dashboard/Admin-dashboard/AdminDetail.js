import React, {useEffect, useState} from 'react'
import './style.css'
import backEndApi from "../../../services/api";
import {Redirect} from "react-router-dom";
import Button from "@material-ui/core/Button";

function renFloor(data) {
    switch (data.floor) {
        case 0:
            return <span>ground</span>;
        case 1 :
            return <span>1<sup>st</sup></span>;
        case 2 :
            return <span>2<sup>nd</sup></span>;
        case 3 :
            return <span>3<sup>rd</sup></span>;
        case 4 :
            return <span>4<sup>th</sup></span>;
        case 5 :
            return <span>5<sup>th</sup></span>;
        default:
            return <span> </span>
    }
}

function Detail(props) {
    const local = 'http://localhost:5000';
    const [data, setData] = useState([]);
    const [files, setFiles] = useState([]);

    const [isReload, setIsReload] = useState(false);

    const [activeImg, setActiveImg] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const {data} = await backEndApi.get('/admindetail', {params: {id: props.match.params.id}});
            console.log(data);
            setData(data.docs);
            setFiles(data.files);
            setActiveImg(data.files[0])
        };
        getData();

    }, []);
    useEffect(() => {
        if (data.email !== 'justt@gmail.com') {
            console.log(data.email);
            return <Redirect to='/login'/>
        }
    }, [data])

    useEffect(() => {

    }, []);

    const onButtonClick = async (value, id) => {
        const buttonClicked = {
            id: id,
            selectedButton: value,
        };
        const response = await backEndApi.post('/changeHomeStatus', {params: buttonClicked});
        setIsReload(true)

    };

    if (!props.getToken()) {
        return <Redirect to='/login'/>
    }
    if(isReload){
        window.location.reload();
    }
    return (
        <div className='root'>
            <div className='container'>
                <div className='image-grid'>
                    <div className='small-images'>
                        {files?files.map((file) => {
                            return (<button style={{outline:'none', border:'0 solid #eeeeee'}} onClick={() => setActiveImg(file)}><img
                                src={`${local}/images/products/${data.ownerEmail}/${data._id}/${file}`}
                                alt={`${data.location}`} className='simg'/></button>)
                        }):''}
                    </div>
                    <div className='one-big-image'>
                        <img src={`${local}/images/products/${data.ownerEmail}/${data._id}/${activeImg}`}
                             className='limg'/>
                    </div>
                </div>

                <div className='detail-holder'>
                    <div className='att'>
                        <span className='att-title'>Location</span>
                        <span className='att-value'>{data.location}</span>
                    </div>
                    <div className='att'>
                        <span className='att-title'>Bed Rooms</span>
                        <span className='att-value'>{data.bed_room}</span>
                    </div>
                    <div className='att'>
                        <span className='att-title'>Monthly Rent</span>
                        <span className='att-value'>{data.monthly_payment} Birr</span>
                    </div>
                    <div className='att'>
                        <span className='att-title'>Floor</span>
                        <span className='att-value'>{renFloor(data)} Floor</span>
                    </div>
                    <div className='att'>
                        <span className='att-title'>Status</span>
                        <span className={`att-value ${data.reviewStatus === 'Approved'?'success':'danger'}`} >{data.reviewStatus}</span>
                    </div>
                    <div className='att'  >
                        <span className='att-title'>Description</span>
                        <span className='att-value' style={{wordWrap: 'break-word',  maxHeight:'150px', overflow:'auto'}}>{data.description}</span>
                    </div>
                    <div className='buttonHolder'>
                        {/*disabled={data.reviewStatus!=='Approved'}*/}
                        <button className='actionButtons '
                                onClick={() => onButtonClick("Rejected", data._id)}>
                            Reject
                        </button>
                        {/*disabled={data.reviewStatus==='Approved'}*/}
                        <button className='actionButtons '
                                onClick={() => onButtonClick("Approved", data._id)}>
                            Approve
                        </button>
                    </div>
                </div>


            </div>
            <div className={'userDetailRoot'}>
                <div className='usedetailholder'>
                    <div>Owner Detail</div>
                    <div className='userDetailItems'>
                        <span>Phone Number : {data.phone_number}</span>
                        <span>Email : {data.ownerEmail}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail
