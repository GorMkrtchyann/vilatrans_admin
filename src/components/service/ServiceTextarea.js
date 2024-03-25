import { Editor } from "react-draft-wysiwyg";
import React, { memo, useState } from "react";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { IconPalette } from "@tabler/icons-react";
import { BlockPicker } from "react-color";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import VisibilityIcon from "@mui/icons-material/Visibility";


function ServiceTextarea({ editorValues, setEditorValues, setLanguage }) {
    const ToolbarObj = {
        options: ["inline", "list", "colorPicker"],
        inline: {
            options: ["bold", "italic", "underline", "strikethrough"],
            bold: { className: "editorBtn" },
            italic: { className: "editorBtn" },
            underline: { className: "editorBtn" },
            strikethrough: { className: "editorBtn" },
        },
        list: {
            options: ["ordered", "unordered"],
            ordered: { className: "editorBtn" },
            unordered: { className: "editorBtn" },
        },
        colorPicker: {
            component: ColorPic,
        },
    };

    const onEditorStateChange = (newEditorState, key) => {
        setEditorValues((prevStates) => ({
            ...prevStates,
            [key]: newEditorState,
        }));
    };
    return (
        <>
            <div className="accordion-div">
                <Accordion className="accordion">
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Typography>Armenian</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Editor
                            placeholder="Armenian description"
                            wrapperClassName="editor-wrapper"
                            editorClassName="editor-editor"
                            toolbarClassName="editor-toolbar"
                            editorState={editorValues.hy}
                            onEditorStateChange={(newEditorState) =>
                                onEditorStateChange(newEditorState, "hy")
                            }
                            toolbar={ToolbarObj}
                        />
                    </AccordionDetails>
                </Accordion>
                <VisibilityIcon
                    className="visibility-icon"
                    onClick={() => setLanguage("hy")}
                />
            </div>
            <div className="accordion-div">
                <Accordion className="accordion">
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Typography>English</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Editor
                            placeholder="English description"
                            wrapperClassName="editor-wrapper"
                            editorClassName="editor-editor"
                            toolbarClassName="editor-toolbar"
                            editorState={editorValues.en}
                            onEditorStateChange={(newEditorState) =>
                                onEditorStateChange(newEditorState, "en")
                            }
                            toolbar={ToolbarObj}
                        />
                    </AccordionDetails>
                </Accordion>
                <VisibilityIcon
                    className="visibility-icon"
                    onClick={() => setLanguage("en")}
                />
            </div>
            <div className="accordion-div">
                <Accordion className="accordion">
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Typography>Russian</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Editor
                            placeholder="Russian description"
                            wrapperClassName="editor-wrapper"
                            editorClassName="editor-editor"
                            toolbarClassName="editor-toolbar"
                            editorState={editorValues.ru}
                            onEditorStateChange={(newEditorState) =>
                                onEditorStateChange(newEditorState, "ru")
                            }
                            toolbar={ToolbarObj}
                        />
                    </AccordionDetails>
                </Accordion>
                <VisibilityIcon
                    className="visibility-icon"
                    onClick={() => setLanguage("ru")}
                />
            </div>
        </>
    );
}
export default memo(ServiceTextarea);

const ColorPic = ({ expanded, onExpandEvent, onChange, currentState }) => {
    const [open, setOpen] = useState(false);
    const { color } = currentState;

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    const onChanging = (color) => {
        onChange("color", color.hex);
    };

    return (
        <div
            aria-haspopup="true"
            aria-expanded={expanded}
            aria-label="rdw-color-picker"
            className={"editorColorPicker_btn"}
            title={"Color"}
        >
            <div
                onClick={() => {
                    onExpandEvent();
                    setOpen(!open);
                }}
                className={"editorBtn"}
                style={{ marginLeft: 5 }}
            >
                <IconPalette stroke={1.2} />
            </div>
            {open ? (
                <div onClick={stopPropagation} className={"editorColorPicker"}>
                    <BlockPicker color={color} onChangeComplete={onChanging} />
                </div>
            ) : null}
        </div>
    );
};
