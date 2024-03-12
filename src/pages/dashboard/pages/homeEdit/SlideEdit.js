import {TextField} from "@mui/material";


export const SlideEdit = () => {


    return(
        <div className={'blockForm'}>
            <h3>Slider</h3>
            <div className={'blockForm__forms'}>
                <form>
                    <h5>Slide 1</h5>
                    <label>
                        Image
                        <input type="file"/>
                    </label>

                    <div>
                        <h6>Title</h6>
                        <TextField id="standard-basic" label="English" variant="standard" />

                        <TextField id="standard-basic" label="Russian" variant="standard" />

                        <TextField id="standard-basic" label="Armenian" variant="standard" />
                    </div>

                    <div>
                        <h6>Description</h6>
                        <TextField id="standard-basic" multiline rows={4} label="English" variant="standard" />

                        <TextField id="standard-basic" multiline rows={4} label="Russian" variant="standard" />

                        <TextField id="standard-basic" multiline rows={4} label="Armenian" variant="standard" />
                    </div>

                    <div>
                        <h6>Button Text</h6>
                        <TextField id="standard-basic" label="English" variant="standard" />

                        <TextField id="standard-basic" label="Russian" variant="standard" />

                        <TextField id="standard-basic" label="Armenian" variant="standard" />
                    </div>

                    <label>
                        Button Link
                        <TextField type={"url"} id="standard-basic" label="" variant="standard" />
                    </label>

                    <button className={'btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2'}>Save</button>
                </form>
                <form>
                    <h5>Slide 2</h5>
                    <label>
                        Image
                        <input type="file"/>
                    </label>

                    <div>
                        <h6>Title</h6>
                        <TextField id="standard-basic" label="English" variant="standard" />

                        <TextField id="standard-basic" label="Russian" variant="standard" />

                        <TextField id="standard-basic" label="Armenian" variant="standard" />
                    </div>

                    <div>
                        <h6>Description</h6>
                        <TextField id="standard-basic" multiline rows={4} label="English" variant="standard" />

                        <TextField id="standard-basic" multiline rows={4} label="Russian" variant="standard" />

                        <TextField id="standard-basic" multiline rows={4} label="Armenian" variant="standard" />
                    </div>

                    <div>
                        <h6>Button Text</h6>
                        <TextField id="standard-basic" label="English" variant="standard" />

                        <TextField id="standard-basic" label="Russian" variant="standard" />

                        <TextField id="standard-basic" label="Armenian" variant="standard" />
                    </div>

                    <label>
                        Button Link
                        <TextField type={"url"} id="standard-basic" label="" variant="standard" />
                    </label>

                    <button className={'btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2'}>Save</button>
                </form>
                <form>
                    <h5>Slide 3</h5>
                    <label>
                        Image
                        <input type="file"/>
                    </label>

                    <div>
                        <h6>Title</h6>
                        <TextField id="standard-basic" label="English" variant="standard" />

                        <TextField id="standard-basic" label="Russian" variant="standard" />

                        <TextField id="standard-basic" label="Armenian" variant="standard" />
                    </div>

                    <div>
                        <h6>Description</h6>
                        <TextField id="standard-basic" multiline rows={4} label="English" variant="standard" />

                        <TextField id="standard-basic" multiline rows={4} label="Russian" variant="standard" />

                        <TextField id="standard-basic" multiline rows={4} label="Armenian" variant="standard" />
                    </div>

                    <div>
                        <h6>Button Text</h6>
                        <TextField id="standard-basic" label="English" variant="standard" />

                        <TextField id="standard-basic" label="Russian" variant="standard" />

                        <TextField id="standard-basic" label="Armenian" variant="standard" />
                    </div>

                    <label>
                        Button Link
                        <TextField type={"url"} id="standard-basic" label="" variant="standard" />
                    </label>

                    <button className={'btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2'}>Save</button>
                </form>
            </div>

        </div>
    )
}