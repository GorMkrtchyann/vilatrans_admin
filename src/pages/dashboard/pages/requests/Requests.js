import {
    Avatar,
    LinearProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {IconCalendar, IconChevronDown, IconTruckDelivery} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import axios from "axios";


const RequestsAccordion = ({data}) => {
    const [open, setOpen] = useState(false)

    return(
        <div className={'review_accordion'}>
            <div className={'review_accordion__header'} onClick={() => setOpen(!open)}>
                <div>
                    <Avatar>{data.name.slice(0, 1)}</Avatar>
                    <b>{data.name}</b>
                    <div className={'review_accordion__header__calendar'}>
                        <IconTruckDelivery/>
                        <span>{data.requests.length} Requests</span>
                    </div>
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
                        {/*<h3>Delivery With Car</h3>*/}
                        <ul>
                            <li><span>Name:</span> {data.name}</li>
                            <li><span>Phone:</span> <a href={`tel:${data.phone}`}>{data.phone}</a></li>
                            <li><span>Email:</span> <a href={`mailto:${data.email}`}>{data.email}</a></li>
                        </ul>

                        <TableContainer component={Paper} sx={{boxShadow: "none"}}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Request</TableCell>
                                        <TableCell align="right">Country Of Origin</TableCell>
                                        <TableCell align="right">Country Of Delivery</TableCell>
                                        <TableCell align="right">Type Of Services</TableCell>
                                        <TableCell align="right">Weight (cm)</TableCell>
                                        <TableCell align="right">Height (cm)</TableCell>
                                        <TableCell align="right">Width (cm)</TableCell>
                                        <TableCell align="right">Length (cm)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.requests?.map((row, i) => (
                                        <TableRow
                                            key={row.CountryOfOrigin+i}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Request {i+1}
                                            </TableCell>
                                            <TableCell align="right">{row.countryOrigin}</TableCell>
                                            <TableCell align="right">{row.countryDelivery}</TableCell>
                                            <TableCell align="right">{row.typeServices}</TableCell>
                                            <TableCell align="right">{row.weight}</TableCell>
                                            <TableCell align="right">{row.height}</TableCell>
                                            <TableCell align="right">{row.width}</TableCell>
                                            <TableCell align="right">{row.length}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    :
                    null
            }

        </div>
    )
}

export const Requests = () => {
    const [requestsArr, setRequestsArr] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:8080/admin/getAllRequests').then(
            r => {
                if(!r.data.error){
                    setRequestsArr(r.data)
                }
            }
        )
    }, [])

    return(
        <div>
            {
                requestsArr ?
                    requestsArr?.map(el => (
                        <RequestsAccordion
                            data={el}
                        />
                    ))
                    :
                    <LinearProgress/>
            }
        </div>
    )
}