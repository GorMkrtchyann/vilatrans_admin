import {Avatar} from "@mui/material";
import {IconCalendar, IconChevronDown} from "@tabler/icons-react";
import {useState} from "react";


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


    return(
        <div>
            <ReviewsAccordion
                data={{
                    name: 'Mayranush',
                    subject: 'Lorem ipsum is the best',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius eum ipsum laborum quae voluptas. Beatae explicabo hic incidunt quae voluptas. Ab aliquid cumque earum, magni minus nobis quis rem ut?',
                    date: "01.03.2024",
                    phone: '+3242352352',
                    email: 'asdasda@dasda.asda'
                }}
            />

            <ReviewsAccordion
                data={{
                    name: 'Tsovak',
                    subject: 'Lorem ipsum is the best',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius eum ipsum laborum quae voluptas. Beatae explicabo hic incidunt quae voluptas. Ab aliquid cumque earum, magni minus nobis quis rem ut?',
                    date: "01.03.2024",
                    phone: '+3242352352',
                    email: 'asdasda@dasda.asda'
                }}
            />
        </div>
    )
}