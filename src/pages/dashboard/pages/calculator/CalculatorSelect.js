import axios from "axios";
import React, { useEffect, useState } from "react";
import MultipleSelectPlaceholder from "../../../../components/calcuator/select";
import { CircularProgress } from "@mui/material";
import { TableMap } from "../../../../components/calcuator/Table";
import CustomizedSnackbars from "../../../../components/calcuator/alert";
import { SelectInput } from "../../../../components/calcuator/SelectInput";

export const CalculatorSelect = () => {
  const inputValue = {
    hy: "",
    en: "",
    ru: "",
  };
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({
    origin: false,
    servis: false,
    delivery: false,
  });
  const [value, setValue] = useState(inputValue);
  const [data, setData] = useState(null);
  const [select, setSelect] = useState({
    name: "",
    value: "",
  });
  function handleEditClose() {
    setEdit(false);
    setValue(inputValue);
  }
  function handleShow(e) {
    const { name } = e.target;
    setShow({ ...show, [name]: !show[name] });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  ///data read
  useEffect(() => {
    axios
      .get("http://localhost:8080/pages/calculator/selection")
      .then((res) => {
        setData(res.data.data[0]);
      })
      .catch((err) => {
        setOpen({
          openAlert: true,
          status: "error",
          message: "Error please open console",
        });
        console.log(err);
      });
  }, []);

  ///data delet
  async function handleDelete(e, name) {
    axios
      .delete(
        `http://localhost:8080/pages/calculator/selection?id=${data._id}&delets=${e}&name=${name}`
      )
      .then((res) => {
        setData(res.data.data);
        setOpen({
          openAlert: true,
          status: "successfully",
          message: "Deleted successfully",
        });
      })
      .catch((err) => {
        setOpen({
          openAlert: true,
          status: "error",
          message: "Error please open console",
        });
        console.log(err);
      });
  }
  ///data edit
  async function handleEdit(e) {
    if (
      value.hy.trim().length < 1 ||
      value.en.trim().length < 1 ||
      value.ru.trim().length < 1
    ) {
      return setOpen({
        openAlert: true,
        status: "error",
        message: "all fields are required",
      });
    }
    e.preventDefault();
    axios
      .patch(`http://localhost:8080/pages/calculator/selection`, {
        id: data.id,
        elementId: edit.id,
        value,
        name: edit.name,
      })
      .then((res) => {
        setEdit(false);
        setValue(inputValue);
        setData(res.data.data);
        setOpen({
          openAlert: true,
          status: "successfully",
          message: "Edit successfully",
        });
      })
      .catch((err) => {
        setOpen({
          openAlert: true,
          status: "error",
          message: "Error please open console",
        });
        console.log(err);
      });
  }
  ///data save
  async function handleSubmit(e) {
    e.preventDefault();
    if (
      value.hy.trim().length < 1 ||
      value.en.trim().length < 1 ||
      value.ru.trim().length < 1 ||
      select.name.trim().length < 1
    ) {
      return setOpen({
        openAlert: true,
        status: "error",
        message: "all fields are required",
      });
    }
    setLoading(true);
    axios
      .post("http://localhost:8080/pages/calculator/selection", {
        value,
        name: select.name,
        id: data._id,
      })
      .then((res) => {
        setOpen({
          openAlert: true,
          status: "successfully",
          message: "Added successfully",
        });
        setLoading(false);
        setData(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        setOpen({
          openAlert: true,
          status: "error",
          message: "Error please open console",
        });
        console.log(err);
      });
  }

  return (
    <div>
      {data ? (
        <>
          <form
            onSubmit={(e) => (edit ? handleEdit(e) : handleSubmit(e))}
            className="d-flex justidy-content-center flex-column align-items-center"
          >
            <div className="col-sm-12 col-md-7 col-lg-8  ">
              <MultipleSelectPlaceholder
                edit={edit}
                select={select}
                setSelect={setSelect}
              />
              <SelectInput value={value} handleChange={handleChange} />
              <input
                type="submit"
                className="button py-2 px-4 mt-3 mb-2 send"
                value={edit ? "Edit" : "Send"}
                disabled={loading}
              />
              {edit && (
                <button
                  onClick={handleEditClose}
                  className="button py-2 px-4 mt-3 mb-2 mx-4"
                >
                  Close
                </button>
              )}
              {loading && <CircularProgress className="mx-1 mt-1" size={24} />}
            </div>
          </form>
          <div className="row mx-0 p-1 w-100 flex-column mt-5 align-items-start">
            {/* Table */}
            <button
              className="button px-4 py-2 w-25 my-2"
              onClick={handleShow}
              name="delivery"
            >
              {show.delivery ? "Hide" : "Show"} delivery
            </button>
            {show.delivery && (
              <>
                <h2 className="text-center">Country of delivery</h2>
                <TableMap
                  data={data.select.delivery}
                  name={"delivery"}
                  setValue={setValue}
                  setEdit={setEdit}
                  delets={handleDelete}
                />
              </>
            )}
            <button
              className="button px-4 py-2 w-25 my-2"
              onClick={handleShow}
              name="origin"
            >
              {show.origin ? "Hide" : "Show"} origin
            </button>
            {show.origin && (
              <>
                <h2 className="text-center">Country of origin</h2>
                <TableMap
                  data={data.select.origin}
                  name={"origin"}
                  setValue={setValue}
                  setEdit={setEdit}
                  delets={handleDelete}
                />
              </>
            )}
            <button
              className="button px-4 py-2 w-25 my-2"
              onClick={handleShow}
              name="service"
            >
              {show.service ? "Hide " : "Hhow"} service
            </button>
            {show.service && (
              <>
                {" "}
                <h2 className="text-center">Type of service</h2>
                <TableMap
                  data={data.select.service}
                  name="service"
                  setValue={setValue}
                  setEdit={setEdit}
                  delets={handleDelete}
                />
              </>
            )}
            <CustomizedSnackbars open={open} setOpen={setOpen} />
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center ">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};
