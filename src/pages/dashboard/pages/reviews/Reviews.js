import {Avatar, LinearProgress} from "@mui/material";
import {IconCalendar, IconChevronDown} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import axios from "axios";


const ReviewsAccordion = ({data}) => {
    const [open, setOpen] = useState(false)

    return(
        <div className={'review_accordion'}>
            <div className={'review_accordion__header'} onClick={() => setOpen(!open)}>
                <div>
                    <Avatar>{data.name.slice(0, 1)}</Avatar>
                    <b>{data.name}</b>
                    <p>{data.subject}</p>
                    <div className={'review_accordion__header__calendar'}>
                        <IconCalendar/>
                        <span>{data.date}</span>
                    </div>
                </div>
                <IconChevronDown style={{rotate: open ? '180deg' : '0deg'}}/>
            </div>
            {
                open ?
                    <div className={'review_accordion__content'}>
                        <h3>{data.subject}</h3>
                        <ul>
                            <li><span>Name:</span> {data.name}</li>
                            <li><span>Phone:</span> <a href={`tel:${data.phone}`}>{data.phone}</a></li>
                            <li><span>Email:</span> <a href={`mailto:${data.email}`}>{data.email}</a></li>
                        </ul>
                        <p>{data.text}</p>
                    </div>
                    :
                    null
            }

        </div>
    )
}

export const Reviews = () => {
    const [reviewsList, setReviewsList] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:8080/contact/getAllReviews').then(r => {
            if (!r.data.error){
                setReviewsList(r.data)
            }
            // console.log(r)
        })
    }, [])

    return(
        reviewsList ?
            <div>
                {
                    reviewsList?.map(el => (
                        <ReviewsAccordion
                            data={el}
                        />
                    ))
                }
            </div>
            :
            <LinearProgress />
    )
}