import React, { useEffect, useState } from "react";
import ServiceTextarea from "../../../../components/service/ServiceTextarea";
import { ServiceInput } from "../../../../components/service/ServiceInput";
import { ServiceImg } from "../../../../components/service/ServiceImages";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import { InfoPreview } from "../../../../components/service/InfoPreview";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import CustomizedSnackbars from "../../../../components/calcuator/alert";
import ServiceSelect from "../../../../components/service/ServiceSelect";

export const InfoBlock = () => {
    const defaultContent = {
        entityMap: {},
        blocks: [
            {
                key: "637gr",
                text: "",
                type: "unstyled",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
            },
        ],
    };
    const [inputValues, setInputValues] = useState({
        hy: "",
        en: "",
        ru: "",
    });
    const [open, setOpen] = useState(false);
    const [language, setLanguage] = useState("en");
    const [selectText, setSelectText] = useState("title");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [editorValues, setEditorValues] = useState({
        hy: EditorState.createWithContent(convertFromRaw(defaultContent)),
        en: EditorState.createWithContent(convertFromRaw(defaultContent)),
        ru: EditorState.createWithContent(convertFromRaw(defaultContent)),
    });
    async function alert(status, message) {
        setOpen({
            openAlert: true,
            status: status,
            message: message,
        });
    }
    useEffect(() => {
        axios
            .get("http://localhost:8080/service/info")
            .then((res) => setData(res.data.data))
            .catch((err) => {
                alert("error", "Error request")
                console.log(err)
            });
    }, []);
    function handleSubmit(event, path) {
        event.preventDefault()

        if (
            path === "title" &&
            (inputValues.hy.trim() === "" ||
                inputValues.en.trim() === "" ||
                inputValues.ru.trim() === "")
        ) {
            return alert("error", "all fields are required")

        }
        if (
            path === "description" &&
            !(editorValues.hy.getCurrentContent().hasText() &&
                editorValues.en.getCurrentContent().hasText() &&
                editorValues.ru.getCurrentContent().hasText())
        ) {
            return alert("error", "all fields are required")

        }
        const data = path === 'title' ? { title: inputValues } : {
            description: {
                hy: convertToRaw(editorValues.hy.getCurrentContent()),
                en: convertToRaw(editorValues.en.getCurrentContent()),
                ru: convertToRaw(editorValues.ru.getCurrentContent()),
            }
        }
        setLoading(true);
        axios
            .patch(`http://localhost:8080/service/info/${path}`, data)
            .then((res) => {
                setLoading(false);
                alert("successfully", `${path} update successfully `,)
                setData(res.data.data);
            })
            .catch((error) => {
                setLoading(false);
                alert("error", `${path} update error `)
                console.log(error);
            });
    }
    return (
        <div className="service">
            <section className="form-section">
                <div className="service-file">
                    <ServiceImg
                        data={data}
                        setData={setData}
                        url={"http://localhost:8080/service/info/images"}
                    />
                </div>
                <form className="text-form ">
                    <ServiceSelect selectText={selectText} setSelectText={setSelectText} />
                    <div>
                        {selectText === "title" ? (
                            <ServiceInput
                                inputValues={inputValues}
                                setInputValues={setInputValues}
                                setLanguage={setLanguage}
                                language={language}
                            />
                        ) : (
                            <ServiceTextarea
                                editorValues={editorValues}
                                setLanguage={setLanguage}
                                setEditorValues={setEditorValues}
                                language={language}
                            />
                        )}
                    </div>
                    <Button
                        disabled={loading}
                        type="submit"
                        variant="contained"
                        onClick={(event) => handleSubmit(event, selectText)}
                        className="button"
                    >
                        {loading ? <CircularProgress size={23} /> : "Send"}
                    </Button>
                </form>
            </section>
            <div>
                {data ? (
                    <InfoPreview
                        editorValues={editorValues}
                        language={language}
                        inputValues={inputValues}
                        data={data}
                    />
                ) : (
                    <div className="center-loading">
                        <CircularProgress size={23} />
                    </div>
                )}
            </div>
            {open && <CustomizedSnackbars open={open} setOpen={setOpen} />}
        </div>
    );
};
