import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CustomizedSnackbars from "../../../../components/calcuator/alert";

export const ServiceBanner = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [data, setData] = useState(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    console.log(selectedFile)

    async function alert(status, message) {
        setOpen({
            openAlert: true,
            status: status,
            message: message,
        });
    }
    useEffect(() => {
        axios
            .get("http://localhost:8080/service/images")
            .then((res) => setData(res.data.data[0]))
            .catch((err) => {
                alert("error", "Error request ");
                console.log(err);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            return alert("error", "Not file");
        }
        if (!selectedFile.type.startsWith("image/")) {
            return alert("error", "File type not images");
        }

        const img = new Image();
        img.src = URL.createObjectURL(selectedFile);
        img.onload = () => {
            if (img.width !== 1930 || img.height !== 1080) {
                return alert("error", "Image size must be 1930x1080");
            } else {///onload is a Asynchronous function
                request(selectedFile);
            }
        };
    };
    async function request(selectedFile) {
        setLoading(true);
        try {
            const imgData = await imgRender(selectedFile);
            axios
                .patch("http://localhost:8080/service/images", {
                    images: imgData,
                })
                .then((res) => {
                    setLoading(false);
                    alert("successfully", "successfully images update");
                    setData(res.data.data);
                })
                .catch((res) => {
                    setLoading(false);
                    alert("error", "Error Images Update");
                    console.log(res);
                });
        } catch (error) {
            setLoading(false);
            alert("error", "ERROR");
            console.error(error);
        }
    }

    const imgRender = (file) =>
        new Promise((resolve, reject) => {
            const render = new FileReader();
            render.onload = (event) => {
                resolve(event.target.result);
            };
            render.readAsDataURL(file);
        });

    return (
        <>
            {data ? (
                <div className="flex wrap">
                    <div className=" p-3 col-sm-12 col-md-7 ">
                        <h1 className="mt-9 mb-3">Select Image</h1>
                        <p className="d-block">Image size 1930x1080</p>
                        <form
                            className="mt-9 d-flex wrap gap align-items-center"
                            onSubmit={handleSubmit}
                        >
                            <input
                                required
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                                id="fileInput"
                            />
                            <label htmlFor="fileInput">
                                <Button
                                    component="span"
                                    variant="contained"
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload file
                                </Button>
                                <span className="px-2 col-sm-12 text-wrap">
                                    {selectedFile ? selectedFile.name : "File not selected"}
                                </span>
                            </label>
                            <Button
                                disabled={loading}
                                type="submit"
                                variant="contained"
                                className="button"
                            >
                                {loading ? <CircularProgress size={23} /> : "Send"}
                            </Button>
                        </form>
                    </div>
                    <div className="col-sm-12 col-md-5 p-2 ">
                        <p className="imageText">installed</p>
                        <img src={data.images} className="w-100" alt="calculator img" />
                    </div>
                    <CustomizedSnackbars open={open} setOpen={setOpen} />
                </div>
            ) : (
                <div className="flex ">
                    <CircularProgress />
                </div>
            )}
        </>
    );
};
